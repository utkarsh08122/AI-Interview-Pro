
import { NextRequest, NextResponse } from "next/server";
import { success, error } from "@/helper/responsController";
import { cookies } from "next/headers";
export async function DELETE(req: NextRequest) {
  try {
    const token = await cookies();
    token.delete("RefresToken");
    return NextResponse.json(success(200, "success"));
  } catch (e: any) {
    return NextResponse.json(error(400, e._message));
  }
}
