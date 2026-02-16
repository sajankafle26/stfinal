"use client";
import React, { useEffect, useState } from "react";
import { apiService } from "@/services/apiService";
import type { Course } from "@/types";
import ClientCourseDetailsBridge from "./ClientCourseDetailsBridge";

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

export default function ClientCourseLoader({ slug }: { slug: string }) {
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    (async () => {
      const list = (await apiService.getCourses()) as Course[] | null;
      if (!list) return setCourse(null);
      const c =
        list.find((x) => x.slug === slug) ||
        list.find((x) => x.id === slug) ||
        list.find((x) => slugify(x.title) === slug) ||
        null;
      setCourse(c);
    })();
  }, [slug]);

  if (!course) {
    return (
      <div className="min-h-[40vh] grid place-items-center text-slate-500">
        Loading course…
      </div>
    );
  }

  return <ClientCourseDetailsBridge course={course} />;
}