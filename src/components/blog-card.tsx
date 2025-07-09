import { motion } from "motion/react";
import { Calendar, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BlogPost } from "@/types";

interface BlogCardProps {
    post: BlogPost;
    index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
    const placeholderImage = `https://picsum.photos/400/200?random=${index}`;
    const imageUrl = post.coverImage?.url || placeholderImage;

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                delay: index * 0.1,
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
        <motion.div variants={cardVariants} className="h-full">
            <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative overflow-hidden">
                    <img
                        src={imageUrl}
                        alt={post.title}
                        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                        onError={(e) => {
                            e.currentTarget.src = placeholderImage;
                        }}
                    />
                    {post.source && (
                        <Badge
                            variant={post.source === "hashnode" ? "default" : "secondary"}
                            className={`absolute top-2 right-2 ${post.source === "hashnode" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}
                        >
                            {post.source === "hashnode" ? "Hashnode" : "Local"}
                        </Badge>
                    )}
                </div>

                <CardHeader className="pb-2">
                    <h3 className="text-lg font-semibold line-clamp-2 hover:text-primary transition-colors">
                        {post.title}
                    </h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(post.publishedAt)}
                    </div>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                    <p className="text-muted-foreground line-clamp-3 mb-4 flex-1">
                        {post.brief}
                    </p>

                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
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
                        className="w-full"
                        onClick={() => window.open(post.url, "_blank")}
                    >
                        Read More
                        <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    );
}