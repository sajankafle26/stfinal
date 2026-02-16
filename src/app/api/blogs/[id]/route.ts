import { createHandler } from "@/lib/apiHandlers";
import { Blog } from "@/models/BlogProduct";

const handler = createHandler(Blog);
export const DELETE = handler.DELETE;
export const GET = handler.GET;
export const PUT = handler.PUT;
