import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Category2Color } from "../components/JobCard";
import { fetchOpportunityById, fetchOpportunities } from "../lib/api";

/**
 * Job Detail Content Component
 * Fetches and displays the job details
 */
async function JobDetailContent({ jobId }: { jobId: string }) {
  let job: any = null;
  let error: string | null = null;

  // Try to fetch the opportunity by ID
  try {
    job = await fetchOpportunityById(jobId);
  } catch (err) {
    // If direct ID fetch fails, try fetching all and finding by index (fallback)
    try {
      const allOpportunities = await fetchOpportunities();
      const index = parseInt(jobId);
      if (!isNaN(index) && index >= 0 && index < allOpportunities.length) {
        job = allOpportunities[index];
      } else {
        error = err instanceof Error ? err.message : 'Opportunity not found';
      }
    } catch (fallbackErr) {
      error = err instanceof Error ? err.message : 'Failed to fetch opportunity';
    }
  }

  // If job not found, show 404
  if (!job || error) {
    notFound();
  }

  // Map API data structure to component display
  const jobTitle = job.title || job.name || 'Untitled Opportunity';
  const jobDescription = job.description || job.summary || 'No description available';
  const responsibilities = job.responsibilities || job.tasks || job.duties || [];
  const idealCandidate = job.ideal_candidate || job.requirements || {};
  const whenWhere = job.when_where || job.locationDetails || job.eventInfo || 'Information not available';
  const about = job.about || {};
  
  // Extract about fields with fallbacks
  const postedOn = about.posted_on || job.postedOn || job.createdAt || 'Not specified';
  const deadline = about.deadline || job.deadline || job.applicationDeadline || 'Not specified';
  const location = about.location || job.location || 'Location not specified';
  const startDate = about.start_date || job.startDate || job.start_date || 'Not specified';
  const endDate = about.end_date || job.endDate || job.end_date || 'Not specified';
  const categories = about.categories || job.categories || job.tags || [];
  const requiredSkills = about.required_skills || job.requiredSkills || job.skills || [];
  
  return (
    <>
      <div className="m-8">
        <Link href="/" className="inline-block mb-4">
          <svg
            className="w-6 h-6 text-blue-950 hover:scale-125 transition ease-in-out"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </Link>
        <main className="flex flex-row gap-20">
          <section className="flex flex-col gap-5 flex-1">
            <div>
              <h1 className="text-2xl font-black text-blue-950">Title</h1>
              <p>{jobTitle}</p>
            </div>
            <div>
              <h1 className="text-2xl font-black text-blue-950">Description</h1>
              <p className="text-gray-700">{jobDescription}</p>
            </div>
            {responsibilities.length > 0 && (
              <div>
                <h1 className="text-2xl font-black text-blue-950">
                  Responsibilities
                </h1>
                <ul className="space-y-2">
                  {responsibilities.map((responsibility: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-green-500 mt-1 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {idealCandidate && Object.keys(idealCandidate).length > 0 && (
              <div>
                <h1 className="text-2xl font-black text-blue-950">
                  Ideal Candidate we want
                </h1>
                <ul className="list-disc ml-5 space-y-1">
                  {idealCandidate.age && <li>{idealCandidate.age}</li>}
                  {idealCandidate.gender && <li>{idealCandidate.gender}</li>}
                  {idealCandidate.traits && Array.isArray(idealCandidate.traits) && 
                    idealCandidate.traits.map((trait: string, index: number) => (
                      <li key={index}>{trait}</li>
                    ))
                  }
                </ul>
              </div>
            )}
            <div>
              <h1 className="text-2xl font-black text-blue-950">When & Where</h1>
              <div className="flex flex-row items-center gap-2">
                <div className="w-8 h-8 border rounded-full flex justify-center items-center border-gray-300">
                  <svg
                    className="w-4 h-4 text-sky-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <p>{whenWhere}</p>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-5 w-96">
            <div>
              <h1 className="text-2xl font-black text-blue-950 mb-3">About</h1>
              <ul className="space-y-4">
                <li className="flex flex-row gap-2 items-center">
                  <div className="w-8 h-8 border rounded-full flex justify-center items-center border-gray-300">
                    <svg
                      className="w-4 h-4 text-sky-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-gray-500">Posted On</h2>
                    <p className="font-medium">{postedOn}</p>
                  </div>
                </li>
                <li className="flex flex-row gap-2 items-center">
                  <div className="w-8 h-8 border rounded-full flex justify-center items-center border-gray-300">
                    <svg
                      className="w-4 h-4 text-sky-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-gray-500">Deadline</h2>
                    <p className="font-medium">{deadline}</p>
                  </div>
                </li>
                <li className="flex flex-row gap-2 items-center">
                  <div className="w-8 h-8 border rounded-full flex justify-center items-center border-gray-300">
                    <svg
                      className="w-4 h-4 text-sky-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-gray-500">Location</h2>
                    <p className="font-medium">{location}</p>
                  </div>
                </li>
                <li className="flex flex-row gap-2 items-center">
                  <div className="w-8 h-8 border rounded-full flex justify-center items-center border-gray-300">
                    <svg
                      className="w-4 h-4 text-sky-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-gray-500">Start Date</h2>
                    <p className="font-medium">{startDate}</p>
                  </div>
                </li>
                <li className="flex flex-row gap-2 items-center">
                  <div className="w-8 h-8 border rounded-full flex justify-center items-center border-gray-300">
                    <svg
                      className="w-4 h-4 text-sky-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-gray-500">End Date</h2>
                    <p className="font-medium">{endDate}</p>
                  </div>
                </li>
              </ul>
            </div>
            {categories.length > 0 && (
              <>
                <hr className="text-gray-300"></hr>
                <div>
                  <h1 className="text-2xl font-black text-blue-950 mb-2">
                    Categories
                  </h1>
                  <div className="flex flex-row flex-wrap gap-2">
                    {categories.map((category: string) => (
                      <span
                        key={category}
                        className={
                          "min-w-16 border rounded-full text-center p-2 " +
                          (Category2Color.get(category) || "text-gray-500")
                        }
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}
            {requiredSkills.length > 0 && (
              <>
                <hr className="text-gray-300"></hr>
                <div>
                  <h1 className="text-2xl font-black text-blue-950 mb-2">
                    Required Skills
                  </h1>
                  <div className="flex flex-row flex-wrap gap-2">
                    {requiredSkills.map((skill: string) => (
                      <div key={skill} className="py-1 px-3 bg-violet-50">
                        <span className="text-violet-800">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </section>
        </main>
      </div>
    </>
  );
}

/**
 * Job Detail Page Component
 * Main page component that wraps the job detail content with Suspense
 */
export default async function JobPost({
  params,
}: {
  params: Promise<{ jobIndex: string }>;
}) {
  const jobId = (await params).jobIndex;

  return (
    <Suspense
      fallback={
        <div className="m-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-24 mb-4"></div>
            <div className="flex flex-row gap-20">
              <div className="flex-1 space-y-6">
                <div className="h-6 bg-gray-200 rounded w-32"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-6 bg-gray-200 rounded w-40"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="w-96 space-y-6">
                <div className="h-6 bg-gray-200 rounded w-24"></div>
                <div className="space-y-4">
                  <div className="h-16 bg-gray-200 rounded"></div>
                  <div className="h-16 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <JobDetailContent jobId={jobId} />
    </Suspense>
  );
}
