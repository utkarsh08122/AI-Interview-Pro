"use server";
import { feedbackSchema } from "@/constants";
import { google } from "@ai-sdk/google";
import { dbConnect } from "../dbConnect";
import { Feedbacks } from "../model/feedback.Schema";
import { generateObject } from "ai";
export const createFeedback = async (params: CreateFeedbackParams) => {
  const { interviewId, userId, transcript } = params;
  console.log("11111111111 ", interviewId, userId, transcript);
  try {
    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `-${sentence.role}:${sentence.content}\n`
      )
      .join("");
    console.log("2222222222 ", formattedTranscript);

    const {
      object: {
        totalScore,
        categoryScores,
        areasForImprovement,
        finalAssessment,
        strengths,
      },
    } = await generateObject({
      model: google("gemini-2.0-flash-001", {
        structuredOutputs: false,
      }),
      schema: feedbackSchema,
      prompt: `
          You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
          Transcript:
          ${formattedTranscript}
  
          Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
          - **Communication Skills**: Clarity, articulation, structured responses.
          - **Technical Knowledge**: Understanding of key concepts for the role.
          - **Problem-Solving**: Ability to analyze problems and propose solutions.
          - **Cultural & Role Fit**: Alignment with company values and job role.
          - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
          `,
      system:
        "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
    });
    console.log("3333333333333");

    dbConnect();
    const feedback = await Feedbacks.create({
      interviewId,
      userId,
      totalScore,
      categoryScores,
      strengths,
      areasForImprovement,
      finalAssessment,
    });
    console.log("44444444444444", feedback);

    return {
      success: true,
      feedbackId: feedback._id,
    };
  } catch (e: any) {
    console.error("error in saving feedback", e);
    return {
      success: false,
    };
  }
};
