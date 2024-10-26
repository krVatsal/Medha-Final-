"use client"
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Skeleton } from "@nextui-org/skeleton";

// Skeleton versions of each app card with specific widths based on text content
const AppSkeletons = {
  createQuiz: (
    <div className="flex flex-col items-center space-y-1">
      <Skeleton className="w-10 h-10 rounded-xl" />
      <Skeleton className="w-16 h-4 rounded-lg" />
    </div>
  ),
  summarizePdf: (
    <div className="flex flex-col items-center space-y-1">
      <Skeleton className="w-10 h-10 rounded-xl" />
      <Skeleton className="w-20 h-4 rounded-lg" />
    </div>
  ),
  createAssessment: (
    <div className="flex flex-col items-center space-y-1">
      <Skeleton className="w-10 h-10 rounded-xl" />
      <Skeleton className="w-28 h-4 rounded-lg" />
    </div>
  ),
  createPpt: (
    <div className="flex flex-col items-center space-y-1">
      <Skeleton className="w-10 h-10 rounded-xl" />
      <Skeleton className="w-16 h-4 rounded-lg" />
    </div>
  ),
  summarizeYt: (
    <div className="flex flex-col items-center space-y-1">
      <Skeleton className="w-10 h-10 rounded-xl" />
      <Skeleton className="w-36 h-4 rounded-lg" />
    </div>
  ),
  createExam: (
    <div className="flex flex-col items-center space-y-1">
      <Skeleton className="w-10 h-10 rounded-xl" />
      <Skeleton className="w-20 h-4 rounded-lg" />
    </div>
  ),
  lessonPlanner: (
    <div className="flex flex-col items-center space-y-1">
      <Skeleton className="w-10 h-10 rounded-xl" />
      <Skeleton className="w-24 h-4 rounded-lg" />
    </div>
  ),
};

function MyAppsArea() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-center items-center">
          {Object.values(AppSkeletons).map((skeleton, index) => (
            <React.Fragment key={index}>{skeleton}</React.Fragment>
          ))}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-center items-center">
        <div
          className="flex flex-col items-center space-y-1 cursor-pointer"
          onClick={() => router.push("/topicwiseform")}
        >
          <Image
            width={10}
            height={10}
            alt=""
            src="/Create_quiz.svg"
            className="w-10 h-10 sm:w-12 sm:h-12"
          />
          <div className="text-xs font-semibold text-center">Create Quiz</div>
        </div>

        <div className="flex flex-col items-center space-y-1 cursor-pointer">
          <Image
            width={32}
            height={32}
            alt=""
            src="/Summarize_pdf.svg"
            className="w-10 h-10 sm:w-12 sm:h-12"
            onClick={() => router.push("/summarize-pdf")}
          />
          <div className="text-xs font-semibold text-center">Summarise PDF</div>
        </div>

        <div className="flex flex-col items-center space-y-1 cursor-pointer">
          <Image
            width={32}
            height={32}
            alt=""
            src="/create_lesson_icon.svg"
            className="w-10 h-10 sm:w-12 sm:h-12"
            onClick={() => router.push("/homework/topic")}
          />
          <div className="text-xs font-semibold text-center">Create Assessment</div>
        </div>

        <div className="flex flex-col items-center space-y-1 cursor-pointer">
          <Image
            width={32}
            height={32}
            alt=""
            src="/Create_ppt.svg"
            className="w-10 h-10 sm:w-12 sm:h-12"
            onClick={() => router.push("/pptcreation/topic")}
          />
          <div className="text-xs font-semibold text-center">Create PPT</div>
        </div>

        <div className="flex flex-col items-center space-y-1 cursor-pointer">
          <Image
            width={32}
            height={32}
            alt=""
            src="/Summarize_yt.svg"
            className="w-10 h-10 sm:w-12 sm:h-12"
            onClick={() => router.push("/summarize-yt/enterurl")}
          />
          <div className="text-xs font-semibold text-center">
            Summarise Youtube Video
          </div>
        </div>

        <div className="flex flex-col items-center justify-center space-y-1 cursor-pointer">
          <Image
            width={32}
            height={32}
            alt=""
            src="/create_exam_form.svg"
            className="w-10 h-10 sm:w-12 sm:h-12"
            onClick={() => router.push("/examform")}
          />
          <div className="text-xs font-semibold text-center">Create Exam</div>
        </div>

        <div className="flex flex-col items-center space-y-1 cursor-pointer">
          <Image
            width={32}
            height={32}
            alt=""
            src="/lesson 1.svg"
            className="w-10 h-10 sm:w-12 sm:h-12"
            onClick={() => router.push("/createlesson/topic")}
          />
          <div className="text-xs font-semibold text-center">Lesson Planner</div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white bg-opacity-60 p-8 rounded-3xl h-[100%]">
      <div className="flex flex-col mb-4">
        {isLoading ? (
          <>
            <Skeleton className="w-24 h-7 rounded-lg mb-1" /> {/* My Apps */}
            <Skeleton className="w-44 h-4 rounded-lg" /> {/* Explore text */}
          </>
        ) : (
          <>
            <div className="text-lg font-bold">My Apps</div>
            <div className="text-xs text-gray-500">
              Explore the variety of useful apps
            </div>
          </>
        )}
      </div>
      {renderContent()}
    </div>
  );
}

export default MyAppsArea;
