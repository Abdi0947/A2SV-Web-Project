"use client";

import Link from "next/link";

type ErrorDisplayProps = {
  title?: string;
  message: string;
  showRetry?: boolean;
};

/**
 * Error Display Component
 * Displays user-friendly error messages with retry option
 */
export default function ErrorDisplay({
  title = "Error Loading Data",
  message,
  showRetry = true,
}: ErrorDisplayProps) {
  return (
    <main className="flex flex-col max-w-5xl m-auto">
      <div className="m-8 p-8 bg-red-50 border-2 border-red-200 rounded-xl shadow-lg">
        <div className="flex items-start gap-4">
          {/* Error Icon */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          
          {/* Error Content */}
          <div className="flex-1">
            <h2 className="text-red-800 font-bold text-2xl mb-2">{title}</h2>
            <p className="text-red-700 mb-4">{message}</p>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-4">
              {showRetry && (
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Refresh Page
                </button>
              )}
              <Link
                href="/"
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
