import Agent from "@/components/Agent";
import { MyCookiesComponent } from "@/helper/Token";

const Page = async () => {
  const { name, id }: any = await MyCookiesComponent();
  console.log(name, id);


  return (
    <>
      <h3>Interview generation</h3>
      <Agent key={id} userName={name} userId={id} type="generate" />
    </>
  );
};

export default Page;
