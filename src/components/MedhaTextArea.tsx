"use client"

import React, { useState, FormEvent, Dispatch, SetStateAction, useEffect } from 'react';
import TopicWiseForm from './TopicwiseForm';
import ExamForm from './ExamForm';
import { MdPreview, MdCatalog } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

interface Message {
  message: string;
  sender: string;
  direction?: string;
  isCode?: boolean;
}

const models3d = [
  {
    title: 'Photosynthesis process',
    embedLink: 'https://sketchfab.com/models/acb8f9771ac84986a70f9c5f5de9d2c0/embed',
    key: 'photosynthesis',
  },
  {
    title: 'Animated Realistic Heart',
    embedLink: 'https://sketchfab.com/models/cc339417fcd745afafaa01623405b69a/embed',
    key: 'heart',
  },
  {
    title: 'Birth of Star',
    embedLink: 'https://sketchfab.com/models/4c3421a983c0439da40508b637e89725/embed',
    key: 'star',
  },
];

interface MedhaTextAreaProps {
  messages: Message[];
  onSubmit: (e: any) => Promise<void>;
  loading: boolean;
  newText: string;
  setNewText: Dispatch<SetStateAction<string>>;
  startListening: () => Promise<void>;
  stopSpeaking: () => void;
  listening: boolean;
  isDone: boolean | undefined;
  setIsDone: Dispatch<SetStateAction<boolean>>;
  modelsToInsert: any;
  setModelsToInsert: any;
}

function MedhaTextArea({
  messages,
  onSubmit,
  loading,
  newText,
  setNewText,
  startListening,
  modelsToInsert,
  setModelsToInsert,
  stopSpeaking,
  listening,
  isDone,
  setIsDone,
}: MedhaTextAreaProps) {

  const [selectedOption, setSelectedOption] = useState('');
  const [testState, setTestState] = useState(true);

  function handleSubmit(e: any) {
    console.log(newText)
    const doWeHaveModel = models3d.findIndex((model) => newText.trim().toLowerCase().includes(model.key));
    console.log(doWeHaveModel)
    if (doWeHaveModel != -1) {
      const isModelAskedFor = models3d.findIndex((model) => newText.trim().toLowerCase().includes('3d'));
      console.log(isModelAskedFor)
      if (isModelAskedFor != -1) {
        setModelsToInsert((prevState: any) => {
          return [...prevState, { ...models3d[doWeHaveModel], showModel: false }]
        });
      }
    }
    if (newText.trim()) {
      onSubmit(e);
    }
  };

  useEffect(() => {
    if (isDone) {
      if (modelsToInsert.length > 0) {

        setModelsToInsert((prevModel: any) => {
          const modelsCopy = [...prevModel];
          if (modelsCopy[modelsCopy.length - 1].showModel == false) {
            modelsCopy[modelsCopy.length - 1].showModel = true;
            modelsCopy[modelsCopy.length - 1].appendIndex = messages.length - 1;
          }
          return modelsCopy;
        });
      }
      setIsDone(false);
    }
  }, [isDone]);

  return (
    <div className="bg-white bg-opacity-60 p-6 rounded-2xl flex flex-col h-[70vh] min-w-[683px]">
      <div className="flex flex-col sm:flex-row mb-4 space-y-4 sm:space-y-0 sm:space-x-4">
        <p className="font-bold text-lg">Medha AI</p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"></div>
      </div>

      {selectedOption === 'topic-wise' ? (
        <TopicWiseForm />
      ) : selectedOption === 'exam-form' ? (
        <ExamForm />
      ) : (
        <div className="bg-white pt-4 rounded-lg flex-grow flex flex-col overflow-hidden">
          <div className="pl-4 sm:pl-8 pr-4 sm:pr-8 flex-grow overflow-y-auto">
            {messages.map((message, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-start mb-2">
                  <img
                    src={
                      message.sender === 'ai'
                        ? './Medha.svg'
                        : '/Screenshot_2024-08-17_at_8.13.58_AM-removebg-preview 3.png'
                    }
                    alt="Placeholder"
                    className="h-4 w-4 rounded-full mr-4"
                  />
                  <p className={`text-xs sm:text-sm ${message.sender === 'user' ? 'font-semibold' : ''}`}>
                    {message.sender === 'user' || !index ? (
                      message.message
                    ) : (
                      <MdPreview
                        modelValue={message.message}
                        previewTheme="github"
                        style={{ height: '100%' }}
                        language="en-US"
                      />
                    )}
                    {modelsToInsert.findIndex((model3d: any) => model3d.appendIndex === index) !== -1 &&
                      modelsToInsert.find((model3d: any) => model3d.appendIndex === index)?.showModel && (
                        <iframe
                          title={modelsToInsert.find((model3d: any) => model3d.appendIndex === index).title}
                          allowFullScreen={true}
                          allow="autoplay; fullscreen; xr-spatial-tracking"
                          xr-spatial-tracking
                          execution-while-out-of-viewport
                          execution-while-not-rendered
                          web-share
                          src={modelsToInsert.find((model3d: any) => model3d.appendIndex === index).embedLink}
                        />
                      )}
                  </p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-start mb-2">
                <img src="./Medha.svg" alt="Placeholder" className="h-4 w-4 rounded-full mr-4" />
                <p className="text-xs sm:text-sm italic text-gray-500">Thinking...</p>
              </div>
            )}
          </div>
          <div className="mt-4 flex justify-center items-center space-x-4">
            <div className="relative w-full flex items-center">
              <button
                type="button"
                onClick={listening ? stopSpeaking : startListening}
                className=""
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 48 48"
                  fill={listening ? "#FF0000" : "#5D233C"}
                >
                  <path d="M 24 2 C 19.047281 2 15 6.0472805 15 11 L 15 26 C 15 30.952719 19.047281 35 24 35 C 28.952719 35 33 30.952719 33 26 L 33 11 C 33 6.0472805 28.952719 2 24 2 z M 10.476562 20.978516 A 1.50015 1.50015 0 0 0 9 22.5 L 9 26 C 9 33.760508 14.934038 40.16812 22.5 40.923828 L 22.5 45.5 A 1.50015 1.50015 0 1 0 25.5 45.5 L 25.5 40.923828 C 33.065962 40.16812 39 33.760508 39 26 L 39 22.5 A 1.50015 1.50015 0 1 0 36 22.5 L 36 26 C 36 32.585372 30.739679 37.894735 24.177734 37.990234 A 1.50015 1.50015 0 0 0 23.976562 37.978516 A 1.50015 1.50015 0 0 0 23.8125 37.990234 C 17.255134 37.889572 12 32.582085 12 26 L 12 22.5 A 1.50015 1.50015 0 0 0 10.476562 20.978516 z"></path>
                </svg>
              </button>
              <textarea
                className="w-full p-3 sm:p-4 pl-20 rounded-full border border-gray-300 h-10 sm:h-12 leading-[1rem] box-border text-xs sm:text-sm"
                placeholder="Message Medha"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
              ></textarea>
              <button
                onClick={handleSubmit}
                className="absolute right-0 w-[100px] sm:w-[136px] h-8 sm:h-[49px] bg-[#5D233C] text-white rounded-2xl flex items-center justify-center text-xs sm:text-sm"
                disabled={loading || !newText.trim()}
              >
                {loading ? 'Loading...' : 'Send'}
              </button>
            </div>
          </div>
          <div className="mt-2 flex justify-center">

          </div>
        </div>
      )}
    </div>
  );
}

export default MedhaTextArea;
