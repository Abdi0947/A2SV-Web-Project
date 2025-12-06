"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface JobCardProps {
  id: string | number;
  image: { alt: string; url: string };
  jobTitle: string;
  jobDescription: string;
  jobNature: string;
  categories: string[];
  organizationAddress: string;
  organizationName: string;
}

export default function JobCard({
  id,
  image,
  jobTitle,
  jobDescription,
  jobNature,
  categories,
  organizationAddress,
  organizationName,
}: JobCardProps) {
  return (
    <Link href={`/${id.toString()}`} className="block">
      <div className="border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow flex gap-4 cursor-pointer">
        <div className="w-20 h-20 relative flex-shrink-0">
          {image.url ? (
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover rounded-md"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-sm">
              No Image
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <h2 className="font-bold text-xl">{jobTitle}</h2>
          <p className="text-gray-600 line-clamp-2">{jobDescription}</p>

          <div className="flex gap-2 text-sm text-gray-500 mt-1">
            {jobNature && <span>{jobNature}</span>}
            {organizationAddress && <span>{organizationAddress}</span>}
          </div>

          {categories.length > 0 && (
            <div className="flex gap-2 mt-2 flex-wrap">
              {categories.map((cat, i) => (
                <span
                  key={i}
                  className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
