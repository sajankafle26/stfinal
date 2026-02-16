import { createHandler } from "@/lib/apiHandlers";
import LiveCourse from "@/models/LiveCourse";

const handler = createHandler(LiveCourse);
export const DELETE = handler.DELETE;
export const GET = handler.GET;
export const PUT = handler.PUT;
