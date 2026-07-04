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

  if (!GIST_ID || !GITHUB_TOKEN) {
    return NextResponse.json(
      { error: "Missing GIST_ID or GITHUB_TOKEN environment variable" },
      { status: 500 }
    );
  }

  // Step 1: Get current Gist content
  const gistRes = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
    headers,
  });

  if (!gistRes.ok) {
    return NextResponse.json(
      { error: `Failed to fetch gist: ${gistRes.status} ${gistRes.statusText}` },
      { status: 502 }
    );
  }

  const gistData = await gistRes.json();
  const content = gistData.files?.[FILENAME]?.content;
  const json = JSON.parse(content || '{"count":0}');

  // Step 2: Increment count
  json.count += 1;

  // Step 3: Update Gist with new count
  const updateRes = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
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

  if (!updateRes.ok) {
    return NextResponse.json(
      { error: `Failed to update gist: ${updateRes.status} ${updateRes.statusText}` },
      { status: 502 }
    );
  }

  return NextResponse.json({ count: json.count });
}
