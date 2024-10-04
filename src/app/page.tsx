"use client";
import Image from "next/image";
import EnterClassroomArea from "@/components/EnterClassroomArea";
import MyAppsArea from "@/components/MyAppsArea";
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { clientName } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      // Redirect to login if token is missing
      router.push('/login');
    } else {
      // Allow page to load after the token check is done
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return null; // or a loading spinner if you'd like
  }

  return (
    <div className="pr-2 pt-10 ">
      {/* Greeting Section */}
      <div className="space-y-1 mb-12">
        <div className="text-[40px] font-bold">
          Good Morning {clientName?.split(" ")[0]}!
        </div>
        <div className="text-[20px] text-gray-500">
          Let&apos;s make this day productive
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex space-x-5">

        <div className="flex-1 flex ">
          <MyAppsArea />
        </div>
        <EnterClassroomArea/>
      </div>
    </div>
  );
}
