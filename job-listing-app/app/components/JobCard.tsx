import Link from "next/link";

export default function JobCard({ id, title, company, location, description, avatar, tags }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 flex flex-col gap-4 border border-gray-100 w-full max-w-3xl">
      <div className="flex gap-4 items-start">
        <img src={avatar} alt="Logo" className="w-12 h-12 rounded-full object-cover" />
        <div className="flex-1">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <p className="text-gray-600 text-sm">{company} • {location}</p>
          <p className="mt-2 text-gray-700 text-sm">{description}</p>
          <div className="mt-3 flex gap-2 flex-wrap">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <Link
        href={`/job/${id}`}
        className="self-start mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        View Details
      </Link>
    </div>
  );
}
