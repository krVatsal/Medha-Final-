import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Sidebar({ isMobileMenuOpen }: { isMobileMenuOpen: boolean }) {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: "/home.svg" },
    { href: "/aiTools", label: "AI Tools", icon: "/add_circle.svg" },
    { href: "/chat", label: "AI Chatbot", icon: "/Message square.svg" },
    { href: "/whiteboards", label: "Whiteboards", icon: "/Edit.svg" },
    { href: "/files", label: "Files", icon: "/Folder.svg" },
  ];

  const settingsItems = [
    { href: "/upgrade", label: "Upgrade Plan", icon: "/Arrow up-circle.svg" },
    {
      href: "/login",
      label: "Log Out",
      icon: "/Log out.svg",
      className: "text-red-600",
    },
  ];

  return (
    <div
      className={`bg-white h-full flex flex-col transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      <div className="flex-shrink-0 pt-6 md:pt-10">
        <h2 className="text-xs font-semibold text-gray-500 mb-2 px-4">
          OVERVIEW
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="space-y-1 px-2 md:px-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center py-2 px-2 md:px-3 rounded-lg transition-colors duration-150 ease-in-out ${
                pathname === item.href
                  ? "bg-gray-100 text-blue-600"
                  : "text-gray-900 hover:bg-gray-50"
              }`}
            >
              <div className="w-5 h-5 mr-3 text-center">
                <Image width={20} height={20} src={item.icon} alt="" />
              </div>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex-shrink-0 p-4">
        <h2 className="text-xs font-semibold text-gray-500 mb-3">SETTINGS</h2>
        {settingsItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center py-2 px-2 md:px-3 rounded-lg transition-colors duration-150 ease-in-out ${
              item.className || "text-gray-900 hover:bg-gray-50"
            }`}
          >
            <div className="w-5 h-5 mr-3">
              <Image width={20} height={20} src={item.icon} alt="" />
            </div>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
