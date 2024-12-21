'use client';
import Image from 'next/image';
import EnterClassroomArea from '@/components/EnterClassroomArea';
import MyAppsArea from '@/components/MyAppsArea';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { useUser } from '@/context/UserContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SelectOption from '@/components/homepage/SelectOption';
import TopicWiseForm from '@/components/TopicwiseForm';
import ExamForm from '@/components/ExamForm';
import { Skeleton } from "@/components/ui/skeleton"

const LoadingSkeleton = () => {
  return (
    <div className="w-full p-4">
      <div className="flex items-center space-x-4 mb-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>

      {/* Greeting Section Skeleton */}
      <div className="flex flex-col w-full mb-6">
        <div className="space-y-1 mb-4">
          <Skeleton className="h-12 w-64 rounded-lg" />
          <Skeleton className="h-6 w-48 rounded-lg" />
        </div>
      </div>

      {/* Main Content Section Skeleton */}
      <div className="space-y-5">
        <Skeleton className="h-[400px] w-full rounded-xl" />
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>
    </div>
  );
};

export default function Home() {
  const { clientName } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Add loading state
  const [selectedOption, setSelectedOption] = useState<string>('assignment');
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    // if (!token) {
    //   router.push("/login");
    // } else {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    // }
  }, []);
  

  // Move this check to the top
  if (loading) {
    return <LoadingSkeleton />;
  }
  return (
    <div>
      {/* Greeting Section */}
      {/* Greeting Section */}
      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-between mb-12 sm:mb-8">
          <div className="space-y-1">
            <div className="text-[30px] sm:text-[40px] font-bold pl-1">              {loading ? (
                <Skeleton className="w-12 h-12" />
              ) : (
                `Good Morning ${clientName?.split(" ")[0]}!`
              )}</div>
            <div className="text-[15px] sm:text-[20px] text-gray-500 pl-1">Let&apos;s make this day productive</div>
          </div>
          {/* <SelectOption
            activeButton={selectedOption}
            handleButtonClick={() => {}}
            handleSelectChange={handleSelectChange}
          /> */}
        </div>

        {/* Main Content Section */}
        <div className="flex md:justify-normal md:items-start justify-center items-center md:space-x-5">
          <div className="md:w-3/5">
            <MyAppsArea />
          </div>
          {/* <div className="w-2/5">
            {selectedOption === "topic-wise" ? (
              <TopicWiseForm />
            ) : selectedOption === "exam-form" ? (
              <ExamForm />
            ) : (
              <EnterClassroomArea />
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
}
