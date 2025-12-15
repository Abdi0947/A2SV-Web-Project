import LoadingSpinner from "./components/LoadingSpinner";

/**
 * Loading UI for the home page
 * Automatically shown by Next.js during data fetching
 */
export default function Loading() {
  return <LoadingSpinner message="Loading opportunities..." />;
}
