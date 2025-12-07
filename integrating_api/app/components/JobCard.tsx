import React from "react";
import JobListingInterface from "../JobListingInterface";
import Link from "next/link";
import Image from "next/image";

// Category to color mapping
export const Category2Color = new Map<string, string>([
  ["Customer Service", "text-blue-500"],
  ["Data Science", "text-yellow-500"],
  ["Support", "text-cyan-500"],
  ["Analytics", "text-purple-500"],
  ["Design", "text-pink-500"],
  ["Art", "text-emerald-400"],
  ["IT", "text-amber-700"],
  ["Development", "text-orange-500"],
  ["Marketing", "text-violet-700"]
]);

const JobCard = (job: JobListingInterface) => {
  return (
    <div className="border-2 rounded-4xl border-gray-200 p-8 flex gap-4 hover:shadow-2xl transition ease-in">
      <div>
        <img 
          src={job.logoUrl || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="64" height="64"%3E%3Crect width="64" height="64" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="10"%3ELogo%3C/text%3E%3C/svg%3E'} 
          alt={`${job.title} logo`} 
          className="max-w-16 h-16 object-contain"
        />
      </div>
      <div className="flex flex-col gap-2.5 flex-1">
        <Link href={`/job/${job.id}`} className="font-bold text-2xl hover:cursor-pointer hover:text-blue-600 transition">
          {job.title}
        </Link>
        <div className="flex flex-row gap-2 text-gray-500 text">
          <h2>{job.orgName}</h2>
          <span>•</span>
          <h2>{job.location}</h2>
        </div>
        <p className="text-gray-700 line-clamp-2">
          {job.description}
        </p>
        <div className="flex flex-row gap-2.5 items-center font-medium text-xs mt-3 flex-wrap">
          <div className="bg-green-100 py-2 px-3 rounded-full">
            <span className="text-green-500">{job.opType}</span>
          </div>
          <div className="border h-1/1 border-gray-300"></div>
          {job.categories.map((category, catIndex) => (
            <span
              className={
                "min-w-16 border rounded-full text-center p-2 " + 
                (Category2Color.get(category) || "text-gray-500")
              }
              key={catIndex}
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
