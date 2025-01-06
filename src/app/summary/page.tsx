"use client"
import React from 'react';
import AIToolsSteps from '@/components/AIToolsSteps';
import CreationArea from '@/components/CreationArea';

function Summary() {
  return (
    <div className="p-4 ">
      {/* Greeting Section */}
      <div className="sm:space-y-1 items-center flex flex-row justify-between">
        <div className="text-lg sm:text-3xl md:text-4xl lg:text-[40px] font-bold mb-4 sm:mb-0">
          Summarize Youtube Video
        </div>
        <AIToolsSteps page="Summary" type="yt" />
      </div>
      <div className="pl-2 mb-6">
    <button
      onClick={() => window.history.back()}
      className="bg-white text-gray-800 text-small h-[29px] w-[76px] rounded-full shadow hover:bg-gray-200 transition flex items-center justify-center gap-1"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 19.5L3 12l7.5-7.5M21 12H3"
        />
      </svg>
      Back
    </button>
  </div>
      <div className="bg-white bg-opacity-60 p-[15px] rounded-3xl h-[100%] flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="summary" className="text-sm font-semibold">
              Summary:
            </label>
            <textarea id="summary" className="w-full p-3 border border-gray-300 rounded-md h-32 resize-none"></textarea>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="questions" className="text-sm font-semibold">
              Questions you might be asking:
            </label>
            <textarea
              id="questions"
              className="w-full p-3 border border-gray-300 rounded-md h-32 resize-none"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summary;
