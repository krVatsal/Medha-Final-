import React, { useState, FormEvent, Dispatch, SetStateAction } from "react";
import TopicWiseForm from "./TopicwiseForm";
import ExamForm from "./ExamForm";

interface Message {
  message: string;
  sender: string;
  direction?: string;
  isCode?: boolean;
}

interface MedhaTextAreaProps {
  messages: Message[];
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  loading: boolean;
  newText: string;
  setNewText: Dispatch<SetStateAction<string>>;
  startListening: () => Promise<void>;
  stopSpeaking: () => void;
  listening: boolean;
}

function MedhaTextArea({
  messages,
  onSubmit,
  loading,
  newText,
  setNewText,
  startListening,
  stopSpeaking,
  listening,
}: MedhaTextAreaProps) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newText.trim()) {
      onSubmit(e);
    }
  };

  return (
    <div className="bg-white bg-opacity-60 p-6 rounded-2xl flex flex-col h-[410px] min-w-[683px]">
      <div className="flex flex-col sm:flex-row mb-4 space-y-4 sm:space-y-0 sm:space-x-4">
        <p className="font-bold text-lg">Medha AI</p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"></div>
      </div>

      {selectedOption === "topic-wise" ? (
        <TopicWiseForm />
      ) : selectedOption === "exam-form" ? (
        <ExamForm />
      ) : (
        <div className="bg-white pt-4 rounded-lg flex-grow flex flex-col overflow-hidden">
          <div className="pl-4 sm:pl-8 pr-4 sm:pr-8 flex-grow overflow-y-auto">
            {messages.map((message, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-start mb-2">
                  <img
                    src={message.sender === "ai" ? "./Medha.svg" : "/Screenshot_2024-08-17_at_8.13.58_AM-removebg-preview 3.png"}
                    alt="Placeholder"
                    className="h-4 w-4 rounded-full mr-4"
                  />
                  <p className={`text-xs sm:text-sm ${message.sender === "user" ? "font-semibold" : ""}`}>
                    {message.message}
                  </p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-start mb-2">
                <img
                  src="./Medha.svg"
                  alt="Placeholder"
                  className="h-4 w-4 rounded-full mr-4"
                />
                <p className="text-xs sm:text-sm italic text-gray-500">Thinking...</p>
              </div>
            )}
          </div>
          <form
            onSubmit={handleSubmit}
            className="mt-4 flex justify-center items-center space-x-4"
          >
            <div className="relative w-full flex ">
              <textarea
                className="w-full p-3 sm:p-4 rounded-full border border-gray-300 h-10 sm:h-12 leading-[1rem] box-border text-xs sm:text-sm"
                placeholder="Message Medha"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
              ></textarea>
              <button
                type="submit"
                className="absolute right-0 w-[100px] sm:w-[136px] h-8 sm:h-[49px] bg-[#5D233C] text-white rounded-2xl flex items-center justify-center text-xs sm:text-sm"
                disabled={loading || !newText.trim()}
              >
                {loading ? "Loading..." : "Send"}
              </button>
            </div>
          </form>
          <div className="mt-2 flex justify-center">
            <button
              onClick={listening ? stopSpeaking : startListening}
              className="bg-[#5D233C] text-white px-4 py-2 rounded-full text-sm"
            >
              {listening ? "Stop Listening" : "Start Listening"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MedhaTextArea;