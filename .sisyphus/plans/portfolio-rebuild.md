# Portfolio Website Rebuild: Next.js to Astro

## TL;DR

> **Quick Summary**: Rebuild Marcus Schimizzi's portfolio site (schimizzi.io) from Next.js 14 to Astro 5, migrating all content into a multi-page SSG site with a full-featured blog, zero-JS core, CSS-only animations, and 100/100 Lighthouse targets.
>
> **Deliverables**:
> - Multi-page Astro 5 portfolio site (Home, About, Projects, Experience, Blog, Contact)
> - Full-featured blog with MDX, tags, RSS feed, reading time, draft mode
> - Project detail pages with individual content per project
> - SEO: OpenGraph, Twitter Cards, JSON-LD, sitemap, RSS
> - CSS-only hero animation with rotating epithets
> - Netlify Forms contact page
> - Fathom analytics integration
> - All existing content and assets migrated
>
> **Estimated Effort**: Large
> **Parallel Execution**: YES - 6 waves
> **Critical Path**: Task 1 → Task 3 → Task 6 → Task 10 → Task 14 → Task 17

---

## Context

### Original Request
Rebuild personal portfolio website at schimizzi.io from Next.js 14 to Astro. The new site should feel modern and clean, be extremely fast, optimized for search engines, and have a blog ready out of the box.

### Interview Summary
**Key Discussions**:
- **Hero approach**: CSS/SVG-only animated gradients. Zero JavaScript. Rotating epithets via pure CSS keyframes.
- **Skills section**: Dropped entirely. Eliminates D3.js, the heaviest interactive dependency.
- **Theme**: Dark only. No light/dark toggle. Simplifies styling, reduces code.
- **Deployment**: Netlify (existing platform). Enables native Netlify Forms.
- **Site structure**: Multi-page with Astro ViewTransitions for SPA-like navigation feel.
- **Blog**: Full-featured from day one: MDX, tags, RSS, reading time, draft mode, SEO per post.
- **Projects**: Individual detail pages per project (content collection). Thumbnails on listing, demos on detail pages.
- **Styling**: Tailwind CSS only. Dropping styled-components entirely.
- **GitHub activity API**: Dropped. Curated project list is sufficient.
- **Analytics**: Keep Fathom (existing account, site ID FOJEAWOJ).
- **Contact**: Netlify Forms (name, email, message).

**Research Findings**:
- Top Astro portfolio repos (Astro Paper 4.1k stars, Astro Nano 764 stars) all use Content Collections + Zod schemas + Tailwind.
- Astro Nano achieves 100/100 Lighthouse with zero-framework architecture.
- Astro 5 renamed `ViewTransitions` to `ClientRouter` and changed Content Layer API (requires explicit `glob()` loaders).
- Fathom needs `data-spa="auto"` attribute for ViewTransitions-compatible tracking.
- Netlify Forms work natively with static HTML in Astro - no `__forms.html` workaround needed.
- CSS-only epithet rotation is feasible with `@keyframes` for fixed-interval cycling.

### Metis Review
**Identified Gaps** (addressed):
- Astro 5 API patterns: Plan uses correct `ClientRouter` and `content.config.ts` with `glob()` loaders.
- Fathom + ViewTransitions compatibility: Plan includes `data-spa="auto"` attribute.
- Netlify Forms static HTML pattern: No SPA workaround needed.
- CSS epithets limitation: Fixed-interval cycling with optional ~20-line vanilla JS for grouped rotation if desired.

---

## Work Objectives

### Core Objective
Build a zero-JS-core, multi-page Astro 5 portfolio site that migrates all content from the existing Next.js site, adds a full-featured blog, and achieves near-perfect Lighthouse scores.

### Concrete Deliverables
- Astro 5 project in `/Users/marcus/Projects/marcus/` ready for `netlify deploy`
- 8 page types: Home, About, Projects (listing), Project (detail), Experience, Blog (listing), Blog Post, Contact
- Content collections for blog posts (MDX) and projects (MDX)
- RSS feed at `/rss.xml`
- Sitemap at `/sitemap-index.xml`
- All images, logos, favicons, resume PDF migrated
- Fathom analytics tracking across all pages

### Definition of Done
- [ ] `astro build` completes without errors
- [ ] All 8 page types render correctly in browser
- [ ] Lighthouse Performance score >= 95 on all pages
- [ ] Lighthouse SEO score = 100 on all pages
- [ ] RSS feed validates at `/rss.xml`
- [ ] Sitemap generates at `/sitemap-index.xml`
- [ ] Contact form submits successfully via Netlify Forms
- [ ] All existing content present (projects, experience, education, about text)
- [ ] Blog infrastructure works with a sample draft post

### Must Have
- Zero JavaScript in core page content (no React, no Framer Motion, no D3)
- All existing text content migrated verbatim
- All existing images and assets migrated
- Dark theme matching existing color palette
- Responsive design (mobile, tablet, desktop)
- SEO meta tags on every page
- ViewTransitions (ClientRouter) for smooth page navigation

### Must NOT Have (Guardrails)
- No React, Svelte, or other component frameworks as dependencies
- No styled-components or CSS-in-JS
- No D3.js, Pixi.js, or heavy visualization libraries
- No Apollo Client or GraphQL
- No light theme or theme toggle
- No skills section
- No GitHub activity API
- No client-side data fetching at runtime
- No `any` type casts in TypeScript
- No excessive animations or gratuitous motion (keep it purposeful)
- No AI-generated placeholder content - use real content from existing site

---

## Verification Strategy

### Test Decision
- **Infrastructure exists**: NO (greenfield Astro project)
- **User wants tests**: Manual/automated verification (no unit test framework needed for static site)
- **Framework**: N/A
- **QA approach**: Build verification + Playwright browser automation + Lighthouse audits

### Automated Verification Approach

Each TODO includes executable verification that agents can run directly:

| Type | Verification Tool | Automated Procedure |
|------|------------------|---------------------|
| **Build** | Bash (`astro build`) | Agent runs build, checks exit code 0, no errors in output |
| **Pages render** | Playwright (via playwright skill) | Agent navigates each page, asserts key content visible |
| **SEO** | Playwright + DOM assertions | Agent checks meta tags, OG tags, structured data present |
| **Performance** | Lighthouse CLI via Bash | Agent runs `lighthouse` on pages, checks scores |
| **RSS/Sitemap** | Bash (curl + validate) | Agent fetches feed, validates XML structure |
| **Forms** | Playwright | Agent fills and submits form, checks success state |
| **Responsive** | Playwright viewports | Agent screenshots at mobile/tablet/desktop widths |

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately):
├── Task 1: Project scaffolding, deps, Astro config
└── Task 2: Migrate all static assets from existing site

Wave 2 (After Wave 1):
├── Task 3: Base layout + SEO head + global styles
├── Task 4: Navigation component
└── Task 5: Footer component

Wave 3 (After Wave 2):
├── Task 6: Home page (hero + CSS animation + epithets)
├── Task 7: About page
├── Task 8: Content collections setup (blog + projects schemas)
└── Task 9: Experience page

Wave 4 (After Wave 3 - Task 8 specifically):
├── Task 10: Projects listing + detail pages
└── Task 11: Blog listing + post pages + tag pages

Wave 5 (After Wave 4):
├── Task 12: Contact page with Netlify Forms
├── Task 13: RSS feed + sitemap generation
└── Task 14: Fathom analytics + ViewTransitions (ClientRouter)

Wave 6 (After Wave 5):
├── Task 15: SEO hardening (OG images, JSON-LD, Twitter Cards across all pages)
├── Task 16: Responsive design pass + mobile nav
└── Task 17: Final polish, build verification, Lighthouse audit

