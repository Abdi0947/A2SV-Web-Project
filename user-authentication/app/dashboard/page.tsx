"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const currentUser = localStorage.getItem("currentUser");
    
    if (!currentUser) {
      router.push("/SignIn");
      return;
    }

    const userData = JSON.parse(currentUser);
    if (!userData.isAuthenticated) {
      router.push("/SignIn");
      return;
    }

    setUser({
      name: userData.name,
      email: userData.email,
    });
    setIsLoading(false);
  }, [router]);

  const handleSignOut = () => {
    // Remove user session
    localStorage.removeItem("currentUser");
    // Redirect to sign in page
    router.push("/SignIn");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="max-w-md w-full">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Welcome, {user.name}!
          </h1>
          <p className="text-gray-600 text-center mb-6">
            You have successfully signed in to your account.
          </p>

          <div className="border-t border-gray-200 pt-6">
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Email:</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-1">Name:</p>
              <p className="font-medium">{user.name}</p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

