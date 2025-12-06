"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function JobDetail() {
  const params = useParams();
  const jobId = Array.isArray(params.jobIndex) ? params.jobIndex[0] : params.jobIndex;

  const [job, setJob] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchJob() {
      if (!jobId) {
        setError("Job ID is missing");
        setLoading(false);
        return;
      }

      try {
        const API = `https://akil-backend.onrender.com/opportunities/${jobId}`;
        const res = await fetch(API, { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to fetch job: ${res.status}`);

        const data = await res.json();

        const mappedJob = {
          title: data.title ?? data.name ?? "No title",
          description: data.description ?? data.summary ?? "No description",
          work_nature: data.work_nature ?? data.type ?? "Not specified",
          company: data.company ?? data.organization ?? "Unknown",
          about: {
            location: data.location ?? data.about?.location ?? "Unknown",
            categories: data.categories ?? data.tags ?? data.about?.categories ?? [],
            posted_on: data.posted_on ?? data.postedOn ?? null,
            deadline: data.deadline ?? null,
          },
          image: data.image ?? data.logo ?? "",
        };

        setJob(mappedJob);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchJob();
  }, [jobId]);

  if (loading) return <p className="animate-pulse text-center mt-20">Loading job details...</p>;
  if (error || !job) return <p className="text-red-600 text-center mt-20">{error || "Job not found"}</p>;

  return (
    <main className="max-w-3xl mx-auto mt-16 p-6 border rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
      <p className="text-gray-500 mb-2">{job.company}</p>
      <p className="text-gray-400 mb-4">{job.about.location}</p>

      {job.image && (
        <div className="w-full h-64 relative mb-6">
          <Image src={job.image} alt={job.company} fill className="object-cover rounded-md" />
        </div>
      )}

      <h2 className="text-xl font-semibold mb-2">Description</h2>
      <p className="text-gray-700 mb-4">{job.description}</p>

      <h2 className="text-xl font-semibold mb-2">Work Nature</h2>
      <p className="text-gray-700 mb-4">{job.work_nature}</p>

      <h2 className="text-xl font-semibold mb-2">Categories</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {job.about.categories.map((cat: string, i: number) => (
          <span key={i} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {cat}
          </span>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-2">Dates</h2>
      <p className="text-gray-700">
        Posted on: {job.about.posted_on ?? "N/A"} | Deadline: {job.about.deadline ?? "N/A"}
      </p>
    </main>
  );
}