Critical Path: Task 1 → Task 3 → Task 6 → Task 10 → Task 14 → Task 17
Parallel Speedup: ~45% faster than sequential
```

### Dependency Matrix

| Task | Depends On | Blocks | Can Parallelize With |
|------|------------|--------|---------------------|
| 1 | None | 3, 4, 5 | 2 |
| 2 | None | 6, 7, 9, 10 | 1 |
| 3 | 1 | 6, 7, 8, 9, 10, 11, 12 | 4, 5 |
| 4 | 1 | 6, 7, 9, 10, 11, 12 | 3, 5 |
| 5 | 1 | 6, 7, 9, 10, 11, 12 | 3, 4 |
| 6 | 2, 3, 4, 5 | 17 | 7, 8, 9 |
| 7 | 2, 3, 4, 5 | 17 | 6, 8, 9 |
| 8 | 3 | 10, 11 | 6, 7, 9 |
| 9 | 2, 3, 4, 5 | 17 | 6, 7, 8 |
| 10 | 2, 8 | 15 | 11 |
| 11 | 8 | 13, 15 | 10 |
| 12 | 3, 4, 5 | 17 | 13, 14 |
| 13 | 11 | 15 | 12, 14 |
| 14 | 3 | 17 | 12, 13 |
| 15 | 10, 11, 13 | 17 | 16 |
| 16 | 3, 4 | 17 | 15 |
| 17 | All | None | None (final) |

### Agent Dispatch Summary

| Wave | Tasks | Recommended Agents |
|------|-------|-------------------|
| 1 | 1, 2 | `delegate_task(category="quick", ...)` x2 in parallel |
| 2 | 3, 4, 5 | `delegate_task(category="visual-engineering", ...)` x3 in parallel |
| 3 | 6, 7, 8, 9 | `delegate_task(category="visual-engineering", ...)` x4 in parallel |
| 4 | 10, 11 | `delegate_task(category="visual-engineering", ...)` x2 in parallel |
| 5 | 12, 13, 14 | `delegate_task(category="quick", ...)` x3 in parallel |
| 6 | 15, 16, 17 | 15+16 parallel, then 17 sequential |

---

## TODOs

- [x] 1. Project Scaffolding and Configuration

  **What to do**:
  - Initialize a new Astro 5 project in the current directory (`/Users/marcus/Projects/marcus/`)
  - Install dependencies: `astro`, `@astrojs/tailwind`, `@astrojs/sitemap`, `@astrojs/rss`, `@astrojs/mdx`, `tailwindcss`
  - Configure `astro.config.mjs` with:
    - `site: 'https://schimizzi.io'` (required for sitemap and RSS)
    - All integrations enabled: tailwind, sitemap, mdx
    - Output: `'static'` (SSG)
  - Configure `tailwind.config.mjs` with the existing color palette:
    - Primary (blue): `#1F5ABD` and full scale from existing `tailwind.config.ts`
    - Secondary (purple): `#8910A8` and full scale
    - Tertiary (violet): `#5435B3` and full scale
    - Gray scale from existing config
    - Font families: sans (Helvetica, Arial, sans-serif)
  - Create `tsconfig.json` with strict mode and path aliases
  - Create `.gitignore` for Astro project
  - Create `.prettierrc` matching existing config (120 char, 4-space, single quotes, trailing commas)

  **Must NOT do**:
  - Do not install React, Svelte, or any component framework
  - Do not install styled-components, framer-motion, d3, or pixi
  - Do not add any dependencies beyond what is listed above

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Straightforward scaffolding with known config values. No design decisions.
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Understands Astro project structure and Tailwind config patterns
  - **Skills Evaluated but Omitted**:
    - `playwright`: Not needed for scaffolding
    - `git-master`: No git operations in this task

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Task 2)
  - **Blocks**: Tasks 3, 4, 5 (all layout/component work)
  - **Blocked By**: None (can start immediately)

  **References**:

  **Pattern References**:
  - `/Users/marcus/Projects/showcase/tailwind.config.ts` - Full color palette to replicate (lines 3-73: primary, secondary, tertiary, pop, gray scales)
  - `/Users/marcus/Projects/showcase/package.json` - Reference for what NOT to install (lines 11-46: old deps to avoid)
  - `/Users/marcus/Projects/showcase/.prettierrc` - Formatting config to replicate

  **External References**:
  - Astro 5 project setup: `npm create astro@latest`
  - Astro config reference: https://docs.astro.build/en/reference/configuration-reference/
  - Astro Tailwind integration: https://docs.astro.build/en/guides/integrations-guide/tailwind/

  **WHY Each Reference Matters**:
  - `tailwind.config.ts`: Contains the exact color values that define the site's visual identity. Must be replicated precisely.
  - `package.json`: Shows what was used before so executor knows what to explicitly avoid installing.

  **Acceptance Criteria**:

  ```bash
  # Build succeeds
  npx astro build
  # Assert: Exit code 0, no errors

  # Dev server starts
  npx astro dev &
  sleep 3
  curl -s http://localhost:4321 | head -5
  # Assert: Returns HTML with <!DOCTYPE html>
  kill %1

  # Dependencies correct
  cat package.json | grep -c '"react"'
  # Assert: Output is 0 (no React)

  # Tailwind config has colors
  grep -c "1F5ABD" tailwind.config.mjs
  # Assert: Output >= 1

  # Site URL configured
  grep "schimizzi.io" astro.config.mjs
  # Assert: Found
  ```

  **Commit**: YES
  - Message: `feat(init): scaffold Astro 5 project with Tailwind and integrations`
  - Files: `astro.config.mjs`, `tailwind.config.mjs`, `tsconfig.json`, `package.json`, `src/`, `.gitignore`, `.prettierrc`
  - Pre-commit: `npx astro build`

---

- [x] 2. Migrate Static Assets

  **What to do**:
  - Copy all images from `/Users/marcus/Projects/showcase/public/images/` to `public/images/`
    - Portrait: `portrait.jpg`
    - Logos: `logo.svg`, `logo-gradient.svg`
    - Company logos: `qualia.png`, `xm.png`, `ford.svg`
    - Education: `notredame.jpg`
    - Project thumbnails: `portfolio.png`, `mmd.png`, `polititrack.jpg`, `simudraft.jpg`, `perception.jpg`, `qtk.jpg`
    - Project demo videos: all `.webm` files
  - Copy `public/docs/resume.pdf`
  - Copy all favicon files: `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`, `android-chrome-192x192.png`, `android-chrome-512x512.png`
  - Do NOT copy skill icon SVGs (skills section is dropped) unless they may be useful for project detail pages
  - Verify all files copied correctly by listing and comparing

  **Must NOT do**:
  - Do not copy the `.next/` build cache
  - Do not copy `node_modules/`
  - Do not copy `src/` code files (content migration is separate tasks)
  - Do not modify or optimize images at this stage (Astro handles optimization at build time)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Pure file copy operations with verification. No design or code decisions.
  - **Skills**: []
    - No specialized skills needed for file copy
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: Not needed for file operations

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Task 1)
  - **Blocks**: Tasks 6, 7, 9, 10 (pages that use images)
  - **Blocked By**: None (can start immediately)

  **References**:

  **Pattern References**:
  - `/Users/marcus/Projects/showcase/public/` - Source directory for all assets
  - `/Users/marcus/Projects/showcase/src/data/projects.json` - Lists all project thumbnails/demos to verify nothing is missed
  - `/Users/marcus/Projects/showcase/src/data/work.json` - Lists company logo paths
  - `/Users/marcus/Projects/showcase/src/data/education.json` - Lists education image paths

  **WHY Each Reference Matters**:
  - `public/`: Source of truth for all static assets
  - JSON data files: Cross-reference to ensure every referenced image is actually copied

  **Acceptance Criteria**:

  ```bash
  # All critical images exist
  for f in portrait.jpg logo.svg logo-gradient.svg qualia.png xm.png ford.svg notredame.jpg; do
    test -f "public/images/$f" && echo "OK: $f" || echo "MISSING: $f"
  done
  # Assert: All OK, no MISSING

  # Project thumbnails exist
  for f in portfolio.png mmd.png polititrack.jpg simudraft.jpg perception.jpg qtk.jpg; do
    test -f "public/images/$f" && echo "OK: $f" || echo "MISSING: $f"
  done
  # Assert: All OK

  # Resume exists
  test -f public/docs/resume.pdf && echo "OK" || echo "MISSING"
  # Assert: OK

  # Favicons exist
  test -f public/favicon.ico && echo "OK" || echo "MISSING"
  # Assert: OK
  ```

  **Commit**: YES
  - Message: `feat(assets): migrate static assets from existing portfolio`
  - Files: `public/images/`, `public/docs/`, `public/favicon*`, `public/apple-touch-icon.png`, `public/android-chrome-*`
  - Pre-commit: N/A (no build needed for static files)

---

