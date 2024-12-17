"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FaFacebook, FaApple, FaGoogle } from "react-icons/fa6";
import Link from "next/link";

export default function RegisterPage() {
  type formSchema = {
    fullName: string;
    email: string;
    phone: string;
    password: string;
  };
  const form = useForm<formSchema>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      phone: "",
    },
  });

  async function onSubmit(values: formSchema) {
    try {
      console.log(values);
      // if (!values.email) throw "MissingEmail";
      // if (!values.password) throw "MissingPassword";
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
      //   if (error === "MissingEmail") {
      //     form.setError("email", {
      //       type: "manual",
      //       message: "email is required",
      //     });
      //   }
      //   if (error === "MissingPassword") {
      //     form.setError("password", {
      //       type: "manual",
      //       message: "password is required",
      //     });
      //   }
    }
  }
  return (
    <div
      className="flex h-screen items-center justify-center overflow-hidden"
      style={{
        backgroundPosition: "center",
        backgroundImage: `url(https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/original/test-discovery/2023/11/02/450d27ed-176f-46ef-990c-47dbad45ecdc-1698921295586-bd7caf8e1f80aac50bb60c7c6ea74244.png)`,
      }}
    >
      <div className="flex w-4/6 justify-end">
        <div className="h-full w-3/6">
          <Card className="flex h-[60vh] flex-col justify-between">
            <div>
              <CardHeader>
                <CardTitle className="text-3xl">Register</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-2"
                    >
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Full Name*"
                                {...field}
                                className="h-10"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl className="mt-0">
                              <Input
                                placeholder="Email"
                                {...field}
                                className="h-10"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="(+62) ...."
                                {...field}
                                className="h-10"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="password"
                                type="password"
                                {...field}
                                className="h-10"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full">
                        Register
                      </Button>
                    </form>
                  </Form>
                </div>
              </CardContent>
              <div className="flex items-center justify-center gap-2">
                <p>Already have account ? </p>
                <Link
                  href={"/login"}
                  className="text-blue-500 hover:font-bold hover:text-blue-800"
                >
                  Login
                </Link>
              </div>
            </div>
            <CardFooter>
              <p className="w-full text-center text-sm uppercase">
                blibli ticket All Rights Reversed
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
