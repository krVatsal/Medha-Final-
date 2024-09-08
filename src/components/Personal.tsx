import React from "react";
import Image from "next/image";

function Personal() {
  return (
    <div className="p-2 sm:p-4">
      <div className="flex items-center justify-end gap-1 xs:gap-2 sm:gap-4">
        <button className="p-1 sm:p-2 bg-gray-100 rounded-full flex-shrink-0">
          <Image width={40} height={40} src="/bell.svg" alt="Notification" className="w-4 h-4 xs:w-5 xs:h-5 sm:w-10 sm:h-10" />
        </button>

        <button className="p-1 sm:p-2 bg-gray-100 rounded-full flex-shrink-0">
          <Image width={40} height={40} src="/Ellipse 21.svg" alt="Profile Icon" className="w-4 h-4 xs:w-5 xs:h-5 sm:w-10 sm:h-10" />
        </button>

        <div className="hidden sm:block w-[1px] h-[30px] bg-[#B3B4B9]"></div>

        <div className="flex items-center min-w-0">
          <div className="flex-shrink-0">
            <Image
              width={32}
              height={32}
              src="/Screenshot_2024-08-17_at_8.13.58_AM-removebg-preview 3.png"
              alt="User Avatar"
              className="w-6 h-6 xs:w-8 xs:h-8 sm:w-8 sm:h-8"
            />
          </div>
          <div className="flex flex-col justify-center pl-1 xs:pl-2 min-w-0 max-w-[100px] xs:max-w-[120px] sm:max-w-none">
            <div className="text-black text-xs xs:text-sm sm:text-base font-bold truncate">Your Name</div>
            <div className="text-[10px] xs:text-xs sm:text-sm text-gray-800 truncate">Your role</div>
          </div>
        </div>

        <div className="hidden xs:flex flex-col justify-center pl-1 xs:pl-2 min-w-0 max-w-[80px] xs:max-w-[100px] sm:max-w-none">
          <div className="text-black text-[10px] xs:text-xs sm:text-sm font-semibold truncate">Institute</div>
          <div className="text-[8px] xs:text-[10px] sm:text-xs text-gray-600 truncate">Department</div>
        </div>
      </div>
    </div>
  );
}

export default Personal;