- [ ] 3. Base Layout, SEO Head, and Global Styles

  **What to do**:
  - Create `src/layouts/BaseLayout.astro`:
    - HTML shell with `lang="en"`, dark background
    - `<head>` with charset, viewport, theme-color (#232323)
    - Slot for page-specific `<title>` and `<meta>` tags
    - Import global CSS
    - Fathom analytics script placeholder (actual integration in Task 14)
  - Create `src/components/SEOHead.astro`:
    - Props: `title`, `description`, `image?`, `url?`, `type?` (website|article), `publishedTime?`, `tags?`
    - Render: `<title>`, `<meta name="description">`, canonical URL
    - OpenGraph tags: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name`, `og:locale`
    - Twitter Card tags: `twitter:card` (summary_large_image), `twitter:title`, `twitter:description`, `twitter:image`
    - JSON-LD structured data for Person (on home/about) and Article (on blog posts)
  - Create `src/styles/global.css`:
    - Tailwind directives: `@tailwind base; @tailwind components; @tailwind utilities;`
    - Base body styles: dark background (#232323 / gray-950), white text, font-family
    - Smooth scrolling: `scroll-behavior: smooth`
    - Selection color using primary/secondary gradient
    - CSS custom properties for the color palette (for use in non-Tailwind contexts)
  - Create `src/layouts/PageLayout.astro`:
    - Extends BaseLayout
    - Includes Nav (Task 4) and Footer (Task 5) - use placeholder `<slot>` markers until those components exist
    - Main content area with appropriate max-width and padding

  **Must NOT do**:
  - Do not add light theme CSS or CSS custom properties for light mode
  - Do not add theme toggle logic
  - Do not install any CSS-in-JS libraries
  - Do not add Fathom script yet (that's Task 14, needs ViewTransitions coordination)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Layout and styling work requiring design sensibility for spacing, typography, color application.
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Core design patterns for layout structure, responsive containers, typography hierarchy
  - **Skills Evaluated but Omitted**:
    - `playwright`: Not needed yet for layout creation

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 4, 5)
  - **Blocks**: Tasks 6, 7, 8, 9, 10, 11, 12 (all pages depend on layout)
  - **Blocked By**: Task 1 (needs Astro project and Tailwind configured)

  **References**:

  **Pattern References**:
  - `/Users/marcus/Projects/showcase/src/app/layout.tsx` - Existing layout structure, metadata config, provider wrapping pattern
  - `/Users/marcus/Projects/showcase/tailwind.config.ts:3-73` - Color palette values to set as CSS custom properties
  - `/Users/marcus/Projects/showcase/src/app/globals.css` - Existing global styles for reference
  - `/Users/marcus/Projects/showcase/src/app/ThemeConfig.ts` - Dark theme color mappings (background1, text1, accent1, etc.)

  **API/Type References**:
  - SEO meta tag structure from existing site's `<head>` in layout.tsx (lines referencing og:title, og:description, etc.)

  **External References**:
  - Astro layouts: https://docs.astro.build/en/basics/layouts/
  - Astro Paper's BaseHead component: https://github.com/satnaing/astro-paper (reference for SEO head pattern)

  **WHY Each Reference Matters**:
  - `layout.tsx`: Shows the exact meta tags and structure to replicate
  - `ThemeConfig.ts`: Maps semantic color names (background1, text1, accent1) to hex values - critical for maintaining visual consistency
  - `globals.css`: Shows existing animation keyframes and base styles to migrate selectively

  **Acceptance Criteria**:

  ```bash
  # Build succeeds with layouts
  npx astro build
  # Assert: Exit code 0

  # Create a minimal test page to verify layout renders
  # Agent creates a temp src/pages/test.astro using BaseLayout
  npx astro build
  curl -s http://localhost:4321/test | grep -c "og:title"
  # Assert: >= 1 (SEO head renders)

  curl -s http://localhost:4321/test | grep -c "theme-color"
  # Assert: >= 1

  curl -s http://localhost:4321/test | grep -c "#232323"
  # Assert: >= 1 (dark theme color present)
  ```

  **Commit**: YES
  - Message: `feat(layout): add base layout, SEO head, and global styles`
  - Files: `src/layouts/BaseLayout.astro`, `src/layouts/PageLayout.astro`, `src/components/SEOHead.astro`, `src/styles/global.css`
  - Pre-commit: `npx astro build`

---

- [ ] 4. Navigation Component

  **What to do**:
  - Create `src/components/Nav.astro`:
    - Fixed/sticky header with logo (logo-gradient.svg) on the left
    - Page links on the right: About, Projects, Experience, Blog, Contact
    - Active page indicator (highlight current page link)
    - Use `Astro.url.pathname` to determine active page
    - Mobile: Hamburger menu that expands to show links (CSS-only or minimal inline script)
    - Dark background matching site theme, subtle border-bottom or backdrop-blur
    - Logo links back to home (/)
    - Smooth transition on scroll (subtle shadow or background opacity change)
  - Style with Tailwind classes directly on elements

  **Must NOT do**:
  - No theme toggle button
  - No React or framework components for the nav
  - No JavaScript framework for mobile menu (use CSS checkbox hack or minimal inline `<script>`)
  - Do not add a skills page link

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Navigation requires responsive design, visual polish, and interaction patterns.
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Responsive nav patterns, mobile menu, active states, visual hierarchy
  - **Skills Evaluated but Omitted**:
    - `playwright`: Not needed for component creation

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 3, 5)
  - **Blocks**: Tasks 6, 7, 9, 10, 11, 12 (all pages include nav)
  - **Blocked By**: Task 1 (needs Astro project)

  **References**:

  **Pattern References**:
  - `/Users/marcus/Projects/showcase/src/components/Nav/index.tsx` - Existing nav structure: logo placement, link order, styling approach
  - `/Users/marcus/Projects/showcase/public/images/logo-gradient.svg` - Logo asset to use

  **External References**:
  - Astro active link pattern: https://docs.astro.build/en/basics/astro-components/#component-props

  **WHY Each Reference Matters**:
  - `Nav/index.tsx`: Shows the exact link order (About, Projects, Experience, Contact) and visual pattern (logo left, links right) to replicate, plus the gradient logo usage

  **Acceptance Criteria**:

  ```bash
  # Build succeeds
  npx astro build
  # Assert: Exit code 0
  ```

  **Playwright verification (via playwright skill)**:
  ```
  1. Navigate to: http://localhost:4321
  2. Assert: nav element is visible
  3. Assert: Logo image (logo-gradient.svg) is visible
  4. Assert: Links "About", "Projects", "Experience", "Blog", "Contact" are present
  5. Set viewport to 375x812 (mobile)
  6. Assert: Hamburger menu button is visible
  7. Click: hamburger button
  8. Assert: Mobile menu links are visible
  9. Screenshot: .sisyphus/evidence/task-4-nav-desktop.png
  10. Screenshot: .sisyphus/evidence/task-4-nav-mobile.png
  ```

  **Commit**: YES
  - Message: `feat(nav): add responsive navigation with active page indicator`
  - Files: `src/components/Nav.astro`
  - Pre-commit: `npx astro build`

---

- [ ] 5. Footer Component

  **What to do**:
  - Create `src/components/Footer.astro`:
    - Three-column layout (responsive: stacks on mobile):
      - Column 1: Logo + name ("Marcus J. Schimizzi") + short tagline
      - Column 2: Quick links (About, Projects, Experience, Blog, Resume PDF)
      - Column 3: Connect (GitHub, LinkedIn links)
    - Bottom bar: "Made by me" + copyright with dynamic year
    - Social links open in new tab with `rel="noopener noreferrer"`
    - Resume link points to `/docs/resume.pdf`
    - Light background section (gray-50/gray-900 contrast with dark body) or dark with subtle border-top
  - All styling via Tailwind

  **Must NOT do**:
  - No Font Awesome icons (use inline SVGs or Astro Icon if needed, but keep simple)
  - No Framer Motion animations
  - No skills page link

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Footer design requires layout skill and visual attention to detail.
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Multi-column responsive layout, typography, link styling
  - **Skills Evaluated but Omitted**:
    - `playwright`: Not needed for component creation

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 3, 4)
  - **Blocks**: Tasks 6, 7, 9, 10, 11, 12 (all pages include footer)
  - **Blocked By**: Task 1 (needs Astro project)

  **References**:

  **Pattern References**:
  - `/Users/marcus/Projects/showcase/src/components/Footer/index.tsx` - Existing footer: 3-column layout, links structure, social links, copyright text
  - `/Users/marcus/Projects/showcase/src/components/SocialMedia/index.tsx` - LinkedIn/GitHub link structure and URLs

  **WHY Each Reference Matters**:
  - `Footer/index.tsx`: Contains exact link labels, social URLs (github.com/marcusschimizzi, linkedin.com/in/marcusschimizzi), copyright text, and 3-column grid structure to replicate
  - `SocialMedia/index.tsx`: Shows exact social media URLs and icon patterns

  **Acceptance Criteria**:

  ```bash
  npx astro build
  # Assert: Exit code 0
  ```

  **Playwright verification (via playwright skill)**:
  ```
  1. Navigate to: http://localhost:4321
  2. Scroll to: footer element
  3. Assert: Text "Marcus J. Schimizzi" is visible
  4. Assert: Link to GitHub (href contains "github.com/marcusschimizzi") exists
  5. Assert: Link to LinkedIn (href contains "linkedin.com/in/marcusschimizzi") exists
  6. Assert: Link to resume (href contains "/docs/resume.pdf") exists
  7. Assert: Copyright text contains current year
  8. Screenshot: .sisyphus/evidence/task-5-footer.png
  ```

  **Commit**: YES
  - Message: `feat(footer): add responsive footer with links and social media`
  - Files: `src/components/Footer.astro`
  - Pre-commit: `npx astro build`

---

- [ ] 6. Home Page with Hero Section

  **What to do**:
  - Create `src/pages/index.astro`:
    - Uses PageLayout
    - Full-viewport hero section:
      - CSS-only animated gradient background (using primary blue → secondary purple → tertiary violet)
      - "Hi, I'm Marcus." heading (large, bold, white)
      - Rotating epithets component with CSS-only animation:
        - All 11 epithets from existing data: "software developer", "lifelong learner", "data visualization buff", "tinkerer", "travel enthusiast", "current Chicagoan", "Notre Dame alum", "amateur chef", "consumer of too much coffee", "big sports guy", "multitime pub trivia champion"
        - CSS `@keyframes` to cycle through with opacity/transform transitions
        - Gradient text effect (blue-to-purple gradient with `background-clip: text`)
      - Social links (LinkedIn, GitHub) with hover effects
    - Below hero: Brief intro section with 2-3 highlight cards linking to Projects, Blog, Experience
    - SEO: title "Marcus Schimizzi", description "Software engineer, lifelong learner, and tinkerer based in Chicago."
  - Create `src/components/Epithets.astro`:
    - Accepts epithets as props (array of strings)
    - Renders all epithets in a container with `overflow: hidden`
    - CSS keyframes animate vertical position to cycle through items
    - Gradient text styling matching existing site
  - Create `src/components/SocialLinks.astro`:
    - LinkedIn and GitHub links with inline SVG icons
    - Hover effects (scale + color change)

  **Must NOT do**:
  - No Pixi.js or WebGL
  - No JavaScript for epithet rotation (CSS only)
  - No Framer Motion or react-spring
  - No scroll-triggered entrance animations (keep it simple and fast)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Hero is the most visually important section. Requires CSS animation skill, gradient mastery, and design taste.
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: CSS animations, gradient techniques, responsive hero patterns, visual design
  - **Skills Evaluated but Omitted**:
    - `playwright`: Not needed for creation, used in verification only

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 7, 8, 9)
  - **Blocks**: Task 17 (final verification)
  - **Blocked By**: Tasks 2 (images), 3 (layout), 4 (nav), 5 (footer)

  **References**:

  **Pattern References**:
  - `/Users/marcus/Projects/showcase/src/components/Hero/index.tsx` - Hero structure: heading, epithets placement, social links position
  - `/Users/marcus/Projects/showcase/src/components/Epithets/index.tsx` - Epithet rotation logic and gradient text styling (CSS class `hKizoY` with `background-clip: text`)
  - `/Users/marcus/Projects/showcase/src/data/epithets.json` - All 11 epithet strings with categories
  - `/Users/marcus/Projects/showcase/src/components/SocialMedia/index.tsx` - Social link structure and URLs
  - `/Users/marcus/Projects/showcase/tailwind.config.ts:8-46` - Exact gradient colors (primary.800: #1f5abd, secondary.800: #8910a8, tertiary.800: #5435b3)

  **WHY Each Reference Matters**:
  - `Hero/index.tsx`: Shows the exact visual hierarchy (heading → epithets → social links) and layout pattern
  - `Epithets/index.tsx`: The existing CSS gradient text effect (`background-image: linear-gradient(160deg, #1F5ABD 0, #8910A8 50%, #5435B3 100%)`) must be replicated exactly
  - `epithets.json`: Source of truth for all epithet text content

  **Acceptance Criteria**:

  ```bash
  npx astro build
  # Assert: Exit code 0
  ```

  **Playwright verification (via playwright skill)**:
  ```
  1. Navigate to: http://localhost:4321
  2. Assert: Heading "Hi, I'm Marcus." is visible
  3. Assert: At least one epithet text is visible in the hero area
  4. Assert: LinkedIn link (href contains "linkedin.com") exists
  5. Assert: GitHub link (href contains "github.com") exists
  6. Assert: Hero section has gradient background (check computed style)
  7. Wait 5 seconds (let CSS animation cycle)
  8. Screenshot: .sisyphus/evidence/task-6-hero.png
  9. Set viewport to 375x812 (mobile)
  10. Screenshot: .sisyphus/evidence/task-6-hero-mobile.png
  ```

  **Commit**: YES
  - Message: `feat(home): add home page with CSS animated hero and rotating epithets`
  - Files: `src/pages/index.astro`, `src/components/Epithets.astro`, `src/components/SocialLinks.astro`
  - Pre-commit: `npx astro build`

---

- [ ] 7. About Page

  **What to do**:
  - Create `src/pages/about.astro`:
    - Uses PageLayout
    - Portrait photo (portrait.jpg) with styled border (primary accent color, rounded)
    - Bio text from existing site:
      - "Hi there! My name is Marcus."
      - "I'm currently employed as a software engineer at Qualia working to make real estate transactions easier and more efficient."
      - "Outside of building software, I love to spend time traveling, reading (mostly nonfiction and biographies), worrying too much about my favorite sports teams, and cooking."
    - Layout: Side-by-side on desktop (photo left, text right), stacked on mobile
    - SEO: title "About | Marcus Schimizzi", description using bio intro
    - Optionally add a "Download Resume" link/button pointing to `/docs/resume.pdf`

  **Must NOT do**:
  - No Framer Motion scroll animations
  - No styled-components

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: About page needs tasteful portrait/text layout and responsive design.
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Portrait layout, typography, responsive two-column design
  - **Skills Evaluated but Omitted**:
    - `playwright`: Verification only

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 6, 8, 9)
  - **Blocks**: Task 17 (final verification)
  - **Blocked By**: Tasks 2 (portrait image), 3 (layout), 4 (nav), 5 (footer)

  **References**:

  **Pattern References**:
  - `/Users/marcus/Projects/showcase/src/components/Blurb/index.tsx` - Exact bio text (lines 80-89), portrait styling (border-4, accent color border, rounded-md), layout pattern (flex row on desktop, column on mobile)

  **WHY Each Reference Matters**:
  - `Blurb/index.tsx`: Contains the verbatim bio text that must be migrated exactly. Also shows the portrait border styling (`borderColor: colors.accent1`) and responsive layout classes.

  **Acceptance Criteria**:

  **Playwright verification (via playwright skill)**:
  ```
  1. Navigate to: http://localhost:4321/about
  2. Assert: Portrait image is visible (img with src containing "portrait")
  3. Assert: Text "Hi there! My name is Marcus." is visible
  4. Assert: Text "Qualia" is visible (current employer mentioned)
  5. Assert: Page title contains "About"
  6. Assert: og:title meta tag exists
  7. Screenshot: .sisyphus/evidence/task-7-about.png
  ```

  **Commit**: YES
  - Message: `feat(about): add about page with portrait and bio`
  - Files: `src/pages/about.astro`
  - Pre-commit: `npx astro build`

---

- [ ] 8. Content Collections Setup (Blog + Projects)

  **What to do**:
  - Create `src/content.config.ts` (Astro 5 Content Layer API):
    - **Blog collection**:
      - Loader: `glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' })`
      - Schema with Zod:
        - `title`: z.string()
        - `description`: z.string()
        - `pubDate`: z.coerce.date()
        - `updatedDate`: z.coerce.date().optional()
        - `heroImage`: z.string().optional()
        - `tags`: z.array(z.string()).default([])
        - `draft`: z.boolean().default(false)
    - **Projects collection**:
      - Loader: `glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' })`
      - Schema with Zod:
        - `title`: z.string()
        - `description`: z.string()
        - `thumbnail`: z.string()
        - `demoVideo`: z.string().optional()
        - `link`: z.string().url().optional()
        - `featured`: z.boolean().default(false)
        - `technologies`: z.array(z.string()).default([])
        - `order`: z.number().default(0)
  - Create `src/content/blog/` directory with a sample draft post:
    - `src/content/blog/hello-world.mdx` with `draft: true` and placeholder content
  - Create `src/content/projects/` directory with MDX files for each project migrated from `projects.json`:
    - `mock-my-draft.mdx` - "A web app that archives, analyzes, and presents grades for historical NFL drafts."
    - `polititrack.mdx` - "A web app that tracked polling and candidate movements for the 2020 presidential election."
    - `simudraft.mdx` - "A web app designed to conduct mock drafts with."
    - `perception-website.mdx` - "A homepage for a web management freelance client."
    - `quick-trigger-kennels.mdx` - "A homepage for a dog breeding business."
    - Each with frontmatter from projects.json (title, description, thumbnail path, demo video path, external link, featured flag)
    - Body content can be expanded beyond the single-line descriptions for the detail pages

  **Must NOT do**:
  - Do not use the old Astro v4 `src/content/config.ts` path (must be `src/content.config.ts` at src root for Astro 5)
  - Do not forget the `glob()` loader (required in Astro 5 Content Layer API)
  - Do not include the portfolio itself as a project (self-referential)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Schema definition and data migration from JSON. Straightforward with clear source data.
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Understands content collection patterns in Astro
  - **Skills Evaluated but Omitted**:
    - `playwright`: Not needed for data/schema work

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 6, 7, 9)
  - **Blocks**: Tasks 10, 11 (projects and blog pages depend on collections)
  - **Blocked By**: Task 3 (needs base Astro project with MDX integration)

  **References**:

  **Pattern References**:
  - `/Users/marcus/Projects/showcase/src/data/projects.json` - All 6 projects with title, description, thumbnail, demo, link, featured flag (source data to migrate)
  - `/Users/marcus/Projects/showcase/src/data/epithets.json` - Example of existing JSON data structure

  **External References**:
  - Astro 5 Content Layer API: https://docs.astro.build/en/guides/content-collections/
  - Astro Paper content config: https://github.com/satnaing/astro-paper/blob/main/src/content/config.ts (reference for blog schema)

  **WHY Each Reference Matters**:
  - `projects.json`: Source of truth for all project data. Each entry must become a content collection MDX file with matching frontmatter.
  - Astro Paper: Battle-tested blog schema pattern used by 4k+ star project.

  **Acceptance Criteria**:

  ```bash
  # Build succeeds with content collections
  npx astro build
  # Assert: Exit code 0, no schema validation errors

  # Content collections generate types
  npx astro sync
  # Assert: Exit code 0

  # Verify project files exist
  ls src/content/projects/*.mdx | wc -l
  # Assert: 5 (five project files)

  # Verify blog draft exists
  ls src/content/blog/*.mdx | wc -l
  # Assert: >= 1

  # Verify content.config.ts exists at correct path
  test -f src/content.config.ts && echo "OK" || echo "WRONG PATH"
  # Assert: OK
  ```

  **Commit**: YES
  - Message: `feat(content): add blog and projects content collections with migrated data`
  - Files: `src/content.config.ts`, `src/content/blog/`, `src/content/projects/`
  - Pre-commit: `npx astro build`

