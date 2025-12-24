import Link from "next/link";

/**
 * 404 Not Found Page
 * Animated error page for missing routes
 */
export default function notFound() {
    return (
        <div className="text-center items-center flex flex-col justify-center w-screen h-screen gap-6 bg-gradient-to-br from-blue-50 to-gray-100">
            {/* Animated 404 Number */}
            <div className="relative">
                <h1 className="text-9xl font-black text-blue-900 animate-bounce">
                    4
                    <span className="inline-block animate-pulse">0</span>
                    4
                </h1>
                {/* Floating particles animation */}
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                    <div className="absolute top-20 right-20 w-3 h-3 bg-blue-300 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute bottom-10 left-20 w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute bottom-20 right-10 w-3 h-3 bg-blue-300 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
                </div>
            </div>
            
            {/* Error Icon with Animation */}
            <div className="animate-bounce">
                <svg
                    className="w-24 h-24 text-blue-600 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </div>
            
            {/* Error Message */}
            <div className="space-y-2 animate-fade-in">
                <h2 className="text-3xl font-bold text-gray-800">Page Not Found</h2>
                <p className="text-lg text-gray-600 max-w-md">
                    Sorry, the page you are looking for does not exist or has been moved.
                </p>
            </div>
            
            {/* Action Button with Hover Animation */}
            <Link 
                href="/" 
                className="group relative overflow-hidden border-2 border-blue-900 px-8 py-4 rounded-full text-blue-900 font-semibold transition-all duration-300 hover:bg-blue-900 hover:text-white hover:scale-110 hover:shadow-xl"
            >
                <span className="relative z-10">Go to Home Page</span>
                <div className="absolute inset-0 bg-blue-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </Link>
            
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" style={{ animationDelay: '4s' }}></div>
            </div>
        </div>
    );
}

