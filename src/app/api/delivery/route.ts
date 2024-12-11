import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    hello: "wordl",
  });
}

export async function POST(request: Request) {
  const data = await request.json();
  // console.log(data["number"]);

  // method

  return NextResponse.json([
    { id: "890-087", name: "물", date: "2024.11.12", status: "good" },
    { id: "890-0837", name: "라면", date: "2024.12.11", status: "good" },
  ]);
}
