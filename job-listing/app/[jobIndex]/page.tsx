import Link from "next/link";
import JobData from "../db/jobData.json";
import { notFound } from "next/navigation";
import { Category2Color } from "../components/JobCard";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faArrowLeft,
  faCrosshairs,
  faFire,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCircleCheck,
  faCalendar,
  faCalendarCheck,
} from "@fortawesome/free-regular-svg-icons";

export default async function JobPost({
  params,
}: {
  params: Promise<{ jobIndex: string }>;
}) {
  const JobDetails = JobData.job_postings;
  const jobIndex = (await params).jobIndex;
  if (
    parseInt(jobIndex) > JobDetails.length ||
    parseInt(jobIndex) < 0 ||
    Number.isNaN(parseInt(jobIndex))
  ) {
    notFound();
  }
  const Job = JobDetails[parseInt(jobIndex)];
  return (
    <>
      <div className="m-8">
        <Link href="/">
          <FontAwesomeIcon
            className="text-xl text-blue-950 hover:scale-125 transition ease-in-out mb-4"
            icon={faArrowLeft}
          />
        </Link>
        <main className="flex flex-row gap-20">
          <section className="flex flex-col gap-5">
            <div>
              <h1 className="text-2xl font-black text-blue-950">Title</h1>
              <p>{Job.title}</p>
            </div>
            <div>
              <h1 className="text-2xl font-black text-blue-950">Description</h1>
              <p>{Job.description}</p>
            </div>
            <div>
              <h1 className="text-2xl font-black text-blue-950">
                Responsibilities
              </h1>
              <ul>
                {Job.responsibilities.map((responsibility, index) => (
                  <li key={index}>
                    <FontAwesomeIcon
                      className="text-green-500"
                      icon={faCircleCheck}
                    ></FontAwesomeIcon>
                    {responsibility}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h1 className="text-2xl font-black text-blue-950">
                Ideal Candidate we want
              </h1>
              <ul className="list-disc ml-5">
                <li>{Job.ideal_candidate.age}</li>
                <li>{Job.ideal_candidate.gender}</li>
                {Job.ideal_candidate.traits.map((responsibility, index) => (
                  <li key={index}>{responsibility}</li>
                ))}
              </ul>
            </div>
            <div>
              <h1 className="text-2xl font-black text-blue-950">When & Where</h1>
              <div className="flex flex-row items-center gap-2">
                <div className="w-8 h-8 border rounded-full flex justify-center items-center border-gray-300">
                  <FontAwesomeIcon
                    className="text-sky-300"
                    icon={faLocationDot}
                  />
                </div>
                <p>{Job.when_where}</p>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-5 w-2xl">
            <div>
              <h1 className="text-2xl font-black text-blue-950 mb-3">About</h1>
              <ul>
                <li className="flex flex-row gap-2 items-center">
                  <div className="w-8 h-8 border rounded-full flex justify-center items-center border-gray-300">
                    <FontAwesomeIcon
                      className="text-sky-300"
                      icon={faCrosshairs}
                    />
                  </div>
                  <div>
                    <h2 className="text-gray-500">Posted On</h2>
                    <p className="font-medium">{Job.about.posted_on}</p>
                  </div>
                </li>
                <li className="flex flex-row gap-2 items-center">
                  <div className="w-8 h-8 border rounded-full flex justify-center items-center border-gray-300">
                    <FontAwesomeIcon className="text-sky-300" icon={faFire} />
                  </div>
                  <div>
                    <h2 className="text-gray-500">Deadline</h2>
                    <p className="font-medium">{Job.about.deadline}</p>
                  </div>
                </li>
                <li className="flex flex-row gap-2 items-center">
                  <div className="w-8 h-8 border rounded-full flex justify-center items-center border-gray-300">
                    <FontAwesomeIcon
                      className="text-sky-300"
                      icon={faLocationDot}
                    />
                  </div>
                  <div>
                    <h2 className="text-gray-500">Location</h2>
                    <p className="font-medium">{Job.about.location}</p>
                  </div>
                </li>
                <li className="flex flex-row gap-2 items-center">
                  <div className="w-8 h-8 border rounded-full flex justify-center items-center border-gray-300">
                    <FontAwesomeIcon
                      className="text-sky-300"
                      icon={faCalendar}
                    />
                  </div>
                  <div>
                    <h2 className="text-gray-500">Start Date</h2>
                    <p className="font-medium">{Job.about.start_date}</p>
                  </div>
                </li>
                <li className="flex flex-row gap-2 items-center">
                  <div className="w-8 h-8 border rounded-full flex justify-center items-center border-gray-300">
                    <FontAwesomeIcon
                      className="text-sky-300"
                      icon={faCalendarCheck}
                    />
                  </div>
                  <div>
                    <h2 className="text-gray-500">End Date</h2>
                    <p className="font-medium">{Job.about.end_date}</p>
                  </div>
                </li>
              </ul>
            </div>
            <hr className="text-gray-300"></hr>
            <div>
              <h1 className="text-2xl font-black text-blue-950 mb-2">
                Categories
              </h1>
              <div className="flex flex-row flex-wrap gap-2">
                {Job.about.categories.map((category) => (
                  <span
                    key={category}
                    className={
                      "min-w-16 border rounded-full text-center p-2 " +
                      Category2Color.get(category)
                    }
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
            <hr className="text-gray-300"></hr>
            <div>
              <h1 className="text-2xl font-black text-blue-950 mb-2">
                Required Skills
              </h1>
              <div className="flex flex-row flex-wrap gap-2">
                {Job.about.required_skills.map((skill) => (
                  <div key={skill} className="py-1 px-3 bg-violet-50">
                    <span className="text-violet-800">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
