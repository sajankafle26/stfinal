import { createHandler } from "@/lib/apiHandlers";
import TechStack from "@/models/TechStack";

const handler = createHandler(TechStack);
export const DELETE = handler.DELETE;
export const GET = handler.GET;
export const POST = handler.POST;
export const PUT = handler.PUT;
