"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
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
  const [activeButton, setActiveButton] = useState("chat"); // State to manage active button

  const router = useRouter(); // Initialize useRouter

  const handleButtonClick = (buttonType: string) => {
    setActiveButton(buttonType); // Set active button

    if (buttonType === "chat") {
      router.push("/chat"); // Navigate to chat page
    } else if (buttonType === "notebook") {
      router.push("/notebook"); // Navigate to notebook page
    }
  };

  return (
    <div>
      <div className="p-8 space-y-6">
        {/* Greeting Section */}
        <div className="flex justify-around gap-x-[620px]">
          <div className="text-2xl font-bold">AI Chatbot</div>
          <div className="flex justify-end gap-2">
            <div>
              <button
                className={`rounded-3xl w-[91px] h-[41px] ${
                  activeButton === "chat" ? "bg-[#C00F0C] text-white" : "bg-white"
                }`}
                onClick={() => handleButtonClick("chat")}
              >
                Chat
              </button>
            </div>
            <div>
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
        </div>
        <div className="text-lg text-gray-500">
          Chat with AI Chatbot for needs
        </div>
       
        <div className=" relative pt-16 pl-10">
      <Image
      width={32} height={32} alt=""
      src="/Plus circle.svg"
    />
        {/* <img  className="absolute pl-4 pt-5" src="/Plus circle.svg" width={32} height={32} alt="" /> */}
        <a href="#">
        <button className="h-[65px] w-[267px] bg-white rounded-2xl font-bold">New Notebook</button>
        </a>
        </div>

        <div className="text-lg text-gray-500">
          All Notebooks
          <div className="flex">
          <div className=" relative pt-16 pl-10">
      <Image
      width={32} height={32} alt=""
      src="/Book.svg"
    />
        {/* <img  className="absolute pl-4 pt-5" src="/Plus circle.svg" width={32} height={32} alt="" /> */}
        <a href="#">
        <button className="h-[65px] w-[267px] bg-white rounded-2xl font-bold">Notebook 1</button>
        </a>
        </div>
        <div className=" relative pt-16 pl-10">
      <Image
      width={32} height={32} alt=""
      src="/Book.svg"
    />
        {/* <img  className="absolute pl-4 pt-5" src="/Plus circle.svg" width={32} height={32} alt="" /> */}
        <a href="#">
        <button className="h-[65px] w-[267px] bg-white rounded-2xl font-bold">Notebook 2</button>
        </a>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
