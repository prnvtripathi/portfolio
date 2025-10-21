import { getPostBySlug, getAllPostSlugs } from '@/lib/posts';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrism from 'rehype-prism-plus';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';
import CodeCopyButton from '@/components/copy-code-button';

type Props = {
    params: {
        slug: string;
    };
};


export async function generateStaticParams() {
    const slugs = getAllPostSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    if (!post) return {};
    return {
        title: post.meta.title,
        description: post.meta.description,
    };
}

export default async function BlogPage({ params }: Props) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) return notFound();

    const processedContent = await remark()
        .use(remarkRehype)
        .use(rehypePrism)
        .use(rehypeStringify)
        .process(post.content);

    const contentHtml = processedContent.toString();

    return (
        <div className="prose dark:prose-invert w-full md:min-w-4xl mx-auto pt-24 px-3">
            <CodeCopyButton />
            {post.meta.coverImage && (
                <Image
                    src={post.meta.coverImage}
                    alt={post.meta.title}
                    width={800}
                    height={400}
                    className="w-full h-64 object-cover mb-8"
                />
            )}
            <h1 className='text-2xl md:text-5xl'>{post.meta.title}</h1>
            <p className="text-sm text-gray-500">{post.meta.date}</p>
            <div className="prose dark:prose-invert text-base md:text-xl [&_a]:underline [&_a]:decoration-blue-500 [&_a]:decoration-2 [&_a]:underline-offset-4">
                <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
            </div>
        </div>
    );
}
