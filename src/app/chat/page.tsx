"use client";

import React, { Suspense, useState, useEffect, useRef, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import ChatHistoryArea from "@/components/ChatHistoryArea";
import MedhaTextArea from "@/components/MedhaTextArea";
import TopicWiseForm from "@/components/TopicwiseForm";
import ExamForm from "@/components/ExamForm";
import AudioPlayer from "@/components/AudioPlayer";
import axios from "axios";

// Remove duplicate polyfills
if (typeof window !== "undefined") {
  require("core-js/stable");
  require("regenerator-runtime/runtime");
}

function Chatbot() {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  const [questionsHistory, setQuestionsHistory] = useState([
    "What is Medha?",
    "What is Nostavia?",
  ]);
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm Medha! Ask me anything!",
      sender: "ai",
    },
  ]);
  const [activeButton, setActiveButton] = useState("chat");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [newText, setNewText] = useState("");
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [src, setSrc] = useState<string | null>(null);
  const [language, setLanguage] = useState("English");
  const [classNumber, setClassNumber] = useState("6");
  const [subject, setSubject] = useState("Science");
  const [typing, setTyping] = useState(false);
  const router = useRouter();
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const {
    transcript,
    browserSupportsSpeechRecognition,
    resetTranscript,
    listening,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!listening) {
      handleSend(transcript);
    }
  }, [listening]);

  useEffect(() => {
    setNewText(transcript);
  }, [transcript]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleButtonClick = (buttonType: string): void => {
    setActiveButton(buttonType);

    if (buttonType === "chat") {
      router.push("/chat");
    } else if (buttonType === "notebook") {
      router.push("/notebook");
    }
  };

  const handleSend = async (e: any, message: string) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    setSrc(null);
    if (!message) return;

    setNewText("");
    resetTranscript();

    const newMessage = { message, direction: "outgoing", sender: "user" };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setQuestionsHistory((prevHistory) => [...prevHistory, message]);
    setTyping(true);

    try {
      setLoading(true);
      const apiUrl = `/api/medha/text_query`;
      const response = await axios.post(apiUrl, {
        query: message,
        language: language,
        class_num: classNumber,
        subject: subject,
      });
      let text: string;
      if (typeof response.data === "string") {
        text = response.data;
      } else if (typeof response.data.text === "string") {
        text = response.data.text;
      } else {
        throw new Error("Unexpected response format");
      }

      const isCode = text.includes("```");
      const aiMessage = {
        message: text,
        sender: "ai",
        direction: "incoming",
        isCode,
      };

      setMessages((prevMessages) => [...prevMessages, aiMessage]);
      setTyping(false);
      setLoading(false);
      setError(null);

      await speakTextWithFemaleVoice(text);

      if (text.toLowerCase().includes("mcq")) {
        setActiveButton("assignment");
        setSelectedOption("topic-wise");
      } else {
        setActiveButton("chat");
      }
    } catch (error) {
      console.error("Error getting response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: "Sorry, there was an error processing your request.",
          sender: "ai",
          direction: "incoming",
        },
      ]);
      setError(
        `Error: ${error instanceof Error ? error.message : String(error)}`
      );
    } finally {
      setLoading(false);
      setTyping(false);
    }
  };

  const speakTextWithFemaleVoice = async (text: string) => {
    try {
      const response = await axios.post("/api/speech/generate-speech", {
        text,
      });
      if (response.data && response.data.audioUrl) {
        setSrc(response.data.audioUrl);
        setAiSpeaking(true);
      } else {
        throw new Error("Audio URL not found in response");
      }
    } catch (error) {
      console.error("Error generating speech:", error);
      setError(
        `Error generating speech: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  };

  const stopSpeaking = () => {
    setSrc(null);
    setAiSpeaking(false);
  };

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: false, language: "en-IN" });

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setLanguage(e.target.value);
  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setClassNumber(e.target.value);
  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSubject(e.target.value);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSend(e, newText);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="p-4 sm:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center sm:gap-x-[62px] mb-6 sm:mb-12">
          <div className="space-y-1 mb-4 sm:mb-0">
            <h1 className="text-2xl sm:text-4xl lg:text-[40px] font-bold">
              AI Chatbot
            </h1>
            <p className="text-base sm:text-lg lg:text-[20px] text-gray-500">
              Chat with AI Chatbot for needs
            </p>
          </div>
          <div className="flex flex-col gap-3 items-end">
            <div className="flex justify-start sm:justify-end gap-2">
              <button
                className={`bg-white rounded-full w-[91px] h-[40px] ${
                  activeButton === "learn"
                    ? "bg-[#5D233C] text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
                onClick={() => handleButtonClick("learn")}
              >
                Learn
              </button>
              <button
                className={`bg-white rounded-full w-[91px] h-[40px] ${
                  activeButton === "teach"
                    ? "bg-[#5D233C] text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
                onClick={() => handleButtonClick("teach")}
              >
                Teach
              </button>
              <button
                className={`rounded-full w-[91px] h-[40px] text-sm sm:text-base transition-colors duration-200 ${
                  activeButton === "chat"
                    ? "bg-[#5D233C] text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
                onClick={() => handleButtonClick("chat")}
              >
                Chat
              </button>
              <button
                className={`rounded-full w-[138px] h-[40px] text-sm sm:text-base transition-colors duration-200 ${
                  activeButton === "notebook"
                    ? "bg-[#5D233C] text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
                onClick={() => handleButtonClick("notebook")}
              >
                Notebook
              </button>
            </div>
            <select
              className={`h-[40px] w-[141px] rounded-full pl-4 ${
                activeButton === "assignment"
                  ? "bg-[#5D233C] text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
              onClick={() => handleButtonClick("assignment")}
              onChange={handleSelectChange}
            >
              <option value="" disabled>
                Assignments
              </option>
              <option value="topic-wise">Topic Wise Assessment</option>
              <option value="exam-form">Exam Form</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <select
            value={language}
            onChange={handleLanguageChange}
            className="rounded-full h-[40px] pl-4"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            {/* Add more language options as needed */}
          </select>
          <select
            value={classNumber}
            onChange={handleClassChange}
            className="rounded-full h-[40px] pl-4"
          >
            <option value="6">Class 6</option>
            <option value="7">Class 7</option>
            {/* Add more class options as needed */}
          </select>
          <select
            value={subject}
            onChange={handleSubjectChange}
            className="rounded-full h-[40px] pl-4"
          >
            <option value="Science">Science</option>
            <option value="Math">Math</option>
            {/* Add more subject options as needed */}
          </select>
        </div>
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-5 mt-6 ">
          <div className="lg:w-full sm:w-1/3 md:w-1/2 lg:h-full mb-4 lg:mb-0">
            {selectedOption === "topic-wise" ? (
              <TopicWiseForm />
            ) : selectedOption === "exam-form" ? (
              <ExamForm />
            ) : (
              <ChatHistoryArea questions={questionsHistory} />
            )}
          </div>
          <div className="lg:w-full sm:w-1/3 md:w-1/2 lg:h-full">
            <MedhaTextArea
              messages={messages}
              onSubmit={handleSend}
              loading={loading}
              newText={newText}
              setNewText={setNewText}
              startListening={startListening}
              stopSpeaking={stopSpeaking}
              listening={listening}
            />
            {error && <div className="text-red-500 mt-2">{error}</div>}
            {src && <AudioPlayer audioUrl={src} />}
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default Chatbot;
