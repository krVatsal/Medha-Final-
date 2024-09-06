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

export default function TopicWiseForm() {
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
    <div className="flex flex-col pt-4 flex-grow">
      <p className="mb-4 font-bold">Create Topic Wise Assessment</p>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <select
            className="h-[31px] w-full rounded-full pl-4"
            value={selectedClass}
            onChange={(e) => handleChange(e, setSelectedClass)}
          >
            <option value="" disabled>
              Select Class
            </option>
            {renderOptions(classData)}
          </select>
          <select
            className="h-[31px] w-full rounded-full pl-4"
            value={selectedSubject}
            onChange={(e) => handleChange(e, setSelectedSubject)}
            disabled={!selectedClass}
          >
            <option value="" disabled>
              Select Subject
            </option>
            {renderSubjects()}
          </select>
          <select
            className="h-[31px] w-full rounded-full pl-4"
            value={selectedChapter}
            onChange={(e) => handleChange(e, setSelectedChapter)}
            disabled={!selectedSubject}
          >
            <option value="" disabled>
              Select Chapter
            </option>
            {renderChapters()}
          </select>
          <select
            className="h-[31px] w-full rounded-full pl-4"
            value={selectedTopic}
            onChange={(e) => handleChange(e, setSelectedTopic)}
            disabled={!selectedChapter}
          >
            <option value="" disabled>
              Select Topic
            </option>
            {renderTopics()}
          </select>
          <select
            className="h-[31px] w-full rounded-full pl-4"
            value={selectedLevel}
            onChange={(e) => handleChange(e, setSelectedLevel)}
          >
            <option value="" disabled>
              Select Hardness Level
            </option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <select
            className="h-[31px] w-full rounded-full pl-4"
            value={selectedType}
            onChange={(e) => handleChange(e, setSelectedType)}
          >
            <option value="" disabled>
              Select Question Type
            </option>
            <option value="Subjective">Subjective</option>
            <option value="Objective">Objective</option>
            <option value="Reading">Reading</option>
          </select>
          <select
            className="h-[31px] w-full rounded-full pl-4 col-span-2"
            value={totalQuestion}
            onChange={(e) => handleChange(e, setTotalQuestion)}
          >
            <option value="" disabled>
              Select Total No of Questions
            </option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>
        <button
          type="submit"
          className="h-12 w-24 bg-red-600 text-white rounded-full"
          disabled={
            !selectedTopic || !selectedType || !selectedLevel || isLoading
          }
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
