import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const generetRefressToken = (data: object) => {
  const RefressToken = jwt.sign(data, process.env.TOKEN_PRIVET_KEY!, {
    expiresIn: "365d",
  });

  return RefressToken;
};
export function MyCookiesComponent() {
  const cookieStore: any = cookies();
  const cooki = cookieStore.get("RefresToken").value || "";
  const decoded = jwtDecode(cooki);
  return decoded;
}

export const getDataFromToken = (data: string) => {
  const decoded = jwtDecode(data);
  return decoded;
};
