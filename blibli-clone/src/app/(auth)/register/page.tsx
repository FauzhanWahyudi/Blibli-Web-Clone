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
import Link from "next/link";
import { UserSchema } from "@/schemas/user";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { IUser } from "@/interfaces/user";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof UserSchema>) {
    // console.log(values);

    const response = await fetch("/api/users/register", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = (await response.json()) as {
      message?: string;
      user?: IUser;
    };

    if (!response.ok) {
      //by doing this every time we got error, alert will be shown
      Swal.fire({
        title: "Error!",
        text: data.message,
        icon: "error",
        showConfirmButton: false,
        timer: 2500,
      });
      //by do this it will redirect to error query link
      // router.push(`/register?error=${data.message}`);
    } else {
      router.push("/login");
    }
  }

  //______can do this if you want to use redirect the page to error params_______________ (can be a client component)
  // const searchParams = useSearchParams();
  // const error = searchParams.get("error");
  // useEffect(() => {
  //   if (error) {
  //     Swal.fire({
  //       title: "Error!",
  //       text: error,
  //       icon: "error",
  //       showConfirmButton: false,
  //       timer: 2500,
  //     });
  //   }
  // }, [searchParams]);

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
          <Card className="flex flex-col justify-between">
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
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Name*"
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
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Username*"
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
                                placeholder="Email*"
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
