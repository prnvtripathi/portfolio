import { NextRequest, NextResponse } from "next/server";

const GIST_ID = process.env.GIST_ID || "";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";
const FILENAME = "visitor.json";

const headers = {
  Authorization: `Bearer ${GITHUB_TOKEN}`,
  Accept: "application/vnd.github.v3+json",
};

export async function POST(request: NextRequest) {
  // For development purposes, return a static count
  if (process.env.ENV && process.env.ENV !== "production") {
    return NextResponse.json({ count: 100 }, { status: 200 });
  }

  console.log("Visitor count API called", request.json());

  // Step 1: Get current Gist content
  const gistRes = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
    headers,
  });

  const gistData = await gistRes.json();
  const content = gistData.files[FILENAME]?.content;
  const json = JSON.parse(content || '{"count":0}');

  // Step 2: Increment count
  json.count += 1;

  // Step 3: Update Gist with new count
  await fetch(`https://api.github.com/gists/${GIST_ID}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      files: {
        [FILENAME]: {
          content: JSON.stringify(json, null, 2),
        },
      },
    }),
  });

  return NextResponse.json({ count: json.count });
}
