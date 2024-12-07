'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSelection } from '../context/SelectionContext';
import { useUser } from '@/context/UserContext';
import { classDataValues } from '@/context/class_data';

function Institute() {
  return (
    <div className="flex flex-row items-center mb-4">
      <div className="mr-2">
        <Image width={40} height={40} src="/myinstitution.svg" alt="Institution Logo" />
      </div>
      <div className="flex flex-col">
        <div className="text-black text-base font-bold">My Institute</div>
        <div className="flex flex-row text-xs text-black gap-1">
          <div>My Class</div>
          <div>|</div>
          <div>Home</div>
        </div>
      </div>
    </div>
  );
}

function Personal() {
  const { clientName } = useUser();
  const { language, setLanguage, classNumber, setClassNumber, subject, setSubject, setDataContext } = useSelection();

  const [classData, setClassData] = useState<any>({});
  const [selectedClass, setSelectedClass] = useState<string>(classNumber || '');
  const [selectedSubject, setSelectedSubject] = useState<string>(subject || '');

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const data = classDataValues;
        setClassData(data);
        setDataContext(data['6']['Science']);
      } catch (error) {
        console.error('Error fetching class data:', error);
      }
    };

    fetchClassData();
  }, []);

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClass = e.target.value;
    setSelectedClass(selectedClass);
    setSelectedSubject('');
    setClassNumber(selectedClass);
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSubject = e.target.value;
    setSelectedSubject(selectedSubject);
    setSubject(selectedSubject);
    setDataContext(classData[selectedClass][selectedSubject]);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => setLanguage(e.target.value);

  return (
    <div className="relative">


      {/* Collapsible Menu for Mobile */}


      {/* Desktop View */}
      <div className="hidden sm:flex items-center justify-end gap-80">
        <div>
        <Institute />
        </div>
        <div className='flex gap-4'>
        <select value={language} onChange={handleLanguageChange} className="rounded-full h-[40px] pl-4">
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
        </select>
        <select value={selectedClass} onChange={handleClassChange} className="rounded-full h-[40px] pl-4">
          <option value="" disabled>
            Select Class
          </option>
          {Object.keys(classData).map((classOption) => (
            <option key={classOption} value={classOption}>
              {classOption}
            </option>
          ))}
        </select>
        <select
          value={selectedSubject}
          onChange={handleSubjectChange}
          className="rounded-full h-[40px] pl-4"
          disabled={!selectedClass}
        >
          <option value="" disabled>
            Select Subject
          </option>
          {Object.keys(classData[selectedClass] || {}).map((subjectOption) => (
            <option key={subjectOption} value={subjectOption}>
              {subjectOption}
            </option>
          ))}
        </select>
        <div className="flex items-center">
          <Image
            width={32}
            height={32}
            src="/Screenshot_2024-08-17_at_8.13.58_AM-removebg-preview 3.png"
            alt="User Avatar"
            className="w-6 h-6 xs:w-8 xs:h-8 sm:w-8 sm:h-8"
          />
          <div className="ml-2">
            <div className="font-bold">{clientName}</div>
            <div className="text-sm text-gray-600">Admin/Teacher</div>
          </div>
        </div>
      </div>
      </div>
     </div>
  );
}

export default Personal;
