"use client";

import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showNavbar = pathname !== "/login" && pathname !== "/signup";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <div className="flex flex-col h-full">
          {showNavbar && (
            <header className="md:hidden bg-gray-200 px-4 py-4 flex justify-between items-center z-20">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-500 focus:outline-none focus:text-gray-800"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              {/* Medha logo and text, larger icon and centered */}
              <div className="flex justify-center items-center flex-grow">
                <div className="flex items-center space-x-2">
                  <Image
                    src="/Codepen.svg"
                    width={70} // Larger icon size
                    height={70}
                    alt="Medha Icon"
                    className="object-contain"
                  />
                  <span className="text-2xl font-semibold text-gray-800">
                    Medha
                  </span>
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

                {/* Sidebar */}
                <div
                  className={`fixed md:static top-0 left-0 h-full w-64 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
                    isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                  } md:translate-x-0 md:w-1/4 lg:w-1/6 md:flex-shrink-0 overflow-y-auto flex flex-col`}
                >
                  <div className="flex items-center px-4 py-5 border-b border-gray-200">
                    <div className="w-16 h-[58px] relative mr-3 flex-shrink-0">
                      <Image
                        src="/Codepen.svg"
                        layout="fill"
                        objectFit="contain"
                        alt="Medha Icon"
                      />
                    </div>
                    <span className="text-xl font-semibold text-gray-800 truncate">
                      Medha
                    </span>
                  </div>
                  <div className="flex-grow overflow-y-auto">
                    <Sidebar isMobileMenuOpen={isMobileMenuOpen} />
                  </div>
                </div>
              </>
            )}

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden bg-gray-200 min-h-0">
              {showNavbar && (
                <div className="px-8 py-5 bg-gray-200 border-b border-gray-200">
                  <Navbar />
                </div>
              )}
              <div className="flex-1 overflow-auto p-8">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
