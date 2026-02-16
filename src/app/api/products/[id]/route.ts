import { createHandler } from "@/lib/apiHandlers";
import { Product } from "@/models/BlogProduct";

const handler = createHandler(Product);
export const DELETE = handler.DELETE;
export const GET = handler.GET;
export const PUT = handler.PUT;
