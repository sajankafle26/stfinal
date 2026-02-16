import type { Metadata } from "next";
import ClientCourseLoader from "./client-only-loader";

import { COURSES } from "@/constants";
import dbConnect from "@/lib/dbConnect";
import LiveCourse from "@/models/LiveCourse";

export async function generateMetadata({ params }: { params: { slug: string } | Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  let course = COURSES.find(c => c.slug === slug || c.id === slug);

  if (!course) {
    await dbConnect();
    // Try to find in database
    const dbCourse = await LiveCourse.findOne({
      $or: [{ slug: slug }, { _id: slug.match(/^[0-9a-fA-F]{24}$/) ? slug : null }]
    }).lean();

    if (dbCourse) {
      course = {
        ...dbCourse,
        id: (dbCourse as any)._id.toString(),
        title: (dbCourse as any).title,
        description: (dbCourse as any).description,
        image: (dbCourse as any).image,
      } as any;
    }
  }

  if (!course) {
    return {
      title: "Course Not Found | Sangalo Tech",
    };
  }

  return {
    title: `${course.title} | Sangalo Tech`,
    description: course.description,
    openGraph: {
      title: `${course.title} | Sangalo Tech`,
      description: course.description,
      images: [`/courses/${course.image || 'default.png'}`],
    },
  };
}

export default async function Page({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {
  // Unwrap params if it's a promise
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  return <ClientCourseLoader slug={slug} />;
}
