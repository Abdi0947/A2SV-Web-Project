"use client";
import { signOut } from "@/lib/actions/auth-actions";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Session = typeof auth.$Infer.Session;

export default function DashboardClientPage({ session }: { session: Session }) {
  const router = useRouter();
  const user = session.user;

  const jobs = [
    {
      id: "1",
      title: "Frontend Engineer",
      company: "TechWave",
      location: "Remote",
      type: "Full-time",
      tags: ["React", "TypeScript", "Next.js"],
    },
    {
      id: "2",
      title: "Backend Developer",
      company: "DataForge",
      location: "Berlin, DE",
      type: "Hybrid",
      tags: ["Node.js", "PostgreSQL", "Prisma"],
    },
    {
      id: "3",
      title: "Product Designer",
      company: "Bright Labs",
      location: "New York, US",
      type: "On-site",
      tags: ["UX", "UI", "Figma"],
    },
  ];

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
                  {jobs.length} open roles
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {job.title}
                      </h4>
                      <span className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-700">
                        {job.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{job.company}</p>
                    <p className="text-xs text-gray-500 mb-3">{job.location}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-full bg-white border border-gray-200 text-gray-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md">
                      View details
                    </button>
                  </div>
                ))}
              </div>
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
