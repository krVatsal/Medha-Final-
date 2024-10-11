import React from "react";

import CreationArea from "@/components/CreationArea";
import AIToolsSteps from "@/components/AIToolsSteps";
function PPTCreation() {
  return (
    <div className="p-10 ">
      {/* Greeting Section */}
      <div className="space-y-1 mb-12 flex justify-between">
        <div className="text-[40px] font-bold">PPT Creation</div>
        <AIToolsSteps page="topic" type="ppt" />
      </div>

      <div>
        <CreationArea page="ppt" />
      </div>
    </div>
  );
}

export default PPTCreation;
