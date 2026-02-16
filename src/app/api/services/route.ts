import { createHandler } from "@/lib/apiHandlers";
import Service from "@/models/Service";

const handler = createHandler(Service);
export const GET = handler.GET;
export const POST = handler.POST;
