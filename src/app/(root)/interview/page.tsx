import Agent from "@/components/Agent";
import { MyCookiesComponent } from "@/helper/Token";
import { cookies } from "next/headers";

const Page = async () => {
  const { name, id }: any = MyCookiesComponent();

  return (
    <>
      <h3>Interview generation</h3>
      <Agent key={id} userName={name} userId={id} type="generate" />
    </>
  );
};

export default Page;
