import React from "react";
import CreationArea from "@/components/CreationArea";
import AIToolsSteps from "@/components/AIToolsSteps";
function LessonCreation() {
  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10">
      {/* Greeting Section */}
      <div className="space-y-1 mb-6 sm:mb-8 md:mb-10 lg:mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold mb-4 sm:mb-0">
          Create Lesson
        </div>
        <AIToolsSteps page="topic" />
      </div>
      <div>
        <CreationArea page="lesson" />
      </div>
    </div>
  );
}

export default LessonCreation;
