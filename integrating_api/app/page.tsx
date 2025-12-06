"use client";

import { useEffect, useState } from "react";
import JobCard from "./components/JobCard";
import type { StaticImageData } from "next/image";

// Logos
import socialMediaLogo from "../assets/socialmedia.png";
import webLogo from "../assets/web.avif";
import graphicsLogo from "../assets/graphicsdesigner.png";
import dataAnalystLogo from "../assets/dataanalayst.jpg";
import placeholderLogo from "../assets/placeholder.png";

const logos: StaticImageData[] = [
  socialMediaLogo,
  webLogo,
  graphicsLogo,
  dataAnalystLogo,
  placeholderLogo,
];

export default function Home() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOpportunities() {
      const API = "https://akil-backend.onrender.com/opportunities/search";
      try {
        const res = await fetch(API);
        if (!res.ok) throw new Error(`Failed to fetch API: ${res.status}`);
        const data = await res.json();
        const opportunities = data?.opportunities ?? data?.data ?? data ?? [];
        if (!Array.isArray(opportunities) || opportunities.length === 0) {
          throw new Error("No opportunities returned from API");
        }
        const mapped = opportunities.map((item: any, index: number) => ({
          id: item.id ?? index,
          title: item.title ?? item.name ?? item.position ?? "No title",
          description: item.description ?? item.summary ?? "No description",
          work_nature: item.work_nature ?? item.type ?? "Not specified",
          about: {
            categories: item.categories ?? item.tags ?? [],
            location: item.location ?? item.about?.location ?? "Unknown",
          },
          company: item.company ?? item.organization ?? "Unknown",
        }));
        setJobs(mapped);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchOpportunities();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="animate-pulse text-gray-500 text-lg">Loading opportunities...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error loading jobs</h1>
        <p className="text-gray-700">{error}</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col max-w-5xl m-auto">
      <h1 className="text-blue-950 font-black text-3xl mt-16 mb-4">Opportunities</h1>
      <p className="text-gray-500 mb-8">Showing {jobs.length} results</p>
      <div className="flex flex-col gap-8">
        {jobs.map((job, index) => (
          <JobCard
            key={index}
            id={job.id}
            image={{ alt: job.company ?? "Organization logo", url: logos[index % logos.length].src }}
            jobTitle={job.title}
            jobDescription={job.description}
            jobNature={job.work_nature}
            categories={job.about?.categories ?? []}
            organizationAddress={job.about?.location ?? ""}
            organizationName={job.company}
          />
        ))}
      </div>
    </main>
  );
}
