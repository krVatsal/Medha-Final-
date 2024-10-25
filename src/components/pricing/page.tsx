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
    <div className="min-h-screen p-8 flex items-center justify-center">
      <div className="bg-[#EBEBED] rounded-[2rem] p-6 w-full max-w-6xl shadow-lg">
        <table className="w-full table-fixed border-separate border-spacing-x-4 border-spacing-y-0">
          <thead>
            <tr>
              <th className="w-1/4 bg-[#EBEBED]"></th>
              {[...Array(4)].map((_, index) => (
                <th
                  key={index}
                  style={{ backgroundColor: columnColors[index] }}
                  className="text-center rounded-t-lg p-4"
                >
                  <Skeleton className="h-6 w-24 mx-auto mb-2" />
                  <Skeleton className="h-8 w-32 mx-auto mb-2" />
                  <Skeleton className="h-4 w-20 mx-auto" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(6)].map((_, rowIndex) => (
              <tr key={rowIndex}>
                <td
                  className={`bg-[#EBEBED] p-4 text-lg font-semibold text-left
                    ${rowIndex === 5 ? "rounded-bl-lg" : ""}`}
                >
                  <Skeleton className="h-6 w-32" />
                </td>
                {[...Array(4)].map((_, colIndex) => (
                  <td
                    key={colIndex}
                    style={{ backgroundColor: columnColors[colIndex] }}
                    className={`p-4 text-center border-l border-gray-300
                      ${
                        rowIndex === 5
                          ? colIndex === 3
                            ? "rounded-b-lg"
                            : ""
                          : ""
                      }`}
                  >
                    <Skeleton className="h-6 w-24 mx-auto" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
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
    <div className="min-h-screen p-8 flex items-center justify-center">
      <div className="bg-[#EBEBED] rounded-[2rem] p-6 w-full max-w-6xl shadow-lg">
        <table className="w-full table-fixed border-separate border-spacing-x-4 border-spacing-y-0">
          <thead>
            <tr>
              <th className="w-1/4 bg-[#EBEBED]"></th>
              {plans.map((plan, index) => (
                <th
                  key={index}
                  style={{ backgroundColor: columnColors[index] }}
                  className="text-center rounded-t-lg p-4"
                >
                  <div className="font-bold text-xl">{plan.plan}</div>
                  <div className="text-2xl mt-2">{plan.price}</div>
                  <div className="text-gray-500">{plan.period}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr key={index}>
                <td
                  className={`bg-[#EBEBED] p-4 text-lg font-semibold text-left
                    ${index === features.length - 1 ? "rounded-bl-lg" : ""}`}
                >
                  {feature.label}
                </td>
                {feature.values.map((value, i) => (
                  <td
                    key={i}
                    style={{ backgroundColor: columnColors[i] }}
                    className={`p-4 text-center border-l border-gray-300
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
  );
};

export default PricingTable;