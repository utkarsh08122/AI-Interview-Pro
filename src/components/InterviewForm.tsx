"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import { toast } from "sonner";
import FormField from "./FormField";
import { redirect, useRouter } from "next/navigation";
import { axiosClient } from "@/lib/axiosInstance";

const interFormSchema = () => {
  return z.object({
    role: z.string().min(1),
    type: z.string().min(1),
    level: z.string().min(1),
    amount: z.string().min(1),
    techstack: z.string().min(1),
  });
};
const InterviewForm = ({ userId }: any) => {
  const router = useRouter();
  const formSchema = interFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "",
      type: "",
      level: "",
      amount: "",
      techstack: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      toast.success(`Wait For a Second Interview Generation Start  `);
      console.log(values);
      const respons = await axiosClient.post("/api/vapi/create", {
        values,
        userId,
      });
      console.log(respons);
      if (respons.data.result === "successful") {
        toast.success(` Interview Successfill Generated  `);
        redirect("/")
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
          <h2>Interview generation</h2>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-5 mt-4 form "
          >
            <FormField
              name="role"
              label="role"
              type="text"
              control={form.control}
              placeholder="what role would you like to train for?"
            />

            <FormField
              name="level"
              label="level"
              type="text"
              control={form.control}
              placeholder="the job experience level"
            />

            <FormField
              name="amount"
              label="amount"
              type="text"
              control={form.control}
              placeholder="How many questions would you link me to prepare for you?"
            />
            <FormField
              name="techstack"
              label="techstack"
              type="text"
              control={form.control}
              placeholder="a list of technologies to cover during the job interview."
            />

            <FormField
              name="type"
              label="type"
              type="text"
              control={form.control}
              placeholder="Are you aiming for a technical or non-technical"
            />

            <Button type="submit" className="btn">
              generate Interview
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default InterviewForm;
