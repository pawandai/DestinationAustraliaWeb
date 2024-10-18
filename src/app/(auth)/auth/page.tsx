"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import Footer from "~/components/shared/Footer";
import FormBuilder from "~/components/shared/Form";
import { Icons } from "~/components/shared/icons";
import ModeToggle from "~/components/shared/modeToggle";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Form } from "~/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  signupFormSchema,
  type SignupFormSchemaType,
} from "~/validators/signupSchema";

const Signup = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const router = useRouter();

  const LOGIN_FORM_DATA = [
    {
      label: "Email",
      name: "email",
      placeholder: "jon@snow.com",
      type: "text",
      value: "",
      variant: "Input",
      required: true,
    },
    {
      label: "Password",
      name: "password",
      placeholder: "Enter a password",
      type: "",
      value: "",
      variant: "Password Input",
      required: true,
    },
  ];

  const SIGNUP_FORM_DATA = [
    {
      label: "Full Name",
      name: "name",
      placeholder: "Jon Snow",
      type: "text",
      value: "",
      variant: "Input",
      required: true,
    },
    {
      label: "Email",
      name: "email",
      placeholder: "jon@snow.com",
      type: "text",
      value: "",
      variant: "Input",
      required: true,
    },
    {
      label: "Password",
      name: "password",
      placeholder: "Enter a password",
      type: "",
      value: "",
      variant: "Password Input",
      required: true,
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      placeholder: "Enter password again",
      type: "",
      value: "",
      variant: "Password Input",
      required: true,
    },
    {
      label: "I agree to the terms and conditions",
      name: "tnc",
      placeholder: "",
      type: "",
      value: "",
      variant: "Checkbox",
      required: true,
    },
  ];
  const form = useForm<SignupFormSchemaType>({
    resolver: zodResolver(signupFormSchema),
  });
  const onRegisterSubmit = (data: SignupFormSchemaType) => {
    console.log(data);
  };
  const onLoginSubmit = (data: SignupFormSchemaType) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={
          type === "login"
            ? form.handleSubmit(onLoginSubmit)
            : form.handleSubmit(onRegisterSubmit)
        }
        className="mx-auto max-w-lg space-y-8 py-10"
      >
        <Card className="overflow-hidden">
          <Tabs defaultValue={type ?? "register"}>
            <TabsList className="grid w-full grid-cols-2 rounded-none border-b">
              <TabsTrigger
                value="login"
                onClick={() => router.push("/auth?type=login")}
                className="rounded-b-none rounded-t-lg"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="register"
                onClick={() => router.push("/auth?type=register")}
                className="rounded-b-none rounded-t-lg"
              >
                Register
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <CardHeader className="flex items-center space-y-1">
                <Image
                  src="/destinationAustraliaLogo.png"
                  alt="Destination Australia"
                  width={1000}
                  height={1000}
                  className="w-28"
                />
                <CardTitle className="h3">Welcome Back</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <FormBuilder formData={LOGIN_FORM_DATA} form={form} />
                <Button
                  className="w-full"
                  variant="secondary"
                  size="lg"
                  type="submit"
                >
                  Log In
                </Button>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6">
                  <Button variant="outline">
                    <Icons.gitHub className="mr-2 h-4 w-4" />
                    Github
                  </Button>
                  <Button variant="outline">
                    <Icons.google className="mr-2 h-4 w-4" />
                    Google
                  </Button>
                </div>
              </CardContent>
            </TabsContent>
            <TabsContent value="register">
              <CardHeader className="flex items-center space-y-1">
                <Image
                  src="/destinationAustraliaLogo.png"
                  alt="Destination Australia"
                  width={1000}
                  height={1000}
                  className="w-28"
                />
                <CardTitle className="h3">Create an account</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <FormBuilder formData={SIGNUP_FORM_DATA} form={form} />
                <Button
                  className="w-full"
                  variant="secondary"
                  size="lg"
                  type="submit"
                >
                  Create account
                </Button>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6">
                  <Button variant="outline">
                    <Icons.gitHub className="mr-2 h-4 w-4" />
                    Github
                  </Button>
                  <Button variant="outline">
                    <Icons.google className="mr-2 h-4 w-4" />
                    Google
                  </Button>
                </div>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </form>
      <Footer />
    </Form>
  );
};

export default Signup;
