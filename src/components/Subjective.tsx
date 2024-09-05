import React, { useState } from "react";

// Mock data for subjective questions
const subjectiveQuestionsData = [
  {
    id: 1,
    question: "Describe the feeding habits of animals.",
    correctAnswer: "Animals have various feeding habits depending on their species.",
  },
  {
    id: 2,
    question: "Explain why Paris is the capital of France.",
    correctAnswer: "Paris became the capital due to its economic, political, and cultural significance.",
  },
  {
    id: 3,
    question: "What happens when water reaches its boiling point?",
    correctAnswer: "Water turns into steam when it reaches 100°C at standard atmospheric pressure.",
  },
  {
    id: 4,
    question: "Discuss the impact of Shakespeare's 'Hamlet' on English literature.",
    correctAnswer: "'Hamlet' is one of Shakespeare's most significant works, deeply influencing English literature through its exploration of themes like revenge, madness, and morality.",
  },
];

const Subjective = () => {
  const [activeQuestionId, setActiveQuestionId] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({}); // Store user answers by question ID

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

  const handleInputChange = (id: number, value: string) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [id]: value }));
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  return (
    <div className="bg-white bg-opacity-60 p-6 rounded-2xl flex flex-col h-[60vh] overflow-scroll">
      <h2 className="text-lg font-bold mb-4">Subjective Assessment</h2>
      {subjectiveQuestionsData.map((q) => (
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
              <div className="mt-4">
                <textarea
                  className="w-full h-[100px] p-2 border rounded-lg mb-4"
                  placeholder="Write your answer here..."
                  value={answers[q.id] || ""}
                  onChange={(e) => handleInputChange(q.id, e.target.value)}
                />
                <button
                  className="bg-[#1F4467] text-white rounded-full text-[12px] h-[27px] w-[124px]"
                  onClick={handleShowAnswer}
                >
                  Show Answer
                </button>
                {showAnswer && (
                  <p className="mt-4 text-green-600 font-bold">
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
};

export default Subjective;
