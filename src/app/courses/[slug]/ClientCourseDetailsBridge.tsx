"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import type { Course } from "@/types";
import CourseDetails from "@/components/CourseDetails";
import VideoCoursePlayer from "@/components/VideoCoursePlayer";

export default function ClientCourseDetailsBridge({ course }: { course: Course }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (session) {
      checkEnrollment();
    } else {
      setChecking(false);
    }
  }, [session, course.id]);

  const checkEnrollment = async () => {
    try {
      const res = await axios.get("/api/user/enrolled-courses");
      const enrolled = res.data.some((c: any) => c._id === (course as any)._id || c.id === course.id);
      setIsEnrolled(enrolled);
    } catch (err) {
      console.error(err);
    } finally {
      setChecking(false);
    }
  };

  if (checking) return <div className="min-h-screen bg-[#0a1118] flex items-center justify-center text-white">Verifying Access...</div>;

  if (isEnrolled && (course as any).lessons) {
    return <VideoCoursePlayer course={course} onBack={() => router.back()} />;
  }

  return (
    <CourseDetails course={course} onBack={() => router.back()} />
  );
}