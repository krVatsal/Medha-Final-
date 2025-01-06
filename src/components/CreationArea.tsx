"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import SelectableOptions from "./SelectableOptions";
import { useRouter } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import { useSelection } from '@/context/SelectionContext';

function CreationArea({ page, setSelectedText,
  requestLessonPlan,
  setSelectedTheme,
  buttonLoading,
  requestYoutubeSummary, }: any) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { dataContext, subject, classNumber } = useSelection();
  const [topics, setTopics] = useState([]);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (dataContext && dataContext.length > 0) {
      const topics: any = [];
      for (let el of Object.keys(dataContext)) {
        topics.push(Object.keys(dataContext[el])[0]);
      }
      setTopics(topics);
    }
  }, [dataContext]);

  return (
    <div>
      <div className="min-h-[50vh] bg-white bg-opacity-60 p-[15px] rounded-3xl h-[100%] flex flex-col gap-6">
        <div className="flex flex-col mb-4">
          <div className="text-lg font-[550]">
            {isLoading ? (
              <Skeleton className="h-6 w-32" />
            ) : page === "yt" ? (
              <div>YouTube Link</div>
            ) : (
              <div>Topic</div>
            )}
          </div>
          <div className="text-xs text-gray-500">
            {isLoading ? (
              <Skeleton className="h-4 w-full" />
            ) : page === "yt" ? (
              <div>Please enter the YouTube video URL</div>
            ) : (
              <div>
                Please specify the topic you would like to learn, and indicate
                the audience and their prior knowledge.
              </div>
            )}
          </div>
        </div>

        {/* YouTube URL input */}
        {isLoading ? (
          <Skeleton className="h-24 w-full rounded-2xl" />
        ) : (
          page === "yt" && (
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
                    onChange={(e) => setSelectedText(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md h-12"
                    placeholder="Enter YouTube video URL"
                  />
                  <button
                    className="bg-transparent px-4 py-2 text-[#5D233C]"
                    onClick={() => router.push("./summary")}
                  >
                    Analyze
                  </button>
                </div>
              </div>
            </div>
          )
        )}

        {/* Topic Input */}
        {isLoading ? (
          <Skeleton className="h-24 w-full rounded-2xl" />
        ) : (
          page !== "lesson" && page !== "yt" && page !== "ppt" && (
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
          )
        )}

        {/* Navigate to Grade */}
        {isLoading ? (
          <Skeleton className="h-24 w-full rounded-2xl" />
        ) : (
          page !== "yt" && (
            <div className="bg-white p-6 rounded-2xl w-full h-auto">
              <div className="flex flex-col gap-6">
                <SelectableOptions
                  heading="Select Topic"
                  options={topics}
                  onSelectionChange={(topicSelection) => setSelectedText(topicSelection)}
                />
              </div>
            </div>
          )
        )}

        {/* Language Selector */}
        {isLoading ? (
          <Skeleton className="h-24 w-full rounded-2xl" />
        ) : (
          page !== "lesson" && page != "yt" && page != "ppt" && (
            <div className="bg-white p-6 rounded-2xl w-full h-auto">
              <div className="flex flex-col gap-4 w-full">
                <div className="flex items-center gap-2">
                  <input type="radio" id="language" />
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
          )
        )}

        {/* Desired Outcome Options */}
        {/* {isLoading ? (
          <Skeleton className="h-20 w-full rounded-2xl" />
        ) : (
          page === "lesson" && (
            <div className="flex flex-col gap-6">
              <SelectableOptions
                heading="Desired Outcome"
                options={["Knowledge", "Skill", "Attitude", "Affective"]}
              />
            </div>
          )
        )} */}

        {/* PPT Options */}
        {isLoading ? (
          <Skeleton className="h-32 w-full rounded-2xl mb-8" />
        ) : (
          (page === "ppt" || page === "lesson") && (
            <div className="flex flex-col gap-6 mb-8">
              <SelectableOptions
                heading="Cross Cutting Theme"
                onSelectionChange={(updated: string) => setSelectedTheme(updated)}
                options={[
                  "Rootedness in India",
                  "Education for values",
                  "Inclusive Education",
                  "Guidance and counselling",
                  "Use of educational Technology",
                ]}
              />
            </div>
          )
        )}
      </div>

      {/* Action Button */}
      {isLoading || buttonLoading ? (
        <Skeleton className="h-12 w-40 rounded-full mt-6" />
      ) : page !== "Homework" && page !== "yt" && page !== 'lesson' ? (
        <button
          className="text-white bg-[#5D233C] p-4 mt-6 rounded-full px-6 mb-4"
          onClick={() => requestLessonPlan && requestLessonPlan()}
        >
          Generate Outline
        </button>
      ) : page === 'lesson' && (
        <button
          className="text-white bg-[#5D233C] p-4 mt-6 rounded-full px-6 mb-4"
          onClick={() => {
            requestLessonPlan && requestLessonPlan();
          }}
        >
          Generate Lesson Plan
        </button>
      )}
    </div>
  );
}

export default CreationArea;
