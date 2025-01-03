import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const reqData = await request.json();
  const barcode = reqData["barcode"];

  const response = await fetch(
    `https://hackertonapiserver.vercel.app/upload?invoice=${barcode}`
  );

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "Could not fetch.");
  }

  console.log(resData);

  return NextResponse.json(resData);
}
