import { Suspense } from "react";
import JobCard from "./components/JobCard";
import { fetchOpportunities } from "./lib/api";
import ErrorDisplay from "./components/ErrorDisplay";
import JobCardSkeleton from "./components/JobCardSkeleton";

/**
 * Opportunities List Component
 * Fetches and displays opportunities from the API
 */
async function OpportunitiesList() {
  let opportunities: any[] = [];
  let error: string | null = null;

  try {
    opportunities = await fetchOpportunities();
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to fetch opportunities';
    console.error('Error in OpportunitiesList component:', error);
  }

  // Error state
  if (error) {
    return (
      <ErrorDisplay
        title="Error Loading Opportunities"
        message={`Unable to load job opportunities from the server. ${error}. Please check your internet connection and try again.`}
        showRetry={true}
      />
    );
  }

  // Empty state
  if (opportunities.length === 0) {
    return (
      <main className="flex flex-col max-w-5xl m-auto">
        <div className="m-8 p-8 text-center">
          <div className="mb-4">
            <svg
              className="w-16 h-16 mx-auto text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h2 className="text-gray-700 font-semibold text-xl mb-2">No Opportunities Found</h2>
          <p className="text-gray-500">There are currently no job opportunities available.</p>
        </div>
      </main>
    );
  }

  return (
    <div className="m-8 flex flex-col gap-12">
      {opportunities.map((opportunity, index) => {
        // Map API data structure to component props
        const jobId = opportunity._id || opportunity.id || index.toString();
        const jobTitle = opportunity.title || opportunity.name || 'Untitled Opportunity';
        const jobDescription = opportunity.description || opportunity.summary || '';
        const jobNature = opportunity.work_nature || opportunity.workType || opportunity.type || 'Not specified';
        const categories = opportunity.categories || opportunity.tags || opportunity.about?.categories || [];
        const organizationAddress = opportunity.location || opportunity.about?.location || opportunity.address || 'Location not specified';
        const organizationName = opportunity.company || opportunity.organization || opportunity.organizationName || 'Company not specified';
        const imageUrl = opportunity.image || opportunity.logo || opportunity.imageUrl || '';
        
        // Use placeholder if no image URL
        const logoUrl = imageUrl || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="64" height="64"%3E%3Crect width="64" height="64" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="10"%3ELogo%3C/text%3E%3C/svg%3E';

        return (
          <JobCard
            key={jobId}
            index={jobId}
            image={{
              alt: `${organizationName} logo`,
              url: logoUrl,
            }}
            jobTitle={jobTitle}
            jobDescription={jobDescription}
            jobNature={jobNature}
            categories={Array.isArray(categories) ? categories : []}
            organizationAddress={organizationAddress}
            organizationName={organizationName}
          />
        );
      })}
    </div>
  );
}

/**
 * Opportunities Count Component
 * Displays the count of opportunities
 */
async function OpportunitiesCount() {
  try {
    const opportunities = await fetchOpportunities();
    return <span>Showing {opportunities.length} results</span>;
  } catch {
    return <span>Loading results...</span>;
  }
}

/**
 * Home Page Component
 * Main page that displays opportunities with loading and error states
 */
export default async function Home() {
  return (
    <>
      <main className="flex flex-col max-w-5xl m-auto">
        <div className="flex flex-row mt-16 justify-between items-center m-8">
          <div>
            <h1 className="text-blue-950 font-black text-3xl">Opportunities</h1>
            <p className="text-gray-500">
              <Suspense fallback={<span>Loading...</span>}>
                <OpportunitiesCount />
              </Suspense>
            </p>
          </div>
          <div className="flex flex-row gap-2">
            <label htmlFor="sort" className="text-gray-500">
              Sort by:{" "}
            </label>
            <select name="sort" id="sort" className="font-medium text-center">
              <option value="most-relevant">Most relevant</option>
              <option value="ascendingly">Ascendingly</option>
              <option value="descendingly">Descendingly</option>
            </select>
          </div>
        </div>
        <Suspense
          fallback={
            <div className="m-8 flex flex-col gap-12">
              {[1, 2, 3].map((i) => (
                <JobCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <OpportunitiesList />
        </Suspense>
      </main>
    </>
  );
}
