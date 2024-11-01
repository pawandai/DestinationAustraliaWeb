import { z } from "zod";

const validateEnv = () => {
  const serverSchema = z.object({
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    NEXTAUTH_URL: z.preprocess(
      (str) => process.env.VERCEL_URL ?? str,
      process.env.VERCEL ? z.string() : z.string().url(),
    ),
    GITHUB_ID: z.string(),
    GITHUB_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
  });

  const clientSchema = z.object({
    NEXT_PUBLIC_DATABASE_USERNAME: z.string(),
    NEXT_PUBLIC_DATABASE_PASSWORD: z.string(),
    NEXT_PUBLIC_DATABASE_NAME: z.string(),
  });

  const runtimeEnv = {
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXT_PUBLIC_DATABASE_USERNAME: process.env.NEXT_PUBLIC_DATABASE_USERNAME,
    NEXT_PUBLIC_DATABASE_PASSWORD: process.env.NEXT_PUBLIC_DATABASE_PASSWORD,
    NEXT_PUBLIC_DATABASE_NAME: process.env.NEXT_PUBLIC_DATABASE_NAME,
  };

  serverSchema.parse(runtimeEnv);
  clientSchema.parse(runtimeEnv);

  return runtimeEnv;
};

export const env = validateEnv();
