'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Sidebar from '@/components/Sidebar';
import { useSelection } from '../context/SelectionContext'
import Navbar from '@/components/Navbar';
import { SelectionProvider } from '../context/SelectionContext';
import { useUser } from '@/context/UserContext';
import './globals.css';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { UserProvider } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import Institute from '@/components/Institute';
import { classDataValues } from '@/context/class_data';
function ProfileDropdown() {
  const router= useRouter()
  const [sclientName, setClientName] = useState<string | null>(null);
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

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5217/auth/logout', {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setClientName(null);
        localStorage.removeItem('clientName');
        router.push('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="absolute right-0 top-16 bg-white shadow-lg rounded-lg p-4 z-50 w-[90%] min-w-[200px]">
      <div className="flex flex-col gap-4">
      <Institute />
        <div className="flex items-center">
          <Image
            width={44}
            height={44}
            src="/Screenshot_2024-08-17_at_8.13.58_AM-removebg-preview 3.png"
            alt="User Avatar"
            className="w-6 h-6 xs:w-8 xs:h-8 sm:w-8 sm:h-8"
          />
          <div className="ml-2">
            <div className="font-bold">{clientName}</div>
            <div className="text-sm text-gray-600">Admin/Teacher</div>
          </div>
        </div>
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
        <div className="border-t pt-2">
          <button className="w-full text-left text-gray-700 hover:bg-gray-100 px-2 py-1 rounded" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showNavbar = pathname !== '/login' && pathname !== '/signup';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileMenuOpenProfile, setIsMobileMenuOpenProfile] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileMenuOpenProfile(false);
  }, [pathname]);

  return (
    <html lang="en" className="h-full">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
        <title>Medha</title>
      </head>
      <body className="font-inter h-full">
        <UserProvider>
          <SelectionProvider>
            <div className="flex flex-col h-full">
              {showNavbar && (
                <header className="md:hidden bg-gray-200 md:px-4 md:py-4 px-2 py-2 flex justify-between items-center z-20 relative">
                  <div className='bg-white flex p-4  w-full rounded-md '>
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-gray-500 focus:outline-none focus:text-gray-800"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                
                  <div className="flex justify-center items-center flex-grow">
                    <div className="flex items-center space-x-2">
                      <Image src="/Codepen.svg" width={70} height={70} alt="Medha Icon" className="object-contain" />
                      <span className="text-2xl font-[500] text-gray-800">Medha</span>
                    </div>
                  </div>
                
                  <div className="flex items-center relative">
                    <Image
                      src="/icon.svg"
                      alt="Dropdown Icon"
                      width={32}
                      height={32}
                      className="object-contain cursor-pointer"
                      onClick={() => setIsMobileMenuOpenProfile(!isMobileMenuOpenProfile)}
                    />
                    {isMobileMenuOpenProfile && <ProfileDropdown />}
                  </div>
                  </div>
                </header>
              )}

              <div className="flex flex-1 h-full overflow-hidden">
                {showNavbar && (
                  <>
                    {isMobileMenuOpen && (
                      <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                      ></div>
                    )}

                    <div
                      className={`fixed md:static top-0 left-0 h-full w-64 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
                        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                      } md:translate-x-0 md:w-1/4 lg:w-1/6 md:flex-shrink-0 overflow-y-auto flex flex-col`}
                    >
                      <div className="flex items-center px-4 py-5">
                      <div className="w-16 h-[58px] relative flex-shrink-0 -mr-[7px]">
                          <Image src="/Codepen.svg" fill objectFit="contain" alt="Medha Icon" />
                        </div>
                        <span className="text-xl font-[500] text-gray-800">Medha</span>
                      </div>
                      <div className="flex-grow overflow-y-auto">
                        <Sidebar isMobileMenuOpen={isMobileMenuOpen} />
                      </div>
                    </div>
                  </>
                )}

                <main className="flex-1 flex flex-col overflow-hidden bg-gray-200 min-h-0">
                  {showNavbar && (
                    <div className="px-8 py-5 bg-gray-200 border-gray-200">
                      <Navbar />
                    </div>
                  )}
                  <div className="flex-1 overflow-auto pl-5 sm:pl-11 pr-5 sm:pr-11">{children}</div>
                </main>
              </div>
            </div>
          </SelectionProvider>
        </UserProvider>
      </body>
    </html>
  );
}