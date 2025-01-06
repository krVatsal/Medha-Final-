import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { allFooter } from 'md-editor-rt';

function MyAppsArea() {
  const router = useRouter();
  return (
    <div>
      <div className="flex flex-col mb-4">
        <div className=" sm:hidden text-base sm:text-lg font-[550]">My Apps</div>
        <div className=" sm:hidden text-xs text-gray-500">Explore the variety of useful apps</div>
      </div>
      <div className="bg-[#E9EBEE] shadow-lg p-4 sm:p-6 md:p-8 rounded-3xl h-full w-full max-w-md sm:max-w-4xl">
        <div className="flex flex-col mb-4">
          <div className="hidden sm:inline text-base sm:text-lg font-[550]">My Apps</div>
          <div className="hidden sm:inline text-xs text-gray-500">Explore the variety of useful apps</div>
        </div>
        <div className=" p-3 sm:p-4 rounded-2xl w-full">
          <div className="grid grid-cols-3  md:grid-cols-4 gap-3 sm:gap-4 justify-center items-center">
            {/* Create Quiz */}
            <div
              className="flex flex-col items-center space-y-2 action-button cursor-pointer"
              onClick={() => router.push('/topicwiseform')}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center bg-white rounded-xl">
                <Image
                  width={34}
                  height={34}
                  alt="Create Quiz"
                  src="/Create_quiz.svg"
                  className="max-w-full max-h-full"
                />
              </div>
              <div className="text-xs font-medium text-center">Create Quiz</div>
            </div>

            {/* Summarize PDF */}
            <div
              className="flex flex-col items-center space-y-2 action-button relative"
              onClick={() => alert('Coming Soon')}
            >
              <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] px-2 rounded-full z-10">
                Coming Soon
              </div>
              <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center bg-white justify-center rounded-xl">
                <Image
                  width={34}
                  height={34}
                  alt="Summarize PDF"
                  src="/Summarize_pdf.svg"
                  className="max-w-full max-h-full"
                />
              </div>
              <div className="text-xs font-medium text-center">Summarize PDF</div>
            </div>

            {/* Create PPT */}
            <div
              className="flex flex-col items-center space-y-2 action-button relative"
              onClick={() => alert('Coming Soon')}
            >
              <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] px-2 rounded-full z-10">
                Coming Soon
              </div>
              <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center bg-white justify-center rounded-xl">
                <Image
                  width={34}
                  height={34}
                  alt="Create PPT"
                  src="/Create_ppt.svg"
                  className="max-w-full max-h-full"
                />
              </div>
              <div className="text-xs font-medium text-center">Create PPT</div>
            </div>

            {/* Summarize YouTube */}
            <div
              onClick={() => router.push('/summarize-yt')}
              className="flex flex-col items-center space-y-2 action-button cursor-pointer"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center bg-white justify-center rounded-xl">
                <Image
                  width={34}
                  height={34}
                  alt="Summarize YouTube"
                  src="/Summarize_yt.svg"
                  className="max-w-full max-h-full"
                />
              </div>
              <div className="text-xs font-medium text-center">Summarize YouTube Video</div>
            </div>

            {/* Create Exam Form */}
            <div
              onClick={() => router.push('/examForm')}
              className="flex flex-col items-center space-y-2 action-button cursor-pointer"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center bg-white justify-center rounded-xl">
                <Image
                  width={34}
                  height={34}
                  alt="Create Exam Form"
                  src="/create_exam_form.svg"
                  className="max-w-full max-h-full"
                />
              </div>
              <div className="text-xs font-medium text-center">Create Exam Form</div>
            </div>

            {/* Lesson Planner */}
            <div
              onClick={() => router.push('/createlesson')}
              className="flex flex-col items-center space-y-2 action-button cursor-pointer"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center bg-white justify-center rounded-xl">
                <Image
                  width={34}
                  height={34}
                  alt="Lesson Planner"
                  src="/create_lesson_icon.svg"
                  className="max-w-full max-h-full"
                />
              </div>
              <div className="text-xs font-medium text-center">Lesson Planner</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAppsArea;