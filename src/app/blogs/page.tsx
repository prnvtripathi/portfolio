// app/blogs/page.tsx (Server Component)
import { getAllPosts } from "@/lib/posts";
import { fetchHashnodePosts } from "@/lib/hashnode-posts";
import BlogsPageClient from "@/components/blogs-client";

export default async function BlogsPageWrapper() {
    let localPosts = [];
    let hashnodePosts = [];
    
    try {
        localPosts = getAllPosts();
    } catch (error) {
        console.error('Error fetching local posts:', error);
        localPosts = [];
    }
    
    try {
        hashnodePosts = await fetchHashnodePosts();
    } catch (error) {
        console.error('Error fetching Hashnode posts:', error);
        hashnodePosts = [];
    }

    const formattedLocalPosts = localPosts
        .filter((post) => post && post.meta && post.meta.title)
        .map((post) => ({
            title: post.meta.title,
            brief: post.content?.slice(0, 200) || '',
            url: `/blogs/${post.slug}`,
            publishedAt: post.meta.date,
            coverImage: {
                url: post.meta.coverImage
            },
            source: "local" as const,
            tags: post.meta.tags || [],
        }));

    // Filter out any invalid posts and add error handling
    const formattedHashnodePosts = hashnodePosts
        .filter((post) => post && post.title && post.url) // Only include valid posts
        .map((post) => ({
            title: post.title,
            brief: post.brief || '',
            url: post.url,
            publishedAt: post.publishedAt,
            coverImage: post.coverImage,
            source: "hashnode" as const,
            tags: post.tags || [],
        }));

    const allPosts = [...formattedLocalPosts, ...formattedHashnodePosts];

    return <BlogsPageClient initialPosts={allPosts} />;
}
