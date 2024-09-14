import React from "react";

const AIToolsSteps = ({ page }: { page: string }) => {
  return (
    <div className="flex items-center p-4 bg-gray-200 rounded-lg">
      <span className="mr-4 font-bold text-lg">Steps:</span>
      <div className="flex items-center">
        <div className="flex flex-col items-center">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center text-sm ${
              page === "topic"
                ? "bg-blue-800 text-white"
                : "bg-white text-blue-800"
            }`}
          >
            1
          </div>
          <span className="text-xs mt-1">Topic</span>
        </div>
        <div className="w-8 h-0.5 bg-gray-300 mx-2 mb-4"></div>
        <div className="flex flex-col items-center">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center text-sm ${
              page === "outline"
                ? "bg-blue-800 text-white"
                : "bg-white text-blue-800"
            }`}
          >
            2
          </div>
          <span className="text-xs mt-1">Outlines</span>
        </div>
        <div className="w-8 h-0.5 bg-gray-300 mx-2 mb-4"></div>
        <div className="flex flex-col items-center">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center text-sm ${
              page === "lesson"
                ? "bg-blue-800 text-white"
                : "bg-white text-blue-800"
            }`}
          >
            3
          </div>
          <span className="text-xs mt-1">Lesson</span>
        </div>
      </div>
    </div>
  );
};

export default AIToolsSteps;
