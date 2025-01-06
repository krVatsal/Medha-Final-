"use client";
import React from "react";
import Assessment from "@/components/MCQ";
import Subjective from "@/components/Subjective";

const AssessmentPage = () => {
  // Get the assessment data from the URL state
  const data =
    typeof window !== "undefined" ? window.history.state?.data : null;
  const selectedType =
    typeof window !== "undefined" ? window.history.state?.type : null;

  if (!data || !selectedType) {
    return (
      <div className="w-full min-h-screen bg-[#F3F4F8] p-6 rounded-2xl">
        <div className="bg-white bg-opacity-60 p-6 rounded-2xl">
          <div>
            No assessment data found. Please go back and create an assessment.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#F3F4F8] p-6 rounded-3xl">
      <div className="pl-2 mb-4">
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
      <div className="bg-white bg-opacity-60 p-6 rounded-2xl">
        {selectedType === "Objective" ? (
          <Assessment data={data} />
        ) : selectedType === "Subjective" ? (
          <Subjective data={data} />
        ) : (
          <p>Unknown question type</p>
        )}
      </div>
    </div>
  );
};

export default AssessmentPage;
