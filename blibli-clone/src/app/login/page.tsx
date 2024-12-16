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

export default function LoginPage() {
  type formSchema = {
    username: string;
    password: string;
  };
  const form = useForm<formSchema>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: formSchema) {
    try {
      console.log(values);
      throw new Error("username is required");
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
      form.setError("username", {
        type: "manual",
        message: "Email already exists",
      });
    }
  }
  return (
    <div
      className="flex h-screen overflow-hidden justify-center items-center"
      style={{
        backgroundPosition: "center",
        backgroundImage: `url(https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/original/test-discovery/2023/11/02/450d27ed-176f-46ef-990c-47dbad45ecdc-1698921295586-bd7caf8e1f80aac50bb60c7c6ea74244.png)`,
      }}
    >
      <div className="w-4/6 flex justify-end">
        <div className="w-3/6 h-full">
          <Card className="flex flex-col h-[60vh] justify-between">
            <div>
              <CardHeader>
                <CardTitle className="text-3xl">LOGIN</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-8"
                    >
                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number / Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Phone Number or Email"
                                {...field}
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
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e); // Keeps react-hook-form working
                                  console.log(
                                    "Custom onChange:",
                                    e.target.value
                                  );
                                }}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full ">
                        Login
                      </Button>
                    </form>
                  </Form>
                </div>
                <div className="flex justify-center items-center gap-2">
                  <Separator className="my-4 w-2/6" />
                  <p>Faster login with SSO</p>
                  <Separator className="my-4 w-2/6" />
                </div>
                <div className="my-2 flex flex-row justify-center gap-9 w-full">
                  <button className="bg-transparent hover:bg-transparent hover:scale-125">
                    <FaApple className="text-gray-800 text-5xl" />
                  </button>
                  <button className="bg-transparent hover:bg-transparent hover:scale-125">
                    <FaFacebook className="text-blue-600 text-5xl" />
                  </button>
                  <button className="bg-gradient-to-tr from-emerald-200 to-indigo-400 p-2 hover:scale-125 rounded-full">
                    <FaGoogle className="text-white text-4xl" />
                  </button>
                </div>
              </CardContent>
              <div className="flex justify-center items-center gap-2">
                <p>Don`t have account ? </p>
                <Link
                  href={"/register"}
                  className="text-blue-500 hover:text-blue-800 hover:font-bold"
                >
                  Register First !
                </Link>
              </div>
            </div>
            <CardFooter>
              <p className="text-sm text-center uppercase w-full">
                blibli ticket All Rights Reversed
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
