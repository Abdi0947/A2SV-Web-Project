/**
 * Job Card Skeleton Component
 * Loading placeholder for job cards with shimmer animation
 */
export default function JobCardSkeleton() {
  return (
    <div className="border-2 rounded-4xl border-gray-200 p-8 flex gap-4 animate-pulse">
      {/* Logo skeleton */}
      <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
      
      {/* Content skeleton */}
      <div className="flex flex-col gap-2.5 flex-1">
        {/* Title skeleton */}
        <div className="h-7 bg-gray-200 rounded w-3/4"></div>
        
        {/* Company and location skeleton */}
        <div className="h-5 bg-gray-200 rounded w-1/2"></div>
        
        {/* Description skeleton */}
        <div className="space-y-2 mt-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
        
        {/* Tags skeleton */}
        <div className="flex flex-row gap-2.5 items-center mt-3">
          <div className="h-6 bg-gray-200 rounded-full w-20"></div>
          <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
          <div className="h-6 bg-gray-200 rounded-full w-24"></div>
          <div className="h-6 bg-gray-200 rounded-full w-20"></div>
        </div>
      </div>
    </div>
  );
}
