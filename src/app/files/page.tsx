"use client"
import React from "react";
import Image from "next/image";
import { useState , useEffect} from "react";
import { Skeleton } from "@/components/ui/skeleton";
const PageSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <Skeleton className="h-10 w-48 rounded-md" />
          <Skeleton className="h-5 w-40 rounded-md" />
        </div>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-10 w-[215px] rounded-full" />
          <Skeleton className="h-10 w-[156px] rounded-full" />
          <Skeleton className="h-10 w-[106px] rounded-full" />
          <Skeleton className="h-10 w-[155px] rounded-full" />
        </div>
      </div>
      <div className="relative pt-8">
        <Skeleton className="h-[65px] w-[240px] rounded-2xl" />
      </div>
    </div>
  );
};

const Page = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500); // Simulated loading delay
  }, []);

  if (loading) {
    return <PageSkeleton />;
  }
  return (
    <div>
      <div className="flex justify-between">
        <div className="space-y-1">
          <h1 className="text-black text-[40px] font-bold">Files</h1>
          <div className="text-[#696969] text-[20px]">Manage all the files</div>
        </div>
        <div className="flex items-center mb-20">
          <div className="relative flex items-center justify-center">
            <Image
              className="absolute left-44"
              src="/Search.svg"
              width={20}
              height={18}
              alt=""
            />
            <input
              className="h-[40px] w-[215px] rounded-full placeholder-gray-900 pl-4"
              type="text"
              placeholder="Search"
              style={{ textAlign: "left" }}
            />
          </div>

          <select className="h-[40px] w-[156px] rounded-full ml-4 pl-2 pr-2 placeholder-gray-900 cursor-pointer">
            <option value="" disabled selected>
              Last Modified
            </option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>

          <select className="h-[40px] w-[106px] rounded-full ml-4 pl-2 pr-2 placeholder-gray-900 cursor-pointer">
            <option value="" disabled selected>
              All Files
            </option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>
        </div>
      </div>

      <div className="relative">
        <a href="#" className="relative inline-block">
          <Image
            className="absolute left-6 top-1/2 -translate-y-1/2 z-10"
            width={22}
            height={22}
            src="/Plus circle.svg"
            alt=""
          />
          <button className="h-[65px] w-[240px] bg-white rounded-2xl font-bold pl-4">
            Upload a new File
          </button>
        </a>
      </div>
    </div>
  );
};

export default Page;
