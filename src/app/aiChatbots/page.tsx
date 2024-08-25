"use client";
import React, { useState } from "react";
import EnterClassroomArea from "@/components/EnterClassroomArea";
import Image from "next/image";
import MyAppsArea from "@/components/MyAppsArea";
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
  return (
    <div>
      <div className="p-8 space-y-6">
        {/* Greeting Section */}

        <div className="text-2xl font-bold">AI Chatbot</div>
        <div className="text-lg text-gray-500">
          Chat with AI Chatbot for needs
        </div>
        <div className="grid grid-cols-3 gap-5">
          <div className=" col-span-1 h-full">
            <ChatHistoryArea questions={questionsHistory} />
          </div>
          <div className=" col-span-2">
            <MedhaTextArea qna={qna} />
          </div>
        </div>
        {/* Main Content Section */}

        {/* Right Column: My Apps Area */}
      </div>
    </div>
  );
}

export default Chatbot;
