"use server";

import { Post } from "@/types/hashnode-posts";

interface Tag {
  name: string;
}

export async function fetchHashnodePosts(): Promise<Post[]> {
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
      next: { revalidate: 60 }, // optional: cache control
    });

    if (!response.ok) {
      console.error("Failed to fetch posts from Hashnode API");
      return [];
    }

    const data = await response.json();

    if (data.errors) {
      console.error("GraphQL errors:", data.errors);
      return [];
    }

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

    return posts || [];
  } catch (error) {
    console.error("Failed to fetch posts from Hashnode API:", error);
    // Return empty array instead of throwing error to prevent build failure
    return [];
  }
}
