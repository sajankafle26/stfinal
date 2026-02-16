import { createHandler } from "@/lib/apiHandlers";
import Testimonial from "@/models/Testimonial";

const handler = createHandler(Testimonial);
export const DELETE = handler.DELETE;
export const GET = handler.GET;
export const PUT = handler.PUT;
