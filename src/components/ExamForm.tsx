"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
// Define the structure of the class data
interface ChapterObject {
  [chapterName: string]: string[]; // chapterName maps to an array of topics
}

interface SubjectObject {
  [subjectName: string]: ChapterObject[]; // subjectName maps to an array of chapter objects
}

interface ClassData {
  [className: string]: SubjectObject; // className maps to an object of subjects
}

export default function ExamForm() {
  const router = useRouter();
  const [classData, setClassData] = useState<ClassData>({});
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedChapter, setSelectedChapter] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [totalQuestion, setTotalQuestion] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchClassData();
  }, []);

  const fetchClassData = async (): Promise<void> => {
    try {
      const response = await fetch("https://game.simplem.in/api/class-data");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data: ClassData = await response.json();
      setClassData(data);
    } catch (error) {
      console.error("Error fetching class data:", error);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ): void => {
    setter(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    if (
      !selectedClass ||
      !selectedSubject ||
      !selectedChapter ||
      !selectedTopic ||
      !selectedLevel ||
      !selectedType ||
      !totalQuestion
    ) {
      alert("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    const payload = {
      class: selectedClass,
      subject: selectedSubject,
      chapter: selectedChapter,
      topic: selectedTopic,
      type: selectedType,
      level: selectedLevel,
      totalQuestion: totalQuestion,
    };

    try {
      console.log(1);
      const response = await fetch(
        "https://game.simplem.in/api/submit-topic-wise-form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      console.log(2);
      const responseData = await response.json();
      console.log("---------------------------------------------");
      console.log(responseData);
      console.log("Type :", responseData.content[0].Type);
      console.log("---------------------------------------------");

      if (responseData.content && responseData.content.length > 0) {
        const questionType = responseData.content[0].Type;
        let redirectPath = "";

        switch (questionType) {
          case "Subjective":
            redirectPath = "/chat/subjective";
            break;
          case "Objective":
            redirectPath = "/chat/mcq";
            break;
          case "Reading":
            console.log(
              "Reading type detected, implement appropriate action here"
            );
            return; // Exit the function if type is Reading
          default:
            console.log("Unknown question type:", questionType);
            return; // Exit the function if type is unknown
        }

        const encodedData = encodeURIComponent(JSON.stringify(responseData));
        try {
          router.push(`${redirectPath}?data=${encodedData}`);
        } catch (routerError) {
          console.error("Navigation failed:", routerError);
        }
      } else {
        console.error("Unexpected response structure:", responseData);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderOptions = (options: Record<string, any>): JSX.Element[] => {
    return Object.keys(options || {}).map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ));
  };

  const renderSubjects = (): JSX.Element[] | null => {
    if (!selectedClass) return null;
    return renderOptions(classData?.[selectedClass]);
  };

  const renderChapters = (): JSX.Element[] | null => {
    if (!selectedClass || !selectedSubject) return null;
    const subjects = classData?.[selectedClass];
    const subjectData = subjects?.[selectedSubject];
    if (!subjectData) return null;

    return subjectData.map((chapterObject, index) => {
      const chapterName = Object.keys(chapterObject)?.[0];
      return (
        <option key={chapterName} value={chapterName}>
          {chapterName}
        </option>
      );
    });
  };

  const renderTopics = (): JSX.Element[] | null => {
    if (!selectedClass || !selectedSubject || !selectedChapter) return null;

    const subjects = classData?.[selectedClass];
    const subjectData = subjects?.[selectedSubject];
    const chapterObject = subjectData?.find(
      (chapterObj) => Object.keys(chapterObj)?.[0] === selectedChapter
    );
    const topics = chapterObject?.[selectedChapter];
    if (!Array.isArray(topics)) return null;

    return topics.map((topic, index) => (
      <option key={index} value={topic}>
        {topic}
      </option>
    ));
  };

  return (
    <div className="bg-white bg-opacity-60 p-6 rounded-2xl flex flex-col pt-4 flex-grow overflow-scroll">
      <p className="mb-4 font-bold">Create Exam Form</p>
      {/* Grid layout for exam form dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <select className="h-[31px] w-[96px] rounded-full pl-4 text-xs sm:text-sm">
          <option value="" disabled selected>
            Class
          </option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </select>
        <select className="h-[31px] w-[108px] rounded-full pl-4 text-xs sm:text-sm">
          <option value="" disabled selected>
            Subject
          </option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </select>
        <select className="h-[31px] w-[120px] rounded-full pl-4 text-xs sm:text-sm">
          <option value="" disabled selected>
            Language
          </option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </select>
        <select className="h-[31px] w-full rounded-full pl-4 text-xs sm:text-sm">
          <option value="" disabled selected>
            Select Chapter
          </option>
          <option value="chapter1">Chapter 1</option>
          <option value="chapter2">Chapter 2</option>
        </select>
        <select className="h-[31px] w-full rounded-full pl-4 text-xs sm:text-sm">
          <option value="" disabled selected>
            Select Topic
          </option>
          <option value="topic1">Topic 1</option>
          <option value="topic2">Topic 2</option>
        </select>
        <select className="h-[31px] w-full rounded-full pl-4 text-xs sm:text-sm">
          <option value="" disabled selected>
            Select Hardness level
          </option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <select className="h-[31px] w-full rounded-full pl-4 text-xs sm:text-sm">
          <option value="" disabled selected>
            No. of True/False Questions
          </option>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
        <select className="h-[31px] w-full rounded-full pl-4 text-xs sm:text-sm">
          <option value="" disabled selected>
            Select Total No of Questions
          </option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
        <select className="h-[31px] w-full rounded-full pl-4 text-xs sm:text-sm">
          <option value="" disabled selected>
            No. of MCQs
          </option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
        <select className="h-[31px] w-full rounded-full pl-4 text-xs sm:text-sm">
          <option value="" disabled selected>
            No. of Fill in Blanks
          </option>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
        <select className="h-[31px] w-full rounded-full pl-4 text-xs sm:text-sm">
          <option value="" disabled selected>
            No. of Short Questions
          </option>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
        <select className="h-[31px] w-full rounded-full pl-4 text-xs sm:text-sm">
          <option value="" disabled selected>
            No. of Long Questions
          </option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      <div className="flex space-x-4 justify-center sm:justify-start">
        <button className="h-[40px] sm:h-12 w-[107px] sm:w-24 bg-[#5D233C] text-white rounded-full text-xs sm:text-sm">
          Submit
        </button>
      </div>
    </div>
  );
}
