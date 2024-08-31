"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ChatHistoryArea from "@/components/ChatHistoryArea";
import MedhaTextArea from "@/components/MedhaTextArea";

function Chatbot() {
  const [questionsHistory, setQuestionsHistory] = useState([
    "What is Medha?",
    "What is Nostavia?",
  ]);
  const [qna, setQna] = useState([
    { question: "What is Medha?", answer: "Medha is an AI Chatbot" },
  ]);
  const [activeButton, setActiveButton] = useState("chat");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleButtonClick = (buttonType: string) => {
    setActiveButton(buttonType);

    if (buttonType === "chat") {
      router.push("/chat");
    } else if (buttonType === "notebook") {
      router.push("/notebook");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const textarea = form.querySelector('textarea') as HTMLTextAreaElement;
    const message = textarea.value.trim();

    if (message) {
      setQna(prevQna => [...prevQna, { question: message, answer: "" }]);
      setQuestionsHistory(prevHistory => [...prevHistory, message]);
      textarea.value = "";

      try {
        const response = await sendTextToVoiceflow(message);
        setQna(prevQna => {
          const newQna = [...prevQna];
          newQna[newQna.length - 1].answer = response;
          return newQna;
        });
        setError(null);
      } catch (error) {
        console.error("Error getting response:", error);
        setQna(prevQna => {
          const newQna = [...prevQna];
          newQna[newQna.length - 1].answer = "Sorry, there was an error processing your request.";
          return newQna;
        });
        setError(`Error: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  };

  async function sendTextToVoiceflow(text: string): Promise<string> {
    try {
      const response = await fetch("http://localhost:3001/voiceflow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const responseData = await response.json();
      return responseData[1]?.payload?.message || "Sorry, I didn't understand that.";
    } catch (error) {
      if (error instanceof TypeError && error.message.includes("NetworkError")) {
        console.error("Network error occurred:", error);
        throw new Error("Network error: Please check your internet connection.");
      } else {
        console.error("Error in sendTextToVoiceflow:", error);
        throw error;
      }
    }
  }
  

  return (
    <div className="p-8">
      <div className="flex justify-between gap-x-[62px] mb-12">
        <div className="space-y-1">
          <div className="text-[40px] font-bold">AI Chatbot</div>
          <div className="text-[20px] text-gray-500">
            Chat with AI Chatbot for needs
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            className={`rounded-3xl w-[91px] h-[41px] ${
              activeButton === "chat" ? "bg-[#C00F0C] text-white" : "bg-white"
            }`}
            onClick={() => handleButtonClick("chat")}
          >
            Chat
          </button>
          <button
            className={`rounded-3xl w-[138px] h-[41px] ${
              activeButton === "notebook" ? "bg-[#C00F0C] text-white" : "bg-white"
            }`}
            onClick={() => handleButtonClick("notebook")}
          >
            Notebook
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5 mt-6">
        <div className="col-span-1 h-full">
          <ChatHistoryArea questions={questionsHistory} />
        </div>
        <div className="col-span-2">
          <MedhaTextArea qna={qna} onSubmit={handleSubmit} />
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
      </div>
    </div>
  );
}

export default Chatbot;