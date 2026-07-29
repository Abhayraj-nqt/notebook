import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// toNextJsHandler automatically wires up GET and POST methods
export const { GET, POST } = toNextJsHandler(auth);
