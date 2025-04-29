import Image from "next/image";
import { redirect } from "next/navigation";
import Agent from "@/components/Agent";
import DisplayTechIcons from "@/components/DisplayTechIcons";
import { getIntervewById, getUserData } from "@/helper/Action";
import { getRandomInterviewCover } from "@/lib/utils";

const InterviewDetails = async ({ params }: RouteParams) => {
  const { id } = await params;
  console.log(id);
  const interview = await getIntervewById(id);
  const user = await getUserData();

  if (!interview) redirect("/");

  // const feedback = await getFeedbackByInterviewId({
  //   interviewId: id,
  //   userId: user?._id!,
  // });

  return (
    <>
      <div className="flex flex-row gap-4 justify-between">
        <div className="flex flex-row gap-4 items-center max-sm:flex-col">
          <div className="flex flex-row gap-4 items-center">
            <Image
              src={getRandomInterviewCover()}
              alt="cover-image"
              width={40}
              height={40}
              className="rounded-full object-cover size-[40px]"
            />
            <h3 className="capitalize">{interview.role} Interview</h3>
          </div>

          <DisplayTechIcons techStack={interview.techstack} />
        </div>

        <p className="bg-dark-200 px-4 py-2 rounded-lg h-fit">
          {interview.type}
        </p>
      </div>

      <Agent
        key={id}
        userName={user?.name!}
        userId={user?.id}
        interviewId={id}
        type="interview"
        questions={interview.questions}
        // feedbackId={feedback?.id}
      />
    </>
  );
};

export default InterviewDetails;
