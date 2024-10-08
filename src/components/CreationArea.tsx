"use client";
import React from "react";
import Image from "next/image";
import DesiredOutcome from "./DesiredOutcome";
import { useRouter } from "next/navigation";
function CreationArea({ page }: { page: string }) {
  const router = useRouter();
  return (
    <div>
      <div className="bg-white bg-opacity-60 p-8 rounded-3xl h-[100%] flex flex-col gap-6">
        <div className="flex flex-col mb-4">
          <div className="text-lg font-bold">Topic</div>
          <div className="text-xs text-gray-500">
            Please specify the topic you would like to learn, and indicate the
            audience and their prior knowledge.
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl w-full h-auto">
          <div className="flex flex-col gap-4 w-full">
            {/* Radio button and label */}
            <div className="flex items-center gap-2">
              <input type="radio" id="topic" />
              <label htmlFor="topic" className="text-sm">
                Topic
              </label>
            </div>

            {/* Textarea and Navigate button side by side */}
            <div className="flex items-center gap-2 w-full">
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md h-12"
                placeholder="Enter your text here"
              ></textarea>
              <button className="bg-transparent px-4 py-2">Navigate</button>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl w-full h-auto">
          <div className="flex flex-col gap-4 w-full">
            {/* Radio button and label */}
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

            {/* Textarea and Navigate button side by side */}
            <div className="flex items-center gap-2 w-full">
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md h-12"
                placeholder="Enter your text here"
              ></textarea>
              <button className="bg-transparent px-4 py-2">Navigate</button>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl w-full h-auto">
          <div className="flex flex-col gap-4 w-full">
            {/* Radio button and label */}
            <div className="flex items-center gap-2">
              <input type="radio" id="topic" />
              <label htmlFor="topic" className="text-sm">
                Topic
              </label>
            </div>

            {/* Language selection with icon */}
            <div className="flex items-center gap-2 border border-gray-300 rounded-md p-2 w-full">
              {/* Globe icon (replace with your preferred icon library) */}
              <select className="w-full border-none outline-none bg-white">
                <option>English</option>
                {/* Add more language options here */}
              </select>
            </div>
          </div>
        </div>
        {page !== "Homework" && (
          <div>
            <DesiredOutcome />
          </div>
        )}
      </div>
      <button
        className=" text-white bg-[#5D233C] p-4 mt-6 rounded-full px-6"
        onClick={() => {
          router.push("./outline");
        }}
      >
        Generate Outline
      </button>
    </div>
  );
}

export default CreationArea;
