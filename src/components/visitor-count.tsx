"use client";

import React, { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { NumberTicker } from "@/components/ui/number-ticker";

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    async function getVisitorCount() {
      try {
        const response = await fetch("/api/visitor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setCount(data?.count);
      } catch (error) {
        console.error("Failed to fetch visitor count:", error);
      }
    }

    getVisitorCount();
  }, []);

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full">
            <Eye className="w-5 h-5" />
          </div>

          <div className="flex flex-row justify-between items-center w-full">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              Site Visitors
            </h3>

            {count !== null ? (
              <NumberTicker
                value={count}
                className="text-lg font-bold text-gray-900 dark:text-gray-100"
                delay={1}
              />
            ) : (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
