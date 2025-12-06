/**
 * API Utility Functions
 * Handles fetching data from the Akil Backend API
 * Base URL: https://akil-backend.onrender.com/
 * 
 * Endpoints:
 * - GET /opportunities/search - Fetches all opportunities
 * - GET /opportunities/:id - Fetches a specific opportunity by ID
 */

const API_BASE_URL = 'https://akil-backend.onrender.com';

/**
 * Fetches all opportunities from the API
 * @returns Promise<Array> - Array of opportunity objects
 * @throws Error if the API request fails
 */
export async function fetchOpportunities(): Promise<any[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/opportunities/search`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Cache revalidation for Next.js
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Ensure we return an array
    if (Array.isArray(data)) {
      return data;
    } else if (data.data && Array.isArray(data.data)) {
      return data.data;
    } else if (data.opportunities && Array.isArray(data.opportunities)) {
      return data.opportunities;
    } else {
      throw new Error('Invalid API response format: expected an array');
    }
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    throw error;
  }
}

/**
 * Fetches a single opportunity by ID
 * @param id - The opportunity ID
 * @returns Promise<Object> - Opportunity object
 * @throws Error if the API request fails or opportunity not found
 */
export async function fetchOpportunityById(id: string): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/opportunities/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Opportunity not found');
      }
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching opportunity ${id}:`, error);
    throw error;
  }
}
