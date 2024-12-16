"use client"
import React, { useState, useEffect } from 'react';
import { features, plans } from "./PricingData";
import { Skeleton } from "../ui/skeleton";

const columnColors = [
  "#FBFBFF", // Color for Plan A
  "#37A6C4", // Color for Plan B
  "#B7385A", // Color for Plan C
  "#E96B36", // Color for Plan D
];

const PricingTableSkeleton = () => {
  return (
    <div className="min-h-screen p-4 sm:p-8 flex items-center justify-center">
      <div className="bg-[#EBEBED] rounded-[1rem] sm:rounded-[2rem] p-4 sm:p-6 w-full min-w-20 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed border-separate border-spacing-x-20 sm:border-spacing-x-4 border-spacing-y-3">
            <thead>
              <tr>
                <th className="sm:w-1/4 w-1/3 bg-[#EBEBED]"></th>
                {[...Array(4)].map((_, index) => (
                  <th
                    key={index}
                    style={{ backgroundColor: columnColors[index] }}
                    className="text-center rounded-t-lg p-2 sm:p-4"
                  >
                    <Skeleton className="h-4 sm:h-6 w-16 sm:w-24 mx-auto mb-2" />
                    <Skeleton className="h-6 sm:h-8 w-24 sm:w-32 mx-auto mb-2" />
                    <Skeleton className="h-3 sm:h-4 w-12 sm:w-20 mx-auto" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(6)].map((_, rowIndex) => (
                <tr key={rowIndex}>
                  <td
                    className={`bg-[#EBEBED] p-2 sm:p-4 text-sm sm:text-lg font-semibold text-left
                      ${rowIndex === 5 ? "rounded-bl-lg" : ""}`}
                  >
                    <Skeleton className="h-4 sm:h-6 w-24 sm:w-32" />
                  </td>
                  {[...Array(4)].map((_, colIndex) => (
                    <td
                      key={colIndex}
                      style={{ backgroundColor: columnColors[colIndex] }}
                      className={`p-2 sm:p-4 text-center border-l border-gray-300
                        ${
                          rowIndex === 5
                            ? colIndex === 3
                              ? "rounded-b-lg"
                              : ""
                            : ""
                        }`}
                    >
                      <Skeleton className="h-4 sm:h-6 w-16 sm:w-24 mx-auto" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const PricingTable = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <PricingTableSkeleton />;
  }

  return (
    <div className="min-h-screen p-2 sm:p-8 flex sm:items-center justify-center">
      <div className="bg-[#EBEBED] rounded-[1rem] sm:rounded-[2rem] p-4 sm:p-6 w-full max-w-6xl shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed border-separate border-spacing-x-2 sm:border-spacing-x-4 border-spacing-y-0">
            <thead>
              <tr>
                <th className="w-1/4 bg-[#EBEBED]"></th>
                {plans.map((plan, index) => (
                  <th
                    key={index}
                    style={{ backgroundColor: columnColors[index] }}
                    className="text-center rounded-t-lg p-2 sm:p-4"
                  >
                    <div className="font-bold text-md  sm:text-xl">{plan.plan}</div>
                    <div className="text-lg sm:text-2xl mt-1 sm:mt-2">{plan.price} <sup className="text-black text-xs sm:text-sm ">{plan.period}</sup></div>
                    
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={index}>
                  <td
                    className={`bg-[#EBEBED] p-2 sm:p-4 text-sm sm:text-lg font-semibold text-left
                      ${index === features.length - 1 ? "rounded-bl-lg" : ""}`}
                  >
                    {feature.label}
                  </td>
                  {feature.values.map((value, i) => (
                    <td
                      key={i}
                      style={{ backgroundColor: columnColors[i] }}
                      className={`p-2 sm:p-4 text-center border-l border-gray-300 text-xs sm:text-base
                        ${
                          index === features.length - 1
                            ? i === feature.values.length - 1
                              ? "rounded-b-lg"
                              : ""
                            : ""
                        }`}
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PricingTable;