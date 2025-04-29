import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    interviewId: { type: mongoose.Types.ObjectId, ref: "interviews" },
    userId: { type: mongoose.Types.ObjectId, ref: "users" },
    totalScore: {
      type: Number,
      required: true,
    },
    categoryScores: [
      {
        name: String,
        score: Number,
        comment: String,
      },
    ],
    strengths: [
      {
        type: String,
        required: true,
      },
    ],
    areasForImprovement: [
      {
        type: String,
        required: true,
      },
    ],
    finalAssessment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export const Feedbacks =
  mongoose.models.feedbacks || mongoose.model("feedbacks", feedbackSchema);
