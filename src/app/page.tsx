
"use client";
import Image from "next/image";
import EnterClassroomArea from "@/components/EnterClassroomArea";
import MyAppsArea from "@/components/MyAppsArea";
import "core-js/stable";
import "regenerator-runtime/runtime";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SelectOption from "@/components/homepage/SelectOption";
import TopicWiseForm from "@/components/TopicwiseForm";
import ExamForm from "@/components/ExamForm";
import { Skeleton } from "@/components/ui/skeleton"

const LoadingSkeleton = () => {
  return (
    <div className="w-full">
          <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
      {/* Greeting Section Skeleton */}
      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-between mb-12">
          <div className="space-y-1">
            <Skeleton className="h-12 w-64 rounded-lg" />
            <Skeleton className="h-6 w-48 rounded-lg" />
          </div>
        </div>

        {/* Main Content Section Skeleton */}
        <div className="flex space-x-5">
          <div className="w-3/5">
            <Skeleton className="h-[400px] w-full rounded-xl" />
          </div>
          <div className="w-2/5">
            <Skeleton className="h-[400px] w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const { clientName } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string>("assignment");

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.push("/login");
    } else {
      // Simulate a slight delay to prevent flash of loading state
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [router]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div>
      {/* Greeting Section */}
      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-between mb-12">
          <div className="space-y-1">
            <div className="text-[40px] font-bold">
             
              {loading? <Skeleton className="w-12 h-12" /> :  `Good Morning ${clientName?.split(" ")[0]}!`}
            </div>
            <div className="text-[20px] text-gray-500">
              Let&apos;s make this day productive
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="flex space-x-5">
          <div className="w-3/5">
            <MyAppsArea />
          </div>
          <div className="w-2/5">
            {selectedOption === "topic-wise" ? (
              <TopicWiseForm />
            ) : selectedOption === "exam-form" ? (
              <ExamForm />
            ) : (
              <EnterClassroomArea />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}