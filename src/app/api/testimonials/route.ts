import { createHandler } from "@/lib/apiHandlers";
import Testimonial from "@/models/Testimonial";

const handler = createHandler(Testimonial);
export const GET = handler.GET;
export const POST = handler.POST;
