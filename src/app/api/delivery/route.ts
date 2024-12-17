import { NextResponse } from "next/server";

import json from "../../components/find/data.json";

const FIREBASE_DOMAIN =
  "https://gbs-hackathon-default-rtdb.asia-southeast1.firebasedatabase.app/";

export async function GET() {
  return NextResponse.json({
    hello: "wordl",
  });
}

export async function POST(request: Request) {
  const reqData = await request.json();
  const name = reqData["name"] as string;

  const numbers: string[] = Object.entries(json)
    .filter(([, value]) => value === name)
    .map(([key]) => key);

  const inboxes: InboxItem[] = [];

  for (const number of numbers) {
    const response = await fetch(`${FIREBASE_DOMAIN}/users/${number}.json`);
    const resData = await response.json();

    if (!response.ok) {
      throw new Error(resData.message || "Could not fetch.");
    }

    try {
      if (resData) {
        const inboxList: InboxItem[] = Object.values(resData);

        inboxes.push(...inboxList);
      } else {
        return NextResponse.json([]);
      }
    } catch (error) {
      return NextResponse.json({ error: error });
    }
  }

  return NextResponse.json(inboxes);
}
