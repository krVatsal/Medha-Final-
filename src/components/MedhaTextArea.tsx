import React, { useState } from "react";

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
      <div className="flex flex-row justify-around items-center mb-4 space-x-4">
        <p className="font-bold text-lg">Medha AI</p>
        <div>
        <select
          className="h-[31px] w-[136px] rounded-full pl-4"
          onChange={handleSelectChange}
        >
          <option value="assignmets" >
            Assignments
          </option>
          <option value="topic-wise">Topic Wise Assessment</option>
          <option value="exam-form">Exam Form</option>
        </select>
        <select className="h-[31px] w-[96px] rounded-full pl-4">
          <option value="" disabled selected>
            Class
          </option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </select>
        <select className="h-[31px] w-[108px] rounded-full pl-4">
          <option value="" disabled selected>
            Subject
          </option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </select>
        <select className="h-[31px] w-[120px] rounded-full pl-4">
          <option value="" disabled selected>
            Language
          </option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </select>
      </div>
      </div>

      {/* Content changes based on selected option */}
      {selectedOption === "topic-wise" ? (
        <div className="flex flex-col pt-4 flex-grow">
          <p className=" mb-4 font-bold">Create Topic Wise Assessment</p>
          {/* Grid layout for topic-wise assessment dropdowns */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <select className="h-[31px] w-full rounded-full pl-4">
              <option value="" disabled selected>
                Select Chapter
              </option>
              <option value="chapter1">Chapter 1</option>
              <option value="chapter2">Chapter 2</option>
            </select>
            <select className="h-[31px] w-full rounded-full pl-4">
              <option value="" disabled selected>
                Select Topic
              </option>
              <option value="topic1">Topic 1</option>
              <option value="topic2">Topic 2</option>
            </select>
            <select className="h-[31px] w-full rounded-full pl-4">
              <option value="" disabled selected>
                Select Hardness level
              </option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <select className="h-[31px] w-full rounded-full pl-4">
              <option value="" disabled selected>
                Select Question Type
              </option>
              <option value="mcq">MCQ</option>
              <option value="short">Short Answer</option>
              <option value="long">Long Answer</option>
            </select>
            <select className="h-[31px] w-full rounded-full pl-4 col-span-2">
              <option value="" disabled selected>
                Select Total No of Questions
              </option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
          </div>
          <button className="h-12 w-24 bg-red-600 text-white rounded-full">
            Submit
          </button>
        </div>
      ) : selectedOption === "exam-form" ? (
        <div className="flex flex-col pt-4 flex-grow overflow-scroll">
        <p className=" mb-4 font-bold">Create Exam Form</p>
        {/* Grid layout for exam form dropdowns */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <select className="h-[31px] w-full rounded-full pl-4">
            <option value="" disabled selected>
              Select Chapter
            </option>
            <option value="chapter1">Chapter 1</option>
            <option value="chapter2">Chapter 2</option>
          </select>
          <select className="h-[31px] w-full rounded-full pl-4">
            <option value="" disabled selected>
              Select Topic
            </option>
            <option value="topic1">Topic 1</option>
            <option value="topic2">Topic 2</option>
          </select>
          <select className="h-[31px] w-full rounded-full pl-4">
            <option value="" disabled selected>
              Select Hardness level
            </option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <select className="h-[31px] w-full rounded-full pl-4">
            <option value="" disabled selected>
              No. of True/False Questions
            </option>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
          <select className="h-[31px] w-full rounded-full pl-4">
            <option value="" disabled selected>
              Select Total No of Questions
            </option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
          <select className="h-[31px] w-full rounded-full pl-4">
            <option value="" disabled selected>
              No. of MCQs
            </option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
          <select className="h-[31px] w-full rounded-full pl-4">
            <option value="" disabled selected>
              No. of Fill in Blanks
            </option>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
          <select className="h-[31px] w-full rounded-full pl-4">
            <option value="" disabled selected>
              No. of Short Questions
            </option>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
          <select className="h-[31px] w-full rounded-full pl-4">
            <option value="" disabled selected>
              No. of Long Questions
            </option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="flex space-x-4">
          <button className="h-12 w-40 bg-blue-600 text-white rounded-full">
            Save Selections
          </button>
          <button className="h-12 w-24 bg-red-600 text-white rounded-full">
            Submit
          </button>
        </div>
      </div>
    ) : (
        <div className="bg-white pt-4 rounded-lg flex-grow flex flex-col overflow-hidden">
          <div className="pl-8 pr-8 flex-grow overflow-y-auto">
            {initialResponse && (
              <div className="mb-4">
                <div className="flex items-start mb-2">
                  <img
                    src="./Medha.svg"
                    alt="Placeholder"
                    className="h-4 w-4 rounded-full mr-4"
                  />
                  <p className="text-sm">{initialResponse}</p>
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
                  <p className="text-sm font-semibold">{item.question}</p>
                </div>
                <div className="flex items-start mb-2">
                  <img
                    src="./Medha.svg"
                    alt="Placeholder"
                    className="h-4 w-4 rounded-full mr-4"
                  />
                  <p className="text-sm">
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
           <div className=" relative w-full">
  <textarea
    className="w-full p-4 rounded-full border border-gray-300 h-12 mb-4 leading-[1rem] box-border"
    placeholder="Message Medha"
  ></textarea>
  <button
    type="submit"
    className="absolute bottom-[22px] right-0 w-[136px] h-[49px] bg-[#C00F0C] text-white rounded-2xl flex items-center justify-center"
    disabled={loading}
  >
    {loading ? "Thinking..." : "Enter"}
  </button>
</div>

          </form>
        </div>
      )}
    </div>
  );
}

export default MedhaTextArea;