---

- [ ] 9. Experience Page

  **What to do**:
  - Create `src/pages/experience.astro`:
    - Uses PageLayout
    - Two sections: "Experience" and "Education"
    - **Experience section**: Timeline or card layout for 4 roles:
      1. Qualia - Software Engineer (Dec 2024 - Now)
      2. Qualtrics - Software Development Engineer (Aug 2019 - Mar 2024)
      3. Ford Motor Company - Software Engineering Intern (May 2018 - Aug 2018)
      4. Self Employed - Freelance Web Developer (May 2014 - Aug 2019)
    - Each entry: company logo, role title, company name, date range, description
    - **Education section**: 2 entries:
      1. University of Notre Dame - B.S.E. in Computer Science (Aug 2015 - May 2019)
      2. London, UK - London Study Abroad (Jan 2018 - May 2018)
    - Each entry: institution, degree/program, date range, description, image (if available)
    - SEO: title "Experience | Marcus Schimizzi"
  - Create `src/components/ExperienceEntry.astro`:
    - Reusable component for both work and education entries
    - Props: institution, role, startDate, endDate, description, image?
    - Company/institution logo displayed alongside text
    - Clean typography with clear visual hierarchy

  **Must NOT do**:
  - No Framer Motion animations
  - No React components
  - Do not modify any of the text content - migrate verbatim from JSON

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Timeline/card layout requires design skill for visual hierarchy and spacing.
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Timeline patterns, card layouts, typography hierarchy
  - **Skills Evaluated but Omitted**:
    - `playwright`: Verification only

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 6, 7, 8)
  - **Blocks**: Task 17 (final verification)
  - **Blocked By**: Tasks 2 (company logos), 3 (layout), 4 (nav), 5 (footer)

  **References**:

  **Pattern References**:
  - `/Users/marcus/Projects/showcase/src/data/work.json` - All 4 work experiences with exact text, dates, and image paths
  - `/Users/marcus/Projects/showcase/src/data/education.json` - Both education entries with exact text, dates, and image path

  **WHY Each Reference Matters**:
  - `work.json`: Contains verbatim role descriptions, exact date strings, and company logo paths. All must be migrated precisely.
  - `education.json`: Contains exact degree title, institution names, and dates.

  **Acceptance Criteria**:

  **Playwright verification (via playwright skill)**:
  ```
  1. Navigate to: http://localhost:4321/experience
  2. Assert: Text "Qualia" is visible
  3. Assert: Text "Qualtrics" is visible
  4. Assert: Text "Ford Motor Company" is visible
  5. Assert: Text "University of Notre Dame" is visible
  6. Assert: Text "B.S.E. in Computer Science" is visible
  7. Assert: Company logo images are loaded (no broken images)
  8. Assert: Page title contains "Experience"
  9. Screenshot: .sisyphus/evidence/task-9-experience.png
  ```

  **Commit**: YES
  - Message: `feat(experience): add experience page with work history and education`
  - Files: `src/pages/experience.astro`, `src/components/ExperienceEntry.astro`
  - Pre-commit: `npx astro build`

