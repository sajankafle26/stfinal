import { createHandler } from "@/lib/apiHandlers";
import TechStack from "@/models/TechStack";

const handler = createHandler(TechStack);
export const GET = handler.GET;
export const POST = handler.POST;

