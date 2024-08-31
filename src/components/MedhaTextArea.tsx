import React from "react";

function MedhaTextArea({
  qna,
  onSubmit
}: {
  qna: { question: string; answer: string }[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div className="bg-white bg-opacity-60 p-6 rounded-2xl flex flex-col h-[60vh]">
      <p className="font-bold text-lg mb-4">Medha AI</p>
      <div className="bg-white pt-4 rounded-lg flex-grow flex flex-col overflow-hidden">
        <div className="pl-8 pr-8 flex-grow overflow-y-auto">
          {qna.map((item, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-start mb-2">
                <img
                  src="./Chat_bubble.svg"
                  alt="Placeholder"
                  className="h-4 w-4 rounded-full mr-4"
                />
                <p className="text-sm font-semibold">{item.question}</p>
              </div>
              <div className="flex items-start mb-2">
                <img
                  src="./Chat_bubble.svg"
                  alt="Placeholder"
                  className="h-4 w-4 rounded-full mr-4"
                />
                <p className="text-sm">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={onSubmit} className="mt-4 flex justify-center items-center space-x-4">
          <textarea
            className="w-[80%] p-4 rounded-full border border-gray-300 h-12 mb-4 leading-[1rem]"
            placeholder="Type your message here..."
          ></textarea>
          <button
            type="submit"
            className="h-12 w-24 bg-green-500 text-white rounded-full mb-4 flex items-center justify-center"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}

export default MedhaTextArea;