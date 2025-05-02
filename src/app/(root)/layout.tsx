import Logout from "@/components/Logout";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

const rootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="root-layout">
      <nav className="flex justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="logo" width={38} height={32} />
          <h2 className="text-primary">AIInterviewPro</h2>
        </Link>
       <Logout/>
      </nav>
      {children}
    </div>
  );
};

export default rootLayout;
