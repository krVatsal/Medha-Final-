"use client"
import React, { useCallback, useEffect, useRef, useState } from 'react';
import CreationArea from '@/components/CreationArea';
import AIToolsSteps from '@/components/AIToolsSteps';
import { Socket, io } from 'socket.io-client';
import { useSelection } from '@/context/SelectionContext';
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import HomeworkOutline from '@/components/HomeworkOutline';
import Image from 'next/image';

function PPTCreation() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [pptOutline, setpptOutline] = useState([])
  const [theme, setTheme] = useState()
  const [loading, setLoading] = useState(false);
  const { subject, classNumber, language } = useSelection();
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const newSocket = io('https://teach.cograd.in', {
      path: '/socket.io',
    });

    newSocket.on('connect', () => {
      console.log('Socket.IO Connected');
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('Socket.IO Disconnected');
      setIsConnected(false);
    });

    newSocket.on('error', (data: { message: string }) => {
      console.error('Socket.IO Error:', data);
    });

    newSocket.on('response', async (data: any) => {
      let ppt_outline = data;
      if (ppt_outline.type === "ppt_outline") {
        setLoading(false)
        setpptOutline(ppt_outline.content)
      }
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
      setpptOutline([])
    };
  }, []);

  const downloadPptx = async () => {
    setLoading(true)
    try {
      const response = await fetch('/ppt-generator/generate-ppt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pptOutline, subject,
          selectedTopic,
          classNumber,
          language,
          theme: selectedTheme
        })
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${selectedTopic}.pptx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Failed to download the file');
      }
      setLoading(false)
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

  const requestPPTOutline = () => {
    if (socket) {
      setLoading(true);
      socket.emit('request', {
        subject,
        selectedTopic,
        classNumber,
        language,
        type: 'ppt_outline',
        theme: selectedTheme
      });
    } else {
      console.error('Socket is not connected');
    }
  };
  console.log(pptOutline)

  return pptOutline.length === 0 ? (
    <div className=" max-w-7xl mx-auto container">
      {/* Greeting Section */}
      <div className="space-y-1 mb-12 flex justify-between">
        <div className="text-[40px] font-bold">PPT Creation</div>
        <AIToolsSteps page="topic" type="ppt" />
      </div>

      <div>
        <CreationArea isLoading={loading}
          setSelectedTheme={setSelectedTheme} setSelectedText={setSelectedTopic} requestLessonPlan={requestPPTOutline} page="ppt" buttonLoading={loading} />
      </div>
    </div>
  ) : (
    <div className=" max-w-7xl mx-auto container">
      {/* Greeting Section */}
      <div className="space-y-1 mb-12 flex justify-between sticky">
        <div className="text-[40px] font-bold">PPT Outline</div>
        <AIToolsSteps page="outline" type="ppt" />
      </div>

      <div>
        {pptOutline.map((slide: any, slideIndex) => (
          <div key={slideIndex}>
            <div className="bg-white p-6 rounded-2xl w-full h-auto my-4">
              <div className="flex flex-col gap-4 w-full">
                <div className="text-gray-500">
                  Slide {slideIndex + 1} : {slide}
                </div>
              </div>
            </div>
          </div>
        ))}
        <button
          className="text-white bg-[#5D233C] p-4 mt-6 rounded-full px-6 mb-4"
          onClick={() => downloadPptx()}
          disabled={loading}
        >
          {loading ? "Generating" : "Download PPT"}
        </button>
      </div>
    </div>
  );
}

export default PPTCreation;