import JobCard from "./components/JobCard";
import JobData from "./db/jobData.json";
import type { StaticImageData } from "next/image";
import socialMediaLogo from "./assets/socialmedia.png";
import webLogo from "./assets/web.avif";
import graphicsLogo from "./assets/graphicsdesigner.png";
import dataAnalystLogo from "./assets/dataanalayst.jpg";
import customerSupportLogo from "./assets/customersupport.avif";

export default function Home() {
  const JobDetails = JobData.job_postings;
  const logos: StaticImageData[] = [
    socialMediaLogo,
    webLogo,
    graphicsLogo,
    dataAnalystLogo,
    customerSupportLogo,
  ];

  return (
    <>
      <main className="flex flex-col max-w-5xl m-auto">
        <div className="flex flex-row mt-16 justify-between items-center m-8">
          <div>
            <h1 className="text-blue-950 font-black text-3xl">Opportunities</h1>
            <p className="text-gray-500">
              Showing {JobDetails.length} results
            </p>
          </div>
          <div className="flex flex-row gap-2">
            <label htmlFor="sort" className="text-gray-500">
              Sort by:{" "}
            </label>
            <select name="sort" id="sort" className="font-medium text-center">
              <option value="most-relevant">Most relevant</option>
              <option value="ascendingly">Ascendingly</option>
              <option value="descendingly">Descendingly</option>
            </select>
          </div>
        </div>
        <div className="m-8 flex flex-col gap-12">
          {JobDetails.map((jobDetail, index) => (
            <JobCard
              key={index}
              index={index}
              image={{
                alt: jobDetail.company + " logo",
                url: logos[index].src,
              }}
              jobTitle={jobDetail.title}
              jobDescription={jobDetail.description}
              jobNature={jobDetail.work_nature}
              categories={jobDetail.about.categories}
              organizationAddress={jobDetail.about.location}
              organizationName={jobDetail.company}
            />
          ))}
        </div>
      </main>
    </>
  );
}
