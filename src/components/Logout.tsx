"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { axiosClient } from "@/lib/axiosInstance";
import { redirect } from "next/navigation";
import { toast } from "sonner";

const Logout = () => {
  async function logout() {
    const { data } = await axiosClient.delete("/api/logout");
    if (data.result === "success") {
      redirect("/sign-in");
    } else {
      toast("Somethin is wrong");
    }
  }

  return (
    <Button onClick={logout} className="bg-red-400 hover:bg-red-600 text-white">
      Logout
    </Button>
  );
};

export default Logout;
