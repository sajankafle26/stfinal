import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UpcomingBatch from "@/models/UpcomingBatch";
import LiveCourse from "@/models/LiveCourse";
import { Blog, Product } from "@/models/BlogProduct";
import TechStack from "@/models/TechStack";
import Coupon from "@/models/Coupon";
import { auth } from "@/auth";
import SuccessStory from "@/models/SuccessStory";
import Service from "@/models/Service";
import Internship from "@/models/Internship";
import Testimonial from "@/models/Testimonial";

// Helper to create handler
export const createHandler = (Model: any) => {
    return {
        GET: async (req: Request) => {
            await dbConnect();
            try {
                const { searchParams } = new URL(req.url);
                const query: any = {};
                searchParams.forEach((value, key) => {
                    query[key] = value;
                });
                const data = await Model.find(query);
                return NextResponse.json(data);
            } catch (error: any) {
                return NextResponse.json({ message: error.message }, { status: 500 });
            }
        },
        POST: async (req: Request) => {
            try {
                const session = await auth();
                if (!session || (session.user as any).role !== "admin") {
                    console.log("POST: Unauthorized access attempt");
                    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
                }
                const body = await req.json();
                console.log(`POST ${Model.modelName}:`, JSON.stringify(body, null, 2));
                await dbConnect();
                const data = await Model.create(body);
                console.log(`POST ${Model.modelName}: Successfully created`, data._id);
                return NextResponse.json(data, { status: 201 });
            } catch (error: any) {
                console.error(`POST ${Model?.modelName || 'Unknown'} Error:`, error);
                return NextResponse.json({ message: error.message }, { status: 500 });
            }
        },
        DELETE: async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
            try {
                const session = await auth();
                if (!session || (session.user as any).role !== "admin") {
                    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
                }
                const { id } = await params;
                await dbConnect();
                await Model.findByIdAndDelete(id);
                return NextResponse.json({ message: "Deleted successfully" });
            } catch (error: any) {
                return NextResponse.json({ message: error.message }, { status: 500 });
            }
        },
        PUT: async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
            try {
                const session = await auth();
                if (!session || (session.user as any).role !== "admin") {
                    console.log("PUT: Unauthorized access attempt");
                    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
                }
                const { id } = await params;
                const body = await req.json();
                console.log(`PUT ${Model.modelName} (${id}):`, JSON.stringify(body, null, 2));
                await dbConnect();
                const data = await Model.findByIdAndUpdate(id, body, { new: true });
                console.log(`PUT ${Model.modelName}: Successfully updated`);
                return NextResponse.json(data);
            } catch (error: any) {
                console.error(`PUT ${Model?.modelName || 'Unknown'} Error:`, error);
                return NextResponse.json({ message: error.message }, { status: 500 });
            }
        }
    };
};

// Coupon
export const couponHandlers = createHandler(Coupon);
// Batch
export const batchHandlers = createHandler(UpcomingBatch);
// LiveCourse
export const liveCourseHandlers = createHandler(LiveCourse);
// Blog
export const blogHandlers = createHandler(Blog);
// Product
export const productHandlers = createHandler(Product);
// TechStack
export const techStackHandlers = createHandler(TechStack);
// SuccessStory
export const successStoryHandlers = createHandler(SuccessStory);
// Service
export const serviceHandlers = createHandler(Service);
// Internship
export const internshipHandlers = createHandler(Internship);
// Testimonial
export const testimonialHandlers = createHandler(Testimonial);