---

- [ ] 10. Projects Listing and Detail Pages

  **What to do**:
  - Create `src/pages/projects/index.astro`:
    - Uses PageLayout
    - Grid of project cards (2 columns desktop, 1 column mobile)
    - Each card: thumbnail image, title, short description, link to detail page
    - Featured projects shown first or visually distinguished
    - SEO: title "Projects | Marcus Schimizzi"
  - Create `src/components/ProjectCard.astro`:
    - Props: title, description, thumbnail, slug, featured?
    - Thumbnail image with hover effect (subtle scale or overlay)
    - Links to `/projects/{slug}`
  - Create `src/pages/projects/[...slug].astro`:
    - Dynamic route rendering individual project detail pages from the projects content collection
    - Uses `getCollection('projects')` and `getStaticPaths()`
    - Full project description (MDX body content)
    - Thumbnail/hero image at top
    - Demo video embed if `demoVideo` frontmatter exists (HTML5 `<video>` tag, lazy loaded)
    - External link button if `link` frontmatter exists
    - Technologies used (from `technologies` frontmatter array)
    - Navigation: "Back to Projects" link
    - SEO: title "{Project Title} | Marcus Schimizzi"

  **Must NOT do**:
  - Do not include the portfolio itself as a project
  - No JavaScript-based image galleries or carousels
  - No React components

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Project cards and detail pages are key showcase pieces. Need strong visual design.
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Card grid design, image handling, responsive layouts, project showcase patterns
  - **Skills Evaluated but Omitted**:
    - `playwright`: Verification only

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Task 11)
  - **Blocks**: Tasks 15, 17 (SEO hardening and final verification)
  - **Blocked By**: Tasks 2 (project images), 8 (content collections with project data)

  **References**:

  **Pattern References**:
  - `/Users/marcus/Projects/showcase/src/data/projects.json` - All project metadata: titles, descriptions, thumbnails, demo videos, links, featured flags
  - Content collection files created in Task 8 (`src/content/projects/*.mdx`)

  **External References**:
  - Astro dynamic routes: https://docs.astro.build/en/guides/routing/#dynamic-routes
  - Astro content collections querying: https://docs.astro.build/en/guides/content-collections/#querying-collections

  **WHY Each Reference Matters**:
  - `projects.json`: Exact project data to verify against rendered pages
  - Content collection MDX files: The actual content source for detail pages

  **Acceptance Criteria**:

  **Playwright verification (via playwright skill)**:
  ```
  1. Navigate to: http://localhost:4321/projects
  2. Assert: At least 5 project cards are visible
  3. Assert: Text "Mock My Draft" is visible
  4. Assert: Text "Polititrack" is visible
  5. Assert: All project thumbnail images are loaded (no broken images)
  6. Click: First project card
  7. Assert: URL changed to /projects/{slug}
  8. Assert: Project title heading is visible
  9. Assert: Project description text is visible
  10. Assert: "Back to Projects" or similar navigation link exists
  11. Screenshot: .sisyphus/evidence/task-10-projects-listing.png
  12. Screenshot: .sisyphus/evidence/task-10-project-detail.png
  ```

  **Commit**: YES
  - Message: `feat(projects): add projects listing and detail pages`
  - Files: `src/pages/projects/index.astro`, `src/pages/projects/[...slug].astro`, `src/components/ProjectCard.astro`
  - Pre-commit: `npx astro build`

---

