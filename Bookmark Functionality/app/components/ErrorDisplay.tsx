"use client";

import Link from "next/link";

type ErrorDisplayProps = {
  title?: string;
  message: string;
  showRetry?: boolean;
};

/**
 * Error Display Component
 * Enhanced animated error display with user-friendly messages
 */
export default function ErrorDisplay({
  title = "Error Loading Data",
  message,
  showRetry = true,
}: ErrorDisplayProps) {
  return (
    <main className="flex flex-col max-w-5xl m-auto min-h-screen">
      <div className="m-8 p-8 bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-xl shadow-2xl animate-fade-in">
        <div className="flex items-start gap-6">
          {/* Animated Error Icon */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
                <svg
                  className="w-8 h-8 text-red-600 animate-bounce"
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
              {/* Pulsing ring around icon */}
              <div className="absolute inset-0 w-16 h-16 border-2 border-red-300 rounded-full animate-ping opacity-75"></div>
            </div>
          </div>
          
          {/* Error Content */}
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-red-800 font-bold text-3xl mb-2 animate-fade-in">{title}</h2>
              <p className="text-red-700 text-lg leading-relaxed">{message}</p>
            </div>
            
            {/* Action Buttons with Hover Effects */}
            <div className="flex flex-wrap gap-3 mt-6">
              {showRetry && (
                <button
                  onClick={() => window.location.reload()}
                  className="group relative overflow-hidden px-6 py-3 bg-red-600 text-white rounded-lg font-semibold transition-all duration-300 hover:bg-red-700 hover:scale-105 hover:shadow-lg"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh Page
                  </span>
                  <div className="absolute inset-0 bg-red-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
              )}
              <Link
                href="/"
                className="group relative overflow-hidden px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold transition-all duration-300 hover:bg-gray-300 hover:scale-105 hover:shadow-lg"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Go to Home
                </span>
                <div className="absolute inset-0 bg-gray-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
    </main>
  );
}
