import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { AppDataSource } from "~/data-source";
import { User } from "~/entity/User";
import AuthError from "next-auth";
import { signIn } from "~/server/actions/auth.action";
import { signupFormSchema } from "~/validators/signupSchema";
import { getServerAuthSession } from "~/server/auth";

export const authRouter = createTRPCRouter({
  signup: publicProcedure
    .input(signupFormSchema)
    .mutation(async ({ input }) => {
      // check if user exists in database
      const user = await AppDataSource.getRepository(User).findOne({
        where: { email: input.email },
      });
      if (user) {
        return;
      }
      const createdUser = await AppDataSource.getRepository(User).save(input);
      createdUser.password = "";
      return {
        success: "User created successfully! Please verify your email.",
        user: createdUser,
      };
    }),

  login: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(async ({ input }) => {
      try {
        // check if the user exists in the database
        const user = await AppDataSource.getRepository(User).findOne({
          where: { email: input.email },
        });
        if (!user) {
          throw new Error("User not found. Please Register first!");
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        await signIn("credentials", input);
      } catch (error) {
        if (error instanceof AuthError) {
          switch (error) {
            case "CredentialsSignin":
              return "Invalid credentials.";
            default:
              return "Something went wrong.";
          }
        }
        throw error;
      }

      return {
        message: "User signed in successfully!",
      };
    }),

  signinWithProvider: publicProcedure
    .input(z.object({ provider: z.string() }))
    .mutation(async ({ input }) => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        await signIn(input.provider, {
          redirect: false,
        });

        const response = await getServerAuthSession();
        const user = response?.user;

        // check if the user exists in the database
        const existingUser = await AppDataSource.getRepository(User).findOne({
          where: { email: user?.email ?? "" },
        });

        if (!existingUser) {
          const newUser = await AppDataSource.getRepository(User).save({
            ...user,
            email: user?.email ?? "",
            verified: true,
          });
          newUser.password = "";
          return {
            message: "User signed in and created successfully!",
            user: newUser,
          };
        }
      } catch (error) {
        console.error("Error during signing in ", error);
        return {
          error: "Something went wrong.",
        };
      }
    }),
});