- [ ] 11. Blog Listing, Post Pages, and Tag Pages

  **What to do**:
  - Create `src/pages/blog/index.astro`:
    - Uses PageLayout
    - List of blog posts sorted by date (newest first)
    - Filter out posts with `draft: true` in production
    - Each post card: title, date, description, tags, reading time
    - SEO: title "Blog | Marcus Schimizzi"
  - Create `src/components/BlogPostCard.astro`:
    - Props: title, description, pubDate, tags, slug, readingTime?
    - Clean card with date formatting, tag pills, estimated reading time
    - Links to `/blog/{slug}`
  - Create `src/layouts/BlogPostLayout.astro`:
    - Extends PageLayout
    - Post header: title, date, reading time, tags
    - Hero image if provided
    - Prose-styled content area (Tailwind `prose` classes for MDX rendering)
    - Tag links at bottom
    - SEO: article-specific meta (og:type article, publishedTime, tags)
  - Create `src/pages/blog/[...slug].astro`:
    - Dynamic route for individual blog posts from blog content collection
    - Uses `getCollection('blog')` and `getStaticPaths()`
    - Renders MDX content with BlogPostLayout
  - Create `src/pages/tags/[tag].astro`:
    - Dynamic route for tag-filtered blog listing
    - Shows all posts matching the tag
    - Title: "Posts tagged '{tag}' | Marcus Schimizzi"
  - Create `src/components/TagList.astro`:
    - Renders a list of tag pills/badges
    - Each tag links to `/tags/{tag}`
  - Add reading time calculation utility:
    - `src/utils/readingTime.ts` - calculates estimated reading time from content length

  **Must NOT do**:
  - Do not show draft posts in the listing (filter with `!post.data.draft`)
  - No search functionality (can add later)
  - No pagination yet (can add when post count warrants it)
  - No React components

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Blog pages need clean typography, readable layouts, and tag system design.
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Blog layout patterns, typography (prose), tag UI, responsive reading experience
  - **Skills Evaluated but Omitted**:
    - `playwright`: Verification only

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Task 10)
  - **Blocks**: Tasks 13, 15 (RSS feed needs blog collection; SEO needs blog pages)
  - **Blocked By**: Task 8 (content collections must be defined first)

  **References**:

  **Pattern References**:
  - Content collection config created in Task 8 (`src/content.config.ts`)
  - Sample blog post created in Task 8 (`src/content/blog/hello-world.mdx`)

  **External References**:
  - Astro Paper blog implementation: https://github.com/satnaing/astro-paper (4.1k stars, reference for blog listing, post layout, tag system)
  - Astro content collections rendering: https://docs.astro.build/en/guides/content-collections/#rendering-content
  - Tailwind Typography plugin (`@tailwindcss/typography`): https://tailwindcss.com/docs/typography-plugin

  **WHY Each Reference Matters**:
  - Astro Paper: Battle-tested blog patterns for listing, post layout, and tag filtering
  - Tailwind Typography: The `prose` classes handle all MDX content styling (headings, paragraphs, code blocks, lists) so we don't need custom styles for blog content

  **Acceptance Criteria**:

  ```bash
  npx astro build
  # Assert: Exit code 0
  ```

  **Playwright verification (via playwright skill)**:
  ```
  1. Navigate to: http://localhost:4321/blog
  2. Assert: Page title contains "Blog"
  3. Assert: Blog listing page renders (even if empty - draft posts hidden)
  4. Navigate to: http://localhost:4321/blog/hello-world (if draft mode allows preview)
  5. Assert: Blog post renders with title, date, content
  6. Assert: Tag links are present if tags exist
  7. Screenshot: .sisyphus/evidence/task-11-blog-listing.png
  8. Screenshot: .sisyphus/evidence/task-11-blog-post.png
  ```

  **Commit**: YES
  - Message: `feat(blog): add blog listing, post pages, tag pages, and reading time`
  - Files: `src/pages/blog/index.astro`, `src/pages/blog/[...slug].astro`, `src/pages/tags/[tag].astro`, `src/layouts/BlogPostLayout.astro`, `src/components/BlogPostCard.astro`, `src/components/TagList.astro`, `src/utils/readingTime.ts`
  - Pre-commit: `npx astro build`

---

