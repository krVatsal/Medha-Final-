"use client";
import React, { Suspense, useState, useEffect, useRef, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import ChatHistoryArea from "@/components/ChatHistoryArea";
import MedhaTextArea from "@/components/MedhaTextArea";
import TopicWiseForm from "@/components/TopicwiseForm";
import ExamForm from "@/components/ExamForm";
import AudioPlayer from "@/components/AudioPlayer";
import axios from "axios";
import { Menu, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
if (typeof window !== "undefined") {
  require("core-js/stable");
  require("regenerator-runtime/runtime");
}


const ChatbotSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section Skeleton */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center sm:gap-x-[62px] mb-6 sm:mb-12">
        <div className="space-y-1 mb-4 sm:mb-0">
          <Skeleton className="h-8 sm:h-10 lg:h-12 w-48 sm:w-64" />
          <Skeleton className="h-6 sm:h-7 lg:h-8 w-64 sm:w-80" />
        </div>
        <div className="flex flex-col gap-3 items-end">
          <div className="flex justify-start sm:justify-end gap-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton 
                key={i} 
                className={`rounded-full h-[40px] ${
                  i === 3 ? "w-[138px]" : "w-[91px]"
                }`} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Section Skeleton */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-5 mt-6">
        {/* Left Panel Skeleton */}
        <div className="lg:w-full sm:w-1/3 md:w-1/2 lg:h-full min-h-[410px] mb-4 lg:mb-0">
          <div className="bg-white rounded-2xl p-4 h-full">
            <Skeleton className="h-8 w-48 mb-4" />
            <div className="space-y-3">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-lg" />
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel Skeleton */}
        <div className="lg:w-full sm:w-1/3 md:w-1/2 lg:h-full">
          <div className="bg-white rounded-2xl p-4 h-full">
            {/* Chat Messages Skeleton */}
            <div className="space-y-4 mb-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <Skeleton className={`h-16 ${i % 2 === 0 ? 'w-3/4' : 'w-2/3'} rounded-2xl`} />
                </div>
              ))}
            </div>

            {/* Input Area Skeleton */}
            <div className="mt-4 flex items-end gap-2">
              <Skeleton className="h-12 flex-grow rounded-full" />
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="h-12 w-12 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function Chatbot() {

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);


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
      handleSend(null, transcript);
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

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

    const maxRetries = 3;
    let retries = 0;

    const makeRequest = async () => {
      try {
        setLoading(true);
        const apiUrl = `https://medha-cograd.azurewebsites.net/text_query/?query=${message}&language=${language}&class_num=${classNumber}&subject=${subject}`;
        const response = await axios.post(apiUrl, { timeout: 30000 }); // Set timeout to 30 seconds
        console.log(response);

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
        if (retries < maxRetries) {
          retries++;
          console.log(`Retrying... Attempt ${retries} of ${maxRetries}`);
          await new Promise((resolve) => setTimeout(resolve, 1000 * retries)); // Exponential backoff
          await makeRequest();
        } else {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              message:
                "Sorry, there was an error processing your request. Please try again later.",
              sender: "ai",
              direction: "incoming",
            },
          ]);
          setError(
            `Error: ${error instanceof Error ? error.message : String(error)}`
          );
          setLoading(false);
          setTyping(false);
        }
      }
    };

    await makeRequest();
  };

  const speakTextWithFemaleVoice = async (text: string) => {
    try {
      const response = await axios.post(
        "https://voicebot-server.onrender.com/generate-speech",
        {
          text,
        }
      );
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

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSend(e, newText);
  };




  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    loading ? <ChatbotSkeleton /> : (
    <Suspense>
      <div className="max-w-7xl mx-auto relative">
        {/* Mobile Menu Button - Only visible on mobile */}
        <button 
          className="lg:hidden fixed top-4 right-4 z-50 bg-white p-2 rounded-full shadow-lg"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`
          lg:hidden fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="p-4 pt-16">
            {/* Mobile Navigation Buttons */}
            <div className="flex flex-col gap-2 mb-6">
              <button
                className={`rounded-full py-2 px-4 text-center ${
                  activeButton === "learn" ? "bg-[#5D233C] text-white" : "bg-gray-100"
                }`}
                onClick={() => {
                  handleButtonClick("learn");
                  setIsMobileMenuOpen(false);
                }}
              >
                Learn
              </button>
              <button
                className={`rounded-full py-2 px-4 text-center ${
                  activeButton === "teach" ? "bg-[#5D233C] text-white" : "bg-gray-100"
                }`}
                onClick={() => {
                  handleButtonClick("teach");
                  setIsMobileMenuOpen(false);
                }}
              >
                Teach
              </button>
              <button
                className={`rounded-full py-2 px-4 text-center ${
                  activeButton === "chat" ? "bg-[#5D233C] text-white" : "bg-gray-100"
                }`}
                onClick={() => {
                  handleButtonClick("chat");
                  setIsMobileMenuOpen(false);
                }}
              >
                Chat
              </button>
              <button
                className={`rounded-full py-2 px-4 text-center ${
                  activeButton === "notebook" ? "bg-[#5D233C] text-white" : "bg-gray-100"
                }`}
                onClick={() => {
                  handleButtonClick("notebook");
                  setIsMobileMenuOpen(false);
                }}
              >
                Notebook
              </button>
            </div>

            {/* Chat History in Mobile Menu */}
            <div className="mb-6">
              {selectedOption === "topic-wise" ? (
                <TopicWiseForm />
              ) : selectedOption === "exam-form" ? (
                <ExamForm />
              ) : (
                <ChatHistoryArea questions={questionsHistory} />
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center sm:gap-x-[62px] mb-6 sm:mb-12">
          <div className="space-y-1 mb-4 sm:mb-0 p-4 lg:p-0">
            <h1 className="text-2xl sm:text-4xl lg:text-[40px] font-bold">
              AI Chatbot
            </h1>
            <p className="text-base sm:text-lg lg:text-[20px] text-gray-500">
              Chat with AI Chatbot for needs
            </p>
          </div>
          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden lg:flex flex-col gap-3 items-end">
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
                className={`rounded-full w-[91px] h-[40px] ${
                  activeButton === "chat"
                    ? "bg-[#5D233C] text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
                onClick={() => handleButtonClick("chat")}
              >
                Chat
              </button>
              <button
                className={`rounded-full w-[138px] h-[40px] ${
                  activeButton === "notebook"
                    ? "bg-[#5D233C] text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
                onClick={() => handleButtonClick("notebook")}
              >
                Notebook
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-5 mt-6">
          {/* Chat History Area - Hidden on mobile */}
          <div className="hidden lg:block lg:w-full sm:w-1/3 md:w-1/2 lg:h-full min-h-[410px] mb-4 lg:mb-0">
            {selectedOption === "topic-wise" ? (
              <TopicWiseForm />
            ) : selectedOption === "exam-form" ? (
              <ExamForm />
            ) : (
              <ChatHistoryArea questions={questionsHistory} />
            )}
          </div>
          {/* Chat Area - Full width on mobile */}
          <div className="w-full lg:w-1/2 h-full p-4 lg:p-0">
            <MedhaTextArea
              messages={messages}
              onSubmit={(e: FormEvent<HTMLFormElement>) =>
                handleSend(e, newText)
              }
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
  ));
}

export default Chatbot;
