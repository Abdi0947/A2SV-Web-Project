import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white">
      <div className="text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Welcome to A2SV Task 8
        </h1>
        <p className="text-xl text-indigo-600 font-semibold mb-6">
          User Authentication
        </p>
        

        <div className="flex justify-center gap-4">
          <Link
            href="/auth"
            className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </main>
  );
}
