"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";
import { axiosClient } from "@/lib/axiosInstance";
import { KEY_ACCESS_TOKEN, setItem } from "@/lib/localStorageManager";


const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(5),
  });
};
const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (type === "sign-up") {
        const result = await axiosClient.post("/api/sign-up", values, {
          withCredentials: true,
        });

        console.log(result);
        if (result.data.status === "ok") {
          toast.success("Account created successfully. Plese varify email");
          router.push("/sign-in");
        } else {
          toast.success(`Some thing wrong ${result.data.result} `);
        }
      } else {
        const result = await axiosClient.post("/api/sign-in", values, {
          withCredentials: true,
        });
        if (result.data.status === "ok") {
setItem(KEY_ACCESS_TOKEN,result.data.RefresToken);
          toast.success("Sign-up successfully");
          router.push("/");
        } else {
          toast.success(`Some thing wrong ${result.data.result} `);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was an error: ${error}`);
    }
  };
  return (
    <div className="card-border lg:min-w-[400px]">
      <div className="flex flex-col gap-6 card py-5 px-8 ">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={30} width={38} />
          <h2>AIInterviewPro</h2>
        </div>
        <h3>Practice job interveiw with AI</h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-5 mt-4 form"
          >
            {type === "sign-up" && (
              <FormField
                name="name"
                label="name"
                type="text"
                control={form.control}
                placeholder="Your Name"
              />
            )}
            <FormField
              name="email"
              label="email"
              type="email"
              control={form.control}
              placeholder="Your Email"
            />
            <FormField
              name="password"
              label="password"
              type="password"
              control={form.control}
              placeholder="Your Password"
            />

            <Button type="submit" className="btn">
              {type === "sign-up" ? "Create an Account" : "Sign in"}
            </Button>
          </form>
        </Form>
        <p className="text-center">
          {type === "sign-up" ? "Have an Account already?" : "No Account yet?"}
          <Link
            href={type === "sign-up" ? "/sign-in" : "/sign-up"}
            className="font-bold text-user-primary ml-1"
          >
            {type === "sign-up" ? "Sign in" : "Sign up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
