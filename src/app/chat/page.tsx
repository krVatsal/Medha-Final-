"use client";
import React, {Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ChatHistoryArea from "@/components/ChatHistoryArea";
import MedhaTextArea from "@/components/MedhaTextArea";

function Chatbot() {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  const [questionsHistory, setQuestionsHistory] = useState([
    "What is Medha?",
    "What is Nostavia?",
  ]);
  const [qna, setQna] = useState<{ question: string; answer: string }[]>([]);
  const [initialResponse, setInitialResponse] = useState<string | null>(null); // State for the initial bot response
  const [activeButton, setActiveButton] = useState("chat");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchInitialMessage();
  }, []);

  const fetchInitialMessage = async () => {
    try {
      const response = await fetch("/api/voiceflow", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const initialMessage =
        data[1]?.payload?.message || "Hello! How can I assist you today?";
      setInitialResponse(initialMessage); // Set the initial response state
    } catch (error) {
      console.error("Error fetching initial message:", error);
      setError(
        `Error fetching initial message: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  };

  const handleButtonClick = (buttonType: string): void => {
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
    const textarea: any = form.querySelector("textarea");
    const message = textarea.value.trim();

    if (message) {
      setQna((prevQna) => [...prevQna, { question: message, answer: "" }]);
      setQuestionsHistory((prevHistory) => [...prevHistory, message]);
      textarea.value = "";

      try {
        setLoading(true);
        const response = await sendTextToVoiceflow(message);
        setLoading(false);
        setQna((prevQna) => {
          const newQna = [...prevQna];
          newQna[newQna.length - 1].answer = response;
          return newQna;
        });
        setError(null);

        // Determine the type of response and route accordingly
        if (response.toLowerCase().includes("mcq")) {
          router.push("/chat/mcq");
        } else {
          router.push("/chat/subjective");
        }
      } catch (error) {
        console.error("Error getting response:", error);
        setQna((prevQna) => {
          const newQna = [...prevQna];
          newQna[newQna.length - 1].answer =
            "Sorry, there was an error processing your request.";
          return newQna;
        });
        setError(
          `Error: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    }
  };

  interface VoiceflowResponse {
    payload: {
      message: string;
    };
  }

  async function sendTextToVoiceflow(text: string): Promise<string> {
    try {
      const response = await fetch("/api/voiceflow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData: VoiceflowResponse[] = await response.json();
      return (
        responseData[1]?.payload?.message || "Sorry, I didn't understand that."
      );
    } catch (error) {
      if (
        error instanceof TypeError &&
        error.message.includes("NetworkError")
      ) {
        console.error("Network error occurred:", error);
        throw new Error(
          "Network error: Please check your internet connection."
        );
      } else {
        console.error("Error in sendTextToVoiceflow:", error);
        throw error;
      }
    }
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="p-4 sm:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center sm:gap-x-[62px] mb-6 sm:mb-12">
          <div className="space-y-1 mb-4 sm:mb-0">
            <h1 className="text-2xl sm:text-4xl lg:text-[40px] font-bold">AI Chatbot</h1>
            <p className="text-base sm:text-lg lg:text-[20px] text-gray-500">
              Chat with AI Chatbot for needs
            </p>
          </div>
          <div className="flex justify-start sm:justify-end gap-2">
            <button
              className={`rounded-full px-4 py-2 text-sm sm:text-base transition-colors duration-200 ${
                activeButton === "chat"
                  ? "bg-[#C00F0C] text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
              onClick={() => handleButtonClick("chat")}
            >
              Chat
            </button>
            <button
              className={`rounded-full px-4 py-2 text-sm sm:text-base transition-colors duration-200 ${
                activeButton === "notebook"
                  ? "bg-[#C00F0C] text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
              onClick={() => handleButtonClick("notebook")}
            >
              Notebook
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-5 mt-6">
          <div className="lg:w-full sm:w-1/3 md:w-1/2 lg:h-full mb-4 lg:mb-0">
            <ChatHistoryArea questions={questionsHistory} />
          </div>
          <div className="lg:w-full sm:w-1/3 md:w-1/2 lg:h-full">
            <MedhaTextArea
              qna={qna}
              onSubmit={handleSubmit}
              initialResponse={initialResponse}
              loading={loading}
            />
            {error && <div className="text-red-500 mt-2">{error}</div>}
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default Chatbot;
