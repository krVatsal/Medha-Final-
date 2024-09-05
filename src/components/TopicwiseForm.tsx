import React, { useState, useEffect } from "react";

export default function TopicWiseForm() {
  const [classData, setClassData] = useState({});
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [totalQuestion, setTotalQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchClassData();
  }, []);

  const fetchClassData = async () => {
    try {
      const response = await fetch("https://game.simplem.in/api/class-data");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setClassData(data);
    } catch (error) {
      console.error("Error fetching class data:", error);
    }
  };

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

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

      const responseData = await response.json();
      // Placeholder for redirection logic. Use next/router when you're ready.
      console.log("Form submitted successfully:", responseData);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderOptions = (options) => {
    return Object.keys(options).map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ));
  };

  const renderSubjects = () => {
    if (!selectedClass) return null;
    return renderOptions(classData[selectedClass]);
  };

  const renderChapters = () => {
    if (!selectedClass || !selectedSubject) return null;
    const subjects = classData[selectedClass];
    const subjectData = subjects[selectedSubject];
    if (!subjectData) return null;

    return subjectData.map((chapterObject, index) => {
      const chapterName = Object.keys(chapterObject)[0];
      return (
        <option key={index} value={chapterName}>
          {chapterName}
        </option>
      );
    });
  };

  const renderTopics = () => {
    if (!selectedClass || !selectedSubject || !selectedChapter) return null;

    const subjects = classData[selectedClass];
    if (!subjects) return null;

    const subjectData = subjects[selectedSubject];
    if (!subjectData) return null;

    const chapterObject = subjectData.find(
      (chapterObj) => Object.keys(chapterObj)[0] === selectedChapter
    );
    if (!chapterObject) return null;

    const topics = chapterObject[selectedChapter];
    if (!topics || !Array.isArray(topics)) return null;

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
            {Object.keys(classData).map((className) => (
              <option key={className} value={className}>
                {className}
              </option>
            ))}
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
              Select Hardness level
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
