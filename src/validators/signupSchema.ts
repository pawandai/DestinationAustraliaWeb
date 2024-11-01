import { z } from "zod";

export const signupFormSchema = z
  .object({
    name: z
      .string({ required_error: "Full Name is required" })
      .min(3, { message: "Full Name must be at least 3 characters long" })
      .max(50, { message: "Full Name must be at most 50 characters long" })
      .regex(/^[a-zA-Z\s]*$/, {
        message: "Full Name must contain only alphabets",
      }),
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string({
      required_error: "Confirm Password is required",
    }),
    tnc: z
      .boolean({ required_error: "You must agree T&C" })
      .refine((val) => val === true, {
        message: "You must agree T&C",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginFormSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email({
    message: "Invalid email address",
  }),
  password: z.string({ required_error: "Password is required" }),
});

export type SignupFormSchemaType = z.infer<typeof signupFormSchema>;
export type LoginFormSchemaType = z.infer<typeof loginFormSchema>;
