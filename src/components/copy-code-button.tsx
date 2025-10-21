"use client";

import { useEffect } from "react";
import { Copy, Check } from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";

export default function CodeCopyButton() {
    useEffect(() => {
        const copyIcon = renderToStaticMarkup(<Copy size={16} />);
        const checkIcon = renderToStaticMarkup(<Check size={16} />);

        const blocks = document.querySelectorAll("pre");

        blocks.forEach((block) => {
            if (block.querySelector(".copy-btn")) return;

            const button = document.createElement("button");
            button.className =
                "copy-btn absolute top-2 right-2 p-2 bg-card/40 text-card-foreground p-1 rounded hover:bg-gray-700 transition flex items-center justify-center";
            block.style.position = "relative";
            button.innerHTML = copyIcon;

            button.addEventListener("click", () => {
                const code = block.querySelector("code")?.textContent || "";
                navigator.clipboard.writeText(code);
                button.innerHTML = checkIcon;
                setTimeout(() => (button.innerHTML = copyIcon), 1500);
            });

            block.appendChild(button);
        });
    }, []);

    return null;
}
