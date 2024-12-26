import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const reqData = await request.json();
  const text = reqData["text"];

  const response = await fetch(
    `https://hackertonapiserver.vercel.app/logs?text=${text}`
  );

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "Could not fetch.");
  }

  return NextResponse.json(resData);
}
