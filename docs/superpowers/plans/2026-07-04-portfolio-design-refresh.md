# Portfolio Editorial Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reskin the existing Next.js/Tailwind portfolio to match the "Portfolio redesign project" design (`Portfolio.dc.html`, claude.ai/design project `a5359b37-d5eb-44d1-b11d-29ffbf98a9ea`) — an editorial, narrow single-column layout using Playfair Display + DM Sans + JetBrains Mono, a cream/near-black color scheme with an oklch blue accent, and numbered section labels — while keeping all existing data (projects, social links, experience) and functionality (contact form, Cal.com booking, visitor counter, blogs, project search/grid).

**Architecture:** Swap the design-token layer (fonts + CSS custom properties in `globals.css`, font loaders in `layout.tsx`) first so every page inherits the new palette/typography automatically. Then rewrite each homepage section component (Hero, About, new Skills, Experience, Projects, Contact) and the shell components (Navbar, Sidebar, Footer, ThemeToggle) to match the design's specific layout, replacing the old card-grid/spring-animation look with the new divider-row/fade-up look. `/blogs` and `/projects` pages keep their current internal layouts (cards, search, grid/list toggle) but inherit the new fonts and colors since those come from shared tokens.

**Tech Stack:** Next.js 15 (App Router), Tailwind CSS v4 (CSS-based `@theme` config, no `tailwind.config.*` file), `next/font/google`, `motion` (Framer Motion), `next-themes`, shadcn-style UI primitives in `src/components/ui`.

## Global Constraints

- Tailwind v4 project — no `tailwind.config.js`/`.ts` exists. All design tokens live in `src/app/globals.css` under `@theme` / `@theme inline` blocks and `:root` / `.dark`. Do not create a Tailwind config file.
- Keep existing CSS custom property **names** (`--background`, `--primary`, `--muted-foreground`, etc.) so every existing shadcn-style component (`Button`, `Card`, `Badge`, `Input`, `Sheet`, `DropdownMenu`, ...) picks up the new palette without being touched.
- Dark mode is class-based via `next-themes` (`attribute="class"`) and Tailwind's `@custom-variant dark (&:is(.dark *))` — already wired in `globals.css`. New components must use Tailwind's `dark:` variant, never manual `document.body.classList` checks.
- `/blogs` and `/projects` pages are NOT visually rewritten in this plan — only token-level (font/color) changes apply to them. Do not touch `src/app/blogs/**`, `src/app/projects/page.tsx`, `src/components/project-list.tsx`, `src/components/project-card.tsx`, `src/components/blog-*.tsx`.
- The Contact section (email form via EmailJS, Cal.com embed, visitor counter) is kept on the homepage, restyled to match the new section rhythm — not removed, per explicit product decision.
- Data sources (`src/data/projects.ts`, `src/data/social-links.ts`) are not modified — component rewrites consume them as-is.
- Homepage's featured projects are `projects.slice(0, 3)` — verified the first three entries in `src/data/projects.ts` (Trafyx, Go Tiny, Captions Gen) already match the design's project order, so no data reordering is needed.
- No automated test suite covers visual/JSX output in this repo — verification for every task is: `npm run lint` passes, `npm run build` succeeds, and a manual check in the browser (`npm run dev`) at both mobile (~390px) and desktop (~1280px) widths, in both light and dark mode.

---

### Task 1: Design tokens — fonts and colors

**Files:**
- Modify: `src/app/layout.tsx` (font loaders, body class)
- Modify: `src/app/globals.css` (color tokens, font tokens, remove `.section-heading`)

**Interfaces:**
- Produces: Tailwind utilities `font-sans` (DM Sans), `font-serif` (Playfair Display), `font-mono` (JetBrains Mono); CSS custom property `--primary-hover` / utility `bg-primary-hover`, `text-primary-hover`, `border-primary-hover`; recolored `--background`, `--foreground`, `--card`, `--popover`, `--primary`, `--primary-foreground`, `--secondary`, `--muted`, `--muted-foreground`, `--accent`, `--accent-foreground`, `--border`, `--input`, `--ring` (light and `.dark`).
- Consumes: nothing (foundation task).

- [ ] **Step 1: Replace the font loaders in `src/app/layout.tsx`**

