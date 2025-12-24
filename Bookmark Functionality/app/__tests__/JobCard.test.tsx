import { render, screen, fireEvent } from "@testing-library/react";
import JobCard from "@/components/JobCard";

describe("JobCard", () => {
  const props = {
    image: { url: "", alt: "Job logo" },
    jobTitle: "Web Developer",
    organizationName: "Acme Inc",
    organizationAddress: "NYC",
    jobDescription: "Test description",
    jobNature: "Full-time",
    categories: ["Development"],
    index: 1,
    eventID: "job-1",
    userToken: "test-token",
  };

  it("renders job details", () => {
    render(<JobCard {...props} />);
    expect(screen.getByText("Web Developer")).toBeInTheDocument();
  });

  it("shows bookmark button", () => {
    render(<JobCard {...props} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("blocks bookmark if unauthenticated", () => {
    render(<JobCard {...props} userToken={undefined} />);
    // Button should not be rendered if no userToken
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
