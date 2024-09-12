import React, { useState } from "react";
import TopicWiseForm from "./TopicwiseForm";
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
    <div className="bg-white bg-opacity-60 p-6 rounded-2xl flex flex-col h-[60vh]">
      {/* Horizontal alignment of Medha AI and dropdowns */}
      <div className="flex flex-col sm:flex-row justify-around items-center mb-4 space-y-4 sm:space-y-0 sm:space-x-4">
        <p className="font-bold text-lg">Medha AI</p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <select
            className="h-[31px] w-[136px] rounded-full pl-4 text-xs sm:text-sm"
            onChange={handleSelectChange}
          >
            <option value="assignments">Assignments</option>
            <option value="topic-wise">Topic Wise Assessment</option>
            <option value="exam-form">Exam Form</option>
          </select>
          <select className="h-[31px] w-[96px] rounded-full pl-4 text-xs sm:text-sm">
            <option value="" disabled selected>
              Class
            </option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>
          <select className="h-[31px] w-[108px] rounded-full pl-4 text-xs sm:text-sm">
            <option value="" disabled selected>
              Subject
            </option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>
          <select className="h-[31px] w-[120px] rounded-full pl-4 text-xs sm:text-sm">
            <option value="" disabled selected>
              Language
            </option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>
        </div>
      </div>

      {/* Topic Wise Form or Exam Form Display */}
      {selectedOption === "topic-wise" ? (
        <TopicWiseForm />
      ) : selectedOption === "exam-form" ? (
        <div className="flex flex-col pt-4 flex-grow overflow-scroll">
          <p className="mb-4 font-bold">Create Exam Form</p>
          {/* Grid layout for exam form dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <select className="h-[31px] w-full rounded-full pl-4 text-xs sm:text-sm">
              <option value="" disabled selected>
                Select Chapter
              </option>
              <option value="chapter1">Chapter 1</option>
              <option value="chapter2">Chapter 2</option>
            </select>
            <select className="h-[31px] w-full rounded-full pl-4 text-xs sm:text-sm">
              <option value="" disabled selected>
                Select Topic
              </option>
              <option value="topic1">Topic 1</option>
              <option value="topic2">Topic 2</option>
            </select>
            <select className="h-[31px] w-full rounded-full pl-4 text-xs sm:text-sm">
              <option value="" disabled selected>
                Select Hardness level
              </option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <select className="h-[31px] w-full rounded-full pl-4 text-xs sm:text-sm">
              <option value="" disabled selected>
                No. of True/False Questions
              </option>
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
            <select className="h-[31px] w-full rounded-full pl-4 text-xs sm:text-sm">
              <option value="" disabled selected>
                Select Total No of Questions
              </option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
            <select className="h-[31px] w-full rounded-full pl-4 text-xs sm:text-sm">
              <option value="" disabled selected>
                No. of MCQs
              </option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
            <select className="h-[31px] w-full rounded-full pl-4 text-xs sm:text-sm">
              <option value="" disabled selected>
                No. of Fill in Blanks
              </option>
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
            <select className="h-[31px] w-full rounded-full pl-4 text-xs sm:text-sm">
              <option value="" disabled selected>
                No. of Short Questions
              </option>
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
            <select className="h-[31px] w-full rounded-full pl-4 text-xs sm:text-sm">
              <option value="" disabled selected>
                No. of Long Questions
              </option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div className="flex space-x-4 justify-center sm:justify-start">
            <button className="h-10 sm:h-12 w-32 sm:w-40 bg-blue-600 text-white rounded-full text-xs sm:text-sm">
              Save Selections
            </button>
            <button className="h-10 sm:h-12 w-20 sm:w-24 bg-red-600 text-white rounded-full text-xs sm:text-sm">
              Submit
            </button>
          </div>
        </div>
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
            <div className="relative w-full">
              <textarea
                className="w-full p-3 sm:p-4 rounded-full border border-gray-300 h-10 sm:h-12 leading-[1rem] box-border text-xs sm:text-sm"
                placeholder="Message Medha"
              ></textarea>
              <button
                type="submit"
                className="absolute bottom-[12px] sm:bottom-[22px] right-0 w-[100px] sm:w-[136px] h-8 sm:h-[49px] bg-[#C00F0C] text-white rounded-2xl flex items-center justify-center text-xs sm:text-sm"
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
