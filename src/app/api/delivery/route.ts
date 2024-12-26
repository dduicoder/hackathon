import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    hello: "world",
  });
}

export async function POST(request: Request) {
  const reqData = await request.json();
  const name = reqData["name"] as string;

  const response = await fetch(
    `https://hackertonapiserver.vercel.app/query?name=${name}`
  );
  const resData = await response.json();

  return NextResponse.json(resData);
}
