import jobs from '../../../data/jobs';
import Link from 'next/link';

export default function JobPage({ params }) {
  const job = jobs.find(j => j.id === parseInt(params.id));
  if (!job) return <div className="p-10 text-center text-xl">Job not found</div>;

  return (
    <div className="max-w-3xl mx-auto p-10 bg-white shadow rounded-lg mt-6">
      <h1 className="text-3xl font-bold">{job.title}</h1>
      <p className="text-gray-700 mt-1 text-lg">{job.name}</p>
      <p className="text-gray-600 text-sm">{job.company}</p>
      <img src={job.avatar} alt="Avatar" className="w-28 h-28 rounded-full mt-4 border object-cover" />
      <p className="mt-4 text-gray-800">{job.description}</p>
      <p className="mt-2 text-blue-700 font-medium">Location: {job.location}</p>
      <Link
        href="/"
        className="mt-6 inline-block bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-black"
      >
        ← Back to Dashboard
      </Link>
    </div>
  );
}