import { NextResponse } from "next/server";

const FIREBASE_DOMAIN =
  "https://gbs-hackathon-default-rtdb.asia-southeast1.firebasedatabase.app/";

export async function GET() {
  return NextResponse.json({
    hello: "wordl",
  });
}

export async function POST(request: Request) {
  const reqData = await request.json();
  const number = reqData["number"];

  const response = await fetch(`${FIREBASE_DOMAIN}/users/${number}.json`);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "Could not fetch.");
  }

  try {
    const userData = JSON.parse(resData);

    // console.log(userData.inbox);
    return NextResponse.json(userData);
  } catch (error) {
    // console.error("Invalid JSON format", error);
    return NextResponse.json({ error: error });
  }
  // method
}
