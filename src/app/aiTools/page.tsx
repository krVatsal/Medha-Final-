import React from "react";
import Image from "next/image";
const page = () => {
  return (
    <div>
      <div className="flex justify-between p-8">
        <div className="space-y-1 mb-12">
          <div className=" text-black text-[40px] font-bold">AI Tools</div>
          <div className=" text-[20px] text-[#696969]">
            A small description of AI Tools
          </div>
        </div>
        <div className="flex">
          <div className="align-middle">
          <Image className="absolute right-56 top-1/4" width={24} height={24} alt="" src="/Search.svg" />
          {/* <img className="relative z-10 left-60" src="/Search.svg" alt="" /> */}
          <input
            className="h-[40px] w-[255px] rounded-full placeholder-gray-900 pl-4 "
            type="text"
            placeholder="Search"
            style={{ textAlign: "left", color: "black" }}
          />
</div>

          <select className="h-[40px] w-[156px] rounded-full ml-4 pl-4 placeholder-gray-900">
            <option value="" disabled selected>
              Most Popular
            </option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default page;