Open `src/app/layout.tsx` and replace the `Mona_Sans` import and its usage:

```tsx
import type React from "react";
import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Sidebar } from "@/components/sidebar";
import { Navbar } from "@/components/navbar";
import { Toaster } from "sonner";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/next"

const fontSerif = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
  variable: "--font-playfair",
});

const fontSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Portfolio | Pranav Tripathi",
  description: "Personal portfolio showcasing my work and experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "bg-background font-sans font-light antialiased",
          fontSerif.variable,
          fontSans.variable,
          fontMono.variable
        )}
      >
        <Toaster />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Sidebar />
            <Navbar />
            <main>
              {children}
              <Analytics />
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

Note the `md:pl-16` wrapper div is removed here — Task 4 makes the sidebar a fixed overlay that no longer needs reserved horizontal space. Leaving it in until Task 4 lands would just leave dead padding, so it's safe (and simplest) to remove it now.

- [ ] **Step 2: Replace font tokens in `src/app/globals.css`**

Find this block near the top of `src/app/globals.css`:

```css
@theme {
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}
```

Replace it with:

```css
@theme {
  --font-sans: var(--font-dm-sans);
  --font-serif: var(--font-playfair);
  --font-mono: var(--font-jetbrains-mono);
}
```

- [ ] **Step 3: Replace the light-mode color tokens**

Find the `:root { ... }` block (color tokens) and replace it entirely with:

```css
:root {
  --background: #f7f6f1;
  --foreground: #18181a;
  --card: #f7f6f1;
  --card-foreground: #18181a;
  --popover: #f7f6f1;
  --popover-foreground: #18181a;
  --primary: oklch(51% 0.2 258);
  --primary-foreground: oklch(0.99 0 0);
  --primary-hover: oklch(44% 0.22 258);
  --secondary: #efede7;
  --secondary-foreground: #18181a;
  --muted: #efede7;
  --muted-foreground: #79786e;
  --accent: #efede7;
  --accent-foreground: #18181a;
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.577 0.245 27.325);
  --border: #dddbd2;
  --input: #dddbd2;
  --ring: oklch(51% 0.2 258);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.87 0 0);
}
```

(`--chart-*`, `--radius`, and `--sidebar-*` are unchanged from the original — they aren't part of the design and `--sidebar-*` is unused anywhere in the codebase, confirmed by `grep -rn "sidebar-" src` returning no component matches.)

- [ ] **Step 4: Replace the `.dark` color tokens**

Find the `.dark { ... }` block and replace it entirely with:

```css
.dark {
  --background: #111110;
  --foreground: #e4e2db;
  --card: #111110;
  --card-foreground: #e4e2db;
  --popover: #111110;
  --popover-foreground: #e4e2db;
  --primary: oklch(67% 0.17 258);
  --primary-foreground: oklch(0.145 0 0);
  --primary-hover: oklch(74% 0.17 258);
  --secondary: #1b1b19;
  --secondary-foreground: #e4e2db;
  --muted: #1b1b19;
  --muted-foreground: #68675e;
  --accent: #1b1b19;
  --accent-foreground: #e4e2db;
  --destructive: oklch(0.396 0.141 25.723);
  --destructive-foreground: oklch(0.637 0.237 25.331);
  --border: #252521;
  --input: #252521;
  --ring: oklch(67% 0.17 258);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(0.269 0 0);
  --sidebar-ring: oklch(0.439 0 0);
}
```

- [ ] **Step 5: Register `--primary-hover` as a Tailwind color utility**

In the `@theme inline { ... }` block, find:

```css
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
```

Add a line right after it:

```css
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary-hover: var(--primary-hover);
```

- [ ] **Step 6: Remove the now-unused `.section-heading` utility**

Delete this block from `src/app/globals.css` (it will be fully replaced by per-section eyebrow labels in Tasks 7, 8, 9, 10):

```css
.section-heading {
  @apply text-3xl font-bold mb-8 relative inline-block;
}

.section-heading::after {
  content: "";
  @apply absolute bottom-0 left-0 w-1/2 h-1 bg-primary mt-2;
}
```

- [ ] **Step 7: Verify the build**

Run: `npm run build`
Expected: build succeeds. It's fine if `about-section.tsx`, `experience-section.tsx`, `projects-section.tsx`, and `contact-section.tsx` temporarily render headings with no special styling (the `.section-heading` class is now a no-op) — those are fixed in Tasks 7–10.

- [ ] **Step 8: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css
git commit -m "feat: swap design tokens to editorial palette and Playfair/DM Sans/JetBrains Mono fonts"
```

