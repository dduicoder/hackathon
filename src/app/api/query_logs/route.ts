import { NextResponse } from "next/server";

export async function GET() {
  console.log("HUI");
  const response = await fetch(
    `https://hackertonapiserver.vercel.app/query_logs`
  );

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "Could not fetch.");
  }

  console.log(resData);

  return NextResponse.json(resData);
}
