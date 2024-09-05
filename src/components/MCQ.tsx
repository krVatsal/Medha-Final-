import React, { useState } from "react";

// Mock data that could come from an API
const questionsData = [
  {
    id: 1,
    question: "What do Animals eat?",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    correctAnswer: "Option 1",
  },
  {
    id: 2,
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    correctAnswer: "Paris",
  },
  {
    id: 3,
    question: "What is the boiling point of water?",
    options: ["90°C", "100°C", "110°C", "120°C"],
    correctAnswer: "100°C",
  },
  {
    id: 4,
    question: "Who wrote 'Hamlet'?",
    options: ["Shakespeare", "Hemingway", "Dickens", "Orwell"],
    correctAnswer: "Shakespeare",
  },
];

const Assessment = () => {
  const [activeQuestionId, setActiveQuestionId] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const handleQuestionClick = (id: number) => {
    if (activeQuestionId === id) {
      // Collapse the question if it's already open
      setActiveQuestionId(null);
      setShowAnswer(false);
    } else {
      // Expand the new question
      setActiveQuestionId(id);
      setShowAnswer(false);
    }
  };
  interface MCQSectionProps {
    onSubmit: (selectedOption: string) => Promise<void>;
    initialResponse: string | null;
    loading: boolean;
  }

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };
  const MCQSection: React.FC<MCQSectionProps> = ({ onSubmit, initialResponse, loading }) => {
  return (
    <div className="bg-white bg-opacity-60 p-6 rounded-2xl flex flex-col h-[60vh] overflow-scroll">
      <h2 className="text-lg font-bold mb-4">Assessment</h2>
      {questionsData.map((q) => (
        <div
          key={q.id}
          className={`bg-white p-4 rounded-lg shadow-md mb-4 border-2 ${
            activeQuestionId === q.id ? "border-[#1F4467]" : "border-transparent"
          }`}
        >
          <button
            className="bg-[#1F4467] text-white rounded-full h-[27px] w-[124px] mb-2 text-center text-[12px]"
            onClick={() => handleQuestionClick(q.id)}
          >
           Question {q.id}
          </button>
          {activeQuestionId === q.id && (
            <div>
             <span className="font-bold">Question: </span>
             <span className="mb-4">{q.question}</span>
            <div className="grid grid-cols-2 gap-4 mb-4 mt-4">
              {q.options.map((option, index) => (
                <div key={index}> {/* Add the key prop here */}
                  <button
                    className=" w-full h-[35px] text-left pl-4 bg-gray-300 rounded-lg"
                  >
                    {option}
                  </button>
                </div>
              ))}
              <button
                className="bg-[#1F4467] text-white rounded-full text-[12px] h-[27px] w-[124px] col-span-2"
                onClick={handleShowAnswer}
              >
                Show Answer
              </button>
              {showAnswer && (
                <p className="mt-4 text-green-600 font-bold col-span-2">
                  Correct Answer: {q.correctAnswer}
                </p>
              )}
            </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
};

export default Assessment;
