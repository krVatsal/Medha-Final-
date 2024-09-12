import React from "react";
import Image from "next/image";
import PPTCreationArea from "@/components/PPTCreationArea";

function PPTCreation() {
  return (
    <div className="p-10 ">
      {/* Greeting Section */}
      <div className="space-y-1 mb-12">
        <div className="text-[40px] font-bold">PPT Creation</div>
      </div>
      <div>
        <PPTCreationArea />
      </div>
    </div>
  );
}

export default PPTCreation;
