import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    questions: [
      {
        type: String,
        required: true,
      },
    ],
    techstack: [
      {
        type: String,
        required: true,
      },
    ],
    userId: { type: mongoose.Types.ObjectId, ref: "users" },
    type: {
      type: String,
      required: true,
    },
    finalized: {
      type: Boolean,
      default: false,
    },
    companyName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export const Interview =
  mongoose.models.interviews || mongoose.model("interviews", interviewSchema);
