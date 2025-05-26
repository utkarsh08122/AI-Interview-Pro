import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: [
      {
        type: String,
      },
    ],
    profileImg: {
      publicId: String,
      url: String,
    },
    isVarifide: {
      type: Boolean,
      default: false,
    },
    varifytoken: String,
    varifyTokenExpiryy: Date,
    interview: [{ type: mongoose.Types.ObjectId, ref: "interviews" }],
  },
  { timestamps: true }
);
export const User =
  mongoose.models.users || mongoose.model("users", userSchema);
