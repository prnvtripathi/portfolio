// components/blogs-page-client.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { BlogCard } from "@/components/blog-card";
import { BlogList } from "@/components/blog-list";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Grid,
    List,
    Search,
    Filter,
    Calendar,
    Tag,
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { BlogPost } from "@/types";

interface BlogsPageClientProps {
    initialPosts: BlogPost[];
}

export default function BlogsPageClient({ initialPosts }: BlogsPageClientProps) {
    const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
    const [searchTerm, setSearchTerm] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [sortBy, setSortBy] = useState<"date" | "title">("date");
    const [filterBySource, setFilterBySource] = useState<"all" | "local" | "hashnode">("all");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const filteredPosts = posts
        .filter((post) => {
            const matchesSearch =
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.brief.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (post.tags && post.tags.some((tag) =>
                    tag.toLowerCase().includes(searchTerm.toLowerCase())
                ));

            const matchesSource = filterBySource === "all" || post.source === filterBySource;

            const matchesTags = selectedTags.length === 0 ||
                selectedTags.every((tag) => post.tags?.includes(tag));

            return matchesSearch && matchesSource && matchesTags;
        })
        .sort((a, b) => {
            if (sortBy === "date") {
                return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
            }
            return a.title.localeCompare(b.title);
        });


    const clearFilters = () => {
        setSearchTerm("");
        setFilterBySource("all");
        setSelectedTags([]);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    return (
        <motion.div
            className="container mx-auto px-4 py-24"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Blog Posts</h1>
                <p className="text-muted-foreground">
                    Discover insights, tutorials, and thoughts from my journey
                </p>
            </div>

            {/* Search and Filters */}
            <div className="mb-8 space-y-4 w-full">
                <div className="flex flex-col lg:flex-row gap-4 items-center">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Search posts..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    <div className="flex gap-2 flex-wrap">
                        <Select value={sortBy} onValueChange={(value: "date" | "title") => setSortBy(value)}>
                            <SelectTrigger className="">
                                <Calendar className="h-4 w-4 mr-2" />
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="date">Latest</SelectItem>
                                <SelectItem value="title">Title</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={filterBySource} onValueChange={(value: "all" | "local" | "hashnode") => setFilterBySource(value)}>
                            <SelectTrigger className="">
                                <Filter className="h-4 w-4 mr-2" />
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Sources</SelectItem>
                                <SelectItem value="local">Local</SelectItem>
                                <SelectItem value="hashnode">Hashnode</SelectItem>
                            </SelectContent>
                        </Select>

                        <div className="flex gap-2">
                            <Button
                                variant={viewMode === "grid" ? "default" : "outline"}
                                size="icon"
                                onClick={() => setViewMode("grid")}
                            >
                                <Grid className="h-4 w-4" />
                            </Button>
                            <Button
                                variant={viewMode === "list" ? "default" : "outline"}
                                size="icon"
                                onClick={() => setViewMode("list")}
                            >
                                <List className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Summary */}
            <div className="mb-6 flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                    {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"} found
                </p>
                {filteredPosts.length > 0 && (
                    <p className="text-sm text-muted-foreground">
                        Sorted by {sortBy === "date" ? "latest first" : "title"}
                    </p>
                )}
            </div>

            {/* Posts Display */}
            {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">No posts found matching your criteria.</p>
                    <Button onClick={clearFilters} variant="outline">
                        Clear Filters
                    </Button>
                </div>
            ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts.map((post, index) => (
                        <BlogCard key={`${post.url}-${index}`} post={post} index={index} />
                    ))}
                </div>
            ) : (
                <BlogList posts={filteredPosts} />
            )}
        </motion.div>
    );
}
