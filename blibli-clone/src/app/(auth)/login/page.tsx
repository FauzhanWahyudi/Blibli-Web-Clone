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
import { LoginSchema } from "@/schemas/user";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginPage() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    try {
      console.log(values);
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
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
                <CardTitle className="text-3xl">Login</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Email"
                                {...field}
                                className="h-12"
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
                                className="h-12"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full">
                        Login
                      </Button>
                    </form>
                  </Form>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Separator className="my-4 w-2/6" />
                  <p>Faster login with SSO</p>
                  <Separator className="my-4 w-2/6" />
                </div>
                <div className="my-2 flex w-full flex-row justify-center gap-9">
                  <button className="bg-transparent hover:scale-125 hover:bg-transparent">
                    <FaApple className="text-5xl text-gray-800" />
                  </button>
                  <button className="bg-transparent hover:scale-125 hover:bg-transparent">
                    <FaFacebook className="text-5xl text-blue-600" />
                  </button>
                  <button className="rounded-full bg-gradient-to-tr from-emerald-200 to-indigo-400 p-2 hover:scale-125">
                    <FaGoogle className="text-4xl text-white" />
                  </button>
                </div>
              </CardContent>
              <div className="flex items-center justify-center gap-2">
                <p>Don`t have account ? </p>
                <Link
                  href={"/register"}
                  className="text-blue-500 hover:font-bold hover:text-blue-800"
                >
                  Register First !
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
