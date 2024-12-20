import { authRouter } from "./routers/auth";
import { postRouter } from "./routers/post";
import { createCallerFactory, createTRPCRouter } from "../api/trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
