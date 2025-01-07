'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

interface SelectableOptionsProps {
  heading: string;
  options: string[];
  iconSrc?: string;
  initialSelected?: string;
  onSelectionChange?: (selected: string) => void;
}

const SelectableOptions: React.FC<SelectableOptionsProps> = ({
  heading,
  options,
  iconSrc = '/outcome.svg',
  initialSelected,
  onSelectionChange,
}) => {
  const [selectedOption, setSelectedOption] = useState(initialSelected || options[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onSelectionChange) {
      onSelectionChange(option);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="bg-white sm:p-6 rounded-2xl w-full h-auto">
        <div className="flex  sm:flex-row gap-4 mb-4 items-center">
          {iconSrc && (
            <div className="relative w-5 h-5">
              <Image src={iconSrc} alt={`${heading} icon`} fill className="object-contain" />
            </div>
          )}
          <div>{heading}</div>
        </div>
        
        {/* Mobile Dropdown */}
        <div className="sm:hidden relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-4 py-2 truncate bg-gray-100 border border-[#1F4467] rounded-xl flex justify-between items-center"
          >
            <span>{selectedOption}</span>
            <ChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg">
              {options.map((option) => (
                <button
                  key={option}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-50  ${
                    selectedOption === option ? 'bg-[#1F4467] text-white hover:bg-[#1F4467]' : ''
                  }`}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden sm:flex flex-row gap-2 flex-wrap">
          {options.map((option) => (
            <button
              key={option}
              className={`px-4 py-2 rounded-xl text-left ${
                selectedOption === option ? 'bg-[#1F4467] text-white' : 'bg-gray-100 border border-[#1F4467]'
              }`}
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectableOptions;