/**
 * Loading Spinner Component
 * Animated loading spinner with pulse effect
 */
export default function LoadingSpinner({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          {/* Outer spinning ring */}
          <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          {/* Inner pulsing dot */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
        </div>
        <div className="text-center">
          <p className="text-gray-700 font-semibold text-lg animate-pulse">{message}</p>
          <p className="text-gray-500 text-sm mt-2">Please wait...</p>
        </div>
      </div>
    </div>
  );
}
