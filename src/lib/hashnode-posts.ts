"use server";

import { Post } from "@/types/hashnode-posts";

interface Tag {
  name: string;
}

export async function fetchHashnodePosts(): Promise<Post[]> {
  const ENDPOINT = "/api/hashnode";

  const API_URL =
    process.env.NODE_ENV === "production"
      ? `https://pranavtripathi.me${ENDPOINT}`
      : `http://localhost:3000${ENDPOINT}`;

  const response = await fetch(API_URL, {
    method: "GET",
    next: { revalidate: 60 }, // optional: cache control
  });

  if (!response.ok) {
    console.error("Failed to fetch posts from Hashnode API");
    throw new Error("Failed to fetch posts");
  }

  const data = await response.json();

  const posts = data?.data?.publication?.posts?.edges?.map((edge: any) => {
    const node = edge.node;
    const tags = node.tags?.map((tag: Tag) => tag.name) || [];

    return {
      ...node,
      publishedAt: node.publishedAt
        ? new Date(node.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : null,
      tags: tags.length > 0 ? tags : undefined,
    };
  }) as Post[];

  return posts;
}