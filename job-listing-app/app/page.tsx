import JobCard from "./components/JobCard.tsx";
import jobs from "./data/jobs";

export default function JobDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-10 flex flex-col items-center gap-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Job Listing Dashboard</h1>

      {jobs.map((job) => (
        <JobCard key={job.id} {...job} />
      ))}
    </div>
  );
}
