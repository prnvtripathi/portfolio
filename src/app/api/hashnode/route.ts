import { NextResponse } from "next/server";

export async function GET() {
  const HASHNODE_API_URL = "https://gql.hashnode.com/";

  const query = `
    query Publication {
      publication(host: "blogs.pranavtripathi.me") {
        posts(first: 20) {
          edges {
            node {
              coverImage {
                url
              }
              publishedAt
              title
              brief
              url
              tags {
                name
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(HASHNODE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch posts" }),
      {
        status: 500,
      }
    );
  }
}
