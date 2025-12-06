"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

// Placeholder image
import placeholderLogo from "../assets/placeholder.png";

export default function JobDetail() {
  const params = useParams();
  const jobId = params.jobIndex;

  const [job, setJob] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchJob() {
      const API = `https://akil-backend.onrender.com/opportunities/${jobId}`;
      try {
        const res = await fetch(API);
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
          image: data.image ?? data.logo ?? placeholderLogo.src,
        };

        setJob(mappedJob);
      } catch (err: any) {
        console.error("Error fetching job:", err);
        setError(err.message || "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchJob();
  }, [jobId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="animate-pulse text-gray-500 text-lg">Loading job details...</p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error loading job</h1>
        <p className="text-gray-700">{error ?? "Job not found"}</p>
      </div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto mt-16 p-6 border rounded-md shadow-md">
      <div className="flex gap-4 items-center mb-6">
        <div className="w-20 h-20 relative">
          <Image src={job.image ?? placeholderLogo.src} alt={job.company} fill className="object-cover rounded-md" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{job.title}</h1>
          <p className="text-gray-600">{job.company}</p>
          <p className="text-gray-500">{job.about.location}</p>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="font-semibold text-xl mb-2">Job Description</h2>
        <p className="text-gray-700">{job.description}</p>
      </div>

      <div className="mb-4">
        <h2 className="font-semibold text-xl mb-2">Work Nature</h2>
        <p className="text-gray-700">{job.work_nature}</p>
      </div>

      <div className="mb-4">
        <h2 className="font-semibold text-xl mb-2">Categories</h2>
        <div className="flex gap-2 flex-wrap">
          {job.about.categories.map((cat: string, i: number) => (
            <span key={i} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {cat}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h2 className="font-semibold text-xl mb-2">Dates</h2>
        <p className="text-gray-700">
          Posted on: {job.about.posted_on ?? "N/A"} | Deadline: {job.about.deadline ?? "N/A"}
        </p>
      </div>
    </main>
  );
}
