"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronDown } from 'lucide-react';
const PageSkeleton = () => {
  return (
    <div className="space-y-4 p-4 lg:p-0">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 lg:h-10 w-36 lg:w-48 rounded-md" />
          <Skeleton className="h-4 lg:h-5 w-32 lg:w-40 rounded-md" />
        </div>
        <div className="flex flex-col lg:flex-row gap-2 lg:items-center lg:space-x-4">
          <Skeleton className="h-10 w-full lg:w-[215px] rounded-full" />
          <Skeleton className="h-10 w-full lg:w-[156px] rounded-full" />
          <Skeleton className="h-10 w-full lg:w-[106px] rounded-full" />
          <Skeleton className="h-10 w-full lg:w-[155px] rounded-full" />
        </div>
      </div>
      <div className="relative pt-4 lg:pt-8">
        <Skeleton className="h-[50px] lg:h-[65px] w-full lg:w-[240px] rounded-2xl" />
      </div>
    </div>
  );
};

const Page = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  if (loading) {
    return <PageSkeleton />;
  }

  return (
    <div className="p-4 pl-1">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 align-middle">
        <div className=" space-y-1">
          <h1 className="text-black text-[28px] lg:text-[40px] font-bold">Whiteboards</h1>
          <div className="text-[#696969] text-[16px] lg:text-[20px]">
            Create a whiteboard for you
          </div>
        </div>
        <div className="flex items-center gap-2 lg:gap-4 pt-3">
          <div className="relative flex items-center justify-center">
            <Image
              className="absolute right-3"
              src="/Search.svg"
              width={16}
              height={16}
              alt="Search"
            />
            <input
              className="h-[32px] w-[160px] lg:h-[40px] lg:w-[215px] rounded-full placeholder-gray-900 pl-4"
              type="text"
              placeholder="Search"
            />
          </div>
          <div className="relative ">
          <select className="appearance-none h-[32px] w-[120px] lg:h-[40px] lg:w-[156px] rounded-full pl-4">
            <option value="" disabled selected>
              Last Modified
            </option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex pr-2 items-center text-gray-700">
          <ChevronDown size={20} />
        </div>
      </div>
      <div className="relative ">
          <select className="appearance-none h-[32px] w-[90px] lg:h-[40px] lg:w-[106px] rounded-full pl-4">
            <option value="" disabled selected>
              All Files
            </option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex pr-2 items-center text-gray-700">
          <ChevronDown size={20} />
        </div>
      </div>
          <div className="relative">
            <Image
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
              src="/plus.svg"
              width={16}
              height={16}
              alt="Create"
            />
            <button className="hidden lg:block h-[32px] lg:h-[40px] w-[120px] lg:w-[155px] rounded-full bg-white text-gray-900 pl-8">
              Create Folder
            </button>
            <div className="block lg:hidden w-[40px] h-[40px] rounded-full bg-white  items-center justify-center">
              {/* <Image src="/plus.svg" width={20} height={20} alt="Create" /> */}
            </div>
          </div>
        </div>
      </div>
      <div className="relative pt-8 flex gap-4 ">
        <a href="/whiteboard" className="relative inline-block">
          <Image
            className="absolute left-6 top-1/2 -translate-y-1/2 z-10"
            width={22}
            height={22}
            src="/Plus circle.svg"
            alt=""
          />
          <button className="h-[50px] lg:h-[65px] w-full min-w-[230px] lg:w-[240px] bg-white rounded-2xl font-bold pl-4">
            New Whiteboard
          </button>
        </a>
      </div>
    </div>
  );
};

export default Page;
