'use client';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useSelection } from '@/context/SelectionContext';

interface ChapterObject {
  [chapterName: string]: string[];
}

interface SubjectObject {
  [subjectName: string]: ChapterObject[];
}

interface ClassData {
  [className: string]: SubjectObject;
}

export default function TopicWiseForm() {
  const router = useRouter();
  const { classNumber, subject } = useSelection();
  const [classData, setClassData] = useState<ClassData>({});
  const [selectedChapter, setSelectedChapter] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [totalQuestion, setTotalQuestion] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchClassData();
  }, []);

  const fetchClassData = async (): Promise<void> => {
    try {
      const response = await fetch('https://game.simplem.in/api/class-data');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data: ClassData = await response.json();
      setClassData(data);
    } catch (error) {
      console.error('Error fetching class data:', error);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement>,
    setter: React.Dispatch<React.SetStateAction<string>>,
  ): void => {
    setter(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    if (
      !classNumber ||
      !subject ||
      !selectedChapter ||
      !selectedTopic ||
      !selectedLevel ||
      !selectedType ||
      !totalQuestion
    ) {
      alert('Please fill in all fields.');
      setIsLoading(false);
      return;
    }

    const payload = {
      class: classNumber,
      subject: subject,
      chapter: selectedChapter,
      topic: selectedTopic,
      type: selectedType,
      level: selectedLevel,
      totalQuestion: totalQuestion,
    };

    try {
      const response = await fetch('https://game.simplem.in/api/submit-topic-wise-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();
      if (Array.isArray(responseData.content) && responseData.content.length > 0) {
        // Push the assessment data to browser history state and navigate to assessment page
        window.history.pushState(
          { data: responseData.content, type: selectedType },
          '',
          '/topicwiseform/assesment'
        );
        router.push('/topicwiseform/assesment');
      } else {
        console.error('Unexpected response structure:', responseData);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderChapters = (): JSX.Element[] | null => {
    if (!classNumber || !subject) return null;
    const subjects = classData[classNumber];
    const subjectData = subjects?.[subject];
    if (!subjectData) return null;

    return subjectData.map((chapterObject) => {
      const chapterName = Object.keys(chapterObject)?.[0];
      return (
        <option key={chapterName} value={chapterName}>
          {chapterName}
        </option>
      );
    });
  };

  const renderTopics = (): JSX.Element[] | null => {
    if (!classNumber || !subject || !selectedChapter) return null;

    const subjects = classData[classNumber];
    const subjectData = subjects?.[subject];
    const chapterObject = subjectData?.find((chapterObj) => Object.keys(chapterObj)?.[0] === selectedChapter);
    const topics = chapterObject?.[selectedChapter];
    if (!Array.isArray(topics)) return null;

    return topics.map((topic, index) => (
      <option key={index} value={topic}>
        {topic}
      </option>
    ));
  };

  return (
    <div>
      <div>
        <div className="pl-2">
          <button
            onClick={() => window.history.back()}
            className="bg-white text-gray-800 text-small h-[29px] w-[76px] rounded-full shadow hover:bg-gray-200 transition flex items-center justify-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12l7.5-7.5M21 12H3"
              />
            </svg>
            Back
          </button>
        </div>
      </div>

      <div className="w-full  min-h-screen pt-6">
        <div className="w-full ml-1 max-w-md mx-auto bg-[#F3F4F8] p-[15px] rounded-xl">
          <p className="mb-4 font-bold">Create Topic Wise Assessment</p>
          <div className="bg-white bg-opacity-60 p-6 min-h-[410px] rounded-2xl flex flex-col pt-4">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 mb-4">
                <select
                  className="border-[1px] border-gray-300 h-[31px] w-full rounded-full pl-4 text-gray-700"
                  value={selectedChapter}
                  onChange={(e) => handleChange(e, setSelectedChapter)}
                >
                  <option value="" disabled>
                    Select Chapter
                  </option>
                  {renderChapters()}
                </select>
                <select
                  className="border-[1px] border-gray-300 h-[31px] w-full rounded-full pl-4 text-gray-700"
                  value={selectedTopic}
                  onChange={(e) => handleChange(e, setSelectedTopic)}
                >
                  <option value="" disabled>
                    Select Topic
                  </option>
                  {renderTopics()}
                </select>
                <select
                  className="border-[1px] border-gray-300 h-[31px] w-full rounded-full pl-4 text-gray-700"
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
                  className="border-[1px] border-gray-300 h-[31px] w-full rounded-full pl-4 text-gray-700"
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
                  className="border-[1px] border-gray-300 h-[31px] w-full rounded-full pl-4 text-gray-700"
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
                className="h-12 w-24 bg-[#5D233C] text-white rounded-full"
                disabled={!selectedTopic || !selectedType || !selectedLevel || isLoading}
              >
                {isLoading ? 'Loading...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}