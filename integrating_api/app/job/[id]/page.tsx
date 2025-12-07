"use client";
import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useGetOpportunityByIdQuery } from "@/app/service/data";
import Loading from "@/app/components/Loading";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Category2Color } from "../../components/JobCard";

export default function Job() {
  const params = useParams();
  const rawId = params.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;
  if (!id) {
    return <div className="p-10">Job not found.</div>;
  }

  const router = useRouter();
  const { data, isError, isLoading } = useGetOpportunityByIdQuery(id);

  useEffect(() => {
    if (!isLoading && isError) {
      router.push("/error");
    }
  }, [isLoading, isError, router]);

  if (isLoading) return <Loading />;

  if (!data?.data) {
    return <div className="p-10">Job not found.</div>;
  }

  const jobData = data.data;
  const responsibilities = jobData.responsibilities?.split("\n").filter((r: string) => r.trim()) || [];
  const idealCandidate = jobData.idealCandidate?.split("\n").filter((c: string) => c.trim()) || [];
  const categories = jobData.categories || [];
  const requiredSkills = jobData.requiredSkills || [];

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
              <p>{jobData.title}</p>
            </div>
            <div>
              <h1 className="text-2xl font-black text-blue-950">Description</h1>
              <p className="text-gray-700">{jobData.description}</p>
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
            {idealCandidate.length > 0 && (
              <div>
                <h1 className="text-2xl font-black text-blue-950">
                  Ideal Candidate we want
                </h1>
                <ul className="list-disc ml-5 space-y-1">
                  {idealCandidate.map((candidate: string, index: number) => (
                    <li key={index}>{candidate}</li>
                  ))}
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
                <p>{jobData.whenAndWhere || "Not specified"}</p>
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
                    <p className="font-medium">{jobData.datePosted?.slice(0, 10) || "Not specified"}</p>
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
                    <p className="font-medium">{jobData.deadline?.slice(0, 10) || "Not specified"}</p>
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
                    <p className="font-medium">{Array.isArray(jobData.location) ? jobData.location.join(", ") : jobData.location || "Not specified"}</p>
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
                    <p className="font-medium">{jobData.startDate?.slice(0, 10) || "Not specified"}</p>
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
                    <p className="font-medium">{jobData.endDate?.slice(0, 10) || "Not specified"}</p>
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
