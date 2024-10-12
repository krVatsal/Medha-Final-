"use client";
import React from "react";
import Image from "next/image";
import SelectableOptions from "./SelectableOptions";
import { useRouter } from "next/navigation";
//i suggest creating a common state, and then passing whatever is required into the request based conditionally on pages.
function CreationArea({ page }: { page: string }) {
  const router = useRouter();

  return (
    <div>
      <div className="bg-white bg-opacity-60 p-8 rounded-3xl h-[100%] flex flex-col gap-6">
        <div className="flex flex-col mb-4">
          <div className="text-lg font-bold">
            {page === "yt" ? <div>Youtube Link</div> : <div>Topic </div>}
          </div>
          <div className="text-xs text-gray-500">
            {page == "yt" ? (
              <div>Please enter the YouTube video URL</div>
            ) : (
              <div>
                Please specify the topic you would like to learn, and indicate
                the audience and their prior knowledge.
              </div>
            )}
          </div>
        </div>
        {page === "yt" && (
          <div className="bg-white p-6 rounded-2xl w-full h-auto">
            <div className="flex flex-col gap-4 w-full">
              <div className="flex items-center gap-2">
                <input type="radio" id="youtube-url" />
                <label htmlFor="youtube-url" className="text-sm">
                  YouTube video URL
                </label>
              </div>
              <div className="flex items-center gap-2 w-full">
                <input
                  type="text"
                  id="youtube-url"
                  className="w-full p-2 border border-gray-300 rounded-md h-12"
                  placeholder="Enter YouTube video URL"
                />
                <button
                  className="bg-transparent px-4 py-2"
                  onClick={() => router.push("./summary")}
                >
                  Analyze
                </button>
              </div>
            </div>
          </div>
        )}

        {page !== "lesson" && page !== "yt" && (
          <div className="bg-white p-6 rounded-2xl w-full h-auto">
            <div className="flex flex-col gap-4 w-full">
              <div className="flex items-center gap-2">
                <input type="radio" id="topic" />
                <label htmlFor="topic" className="text-sm">
                  Topic
                </label>
              </div>
              <div className="flex items-center gap-2 w-full">
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md h-12"
                  placeholder="Enter your text here"
                ></textarea>
                <button className="bg-transparent px-4 py-2">Navigate</button>
              </div>
            </div>
          </div>
        )}
        {page !== "yt" && (
          <div className="bg-white p-6 rounded-2xl w-full h-auto">
            <div className="flex flex-col gap-4 w-full">
              <div className="flex items-center gap-4">
                <Image
                  src="/navigatetograde.svg"
                  alt="Navigate to Grade"
                  width={20}
                  height={20}
                />
                <label htmlFor="topic" className="text-sm">
                  Navigate to Grade
                </label>
              </div>
              <div className="flex items-center gap-2 w-full">
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md h-12"
                  placeholder="Enter your text here"
                ></textarea>
                <button className="bg-transparent px-4 py-2">Navigate</button>
              </div>
            </div>
          </div>
        )}

        {page !== "lesson" && page != "yt" && (
          <div className="bg-white p-6 rounded-2xl w-full h-auto">
            <div className="flex flex-col gap-4 w-full">
              <div className="flex items-center gap-2">
                <input type="radio" id="langugage" />
                <label htmlFor="language" className="text-sm">
                  Language
                </label>
              </div>
              <div className="flex items-center gap-2 border border-gray-300 rounded-md p-2 w-full">
                <select className="w-full border-none outline-none bg-white">
                  <option>English</option>
                  {/* Add more language options */}
                </select>
              </div>
            </div>
          </div>
        )}

        {page === "lesson" && (
          <div className="flex flex-col gap-6">
            <SelectableOptions
              heading="Desired Outcome"
              options={["Knowledge", "Skill", "Attitude", "Affective"]}
            />
          </div>
        )}

        {page === "ppt" && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-row gap-6">
              <SelectableOptions
                heading="Desired Outcome"
                options={["Knowledge", "Skill", "Attitude", "Affective"]}
              />
              <SelectableOptions
                heading="Format"
                options={["Format 1", "Format 2", "Format 3"]}
              />
            </div>
            <SelectableOptions
              heading="Cross Cutting Theme"
              options={[
                "Rootedness in India",
                "Education for values",
                "Inclusive Education",
                "Guidance and counselling",
                "Use of educational Technology",
              ]}
            />
          </div>
        )}
      </div>

      {page != "Homework" && page != "yt" && (
        <button
          className="text-white bg-[#5D233C] p-4 mt-6 rounded-full px-6"
          onClick={() => {
            router.push("./outline");
          }}
        >
          Generate Outline
        </button>
      )}
      {page === "Homework" && (
        <button
          className="text-white bg-[#5D233C] p-4 mt-6 rounded-full px-6"
          onClick={() => {
            router.push("./blooms");
          }}
        >
          Generate Boom's taxonomy
        </button>
      )}
    </div>
  );
}

export default CreationArea;
