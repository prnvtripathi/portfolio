import { motion } from "motion/react";
import { Calendar, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BlogPost {
    title: string;
    brief: string;
    url: string;
    publishedAt: string;
    coverImage?: {
        url: string;
    };
    tags?: string[];
    source?: "local" | "hashnode";
}

interface BlogListProps {
    posts: BlogPost[];
}

export function BlogList({ posts }: BlogListProps) {
    const listVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.3,
            },
        },
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <motion.div
            variants={listVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
        >
            {posts.map((post, index) => {
                const placeholderImage = `https://picsum.photos/120/80?random=${index}`;
                const imageUrl = post.coverImage?.url || placeholderImage;

                return (
                    <motion.div
                        key={`${post.url}-${index}`}
                        variants={itemVariants}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-300"
                    >
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <img
                                    src={imageUrl}
                                    alt={post.title}
                                    className="size-32 rounded-md object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = placeholderImage;
                                    }}
                                />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-lg font-semibold line-clamp-1 hover:text-primary transition-colors">
                                        {post.title}
                                    </h3>
                                    {post.source && (
                                        <Badge
                                            variant={post.source === "hashnode" ? "default" : "secondary"}
                                            className={`ml-2 ${post.source === "hashnode" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}
                                        >
                                            {post.source === "hashnode" ? "Hashnode" : "Local"}
                                        </Badge>
                                    )}
                                </div>

                                <div className="flex items-center text-sm text-muted-foreground mb-2">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    {formatDate(post.publishedAt)}
                                </div>

                                <p className="text-muted-foreground line-clamp-2 mb-3">
                                    {post.brief}
                                </p>

                                <div className="flex items-center justify-between">
                                    {post.tags && post.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1">
                                            {post.tags.slice(0, 3).map((tag, tagIndex) => (
                                                <Badge key={tagIndex} variant="outline" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                            {post.tags.length > 3 && (
                                                <Badge variant="outline" className="text-xs">
                                                    +{post.tags.length - 3}
                                                </Badge>
                                            )}
                                        </div>
                                    )}

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => window.open(post.url, "_blank")}
                                    >
                                        Read More
                                        <ExternalLink className="h-4 w-4 ml-2" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </motion.div>
    );
}