import React from "react";
import CreationArea from "@/components/CreationArea";

function LessonCreation() {
  return (
    <div className="p-10 ">
      {/* Greeting Section */}
      <div className="space-y-1 mb-12">
        <div className="text-[40px] font-bold">Create Lesson</div>
      </div>
      <div>
        <CreationArea page="Lesson" />
      </div>
    </div>
  );
}

export default LessonCreation;
