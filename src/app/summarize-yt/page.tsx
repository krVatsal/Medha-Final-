'use client';
import React, { useCallback, useEffect, useState } from 'react';
import CreationArea from '@/components/CreationArea';
import AIToolsSteps from '@/components/AIToolsSteps';
import { Socket, io } from 'socket.io-client';
import { useSelection } from '@/context/SelectionContext';
import { MdPreview } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import axios from 'axios';

const RE_YOUTUBE = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36,gzip(gfe)';
const RE_XML_TRANSCRIPT = /<text start="([^"]*)" dur="([^"]*)">([^<]*)<\/text>/g;

function Summarizeyt() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [youtubeSummaryMd, setYoutubeSummaryMd] = useState('');
  const [loading, setLoading] = useState(false);
  const { subject, classNumber, language } = useSelection();
  const [requestURL, setRequestURL] = useState('');

  const updateMessages = useCallback((content: string) => {
    setYoutubeSummaryMd((prevLessonPlanMd) => {
      if (prevLessonPlanMd.endsWith(content)) {
        return prevLessonPlanMd;
      }
      return prevLessonPlanMd + content;
    });
  }, []);

  useEffect(() => {
    const newSocket = io('https://medha.cograd.in', {
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
      if (data.content === '[START]') {
        const aiMessage = {
          message: '',
          sender: 'ai',
          direction: 'incoming',
          isCode: false,
        };
        setLoading(false);
      } else {
        updateMessages(data.content);
      }
    });

    setSocket(newSocket);

    return () => {
      setYoutubeSummaryMd('');
      newSocket.disconnect();
    };
  }, []);

  console.log(requestURL);

  const requestYouTubeSummary = async () => {
    if (socket) {
      setLoading(true);
      socket.emit('request', {
        subject,
        videoURL: requestURL,
        classNumber,
        language,
        type: 'youtube_summ',
      });
    } else {
      console.error('Socket is not connected');
    }
  };

  return youtubeSummaryMd.length === 0 && !loading ? (

    <div className="p-1 md:pt-0">
      {/* Greeting Section */}
      <div className="sm:space-y-1 items-center  flex flex-row justify-between  sm:items-center">
        <div className=" text-lg sm:text-3xl md:text-4xl lg:text-[40px] font-[550] mb-4 sm:mb-0">
          Summarize Youtube Video
        </div>
        <div className='l-4 sm:l-0'>
        <AIToolsSteps page="link" type="yt" />
      </div>
      </div>
      
      <div>
      <div className=" pb-4">
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
        <CreationArea
          page="yt"
          requestLessonPlan={undefined}
          requestYoutubeSummary={requestYouTubeSummary}
          setSelectedText={setRequestURL}
        />
      </div>
    </div>
  ) : (
    <>
      <div className="space-y-1 mb-6 sm:mb-8 md:mb-10 lg:mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-center sticky">
        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold mb-4 sm:mb-0">
          {loading ? 'Creating Summary' : 'Summary'}
        </div>
        <AIToolsSteps page="Summary" type="yt" />
      </div>
      <MdPreview modelValue={youtubeSummaryMd} previewTheme="github" style={{ height: '100%' }} language="en-US" />
    </>
  );
}

export default Summarizeyt;
