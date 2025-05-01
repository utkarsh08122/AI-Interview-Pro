import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { success, error } from "@/helper/responsController";
import { dbConnect } from "@/lib/dbConnect";
import { Interview } from "@/lib/model/interview.Schema";
import { jwtDecode } from "jwt-decode";
export async function POST(req: NextRequest) {
  try {
    const { type, role, level, techstack, amount } = await req.json();
    // const authHeader = req.headers.get("authorization");

    // if (!authHeader || !authHeader.startsWith("Bearer ")) {
    //   return NextResponse.json(error(401, "Authorization header is required"));
    // }

    // if (!type || !role || !level || !techstack || !amount) {
    //   return NextResponse.json(
    //     error(400, "Missing required fields in request body")
    //   );
    // }

    // const token = authHeader.split(" ")[1];
    // const { id }: any = jwtDecode(token);
    const genAi = new GoogleGenAI({
      apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY!,
    });
    console.log("333", id);

    const { text: questions }: any = await genAi.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between nontechnical and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3
    `,
    });
    console.log("2", questions);
    const interview = {
      role,
      type,
      level,
      techstack: techstack.split(","),
      questions: JSON.parse(questions),
      
      finalized: true,
    };
    console.log("1", interview);

    dbConnect();
    console.log("thi ai tiwe", interview);
    await Interview.create(interview);

    return NextResponse.json(success(200, "successful"));
  } catch (e) {
    return NextResponse.json(error(500, e));
  }
}

export async function GET() {
  return NextResponse.json(success(200, "THANK YOU!"));
}
