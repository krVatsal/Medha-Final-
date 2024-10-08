import React from "react";
import Image from "next/image";

const HomeworkOutline = () => {
  return (
    <div>
      <div className="bg-white bg-opacity-60 p-8 rounded-3xl h-[100%] flex flex-col gap-6">
        <div className="flex flex-col mb-4">
          <div className="text-lg font-bold">Outlines</div>
        </div>
        <div className=" flex justify-between">
          <div className=" text-gray-500">Slide 1 : Title</div>
          <Image src="/Checkbox.svg" alt="Checkbox" width={20} height={20} />
        </div>
        <div className="bg-white p-6 rounded-2xl w-full h-auto">
          <div className="flex flex-col gap-4 w-full">
            {/* Radio button and label */}
            <div className="flex items-center gap-2">Topic</div>

            {/* Textarea and Navigate button side by side */}
            <div className="flex items-center gap-2 w-full">
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md h-12"
                value="Enter your text here"
                readOnly
              ></textarea>
              <button className="bg-transparent px-4 py-2">Navigate</button>
            </div>
          </div>
        </div>
        <div className=" flex justify-between">
          <div className=" text-gray-500">Slide 2 : Explanation</div>
          <Image src="/Checkbox.svg" alt="Checkbox" width={20} height={20} />
        </div>
        <div className="bg-white p-6 rounded-2xl w-full h-auto">
          <div className="flex flex-col gap-4 w-full">
            {/* Radio button and label */}
            <div className="flex items-center gap-2">Topic</div>

            {/* Textarea and Navigate button side by side */}
            <div className="flex items-center gap-2 w-full">
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md h-12"
                value="Enter your text here"
                readOnly
              ></textarea>
              <button className="bg-transparent px-4 py-2">Navigate</button>
            </div>
            <div className="flex items-center gap-2">Options</div>
            <div className="flex items-center gap-2 w-full">
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md h-12"
                value="Enter your text here"
                readOnly
              ></textarea>
              <button className="bg-transparent px-4 py-2">Navigate</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeworkOutline;
