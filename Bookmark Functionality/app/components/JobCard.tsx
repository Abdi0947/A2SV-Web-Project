"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

type Image = {
  url: string;
  alt: string;
};

type JobCardProps = {
  image: Image;
  jobTitle: string;
  organizationName: string;
  organizationAddress: string;
  jobDescription: string;
  jobNature: string;
  categories: string[];
  index: string | number;
  eventID: string;
  userToken?: string;
};

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

const JobCard = ({
  image,
  jobTitle,
  organizationName,
  organizationAddress,
  jobDescription,
  jobNature,
  categories,
  index,
  eventID,
  userToken
}: JobCardProps) => {
  const [imgSrc, setImgSrc] = useState(image.url);
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const placeholder =
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="64" height="64"%3E%3Crect width="64" height="64" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="10"%3ELogo%3C/text%3E%3C/svg%3E';

  // Fetch bookmark state
  useEffect(() => {
    if (!userToken) return;

    fetch("https://akil-backend.onrender.com/bookmarks", {
      headers: { Authorization: `Bearer ${userToken}` }
    })
      .then(res => res.json())
      .then(data => {
        setBookmarked(data.some((item: any) => item.eventID === eventID));
      })
      .catch(err => console.error("Failed to fetch bookmarks:", err));
  }, [eventID, userToken]);

  const toggleBookmark = async () => {
    if (!userToken) return;

    setLoading(true);
    setError(null);

    try {
      const method = bookmarked ? "DELETE" : "POST";
      const res = await fetch(
        `https://akil-backend.onrender.com/bookmarks/${eventID}`,
        {
          method,
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (!res.ok) throw new Error("Failed to update bookmark");

      setBookmarked(prev => !prev);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative border-2 rounded-4xl border-gray-200 p-8 flex gap-4 hover:shadow-2xl transition"
      data-testid="job-card"
    >
      {/* ✅ Bookmark button only for authenticated users */}
      {userToken && (
        <button
          data-testid="bookmark-button"
          title={bookmarked ? "Remove Bookmark" : "Add Bookmark"}
          onClick={toggleBookmark}
          disabled={loading}
          className="absolute top-4 right-4 text-xl"
        >
          {bookmarked ? "🔖" : "📑"}
        </button>
      )}

      <div>
        <img
          src={imgSrc || placeholder}
          alt={image.alt}
          className="max-w-16 h-16 object-contain"
          onError={() => setImgSrc(placeholder)}
        />
      </div>

      <div className="flex flex-col gap-2.5 flex-1">
        <Link
          href={`/${index}`}
          className="font-bold text-2xl hover:text-blue-600 transition"
        >
          {jobTitle}
        </Link>

        <div className="flex gap-2 text-gray-500">
          <h2>{organizationName}</h2>
          <span>•</span>
          <h2>{organizationAddress}</h2>
        </div>

        <p className="text-gray-700 line-clamp-2">{jobDescription}</p>

        <div className="flex gap-2.5 items-center text-xs mt-3 flex-wrap">
          <span className="bg-green-100 py-2 px-3 rounded-full text-green-500">
            {jobNature}
          </span>

          {categories.map((category, i) => (
            <span
              key={i}
              className={`min-w-16 border rounded-full text-center p-2 ${
                Category2Color.get(category) || "text-gray-500"
              }`}
            >
              {category}
            </span>
          ))}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default JobCard;
