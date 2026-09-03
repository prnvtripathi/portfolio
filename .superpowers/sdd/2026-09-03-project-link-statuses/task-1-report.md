# Task 1 Report: Model and project data

## Implementation summary

- Added `archived?: boolean` to the `Project` interface.
- Updated the verified live URLs for JXON, colorfool, and GoalPost to the specified Vercel deployments.
- Marked only Trafyx and Gardenify with `archived: true`.
- Preserved the existing Trafyx and Gardenify live URLs.

## Files changed

- `src/types/project.types.ts`
- `src/data/projects.ts`

## Test commands/results

- `npx tsc --noEmit` (after the contract change): **fails** with the repository's pre-existing unrelated diagnostics in `.next/types/app/blogs/[slug]/page.ts` and `src/app/blogs/page.tsx`; no diagnostics reference the project model or project data changes.
- `npx tsc --noEmit` (TDD contract probe, with `archived: true` temporarily added before adding the interface field): produced the same unrelated blog diagnostics and did not report an `archived` diagnostic because the exported array is inferred without an explicit `Project[]` annotation.
- `git diff --check`: **passes**.

## TDD evidence / applicability

The requested red-step probe was performed before adding `archived?: boolean`. It did not isolate a type failure because `projects` is currently inferred rather than explicitly typed as `Project[]`. The requested verification is TypeScript compilation, and there is no existing project-data test harness; adding an invented test would exceed the brief. The final compilation evidence is documented above.

## Self-review

- Confirmed the optional field is located on `Project` and uses the exact requested spelling/type.
- Confirmed exactly two active `archived: true` entries exist: Trafyx and Gardenify.
- Confirmed exactly the three requested live URL replacements and no other live URL changes.
- Confirmed archived projects retain their original live URLs.

## Concerns

The repository-wide TypeScript baseline remains failing in unrelated blog files and generated Next.js types. Those errors were not modified as part of this task.

## Fix Round 1

### Commands and exact outcomes

- `npm run build`: **fails** during `next build` before type validation because Turbopack cannot fetch the Google Fonts `DM Sans`, `JetBrains Mono`, and `Playfair Display` resources from `fonts.googleapis.com` in this environment. The command reports three `next/font` errors: `Failed to fetch ... from Google Fonts`.
- `npx tsc --noEmit`: **fails** with the previously recorded diagnostics in generated `.next/types/app/blogs/[slug]/page.ts` and `src/app/blogs/page.tsx`; no project model/data diagnostics are reported.

### Baseline provenance

Read-only inspection of the parent commit (`31eed42^`, `384bf8c`) confirms the affected blog source predates Task 1. `git show HEAD^:src/app/blogs/page.tsx` contains the untyped `let localPosts = []` and `let hashnodePosts = []` declarations at lines 7–8, and the resulting `BlogPost[]` construction at line 53. `git show HEAD^:src/app/blogs/[slug]/page.tsx` contains the synchronous `Props.params` shape at lines 11–15 while awaiting `params` at lines 23–25 and 33–35. The parent history shows these files were last changed by commits `384bf8c` and `5d7ff43`, both before `31eed42`.

### Code changes

No production code changed in this fix round. Only this report was appended with verification and provenance evidence.
