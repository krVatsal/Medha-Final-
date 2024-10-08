import React from "react";
import Image from "next/image";
import CreationArea from "@/components/CreationArea";

function PPTCreation() {
  return (
    <div className="p-10 ">
      {/* Greeting Section */}
      <div className="space-y-1 mb-12">
        <div className="text-[40px] font-bold">PPT Creation</div>
      </div>
      <div>
        <CreationArea page="ppt" />
      </div>
    </div>
  );
}

export default PPTCreation;
