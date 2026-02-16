import { createHandler } from "@/lib/apiHandlers";
import UpcomingBatch from "@/models/UpcomingBatch";

const handler = createHandler(UpcomingBatch);
export const DELETE = handler.DELETE;
export const GET = handler.GET;
export const PUT = handler.PUT;
