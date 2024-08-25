function ChatHistoryArea({ questions }: { questions: string[] }) {
  return (
    <div className="bg-white bg-opacity-60 p-6 rounded-2xl shadow-lg flex flex-col h-[60vh]">
      <p className="font-bold text-lg mb-4">Chat History</p>
      <div className="bg-white pt-4 rounded-lg shadow-lg flex-grow flex flex-col overflow-hidden">
        <div className="flex flex-col pt-2 pl-8">
          <button className="bg-gray-200 bg-opacity-60 rounded-xl h-8 w-32 mb-4">
            + New Chat
          </button>
          <p className="text-sm mb-4">Recent</p>
        </div>
        <div className="pl-8 flex-grow overflow-y-auto">
          {questions.map((question, index) => (
            <button key={index} className="flex items-center mb-2">
              <img
                src="/Chat_bubble.svg"
                alt="Placeholder"
                className="h-4 w-4 rounded-full mr-4"
              />
              <p className="text-sm">{question}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatHistoryArea;
