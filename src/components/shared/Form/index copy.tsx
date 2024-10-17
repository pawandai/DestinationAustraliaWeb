"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Checkbox } from "~/components/ui/checkbox";
import Link from "next/link";
import { cn } from "~/lib/utils";
import {
  signupFormSchema,
  type SignupFormSchemaType,
} from "~/validators/signupSchema";
import { PasswordInput } from "~/components/ui/password-input";

export default function FormBuilder() {
  const form = useForm<SignupFormSchemaType>({
    resolver: zodResolver(signupFormSchema),
  });

  function onSubmit(values: SignupFormSchemaType) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>,
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-3xl space-y-8 py-10"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
              <div className="flex w-full items-center justify-between leading-none">
                <label htmlFor="name" className="text-sm">
                  Full Name *
                </label>
                <FormMessage className="text-red-400" />
              </div>
              <FormControl>
                <Input
                  id="name"
                  placeholder="Tyrion Lannister"
                  type="text"
                  {...field}
                  className={cn({
                    "border-red-400": fieldState.invalid,
                  })}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <div className="flex w-full items-center justify-between leading-none">
                <label htmlFor="email" className="text-sm">
                  Email *
                </label>
                <FormMessage className="text-red-400" />
              </div>
              <FormControl>
                <Input
                  id="email"
                  placeholder="jonsnow@winterfell.com"
                  type="email"
                  {...field}
                  className={cn({
                    "border-red-400": fieldState.invalid,
                  })}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <FormItem>
              <div className="flex w-full items-center justify-between leading-none">
                <label htmlFor="password" className="text-sm">
                  Password *
                </label>
                <FormMessage className="text-red-400" />
              </div>
              <FormControl>
                <PasswordInput
                  placeholder="Enter your password"
                  id="password"
                  {...field}
                  className={cn({
                    "border-red-400": fieldState.invalid,
                  })}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <FormItem>
              <div className="flex w-full items-center justify-between leading-none">
                <label htmlFor="confirmPassword" className="text-sm">
                  Confirm Password *
                </label>
                <FormMessage className="text-red-400" />
              </div>
              <FormControl>
                <PasswordInput
                  placeholder="Enter password again"
                  id="confirmPassword"
                  {...field}
                  className={cn({
                    "border-red-400": fieldState.invalid,
                  })}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tnc"
          render={({ field, fieldState }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  id="tnc"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className={cn({
                    "border-red-400": fieldState.invalid,
                  })}
                />
              </FormControl>
              <div className="flex w-full items-center justify-between leading-none">
                <label htmlFor="tnc" className="text-sm">
                  Yes, I agree to Terms and Conditions. *{" "}
                  <Link href="/tnc" className="p-2 hover:underline">
                    Learn more
                  </Link>
                </label>
                <FormMessage className="text-red-400" />
              </div>
            </FormItem>
          )}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </Form>
  );
}
