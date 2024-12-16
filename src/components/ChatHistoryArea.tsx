import Image from 'next/image';

function ChatHistoryArea({ questions }: { questions: string[] }) {
  const truncateText = (text: string, maxLength: number): string => {
    if (typeof text !== 'string') {
      console.error('Expected string for truncation, got:', typeof text);
      return '';
    }
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-white bg-opacity-60 p-[15px] pb-[7px] rounded-3xl flex flex-col h-[388px] ">
      <p className="font-[550] text-lg mb-4">Chat History</p>
      <div className="bg-white pt-4 rounded-xl flex-grow flex flex-col overflow-hidden">
        <div className="flex flex-col pt-2 pl-2">
          <button className="bg-gray-200 bg-opacity-60 rounded-full h-8 w-32 mb-4">+ New Chat</button>
          <p className="font-[550] text-sm mb-4">Recent</p>
        </div>
        <div className="pl-2 flex-grow overflow-y-auto ">
          {questions.map((question, index) => (
            <button key={index} className="flex items-center mb-2 w-full text-left">
              <Image
                src="/Chat_bubble.svg"
                alt="Chat bubble"
                className="h-4 w-4 rounded-full mr-2"
                width={20}
                height={20}
              />
              <p className="-pl-3 text-sm flex-grow truncate">{truncateText(question, 30)}</p>
            </button>
          ))}
        </div>
      </div>
      <div className="flex pt-2"></div>
    </div>
  );
}

export default ChatHistoryArea;
