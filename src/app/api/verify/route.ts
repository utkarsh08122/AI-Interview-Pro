import { error, success } from "@/helper/responsController";
import { dbConnect } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import {User} from "@/lib/model/user.Schema"
export async function POST(req: NextRequest) {
  try {
    dbConnect();
    const { token }: any = await req.json();
    const user = await User.findOne({
      varifytoken: token,
      varifyTokenExpiryy: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(error(400, "invalid user"));
    }
    user.isVarifide = true;
    user.varifytoken = undefined;
    user.varifyTokenExpiryy = undefined;

    await user.save();
    return NextResponse.json(success(200, "User is varifide"));
  } catch (e: any) {
    return NextResponse.json(success(200, e._message));
  }
}
