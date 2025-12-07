import Image from "next/image";
import Link from "next/link";

interface JobCardProps {
  id: string;
  image?: { url?: string; alt: string }; 
  jobTitle: string;
  jobDescription: string;
  jobNature: string;
  categories: string[];
  organizationName: string;
  organizationAddress: string;
}

export default function JobCard({
  id,
  image,
  jobTitle,
  jobDescription,
  jobNature,
  categories,
  organizationName,
  organizationAddress,
}: JobCardProps) {
  return (
    <Link href={`/job/${id}`}>
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
          <p className="text-gray-500">{organizationName}</p>
          <p className="text-gray-400 text-sm">{organizationAddress}</p>
          <p className="text-gray-700 line-clamp-3">{jobDescription}</p>

          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {categories.map((cat) => (
                <span
                  key={cat}
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
