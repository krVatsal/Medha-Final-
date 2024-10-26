"use client";
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Menu } from "lucide-react";

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
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  if (loading) {
    return <PageSkeleton />;
  }

  return (
    <div className="p-4 lg:p-0">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:justify-between gap-4 lg:gap-0">
        <div className="space-y-1">
          <h1 className="text-black text-2xl lg:text-[40px] font-bold">Files</h1>
          <div className="text-[#696969] text-base lg:text-[20px]">
            Manage all the files
          </div>
        </div>

        {/* Mobile Filter Toggle */}
        <button
          className="lg:hidden flex items-center gap-2 text-gray-600"
          onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
        >
          <Menu size={24} />
          <span>Filters</span>
        </button>

        {/* Search and Filters Section */}
        <div
          className={`flex flex-col gap-3 lg:flex-row lg:items-center lg:mb-20 ${
            isFilterMenuOpen ? "block" : "hidden lg:flex"
          }`}
        >
          {/* Search Input */}
          <div className="relative flex items-center w-full lg:w-auto">
            <input
              className="h-[40px] w-full lg:w-[215px] rounded-full placeholder-gray-900 pl-4 pr-10"
              type="text"
              placeholder="Search"
            />
            <Image
              className="absolute right-4 lg:right-4"
              src="/Search.svg"
              width={20}
              height={18}
              alt=""
            />
          </div>

          {/* Filter Selects */}
          <select className="h-[40px] w-full lg:w-[156px] rounded-full px-2 placeholder-gray-900 cursor-pointer">
            <option value="" disabled selected>
              Last Modified
            </option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>

          <select className="h-[40px] w-full lg:w-[106px] rounded-full px-2 placeholder-gray-900 cursor-pointer">
            <option value="" disabled selected>
              All Files
            </option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>
        </div>
      </div>

      {/* Upload Button */}
      <div className="flex gap-4 relative pt-8">
        <a href="/whiteboard" className="relative inline-block">
          <Image
            className="absolute left-6 top-1/2 -translate-y-1/2 z-10"
            width={22}
            height={22}
            src="/Plus circle.svg"
            alt=""
          />
          <button className="h-[65px] w-[240px] bg-white rounded-2xl font-bold pl-10">
            New Whiteboard
          </button>
        </a>
      </div>
    </div>
  );
};

export default Page;