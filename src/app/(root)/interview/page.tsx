import InterviewForm from "@/components/InterviewForm";
import { MyCookiesComponent } from "@/helper/Token";

const Page = async () => {
  const { name, id }: any = await MyCookiesComponent();

  return (
    <div className="flex justify-center">
        <InterviewForm key={id} userId={id}/>
    </div>
  );
};

export default Page;