---

### Task 2: Theme toggle — pill/knob switch

**Files:**
- Modify: `src/components/theme-toggle.tsx`

**Interfaces:**
- Consumes: `useTheme` from `next-themes` (already a dependency, already wired via `ThemeProvider` in `src/app/layout.tsx` with `attribute="class"`).
- Produces: `ThemeToggle` component (named export, no props) — used by `Navbar` (Task 3).

- [ ] **Step 1: Rewrite `src/components/theme-toggle.tsx`**

```tsx
"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="relative h-7 w-13 shrink-0 rounded-full border border-border bg-secondary transition-colors hover:border-muted-foreground"
    >
      <span className="absolute left-[3px] top-[3px] flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-background transition-[left] duration-[350ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] dark:left-[29px]">
        <Sun className="h-3 w-3 dark:hidden" />
        <Moon className="hidden h-3 w-3 dark:block" />
      </span>
    </button>
  );
}
```

This relies on Tailwind's `dark:` variant (matching `.dark` on an ancestor, already configured via `@custom-variant dark (&:is(.dark *))` in `globals.css`) to move the knob and swap the icon with pure CSS — no `mounted` guard or hydration-mismatch risk, since nothing branches on JS state until the click handler runs.

- [ ] **Step 2: Verify no other file imports the old dropdown pieces**

Run: `grep -rn "DropdownMenu" src/components/theme-toggle.tsx`
Expected: no output (the dropdown-menu import is gone). The `DropdownMenu` UI primitive itself (`src/components/ui/dropdown-menu.tsx`) stays — it's still used elsewhere (verify: `grep -rln "ui/dropdown-menu" src` should still list `theme-toggle.tsx`'s prior usage removed but keep the primitive file untouched since it's a general-purpose component).

- [ ] **Step 3: Run lint and build**

Run: `npm run lint && npm run build`
Expected: both succeed with no unused-import warnings for `theme-toggle.tsx`.

- [ ] **Step 4: Commit**

```bash
git add src/components/theme-toggle.tsx
git commit -m "feat: replace theme dropdown with sliding pill toggle"
```

---

### Task 3: Navbar — slim sticky bar

**Files:**
- Modify: `src/components/navbar.tsx`

