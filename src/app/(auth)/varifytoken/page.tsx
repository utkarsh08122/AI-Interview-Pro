"use client";

import { Button } from "@/components/ui/button";
import { axiosClient } from "@/lib/axiosInstance";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "sonner";

function page() {
  const [token, setToken] = useState("");
  const [verified, setVarifide] = useState(false);

  let data: any;
  const varifyUserEmail = async () => {
    try {
      const respons = await axiosClient.post("api/verify", {
        token,
      });
      const { result, status } = await respons.data;
      {
        status === "ok"
          ? toast.success("Your Account is successfuly verify")
          : toast.error("Your Account not verify");
      }

      {
        result == "User is varifide" ? setVarifide(true) : "";
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-8  rounded-lg shadow-md">
        <span>Verify Email</span>
        <div>{token ? `${token}` : ""}</div>
        <div>
          <Button
            className="btn"
            type="submit"
            onClick={() => {
              varifyUserEmail();
            }}
          >
            verify
          </Button>
        </div>
        {verified && (
          <div>
            <Link href="/sign-in"> Login</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