- [ ] 12. Contact Page with Netlify Forms

  **What to do**:
  - Create `src/pages/contact.astro`:
    - Uses PageLayout
    - Heading: "Want to get in touch?"
    - Intro text: "Feel free to fill out the form below if there's something you'd like to chat about or even if you'd just like to say hi!"
    - "(No solicitations, please.)"
    - Form fields: Name, Email, Message (textarea)
    - Submit button with gradient styling (primary → secondary)
    - Netlify Forms integration:
      - `<form name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field">`
      - Hidden input: `<input type="hidden" name="form-name" value="contact" />`
      - Honeypot field: `<p style="display:none"><input name="bot-field" /></p>`
    - Success state: "Thank you for reaching out! I'll follow up to the email you left."
    - Error state: "Uh-oh! There was a problem submitting the form. Please try again."
    - Form submission handling via small inline `<script>` for fetch POST + show success/error
    - SEO: title "Contact | Marcus Schimizzi"

  **Must NOT do**:
  - No React for the form (use native HTML form + minimal inline JS for async submit)
  - No external form service (Netlify Forms is native)
  - No `__forms.html` workaround (not needed with Astro's static HTML output)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Contact form is well-defined with known Netlify Forms pattern. Minimal design decisions.
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Form styling, button gradient, success/error states
  - **Skills Evaluated but Omitted**:
    - `playwright`: Verification only

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 5 (with Tasks 13, 14)
  - **Blocks**: Task 17 (final verification)
  - **Blocked By**: Tasks 3 (layout), 4 (nav), 5 (footer)

  **References**:

  **Pattern References**:
  - `/Users/marcus/Projects/showcase/src/components/Contact/index.tsx` - Contact section text content: heading, intro paragraphs
  - `/Users/marcus/Projects/showcase/src/components/Contact/ContactForm/index.tsx` - Form fields (name, email, message), success/error states, gradient submit button styling
  - `/Users/marcus/Projects/showcase/public/__forms.html` - Netlify forms HTML structure (simplified for Astro)

  **WHY Each Reference Matters**:
  - `Contact/index.tsx`: Exact heading and intro text to replicate verbatim
  - `ContactForm/index.tsx`: Field names, placeholders ("What should I call you?", "Where should I send a reply?", "What would you like to chat about?"), validation, submit button gradient pattern (`linear-gradient(135deg, main1, main2)`)

  **Acceptance Criteria**:

  **Playwright verification (via playwright skill)**:
  ```
  1. Navigate to: http://localhost:4321/contact
  2. Assert: Text "Want to get in touch?" is visible
  3. Assert: Form element with name="contact" exists
  4. Assert: Input fields for name, email, and message textarea exist
  5. Assert: Hidden input with name="form-name" value="contact" exists
  6. Assert: Submit button is visible
  7. Fill: input[name="name"] with "Test User"
  8. Fill: input[name="email"] with "test@example.com"
  9. Fill: textarea[name="message"] with "Hello from automated test"
  10. Assert: Submit button is enabled
  11. Screenshot: .sisyphus/evidence/task-12-contact-form.png
  ```

  **Commit**: YES
  - Message: `feat(contact): add contact page with Netlify Forms integration`
  - Files: `src/pages/contact.astro`
  - Pre-commit: `npx astro build`

---

- [ ] 13. RSS Feed and Sitemap

  **What to do**:
  - Create `src/pages/rss.xml.ts`:
    - Import `rss` from `@astrojs/rss`
    - Import blog collection via `getCollection('blog')`
    - Filter out draft posts
    - Return RSS feed with:
      - Title: "Marcus Schimizzi's Blog"
      - Description: "Thoughts on software engineering, web development, and more."
      - Site URL from `context.site`
      - Items: blog posts with title, pubDate, description, link
      - Custom data: `<language>en-us</language>`
  - Verify sitemap auto-generation:
    - `@astrojs/sitemap` integration (installed in Task 1) should auto-generate sitemap
    - Verify it includes all static pages and dynamic routes (blog posts, project pages, tag pages)
  - Add `<link>` tags in BaseLayout head:
    - RSS feed: `<link rel="alternate" type="application/rss+xml" title="Marcus Schimizzi's Blog" href="/rss.xml" />`
    - Sitemap: `<link rel="sitemap" href="/sitemap-index.xml" />`

  **Must NOT do**:
  - Do not include draft posts in RSS feed
  - Do not hardcode the site URL (use `context.site` from Astro config)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: RSS and sitemap are well-documented Astro patterns with minimal customization needed.
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Understands RSS/sitemap integration patterns
  - **Skills Evaluated but Omitted**:
    - `playwright`: Not needed for XML output

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 5 (with Tasks 12, 14)
  - **Blocks**: Task 15 (SEO hardening includes feed/sitemap links)
  - **Blocked By**: Task 11 (blog pages must exist for RSS items)

  **References**:

  **External References**:
  - Astro RSS: https://docs.astro.build/en/guides/rss/
  - Astro Sitemap: https://docs.astro.build/en/guides/integrations-guide/sitemap/
  - Astro Paper RSS implementation: https://github.com/satnaing/astro-paper/blob/main/src/pages/rss.xml.js

  **WHY Each Reference Matters**:
  - Astro Paper RSS: Proven pattern for filtering drafts and formatting RSS items from content collections

  **Acceptance Criteria**:

  ```bash
  npx astro build
  # Assert: Exit code 0

  # RSS feed exists and is valid XML
  cat dist/rss.xml | head -5
  # Assert: Contains <?xml and <rss

  # Sitemap exists
  cat dist/sitemap-index.xml | head -5
  # Assert: Contains <?xml and <sitemapindex

  # RSS feed link in HTML
  grep -r "rss.xml" dist/index.html
  # Assert: Found (link tag for RSS)
  ```

  **Commit**: YES
  - Message: `feat(seo): add RSS feed and sitemap generation`
  - Files: `src/pages/rss.xml.ts`, updated `src/layouts/BaseLayout.astro` (feed/sitemap links)
  - Pre-commit: `npx astro build`

---

- [ ] 14. Fathom Analytics and ViewTransitions

  **What to do**:
  - Add Fathom analytics script to `src/layouts/BaseLayout.astro`:
    - `<script src="https://cdn.usefathom.com/script.js" data-site="FOJEAWOJ" data-spa="auto" defer></script>`
    - The `data-spa="auto"` attribute is critical: it makes Fathom detect ViewTransitions client-side navigation automatically
    - No need for `fathom-client` npm package or manual `trackPageview()` calls
  - Add Astro ViewTransitions (ClientRouter) to BaseLayout:
    - Import: `import { ClientRouter } from 'astro:transitions';`
    - Add `<ClientRouter />` in `<head>`
    - This gives SPA-like page transitions (no full page reload) while keeping zero-JS static pages
  - Verify Fathom tracking works across ViewTransitions navigation

  **Must NOT do**:
  - Do not use the old `ViewTransitions` import name (renamed to `ClientRouter` in Astro 5)
  - Do not install `fathom-client` npm package (CDN script with data-spa="auto" is sufficient)
  - Do not add the `includedDomains` restriction yet (causes issues in dev mode)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Two small additions to BaseLayout. Well-defined with exact code snippets.
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Understands head tag management and script loading
  - **Skills Evaluated but Omitted**:
    - `playwright`: Used for verification

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 5 (with Tasks 12, 13)
  - **Blocks**: Task 17 (final verification)
  - **Blocked By**: Task 3 (BaseLayout must exist)

  **References**:

  **Pattern References**:
  - `/Users/marcus/Projects/showcase/src/lib/Fathom.tsx` - Existing Fathom integration: site ID (FOJEAWOJ), includedDomains config

  **External References**:
  - Fathom SPA tracking: https://usefathom.com/docs/script/spa
  - Astro ViewTransitions (ClientRouter): https://docs.astro.build/en/guides/view-transitions/

  **WHY Each Reference Matters**:
  - `Fathom.tsx`: Confirms site ID FOJEAWOJ and domain schimizzi.io
  - Fathom SPA docs: Confirms `data-spa="auto"` is the correct attribute for client-side nav tracking

  **Acceptance Criteria**:

  ```bash
  npx astro build
  # Assert: Exit code 0

  # Fathom script present in HTML output
  grep "usefathom.com" dist/index.html
  # Assert: Found

  grep 'data-spa="auto"' dist/index.html
  # Assert: Found

  grep "FOJEAWOJ" dist/index.html
  # Assert: Found

  # ClientRouter present (ViewTransitions)
  grep "astro-" dist/index.html
  # Assert: Found (Astro injects transition attributes)
  ```

  **Playwright verification (via playwright skill)**:
  ```
  1. Navigate to: http://localhost:4321
  2. Assert: Script tag with src containing "usefathom.com" exists in DOM
  3. Click: "About" link in navigation
  4. Assert: URL changed to /about WITHOUT full page reload (ViewTransitions)
  5. Assert: Page content for About is visible
  6. Screenshot: .sisyphus/evidence/task-14-view-transitions.png
  ```

  **Commit**: YES
  - Message: `feat(analytics): add Fathom analytics and ViewTransitions (ClientRouter)`
  - Files: updated `src/layouts/BaseLayout.astro`
  - Pre-commit: `npx astro build`

---

- [ ] 15. SEO Hardening Across All Pages

  **What to do**:
  - Audit and ensure every page has complete SEO meta via the SEOHead component:
    - Home: title "Marcus Schimizzi", description about software engineer in Chicago, OG image (portrait.jpg)
    - About: title "About | Marcus Schimizzi", bio-based description
    - Projects listing: title "Projects | Marcus Schimizzi", projects overview description
    - Project detail pages: title "{Project} | Marcus Schimizzi", project description, project thumbnail as OG image
    - Experience: title "Experience | Marcus Schimizzi", career overview description
    - Blog listing: title "Blog | Marcus Schimizzi", blog description
    - Blog posts: title "{Post} | Marcus Schimizzi", post description, hero image as OG image, og:type "article", article:published_time
    - Contact: title "Contact | Marcus Schimizzi"
  - Add JSON-LD structured data:
    - Home/About: `Person` schema (name, jobTitle, url, sameAs for social links)
    - Blog posts: `BlogPosting` schema (headline, datePublished, author, description)
    - Projects: `CreativeWork` schema (name, description, url)
  - Add canonical URLs to every page
  - Verify `<html lang="en">` on all pages
  - Add `robots.txt` to `public/`:
    ```
    User-agent: *
    Allow: /
    Sitemap: https://schimizzi.io/sitemap-index.xml
    ```

  **Must NOT do**:
  - No placeholder or lorem ipsum descriptions
  - No missing OG images (use portrait.jpg as fallback)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-low`
    - Reason: SEO audit is systematic but not visually complex. Checking and adding meta tags across pages.
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Understands SEO meta patterns and structured data
  - **Skills Evaluated but Omitted**:
    - `playwright`: Used in verification

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 6 (with Task 16)
  - **Blocks**: Task 17 (final verification)
  - **Blocked By**: Tasks 10 (projects), 11 (blog), 13 (RSS/sitemap links)

  **References**:

  **Pattern References**:
  - `/Users/marcus/Projects/showcase/src/app/layout.tsx` - Existing OG tags, Twitter Card tags, meta descriptions (the HTML head in the webfetch output shows all current meta tags)

  **External References**:
  - Schema.org Person: https://schema.org/Person
  - Schema.org BlogPosting: https://schema.org/BlogPosting
  - Google Structured Data Testing: https://search.google.com/test/rich-results

  **WHY Each Reference Matters**:
  - `layout.tsx`: Shows the exact OG tag structure (og:image dimensions 800x600, og:locale en_US, etc.) to maintain parity

  **Acceptance Criteria**:

  ```bash
  npx astro build
  # Assert: Exit code 0

  # Every page has og:title
  for page in index about projects experience blog contact; do
    grep -c "og:title" "dist/${page}/index.html" 2>/dev/null || grep -c "og:title" "dist/${page}.html" 2>/dev/null
  done
  # Assert: All return >= 1

  # robots.txt exists
  test -f public/robots.txt && echo "OK" || echo "MISSING"
  # Assert: OK

  # JSON-LD present on home page
  grep -c "application/ld+json" dist/index.html
  # Assert: >= 1
  ```

  **Commit**: YES
  - Message: `feat(seo): add structured data, canonical URLs, and robots.txt`
  - Files: Updated page files, `public/robots.txt`, updated `src/components/SEOHead.astro`
  - Pre-commit: `npx astro build`

---

- [ ] 16. Responsive Design Pass and Mobile Navigation

  **What to do**:
  - Audit all pages at three breakpoints:
    - Mobile: 375px width (iPhone SE)
    - Tablet: 768px width (iPad)
    - Desktop: 1280px width
  - Fix any layout issues:
    - Hero text sizing (responsive `text-4xl lg:text-6xl` etc.)
    - Project grid (1 col mobile, 2 col tablet, 2-3 col desktop)
    - Experience entries (stacked on mobile, side-by-side on desktop)
    - Blog listing (responsive card layout)
    - Contact form (full width on mobile)
    - Footer columns (stacked on mobile, 3-col on desktop)
  - Ensure mobile navigation works smoothly:
    - Hamburger menu opens/closes reliably
    - Menu items are tap-target sized (min 44px)
    - Menu closes on link tap
  - Verify no horizontal scrolling on any page at any breakpoint
  - Verify touch targets meet accessibility guidelines (>= 44x44px)

  **Must NOT do**:
  - No layout shifts (CLS) on load
  - No content hidden on mobile that should be visible
  - No desktop-only features

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Responsive audit requires visual testing across breakpoints and design adjustments.
  - **Skills**: [`frontend-ui-ux`, `playwright`]
    - `frontend-ui-ux`: Responsive design patterns, mobile-first adjustments
    - `playwright`: Multi-viewport testing and screenshot comparison
  - **Skills Evaluated but Omitted**: None - both core skills needed

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 6 (with Task 15)
  - **Blocks**: Task 17 (final verification)
  - **Blocked By**: Tasks 3 (layout), 4 (nav component)

  **References**:

  **Pattern References**:
  - `/Users/marcus/Projects/showcase/src/components/Blurb/index.tsx:61-67` - Existing responsive breakpoints: `lg:flex-row`, `lg:w-96`, `lg:mx-0`
  - `/Users/marcus/Projects/showcase/tailwind.config.ts` - Tailwind breakpoint config

  **WHY Each Reference Matters**:
  - Blurb component: Shows the responsive pattern used consistently (mobile-first with `lg:` breakpoint for desktop)

  **Acceptance Criteria**:

  **Playwright verification (via playwright skill)**:
  ```
  For EACH page (/, /about, /projects, /experience, /blog, /contact):
    1. Set viewport: 375x812 (mobile)
    2. Assert: No horizontal scrollbar (document.documentElement.scrollWidth <= viewport width)
    3. Screenshot: .sisyphus/evidence/task-16-{page}-mobile.png
    4. Set viewport: 768x1024 (tablet)
    5. Screenshot: .sisyphus/evidence/task-16-{page}-tablet.png
    6. Set viewport: 1280x800 (desktop)
    7. Screenshot: .sisyphus/evidence/task-16-{page}-desktop.png

  Mobile nav specific:
    1. Set viewport: 375x812
    2. Assert: Hamburger button is visible
    3. Click: Hamburger button
    4. Assert: Nav links are visible
    5. Click: Any nav link
    6. Assert: Navigation occurred AND menu closed
  ```

  **Commit**: YES
  - Message: `fix(responsive): audit and fix responsive layouts across all breakpoints`
  - Files: Various component/page files with responsive fixes
  - Pre-commit: `npx astro build`

---

- [ ] 17. Final Polish, Build Verification, and Lighthouse Audit

  **What to do**:
  - Run `npx astro build` and verify zero errors, zero warnings
  - Run Lighthouse audit on key pages (Home, About, Projects, Blog, Contact):
    - Target: Performance >= 95, Accessibility >= 95, Best Practices >= 95, SEO = 100
  - Verify all internal links work (no 404s):
    - Nav links, footer links, project card links, blog post links, tag links
  - Verify all images load (no broken images)
  - Verify RSS feed is valid XML with correct content
  - Verify sitemap includes all pages
  - Verify ViewTransitions work smoothly between pages
  - Verify contact form renders correctly with all Netlify attributes
  - Check for any console errors in browser
  - Verify resume PDF is accessible at `/docs/resume.pdf`
  - Final review of all text content against original site for accuracy

  **Must NOT do**:
  - Do not skip any page in the audit
  - Do not ignore Lighthouse warnings
  - Do not leave any TODO comments or placeholder text in the codebase

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Final verification requires thorough, methodical checking of every page and feature. Must be exhaustive.
  - **Skills**: [`frontend-ui-ux`, `playwright`]
    - `frontend-ui-ux`: Visual quality assessment
    - `playwright`: Automated browser testing across all pages
  - **Skills Evaluated but Omitted**: None - both needed for comprehensive final check

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 6 (sequential, after Tasks 15 and 16)
  - **Blocks**: None (final task)
  - **Blocked By**: ALL previous tasks

  **References**:

  **Pattern References**:
  - All pages and components created in Tasks 1-16

  **External References**:
  - Lighthouse CI: `npx lighthouse http://localhost:4321 --output json`

  **Acceptance Criteria**:

  ```bash
  # Clean build
  npx astro build
  # Assert: Exit code 0, 0 errors, 0 warnings

  # All pages exist in dist/
  for page in index about projects experience blog contact; do
    test -d "dist/${page}" && echo "OK: $page" || echo "MISSING: $page"
  done
  # Assert: All OK

  # RSS and sitemap exist
  test -f dist/rss.xml && echo "OK: RSS" || echo "MISSING: RSS"
  test -f dist/sitemap-index.xml && echo "OK: Sitemap" || echo "MISSING: Sitemap"
  # Assert: Both OK

  # Resume accessible
  test -f dist/docs/resume.pdf && echo "OK: Resume" || echo "MISSING: Resume"
  # Assert: OK
  ```

  **Playwright verification (via playwright skill)**:
  ```
  For EACH page (/, /about, /projects, /experience, /blog, /contact):
    1. Navigate to page
    2. Assert: No console errors
    3. Assert: No broken images (all img elements have naturalWidth > 0)
    4. Assert: Page title is set (not empty)
    5. Assert: No horizontal overflow
    6. Screenshot: .sisyphus/evidence/task-17-final-{page}.png

  Navigation flow:
    1. Navigate to /
    2. Click each nav link in sequence
    3. Assert: Each page loads via ViewTransitions (no full reload)
    4. Assert: URL matches expected path

  Internal links:
    1. On /projects: Click each project card, verify detail page loads
    2. On footer: Click each quick link, verify page loads
    3. Click resume link, verify PDF loads
  ```

  **Commit**: YES
  - Message: `chore(qa): final polish and verification pass`
  - Files: Any remaining fixes from audit
  - Pre-commit: `npx astro build`

---

## Commit Strategy

| After Task | Message | Key Files | Verification |
|------------|---------|-----------|--------------|
| 1 | `feat(init): scaffold Astro 5 project with Tailwind and integrations` | astro.config.mjs, package.json | `astro build` |
| 2 | `feat(assets): migrate static assets from existing portfolio` | public/ | File existence |
| 3 | `feat(layout): add base layout, SEO head, and global styles` | src/layouts/, src/components/SEOHead.astro | `astro build` |
| 4 | `feat(nav): add responsive navigation with active page indicator` | src/components/Nav.astro | `astro build` + Playwright |
| 5 | `feat(footer): add responsive footer with links and social media` | src/components/Footer.astro | `astro build` + Playwright |
| 6 | `feat(home): add home page with CSS animated hero and rotating epithets` | src/pages/index.astro, src/components/Epithets.astro | `astro build` + Playwright |
| 7 | `feat(about): add about page with portrait and bio` | src/pages/about.astro | `astro build` + Playwright |
| 8 | `feat(content): add blog and projects content collections with migrated data` | src/content.config.ts, src/content/ | `astro build` + `astro sync` |
| 9 | `feat(experience): add experience page with work history and education` | src/pages/experience.astro | `astro build` + Playwright |
| 10 | `feat(projects): add projects listing and detail pages` | src/pages/projects/ | `astro build` + Playwright |
| 11 | `feat(blog): add blog listing, post pages, tag pages, and reading time` | src/pages/blog/, src/layouts/BlogPostLayout.astro | `astro build` + Playwright |
| 12 | `feat(contact): add contact page with Netlify Forms integration` | src/pages/contact.astro | `astro build` + Playwright |
| 13 | `feat(seo): add RSS feed and sitemap generation` | src/pages/rss.xml.ts | `astro build` + XML validation |
| 14 | `feat(analytics): add Fathom analytics and ViewTransitions` | src/layouts/BaseLayout.astro | `astro build` + Playwright |
| 15 | `feat(seo): add structured data, canonical URLs, and robots.txt` | SEOHead.astro, robots.txt | `astro build` + grep |
| 16 | `fix(responsive): audit and fix responsive layouts across all breakpoints` | Various | Playwright multi-viewport |
| 17 | `chore(qa): final polish and verification pass` | Various | Full audit |

---

## Success Criteria

### Verification Commands
```bash
# Build succeeds
npx astro build                           # Expected: exit 0, no errors

# Dev server works
npx astro dev &                           # Expected: running on 4321
curl -s http://localhost:4321             # Expected: HTML response

# RSS valid
xmllint dist/rss.xml                     # Expected: valid XML

# Sitemap valid
xmllint dist/sitemap-index.xml           # Expected: valid XML

# No React in bundle
grep -r "react" dist/ | grep -v ".xml"   # Expected: no matches
```

### Final Checklist
- [ ] All "Must Have" present (zero JS core, all content migrated, dark theme, responsive, SEO meta, ViewTransitions)
- [ ] All "Must NOT Have" absent (no React, no styled-components, no D3, no Pixi, no light theme, no skills section)
- [ ] `astro build` passes with zero errors
- [ ] Lighthouse Performance >= 95 on all pages
- [ ] Lighthouse SEO = 100 on all pages
- [ ] All 5 projects render as listing cards AND detail pages
- [ ] Blog infrastructure works (listing, post rendering, tags, RSS)
- [ ] Contact form has correct Netlify attributes
- [ ] Fathom analytics script present with `data-spa="auto"`
- [ ] All images load, no broken references
- [ ] Responsive at mobile/tablet/desktop breakpoints
- [ ] No horizontal scrolling on any page
