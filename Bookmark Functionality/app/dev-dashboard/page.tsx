import DashboardClientPage from "../dashboard/dashboard-client";

export default function DevDashboardPage() {
  // Minimal fake session for dev/testing only
  const session = {
    user: {
      id: "test-user",
      name: "Test User",
      email: "test@example.com",
      emailVerified: true,
      image: "",
    },
  } as any;

  return <DashboardClientPage session={session} />;
}
