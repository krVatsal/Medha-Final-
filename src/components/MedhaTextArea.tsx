import React, { useState } from "react";
import TopicWiseForm from "./TopicwiseForm";
import ExamForm from "./ExamForm";
function MedhaTextArea({
  qna,
  onSubmit,
  initialResponse,
  loading,
}: {
  qna: { question: string; answer: string }[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  initialResponse: string | null;
  loading: boolean;
}) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="bg-white bg-opacity-60 p-6 rounded-2xl flex flex-col h-[410px] min-w-[683px]">
      {/* Horizontal alignment of Medha AI and dropdowns */}
      <div className="flex flex-col sm:flex-row mb-4 space-y-4 sm:space-y-0 sm:space-x-4">
        <p className="font-bold text-lg">Medha AI</p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"></div>
      </div>

      {/* Topic Wise Form or Exam Form Display */}
      {selectedOption === "topic-wise" ? (
        <TopicWiseForm />
      ) : selectedOption === "exam-form" ? (
        <ExamForm />
      ) : (
        <div className="bg-white pt-4 rounded-lg flex-grow flex flex-col overflow-hidden">
          <div className="pl-4 sm:pl-8 pr-4 sm:pr-8 flex-grow overflow-y-auto">
            {initialResponse && (
              <div className="mb-4">
                <div className="flex items-start mb-2">
                  <img
                    src="./Medha.svg"
                    alt="Placeholder"
                    className="h-4 w-4 rounded-full mr-4"
                  />
                  <p className="text-xs sm:text-sm">{initialResponse}</p>
                </div>
              </div>
            )}
            {qna.map((item, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-start mb-2">
                  <img
                    src="/Screenshot_2024-08-17_at_8.13.58_AM-removebg-preview 3.png"
                    alt="Placeholder"
                    className="h-4 w-4 rounded-full mr-4"
                  />
                  <p className="text-xs sm:text-sm font-semibold">
                    {item.question}
                  </p>
                </div>
                <div className="flex items-start mb-2">
                  <img
                    src="./Medha.svg"
                    alt="Placeholder"
                    className="h-4 w-4 rounded-full mr-4"
                  />
                  <p className="text-xs sm:text-sm">
                    {index === qna.length - 1 && loading ? (
                      <span className="italic text-gray-500">Thinking...</span>
                    ) : (
                      item.answer
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <form
            onSubmit={onSubmit}
            className="mt-4 flex justify-center items-center space-x-4"
          >
            <div className="relative w-full flex ">
              <textarea
                className="w-full p-3 sm:p-4 rounded-full border border-gray-300 h-10 sm:h-12 leading-[1rem] box-border text-xs sm:text-sm"
                placeholder="Message Medha"
              ></textarea>
              <button
                type="submit"
                className="absolute right-0 w-[100px] sm:w-[136px] h-8 sm:h-[49px] bg-[#5D233C] text-white rounded-2xl flex items-center justify-center text-xs sm:text-sm"
                disabled={loading}
              >
                {loading ? "Loading..." : "Send"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default MedhaTextArea;
