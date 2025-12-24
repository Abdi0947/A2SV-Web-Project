"use client";
import { signOut } from "@/lib/actions/auth-actions";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import JobCard from "@/components/JobCard";
import JobCardSkeleton from "@/components/JobCardSkeleton";

type Session = typeof auth.$Infer.Session;

export default function DashboardClientPage({ session }: { session: Session }) {
  const router = useRouter();
  const user = session.user;
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/opportunities");
        if (!response.ok) {
          throw new Error("Failed to fetch opportunities");
        }
        const opportunities = await response.json();
        setJobs(opportunities.slice(0, 6)); // Limit to 6 jobs
      } catch (err: any) {
        setError(err.message || "Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, []);

  const handleSignOut = async () => {
    await signOut();
    router.push("/auth");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 pt-20">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Welcome, {user.name || "candidate"}!
                </h2>
                <p className="text-gray-600">
                  Explore curated job opportunities tailored for you.
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-3">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                    }
                  />
                  <div className="text-sm">
                    <p className="text-gray-900 font-medium">{user.name}</p>
                    <p className="text-gray-500">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>

            {/* Authentication Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-medium text-blue-900 mb-2">
                Authentication Status
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-blue-700">Status:</span>
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Authenticated
                  </span>
                </div>
                <div>
                  <span className="font-medium text-blue-700">Provider: </span>
                  <span className="ml-2 text-blue-600">Better-Auth</span>
                </div>
                <div>
                  <span className="font-medium text-blue-700">User ID:</span>
                  <span className="ml-2 text-blue-600">{user.id}</span>
                </div>
                <div>
                  <span className="font-medium text-blue-700">
                    Email Verified:
                  </span>
                  <span className="ml-2 text-blue-600">
                    {user.emailVerified ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>

            {/* Job Opportunities */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Job Opportunities
                  </h3>
                  <p className="text-sm text-gray-600">
                    Hand-picked roles that match your skills.
                  </p>
                </div>
                <span className="text-sm text-indigo-600 font-semibold">
                  {loading ? "Loading..." : `${jobs.length} open roles`}
                </span>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {loading ? (
                <div className="space-y-4">
                  <JobCardSkeleton />
                  <JobCardSkeleton />
                  <JobCardSkeleton />
                </div>
              ) : (
                <div className="space-y-4">
                  {jobs.map((job, index) => {
                    // Map API data to JobCard props
                    const jobTitle = job.title || job.name || "Untitled Opportunity";
                    const organizationName = job.organization?.name || job.company || job.organization_name || "Unknown";
                    const organizationAddress = job.organization?.address || job.location || job.organization_address || "";
                    const jobDescription = job.description || job.summary || "";
                    const jobNature = job.job_nature || job.type || job.nature || "Full-time";
                    const categories = job.about?.categories || job.categories || job.tags || [];
                    const eventID = job.id || job._id || `job-${index}`;
                    const imageUrl = job.organization?.logo || job.logo || job.image?.url || "";
                    
                    // Get token from localStorage (for client-side) or pass undefined
                    // In a real app, you'd get this from the session/auth system
                    const userToken = typeof window !== 'undefined' 
                      ? localStorage.getItem('token') || undefined 
                      : undefined;

                    return (
                      <JobCard
                        key={eventID}
                        image={{ url: imageUrl, alt: `${organizationName} logo` }}
                        jobTitle={jobTitle}
                        organizationName={organizationName}
                        organizationAddress={organizationAddress}
                        jobDescription={jobDescription}
                        jobNature={jobNature}
                        categories={Array.isArray(categories) ? categories : []}
                        index={index}
                        eventID={eventID}
                        userToken={userToken}
                      />
                    );
                  })}
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  ← Back to Home
                </Link>
                <Link
                  href="/auth"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  Manage Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
