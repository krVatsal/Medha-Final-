"use client";
import React, { useState } from "react";
import Image from "next/image";

const DesiredOutcome = () => {
  const [selectedOutcome, setSelectedOutcome] = useState("Knowledge");

  const outcomes = [
    "Knowledge",
    "Skill",
    "Attitude",
    "Affective",
    "Behavioural",
  ];

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="bg-white p-6 rounded-2xl w-full h-auto">
        <div className="flex flex-row gap-4 mb-4 items-center">
          <div className="relative w-5 h-5">
            <Image
              src="/outcome.svg"
              alt="Outcome icon"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div>Desired Outcome</div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {outcomes.map((outcome) => (
            <button
              key={outcome}
              className={`px-4 py-2 rounded-md ${
                selectedOutcome === outcome
                  ? "bg-[#1F4467] text-white"
                  : "bg-gray-100 border border-gray-300"
              }`}
              onClick={() => setSelectedOutcome(outcome)}
            >
              {outcome}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesiredOutcome;
