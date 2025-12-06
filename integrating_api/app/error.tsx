"use client";

export default function GlobalError({ error }: { error: Error }) {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Something went wrong!</h1>
      <p className="text-gray-700">{error.message}</p>
    </div>
  );
}
