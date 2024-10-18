import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  login: protectedProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .query(async ({ input, ctx }) => {
      /**/
    }),
});
