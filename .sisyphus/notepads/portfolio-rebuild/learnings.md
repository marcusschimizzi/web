# Portfolio Rebuild - Learnings

## Task 1: Astro 5 Project Initialization

### Setup Process
- Created Astro 5 project with minimal template
- Installed dependencies: astro, @astrojs/tailwind, @astrojs/sitemap, @astrojs/mdx, tailwindcss, @tailwindcss/typography
- Configured for static output (no SSR)

### Key Decisions
1. **Tailwind Version**: Used v3.4.19 (not v4) due to compatibility with @astrojs/tailwind@6.0.2
   - v4 requires @tailwindcss/postcss which conflicts with current setup
   - v3 is stable and fully compatible

2. **RSS Integration**: Removed @astrojs/rss from initial config
   - Requires explicit configuration with feed options
   - Can be added later when content structure is defined

3. **Directory Structure**: Created standard Astro layout
   - src/pages/ - Route pages
   - src/layouts/ - Layout components
   - src/components/ - Reusable components
   - public/ - Static assets

### Configuration Details
- **astro.config.mjs**: Site URL set to https://schimizzi.io, static output mode
- **tailwind.config.mjs**: Full color palette replicated from showcase project
  - Primary blue: #1F5ABD (800) with 50-950 scale
  - Secondary purple: #8910A8 (800) with 50-950 scale
  - Tertiary violet: #5435B3 (800) with 50-950 scale
  - Pop green: #48C774 (400) with 50-950 scale
  - Gray scale: #121212 (950) to #F6F6F6 (50)
  - Font family: Helvetica, Arial, sans-serif

- **tsconfig.json**: Strict mode enabled with path aliases
  - @/* → src/*
  - @components/* → src/components/*
  - @layouts/* → src/layouts/*
  - @pages/* → src/pages/*

- **.prettierrc**: Matches showcase config
  - 120 char line width
  - 4-space indentation
  - Single quotes
  - Trailing commas

### Verification Results
✓ Build passes: `npx astro build` completes successfully
✓ Dev server available: `npx astro dev` command works
✓ No forbidden dependencies: React, styled-components, framer-motion, d3, pixi, apollo, graphql all absent
✓ All required integrations installed and configured

### Next Steps
- Create layout components
- Set up content structure for blog/projects
- Configure RSS feed when content is ready
- Implement design system components
