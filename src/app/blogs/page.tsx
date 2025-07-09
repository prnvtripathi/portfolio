// app/blogs/page.tsx (Server Component)
import { getAllPosts } from "@/lib/posts";
import { fetchHashnodePosts } from "@/lib/hashnode-posts";
import BlogsPageClient from "@/components/blogs-client";

export default async function BlogsPageWrapper() {
    const localPosts = getAllPosts();
    const hashnodePosts = await fetchHashnodePosts();

    const formattedLocalPosts = localPosts.map((post) => ({
        title: post.meta.title,
        brief: post.content.slice(0, 200),
        url: `/blogs/${post.slug}`,
        publishedAt: post.meta.date,
        coverImage: {
            url: post.meta.coverImage
        },
        source: "local" as const,
        tags: post.meta.tags || [],
    }));

    const formattedHashnodePosts = hashnodePosts.map((post) => ({
        title: post.title,
        brief: post.brief,
        url: post.url,
        publishedAt: post.publishedAt,
        coverImage: post.coverImage,
        source: "hashnode" as const,
        tags: post.tags || [],
    }));

    const allPosts = [...formattedLocalPosts, ...formattedHashnodePosts];

    return <BlogsPageClient initialPosts={allPosts} />;
}
