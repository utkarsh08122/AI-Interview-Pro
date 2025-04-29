import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { success, error } from "@/helper/responsController";
import { User } from "@/lib/model/user.Schema";
import { generetRefressToken } from "@/helper/Token";
import { dbConnect } from "@/lib/dbConnect";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(error(406, "All field are required"));
    } else {
      dbConnect();
      const user = await User.findOne({ email });
      if (!user) {
        return NextResponse.json(error(404, "User is not exist"));
      }

      // check the is verifide or not
      if (!user.isVarifide) {
        return NextResponse.json(error(404, "User is not varifide"));
      }
      // thia is use to check the password id correcr or not
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return NextResponse.json(error(406, "Password is wrong"));
      }
      
      // in tokenData thosedata are store which is incoded in access token and refress token
      const tokenData = {
        id: user._id,
        name: user.username,
      };
      const RefresToken = generetRefressToken(tokenData);
      const response = NextResponse.json(success(200, "succesful"));
      response.cookies.set("RefresToken", RefresToken, {
        httpOnly: true,
        secure: true,
      });

      return response;
    }
  } catch (e: any) {
    return NextResponse.json(error(400, e._message));
  }
}
