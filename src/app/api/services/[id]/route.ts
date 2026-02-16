import { createHandler } from "@/lib/apiHandlers";
import Service from "@/models/Service";

const handler = createHandler(Service);
export const DELETE = handler.DELETE;
export const GET = handler.GET;
export const PUT = handler.PUT;
