export const BASE_URL = "https://akil-backend.onrender.com";

export async function fetchOpportunities() {
  try {
    const res = await fetch(`${BASE_URL}/opportunities/search`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to fetch opportunities: ${res.status}`);
    const data = await res.json();
    return data?.opportunities ?? data?.data ?? [];
  } catch (err) {
    console.error("fetchOpportunities error:", err);
    return [];
  }
}

export async function fetchOpportunityById(id: string) {
  try {
    const res = await fetch(`${BASE_URL}/opportunities/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to fetch job: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("fetchOpportunityById error:", err);
    throw err;
  }
}
