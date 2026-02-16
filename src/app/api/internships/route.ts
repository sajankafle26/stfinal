import { createHandler } from "@/lib/apiHandlers";
import Internship from "@/models/Internship";

const handler = createHandler(Internship);
export const GET = handler.GET;
export const POST = handler.POST;