**Interfaces:**
- Consumes: `ThemeToggle` (Task 2, default named export unchanged), `Sheet`/`SheetContent`/`SheetTrigger` from `./ui/sheet` (unchanged), `Button` from `./ui/button` (unchanged).
- Produces: `Navbar` component (named export, no props) — used by `src/app/layout.tsx` (already wired, no change needed there beyond Task 1's removal of the `md:pl-16` wrapper).

- [ ] **Step 1: Rewrite `src/components/navbar.tsx`**

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const navItems = [
  { name: "About", href: "/#about" },
  { name: "Experience", href: "/#experience" },
  { name: "Projects", href: "/#projects" },
  { name: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur transition-colors supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-[52px] max-w-[720px] items-center justify-between px-8">
        <Link
          href="/"
          className="font-serif text-[17px] italic text-foreground transition-colors hover:text-primary"
        >
          PT
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-[13px] tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        {/* Mobile navigation */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Toggle menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="mt-8 flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="font-serif text-lg text-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/blogs"
                  className="font-serif text-lg text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  Blogs
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
```

`Blogs` is added to the mobile sheet (not present in the desktop nav, matching the design) because the desktop sidebar (Task 4) carries the `Blogs` link but is hidden on mobile — this keeps blogs discoverable on small screens without deviating from the design's 3-link desktop nav.

- [ ] **Step 2: Verify in the browser**

Run: `npm run dev`, open `http://localhost:3000`.
Expected: sticky top bar, 52px tall, "PT" logo in italic serif on the left, About/Experience/Projects/Contact links + pill toggle on the right (desktop ≥768px). Below 768px: hamburger + pill toggle only, opening a sheet with all 5 links (About/Experience/Projects/Contact/Blogs).

- [ ] **Step 3: Commit**

```bash
git add src/components/navbar.tsx
git commit -m "feat: rebuild navbar as slim sticky bar matching editorial design"
```

---

### Task 4: Sidebar — fixed vertical social links

**Files:**
- Modify: `src/components/sidebar.tsx`

**Interfaces:**
- Consumes: `socialLinks` from `@/data/social-links` (unchanged — `{ name, href, icon }[]`).
- Produces: `Sidebar` component (named export, no props) — used by `src/app/layout.tsx` (Task 1 already removed the `md:pl-16` reserved-space wrapper this sidebar used to require).

- [ ] **Step 1: Rewrite `src/components/sidebar.tsx`**

```tsx
"use client";

import Link from "next/link";
import { socialLinks } from "@/data/social-links";

const sidebarLinks = socialLinks.filter((link) => link.name !== "Email");

export function Sidebar() {
  return (
    <div className="fixed bottom-0 left-6 z-30 hidden flex-col items-center gap-5 md:flex">
      {sidebarLinks.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="rotate-180 font-mono text-[10px] tracking-[0.12em] text-muted-foreground transition-colors hover:translate-y-1 hover:text-primary [text-orientation:mixed] [writing-mode:vertical-rl]"
        >
          {link.name}
        </Link>
      ))}
      <div className="mt-1 h-18 w-px bg-border" />
    </div>
  );
}
```

`Email` is filtered out because it's already surfaced as the primary "Get in touch →" CTA in the Hero section (Task 6); the design's sidebar only lists GitHub/LinkedIn/Twitter/Peerlist/Blog.

- [ ] **Step 2: Verify in the browser**

Run: `npm run dev`, resize to desktop width (≥768px).
Expected: vertical rotated text links fixed at bottom-left (GitHub, LinkedIn, Twitter, Peerlist, Blogs — reading bottom-to-top), a short vertical divider line above them, hover shifts text down slightly and tints it with the accent color. Confirm the sidebar is fully hidden below 768px (no layout shift, no leftover padding on the main content).

- [ ] **Step 3: Commit**

```bash
git add src/components/sidebar.tsx
git commit -m "feat: replace icon sidebar with fixed vertical text links"
```

---

### Task 5: Footer — copyright line + mobile social row

**Files:**
- Modify: `src/components/footer.tsx`

**Interfaces:**
- Consumes: `socialLinks` from `@/data/social-links` (unchanged).
- Produces: default-exported `Footer` component — used by `src/app/layout.tsx` (already wired, no change needed).

- [ ] **Step 1: Rewrite `src/components/footer.tsx`**

```tsx
import Link from "next/link";
import { Button } from "./ui/button";
import { socialLinks } from "@/data/social-links";

function Footer() {
  return (
    <footer className="mx-auto flex max-w-[720px] flex-col gap-6 px-8 pb-12 pt-13">
      <div className="flex justify-center gap-4 border-t border-border pt-6 md:hidden">
        {socialLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="ghost" size="icon" aria-label={link.name}>
              <link.icon className="h-5 w-5" />
            </Button>
          </Link>
        ))}
      </div>
      <p className="text-right font-mono text-[11px] tracking-wide text-muted-foreground">
        © {new Date().getFullYear()} Pranav Tripathi
      </p>
    </footer>
  );
}

export default Footer;
```

The mobile social row keeps its `md:hidden` visibility (unchanged behavior — it's the mobile equivalent of the desktop sidebar from Task 4). The copyright line is new and always visible, right-aligned, matching the design.

- [ ] **Step 2: Verify in the browser**

Run: `npm run dev`.
Expected: on mobile, a row of social icon buttons above a divider, then the copyright line below. On desktop, only the copyright line (icons already covered by the Task 4 sidebar).

- [ ] **Step 3: Commit**

```bash
git add src/components/footer.tsx
git commit -m "feat: add copyright line to footer matching editorial design"
```

---

### Task 6: Hero section rewrite

**Files:**
- Modify: `src/components/hero-section.tsx`

**Interfaces:**
- Consumes: `socialLinks` from `@/data/social-links` (for the `mailto:` link, keeping the email address DRY instead of hardcoding it again).
- Produces: `HeroSection` component (named export, no props) — used by `src/app/page.tsx` (Task 11).

- [ ] **Step 1: Rewrite `src/components/hero-section.tsx`**

```tsx
"use client";

import { motion } from "motion/react";
import { socialLinks } from "@/data/social-links";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function HeroSection() {
  const emailHref = socialLinks.find((link) => link.name === "Email")!.href;

  return (
    <motion.section
      id="home"
      className="pb-24 pt-[clamp(88px,12vh,136px)]"
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.08 }}
    >
      <motion.p
        variants={fadeUp}
        className="mb-5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground"
      >
        Full Stack Developer
      </motion.p>
      <motion.h1
        variants={fadeUp}
        className="mb-7 font-serif text-[clamp(46px,7.5vw,74px)] leading-[1.07] tracking-[-0.01em] text-foreground"
      >
        Pranav
        <br />
        Tripathi
      </motion.h1>
      <motion.p
        variants={fadeUp}
        className="mb-10 max-w-[420px] text-base font-light leading-[1.75] text-muted-foreground"
      >
        Building fast, scalable web applications with clean architecture and a
        thoughtful eye for user experience.
      </motion.p>
      <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
        <a
          href={emailHref}
          className="rounded-full border border-primary px-6 py-2 text-[13px] font-medium tracking-wide text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Get in touch →
        </a>
        <a
          href="#projects"
          className="rounded-full border border-border px-6 py-2 text-[13px] text-muted-foreground transition-colors hover:border-muted-foreground hover:text-foreground"
        >
          View work ↓
        </a>
      </motion.div>
    </motion.section>
  );
}
```

This drops the two-column layout, the avatar image (`DirectionAwareHover`), and the scroll-down arrow indicator, replacing them with the design's single-column eyebrow → serif name → paragraph → pill CTAs structure. `src/components/ui/direction-aware-hover.tsx` is left in place (unused, general-purpose primitive — not deleted, out of scope).

- [ ] **Step 2: Verify in the browser**

Run: `npm run dev`.
Expected: hero shows "Full Stack Developer" label, large serif "Pranav / Tripathi" on two lines, description paragraph, and two pill buttons — "Get in touch →" filled-on-hover, "View work ↓" outlined. Content fades up on load.

- [ ] **Step 3: Commit**

```bash
git add src/components/hero-section.tsx
git commit -m "feat: rebuild hero section with editorial single-column layout"
```

---

### Task 7: About section rewrite + new Skills section

**Files:**
- Modify: `src/components/about-section.tsx`
- Create: `src/components/skills-section.tsx`

**Interfaces:**
- Produces: `AboutSection` component (named export, no props, id `about`) and `SkillsSection` component (named export, no props, no id — design doesn't anchor-link to it) — both used by `src/app/page.tsx` (Task 11).
- Consumes: nothing external (skills list is inlined, matching the design's plain-text approach — no per-skill icons in this section, unlike the old `SkillsCard`).

- [ ] **Step 1: Rewrite `src/components/about-section.tsx`**

```tsx
"use client";

import { motion } from "motion/react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function AboutSection() {
  return (
    <motion.section
      id="about"
      className="border-t border-border py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <motion.p
        variants={itemVariants}
        className="mb-9 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
      >
        01 / About
      </motion.p>
      <div className="flex flex-col gap-4">
        <motion.p
          variants={itemVariants}
          className="max-w-[560px] text-base font-light leading-[1.82] text-foreground"
        >
          I&apos;m a dedicated full-stack developer specializing in building
          dynamic and scalable applications. I focus on delivering efficient,
          user-friendly solutions and thrive on solving complex problems
          through technology.
        </motion.p>
        <motion.p
          variants={itemVariants}
          className="max-w-[560px] text-base font-light leading-[1.82] text-muted-foreground"
        >
          My experience spans modern frameworks like Next.js, FastAPI, and
          Golang — building backend services, managing databases, and
          crafting seamless user interfaces.
        </motion.p>
        <motion.p
          variants={itemVariants}
          className="mt-1 text-sm font-light leading-[1.75] text-muted-foreground"
        >
          When I&apos;m not coding — guitar, F1 🏎️, football, and cricket.
        </motion.p>
      </div>
    </motion.section>
  );
}
```

- [ ] **Step 2: Create `src/components/skills-section.tsx`**

```tsx
"use client";

import { motion } from "motion/react";

const SKILLS = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Golang",
  "FastAPI",
  "Node.js",
  "Express",
  "Docker",
  "Redis",
  "MongoDB",
  "PostgreSQL",
  "Tailwind CSS",
  "Git",
  "Linux",
];

export function SkillsSection() {
  return (
    <motion.section
      className="border-t border-border py-20"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="mb-9 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
        02 / Skills
      </p>
      <p className="font-mono text-[13px] leading-[2.1] tracking-wide text-muted-foreground">
        {SKILLS.join(" · ")}
      </p>
    </motion.section>
  );
}
```

- [ ] **Step 3: Verify in the browser**

Run: `npm run dev`, scroll to the About area.
Expected: "01 / About" label, two body paragraphs, one smaller "when I'm not coding" line, then a border-top divider, "02 / Skills" label, and a single monospace line of skills separated by " · ".

- [ ] **Step 4: Commit**

```bash
git add src/components/about-section.tsx src/components/skills-section.tsx
git commit -m "feat: rebuild about section and add standalone skills section"
```

---

### Task 8: Experience section rewrite

**Files:**
- Modify: `src/components/experience-section.tsx`

**Interfaces:**
- Produces: `ExperienceSection` component (named export, no props, id `experience`) — used by `src/app/page.tsx` (Task 11).
- Consumes: nothing external (experience data stays inlined in this component, same as before — not extracted to `src/data`, matching existing convention and avoiding unnecessary abstraction for content only used here).

- [ ] **Step 1: Rewrite `src/components/experience-section.tsx`**

```tsx
"use client";

import { motion } from "motion/react";
import Link from "next/link";

const experiences = [
  {
    title: "Full Stack Engineer",
    company: "TractUs Labs",
    website: "https://www.tractuslabs.com",
    period: "Nov '25 - Present",
  },
  {
    title: "Full Stack Developer",
    company: "Erzy Call",
    website: "https://erzycall.com",
    period: "June '25 - Nov '25",
    description:
      "Implemented a unified ETA calculation system for truck logistics, enhancing delivery time estimates. Designed and maintained Telegram-based bots and backend services to streamline automated communication and support functions.",
    technologies: [
      "TypeScript",
      "Next.js",
      "NestJs",
      "Telegram Bot API",
      "OpenAI API",
      "Google Maps API",
    ],
  },
  {
    title: "Full Stack Developer & DevOps Intern",
    company: "Soundverse AI",
    website: "https://soundverse.ai",
    period: "June '24 - May '25",
    description:
      "Developed and maintained the company's web application. Implemented CI/CD pipelines and automated deployment processes.",
    technologies: ["JavaScript", "Next.js", "FastAPI", "Redis", "GKE", "Docker", "GCloud"],
  },
  {
    title: "Full Stack Developer Intern",
    company: "Campaigning Source",
    website: "https://campaigningsource.com",
    period: "Aug '23 - June '24",
    description:
      "Developed and maintained multiple web applications. Collaborated with designers and product managers to deliver high-quality software solutions to various clients.",
    technologies: ["Next.js", "React", "Node.js", "Express", "MongoDB"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function ExperienceSection() {
  return (
    <motion.section
      id="experience"
      className="border-t border-border py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <motion.p
        variants={itemVariants}
        className="mb-9 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
      >
        03 / Experience
      </motion.p>
      <div className="flex flex-col">
        {experiences.map((exp) => (
          <motion.div
            key={exp.company}
            variants={itemVariants}
            className="border-t border-border py-8"
          >
            <div className="mb-1 flex items-start justify-between gap-4">
              <div>
                <h3 className="mb-1 font-serif text-[19px] leading-tight text-foreground">
                  {exp.title}
                </h3>
                <Link
                  href={exp.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-primary transition-opacity hover:opacity-70"
                >
                  {exp.company} ↗
                </Link>
              </div>
              <span className="whitespace-nowrap pt-[3px] font-mono text-[11px] tracking-wide text-muted-foreground">
                {exp.period}
              </span>
            </div>
            {exp.description && (
              <p className="mb-3.5 text-sm font-light leading-[1.78] text-muted-foreground">
                {exp.description}
              </p>
            )}
            {exp.technologies && (
              <span className="font-mono text-[10px] tracking-wide text-muted-foreground">
                {exp.technologies.join(" · ")}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
```

Every row gets a `border-t`, including the first — the design places a divider right after the "03 / Experience" label and before the first entry, so there's no `first:border-t-0` exception here.

- [ ] **Step 2: Verify in the browser**

Run: `npm run dev`, scroll to Experience.
Expected: "03 / Experience" label, then four divider-separated rows (TractUs Labs, Erzy Call, Soundverse AI, Campaigning Source), each with serif job title, accent-colored company link, right-aligned monospace date range, and (where present) a description paragraph plus a monospace tech-stack line. No card borders/shadows.

- [ ] **Step 3: Commit**

```bash
git add src/components/experience-section.tsx
git commit -m "feat: rebuild experience section as divider-row list"
```

---

### Task 9: Projects section rewrite (homepage)

**Files:**
- Modify: `src/components/projects-section.tsx`

**Interfaces:**
- Consumes: `projects` from `@/data/projects` (unchanged shape: `{ id, name, description, image, skills, liveUrl?, githubUrl? }[]`).
- Produces: `ProjectsSection` component (named export, no props, id `projects`) — used by `src/app/page.tsx` (Task 11). No longer imports `ProjectCard` (that component stays reserved for `/projects`'s grid view, untouched).

- [ ] **Step 1: Rewrite `src/components/projects-section.tsx`**

```tsx
"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { projects } from "@/data/projects";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function ProjectsSection() {
  const featured = projects.slice(0, 3);

  return (
    <motion.section
      id="projects"
      className="border-t border-border py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <motion.div
        variants={itemVariants}
        className="mb-9 flex items-center justify-between"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          04 / Projects
        </p>
        <Link
          href="/projects"
          className="text-xs tracking-wide text-muted-foreground transition-colors hover:text-primary"
        >
          All projects →
        </Link>
      </motion.div>
      <div className="flex flex-col">
        {featured.map((project, index) => (
          <motion.div
            key={project.id}
            variants={itemVariants}
            className={`border-t border-border py-7 ${
              index === featured.length - 1 ? "border-b" : ""
            }`}
          >
            <div className="mb-2 flex items-start justify-between gap-4">
              <h3 className="font-serif text-[19px] leading-tight text-foreground">
                {project.name}
              </h3>
              <div className="flex gap-4">
                {project.liveUrl && (
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] tracking-wide text-muted-foreground transition-colors hover:text-primary"
                  >
                    Live ↗
                  </Link>
                )}
                {project.githubUrl && (
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] tracking-wide text-muted-foreground transition-colors hover:text-primary"
                  >
                    Code ↗
                  </Link>
                )}
              </div>
            </div>
            <p className="mb-3 text-sm font-light leading-[1.72] text-muted-foreground">
              {project.description}
            </p>
            <span className="font-mono text-[10px] tracking-wide text-muted-foreground">
              {project.skills.join(" · ")}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
```

- [ ] **Step 2: Verify in the browser**

Run: `npm run dev`, scroll to Projects.
Expected: "04 / Projects" label with "All projects →" link on the same row, then three divider-row entries (Trafyx, Go Tiny, Captions Gen) each with serif title, right-aligned "Live ↗" / "Code ↗" links, description, and a monospace tech-stack line. The last row has both a top and bottom border, closing the list. No project thumbnail images (design doesn't show any on the homepage — thumbnails remain on `/projects`'s card grid).

- [ ] **Step 3: Commit**

```bash
git add src/components/projects-section.tsx
git commit -m "feat: rebuild homepage projects section as divider-row list"
```

---

### Task 10: Contact section restyle

**Files:**
- Modify: `src/components/contact-section.tsx`

**Interfaces:**
- Consumes: nothing new (all existing EmailJS/Cal.com/visitor-counter logic in this file is unchanged).
- Produces: `ContactSection` component (named export, no props, id `contact`) — used by `src/app/page.tsx` (Task 11). Only the heading markup and outer section spacing change.

- [ ] **Step 1: Update the outer section className**

In `src/components/contact-section.tsx`, find:

```tsx
    <motion.section
      id="contact"
      className="py-16"
```

Replace with:

```tsx
    <motion.section
      id="contact"
      className="border-t border-border py-20"
```

- [ ] **Step 2: Replace the heading**

Find:

```tsx
      <motion.h2 className="section-heading" variants={itemVariants}>
        Get in Touch
      </motion.h2>
```

Replace with:

```tsx
      <motion.p
        variants={itemVariants}
        className="mb-9 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
      >
        05 / Contact
      </motion.p>
```

- [ ] **Step 3: Verify in the browser**

Run: `npm run dev`, scroll to Contact.
Expected: a border-top divider (continuing the rhythm from About/Skills/Experience/Projects), "05 / Contact" label in the same eyebrow style, then the unchanged work-inquiry form card and "let's connect" / visitor-counter card below it.

- [ ] **Step 4: Commit**

```bash
git add src/components/contact-section.tsx
git commit -m "feat: restyle contact section heading to match editorial section rhythm"
```

---

### Task 11: Homepage assembly

**Files:**
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `HeroSection` (Task 6), `AboutSection` (Task 7), `SkillsSection` (Task 7), `ExperienceSection` (Task 8), `ProjectsSection` (Task 9), `ContactSection` (Task 10).
- Produces: default-exported `Home` page component.

- [ ] **Step 1: Rewrite `src/app/page.tsx`**

```tsx
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { ExperienceSection } from "@/components/experience-section"
import { HeroSection } from "@/components/hero-section"
import { ProjectsSection } from "@/components/projects-section"
import { SkillsSection } from "@/components/skills-section"

export default function Home() {
  return (
    <div className="mx-auto max-w-[720px] px-8">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  )
}
```

- [ ] **Step 2: Full-site verification**

Run: `npm run lint && npm run build`
Expected: both succeed with zero errors/warnings.

Run: `npm run dev`, open `http://localhost:3000` and manually check:
1. Light mode, desktop (~1280px): Hero → About → Skills → Experience → Projects → Contact all flow inside the centered 720px column with consistent border-top dividers; sidebar (Task 4) visible fixed bottom-left; navbar (Task 3) sticky with 4 links + pill toggle.
2. Toggle to dark mode via the pill toggle: background/foreground/border/accent colors all switch correctly, no flash of unstyled content, no components left on the old gray palette.
3. Mobile (~390px): sidebar hidden, hamburger menu opens with 5 links, footer shows social icon row + copyright.
4. Click through: "Get in touch →" opens a mail client, "View work ↓" scrolls to Projects, "All projects →" navigates to `/projects`, each experience/project company/live/code link opens in a new tab.
5. Visit `/blogs` and `/projects` — confirm they render with the new cream/near-black colors and DM Sans/Playfair Display fonts (inherited via tokens) even though their internal card/grid layouts are untouched.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: assemble redesigned homepage with new skills section"
```

---

## Self-Review

**Spec coverage:**
- Fonts (Playfair Display, DM Sans, JetBrains Mono) → Task 1.
- Color tokens (light + dark, oklch accent) → Task 1.
- Theme toggle (pill/knob) → Task 2.
- Navbar (sticky, 720px inner max-width, PT logo, 4 links, toggle) → Task 3.
- Sidebar (fixed vertical social text links) → Task 4.
- Footer (copyright line) → Task 5.
- Hero (eyebrow, serif name, paragraph, pill CTAs) → Task 6.
- About (two paragraphs + hobby line) → Task 7.
- Skills (plain monospace list, separate numbered section) → Task 7.
- Experience (divider rows, title/company/period/description/tech) → Task 8.
- Projects (divider rows, live/code links, "All projects →") → Task 9.
- Footer copyright line inside the 720px column → Task 5 & 11.
- Contact section kept (per product decision) and restyled to match section rhythm → Task 10.
- Whole-site token inheritance for `/blogs` and `/projects` → covered by Task 1 (global tokens) + verified in Task 11 Step 2.5.

**Placeholder scan:** no TBD/TODO markers; every step has complete, runnable code.

**Type consistency:** `ThemeToggle` (Task 2) has no props, consumed identically in `Navbar` (Task 3). `SkillsSection` (Task 7) has no props, consumed identically in `page.tsx` (Task 11). `experiences`/`featured` project shapes match their existing data-source types (`src/data/projects.ts`, inline experience array) throughout.
