import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { success, error } from "@/helper/responsController";
import { User } from "@/lib/model/user.Schema";
import { sendEmail } from "@/helper/mail";
import { dbConnect } from "@/lib/dbConnect";

export async function POST(req: NextRequest) {


  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json(error(406, "All field are required"));
    } else {
      console.log("1"),

      dbConnect();
      console.log("2"),

      const oldUser = await User.findOne({ email });
      console.log("3"),

      if (oldUser) {
        return NextResponse.json(error(406, "User is already exist"));
      }
      console.log("4"),

      const hashedPassword = await bcrypt.hash(password, 10);
      
      const user = await User.create({
        username: name,
        email,
        password: hashedPassword,
      });
      console.log("5"),
      
      await sendEmail({ email, userId: user._id });
      console.log("6"),

      return NextResponse.json(success(201, "User is successful signup"));
    }
  } catch (e: any) {
    return NextResponse.json(error(400, e));
  }
}
