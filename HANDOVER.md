# Project Handover: Youssef Kader Portfolio

Last audited: 23 August 2026  
Repository: `https://github.com/youssefosama3004-ux/my-website.git`  
Current branch: `main`, tracking `origin/main`  
Current commit: `e538bae` (`Add How I Work process section`)  
Project root: `C:\Users\joo\.gemini\antigravity\scratch\youssefkader-me`

## 1. Purpose of this handover

This document is the source of context for the next coding tool or developer. It describes the current site, every major technology and subsystem in use, the working-tree state, known gaps, verification results, and the recommended order of work.

The site is a dark-only personal portfolio for Youssef Kader, positioned as a business-minded product designer and developer. It is a statically generated Astro site with React islands for interaction and GSAP for scroll-driven motion.

## 2. Current status at a glance

- The production build succeeds and generates six static HTML pages.
- There is no backend, database, authentication, CMS, analytics, API route, or server-side form handler.
- The homepage is substantially implemented and responsive, with several animated sections.
- Four project detail routes exist, but their Markdown files contain frontmatter only; the case-study body areas are empty.
- The booking integration is not production-ready because both Calendly URLs are placeholders.
- `/about` and `/blog` are linked from the menu but do not exist.
- Four service images and three testimonial portraits referenced by the UI are missing.
- The repository has uncommitted and untracked work. Do not discard or overwrite it.
- The README is still the default Astro starter README and is not an accurate project guide.
- There is no automated test, lint, format, type-check, CI, or deployment configuration.

## 3. Technology inventory

### Runtime and package management

- Node.js requirement: `>=22.12.0` from `package.json`.
- Audited local Node.js version: `v22.16.0`.
- Package manager: pnpm.
- Audited local pnpm version: `11.19.0`.
- Lockfile: `pnpm-lock.yaml`, lockfile format `9.0`.
- Workspace policy: `pnpm-workspace.yaml` allows build scripts for `esbuild`, `msw`, and `sharp`.
- Module format: ESM via `"type": "module"`.

### Application framework

- Astro `^6.3.1`.
- Static output; no adapter is configured, so the site builds into `dist/`.
- React `^19.2.6` and React DOM `^19.2.6` are used for client-side islands.
- `@astrojs/react` integrates React with Astro.
- `@astrojs/mdx` is enabled, and the project collection accepts both `.md` and `.mdx`.
- Astro's content collections and image pipeline are used for projects and their SVG covers.
- Astro's passthrough image service is explicitly selected. Source images are not transformed by a hosted image service.

### Styling and UI

- Tailwind CSS `^4.3.0` is loaded through `@tailwindcss/vite`.
- The CSS entry point is `src/styles/global.css`.
- The import order is Tailwind, tokens, base, typography, then utilities. Preserve this order.
- Custom CSS variables form the design-token layer.
- shadcn configuration exists in `components.json` with the `radix-nova` style, neutral base, Lucide icon library, CSS variables, and `@/*` aliases.
- `src/components/ui/shimmer-button.tsx` and `src/lib/utils.ts` are present but are not currently rendered by any page.
- React Bits is configured as a jsrepo registry in `jsrepo.config.ts`; the copied `LogoLoop`, `StaggeredMenu`, `ScrollReveal`, and `GradualBlur` components appear to come from component-library patterns and should be treated as locally owned code now.

### Motion and interaction

- GSAP `^3.15.0` and `ScrollTrigger` drive pinned horizontal sections and scroll-reveal text.
- CSS keyframes drive the hero wordmark marquee and tool-logo marquee.
- React state drives navigation, accordions, counters, the testimonial carousel, and contact form state.
- The implementation checks `prefers-reduced-motion` in the major GSAP and marquee paths.
- Coarse pointers and screens below 768 px use native horizontal scrolling with snap points instead of pinned GSAP movement.

### Fonts

- Local Geist and Geist Mono variable font files are in `public/fonts/` and registered in `src/styles/tokens.css`.
- Display headings use Adobe Fonts family `rift`, loaded from `https://use.typekit.net/bsx0nwx.css` in `Layout.astro`.
- If Adobe Fonts fails or is blocked, the display stack falls back to Geist and system sans-serif.

### External runtime services

- Adobe Typekit is loaded on every page.
- Calendly's widget CSS and JavaScript are injected when the contact React island mounts.
- No other network service is used at runtime.

## 4. Configuration files

### `package.json`

Available scripts:

| Script | Command | Purpose |
| --- | --- | --- |
| `dev` | `astro dev` | Start the local development server, normally at `http://localhost:4321`. |
| `build` | `astro build` | Generate the production site in `dist/`. |
| `preview` | `astro preview` | Serve the generated production site locally. |
| `astro` | `astro` | Run Astro CLI subcommands. |

No `test`, `lint`, `format`, or explicit `check` script exists.

### `astro.config.mjs`

- Disables the Astro development toolbar.
- Enables React and MDX integrations.
- Uses `passthroughImageService()`.
- Stores the Vite cache in the project-local `.vite/` directory.
- Loads Tailwind through the Vite plugin.
- Defines `@` as an alias to `src/`.
- Does not define `site`, `base`, redirects, adapter, server output, or deployment target.

### `tsconfig.json`

- Extends Astro's strict TypeScript preset.
- Enables React JSX using the automatic runtime.
- Maps `@/*` to `src/*`.
- Excludes `dist/`.
- Most components are `.jsx`, so strict TypeScript does not provide full application-wide checking.

### `components.json`

- shadcn style: `radix-nova`.
- TypeScript components enabled.
- CSS entry: `src/styles/global.css`.
- Base color: neutral.
- Icon library: Lucide.
- Aliases point to `src/components`, `src/components/ui`, `src/lib`, and `src/hooks`.
- No `src/hooks` directory currently exists.

### `jsrepo.config.ts`

- Registry: `https://reactbits.dev/r/`.
- Installed/generated components are directed to `src/components`.

### `.gitignore`

- Ignores dependencies, the pnpm store, `dist/`, `.astro/`, common deployment folders, all normal environment files, IDE files, logs, several common caches, and TypeScript build metadata.
- It does not currently ignore the configured `.vite/` cache, `.dev-server.pid`, `artifacts/`, root screenshots, `scaffold.py`, or `start-dev-server.cmd`, which is why populated versions appear as untracked.

## 5. Application architecture

Astro owns routing, static generation, content loading, page metadata, and initial HTML. React is used only where browser interactivity is needed.

### Hydration strategy on the homepage

| Island | Directive | Reason |
| --- | --- | --- |
| `Nav` | `client:load` | Scroll state and menu interaction are needed immediately. |
| `Hero` | `client:load` | Rendered as React, though it currently has no state or effects and could be Astro/static markup. |
| `Clients` | `client:visible` | Logo loop hydrates only when near the viewport. |
| `About` | `client:load` | Intersection-observed counters and GSAP text reveal. |
| `ExperienceTimeline` | `client:load` | GSAP pinned horizontal animation. |
| `HowIWork` | `client:load` | GSAP text reveal. |
| `Contact` | `client:load` | Carousel, form state, and Calendly script injection. |
| `Services` | `client:load` | Accordion state. |
| `ProjectsCarousel` | `client:load` inside `Projects.astro` | GSAP/native horizontal carousel. |
| `GradualBlur` | `client:load` | Fixed bottom backdrop blur overlay. |

### Homepage section order

The actual DOM order in `src/pages/index.astro` is:

1. Fixed navigation.
2. Hero.
3. Client logo loop.
4. About.
5. Experience timeline.
6. How I Work.
7. Contact.
8. Services.
9. Featured projects.
10. Fixed bottom gradual-blur overlay.

The current order places Contact before Services and Work. Confirm that this is intentional before rearranging because GSAP pinning and scroll positions may need retesting after any order change.

## 6. Routes and generated pages

| Route | Source | Status |
| --- | --- | --- |
| `/` | `src/pages/index.astro` | Implemented. |
| `/work` | `src/pages/work/index.astro` | Implemented project grid. |
| `/work/horizon-app` | `src/pages/work/[slug].astro` + content | Generated successfully. |
| `/work/project2` | Same dynamic route | Generated successfully. |
| `/work/project3` | Same dynamic route | Generated successfully. |
| `/work/project4` | Same dynamic route | Generated successfully. |
| `/about` | Linked from `Nav.jsx` | Missing; currently a 404. |
| `/blog` | Linked from `Nav.jsx` | Missing; currently a 404. |
| `#contact` | Homepage section anchor | Works only when already on `/`; from `/work`, it resolves to `/work#contact`, where no such element exists. Use `/#contact` for cross-route reliability. |
| `#work` | Homepage section anchor | Works from the hero on `/`. |

The verified build generated exactly six HTML pages: the homepage, work index, and four project routes.

## 7. Component responsibilities

### `src/layouts/Layout.astro`

- Imports global CSS.
- Sets language to English, UTF-8, viewport, title, and optional description.
- Loads Adobe Typekit globally.
- Accepts `title`, `description`, and `bodyClass` props plus a named `head` slot.
- Does not currently provide canonical URLs, Open Graph/Twitter metadata, favicon links, sitemap, structured data, or analytics.

### `src/components/Nav.jsx`

- Fixed responsive header with logo and hamburger.
- Collapses into a centered rounded bar after 80 px of scroll.
- Tracks whether the About section crosses a focus line and applies `nav-logo-about`.
- Controls `StaggeredMenu` externally.
- Menu items: Work, About, Blog, Contact.
- Closing delays removal of the expanded shell by 320 ms to match menu animation.
- `closeOnClickAway` is disabled.

### `src/components/StaggeredMenu/`

- Full-screen/right-side GSAP menu panel with layered color transitions, optional item numbering, optional social links, internal/external open-state support, focus/keyboard handling, and its own CSS file.
- In this project its header is hidden, it is fixed on the right, item numbering is on, socials are off, and the external `Nav` button controls it.
- Colors are `#1a1a2e` and `#16213e`; the accent comes from `--accent`.

### `src/components/Hero.jsx`

- Uses `/images/hero-aurora.png` and `/images/youssef-product-design-v3.png`.
- Displays a repeated “Youssef Kader UX Specialist” marquee behind the portrait.
- Copy: “Business-Minded Product Designer” and startup-focused description.
- CTA 1 scrolls to `#work`.
- CTA 2 opens a placeholder Calendly URL and must be replaced.
- Hero layout and responsive crops are heavily controlled by `utilities.css`.

### `src/components/Clients.jsx` and `LogoLoop/LogoLoop.jsx`

- Infinite marquee for DP World, Dubai Trade, AABE, Invoice Brokers, and WinVeston.
- Runs at speed 60 with 40 px logo height, 80 px gap, hover pause/scale, and edge fade.
- Every client link is currently `#`, so clicking a logo has no useful destination and may jump the page.
- Global utility CSS forces these logos to white for the dark theme.

### `src/components/About.jsx`

- Blue About section with GSAP letter-by-letter reveal.
- Three counters animate once when 35% visible over 1.2 seconds.
- Metrics are hard-coded: 98% repeat/satisfied, 25+ projects, +12 countries.
- Reduced-motion users receive the final values immediately.

### `src/components/ExperienceTimeline.jsx`

- Reads five jobs from `src/data/experience.js`.
- Alternates cards above/below a central timeline.
- Desktop/fine pointer: GSAP pins the section and translates the track horizontally.
- Mobile/coarse pointer/reduced motion: native horizontal scrolling and snap points.
- Any date containing `Present` receives a teal status pill.
- Responsive rules include a special short-desktop layout below 800 px viewport height and a tablet coarse-pointer card layout.

### `src/components/HowIWork.jsx`

- Four hard-coded steps: Discovery Call, Scope, Build, Handoff.
- Horizontal connected sequence on desktop and vertical connected sequence on mobile.
- Titles and descriptions use `ScrollReveal`.

### `src/components/Contact.jsx`

- Left half: five-testimonial carousel with a 6-second interval and progress controls.
- Carousel pauses on mouse hover.
- Missing raster avatars fall back to generated initials; SVG logos render with padded containment.
- Right half: controlled React form with name, company, email, project description, and lead-source fields.
- Browser validation requires name, email, and project description.
- Submission does not send data to this site. It builds a Calendly URL and attempts `window.Calendly.initPopupWidget`; if unavailable, it opens Calendly in a new tab.
- Company, project description, and source are mapped to Calendly custom answers `a1`, `a2`, and `a3`. These mappings must match the final Calendly event configuration.
- Calendly widget assets are injected at mount time.
- No consent storage, spam protection, server fallback, lead database, email delivery, or success/error state exists.

### `src/components/Services.jsx`

- Single-open-item accordion; clicking the open item closes it.
- Four services: Product Design, Web Development, Ecommerce, UX Consulting.
- Each panel expects an image under `public/images/services/`; all four files are currently missing. `onError` hides the broken image, leaving the styled empty container.
- Additional cards show supported platforms and an infinite tool-logo marquee.
- Platform logos: WordPress, Shopify, Salla, Webflow, React.
- Tool logos: Figma, Framer, Webflow, React, Next.js, Tailwind, Blender, GSAP, Astro, WordPress.

### `src/components/Projects.astro`

- Loads the `projects` content collection.
- Filters to `featured: true`, sorts by `order`, and prepares 1200 × 1500 cover output through Astro's image API.
- Passes only slug, title, services, and cover URL to the React carousel.

### `src/components/ProjectsCarousel.jsx`

- Desktop/fine pointer: pinned horizontal GSAP carousel.
- Mobile/coarse pointer/reduced motion: native snap scrolling.
- Cards use 80 vw on mobile, 60 vw on medium screens, and 42 vw on large screens.
- Displays the first two service tags only.
- Shows a custom “View Project” cursor on fine pointers and hides the normal pointer over cards.

### `src/components/ScrollReveal.jsx`

- Splits plain-string children into words and then individual letter spans.
- Animates rotation, opacity, and optional blur with scrubbed GSAP ScrollTriggers.
- Supports a custom scroll container and configurable trigger endpoints.
- Only plain-string children are supported; non-string children become empty content.
- Skips animations for reduced-motion users.

### `src/components/GradualBlur.jsx`

- General-purpose backdrop-filter overlay with top/bottom/left/right positions, presets, curve functions, exponential strength, responsiveness, hover intensity, and optional scroll visibility.
- The homepage uses a fixed bottom page overlay: 3.5 rem high, strength 1.15, four layers, bezier/exponential curve, 45% opacity, z-index 5.

### `src/components/ui/shimmer-button.tsx`

- Reusable animated shimmer button using CSS custom properties and `cn()`.
- Present but unused.

### `src/lib/utils.ts`

- Exposes `cn()` by combining `clsx` with `tailwind-merge`.
- Currently used only by the unused shimmer button.

## 8. Content model and current content

The `projects` collection is loaded from `src/content/projects/**/*.{md,mdx}` and validates:

- `title`, `tagline`, `description`, `type`, `year`, `dateRange`, and `role` as strings.
- `services` and `tools` as string arrays.
- `cover` as an Astro image.
- `featured` as a boolean defaulting to `false`.
- `order` as a number defaulting to `0`.

Current entries:

| Slug/file | Display title | Type | Date | Featured/order | Role |
| --- | --- | --- | --- | --- | --- |
| `horizon-app.md` | NutriFlow | Web App | 2025–2026 | Yes / 1 | Product Designer |
| `project2.md` | Orbital | SaaS Platform | 2024–2025 | Yes / 2 | Lead Product Designer |
| `project3.md` | Sonder | Travel App | 2023–2024 | Yes / 3 | Product Designer |
| `project4.md` | Lumen | Consumer App | 2022–2023 | Yes / 4 | UX/UI Designer |

Important content notes:

- All four Markdown files have no content after frontmatter, so project detail pages end immediately after the metadata block.
- Three filenames/slugs are generic (`project2`, `project3`, `project4`) rather than descriptive or SEO-friendly.
- `horizon-app.md` does not match its display title, NutriFlow.
- The `year` field is validated but not displayed on current pages.
- Cover SVGs are abstract placeholders in `src/assets/projects/`.
- Experience and testimonial data are JavaScript arrays, not content collections.

## 9. Design system and CSS behavior

### Theme

- Dark mode is the only active theme.
- `:root` declares `color-scheme: dark`.
- A light-theme token block and animated theme toggle have been removed in the current uncommitted work.
- Do not reintroduce light mode unless the owner asks for it.

### Main tokens

- Primary background: `#0A0A0A`.
- Surface: `#111111`.
- Elevated: `#0F1115`.
- Deepest: `#070707`.
- Card: `#16181D`.
- About section: `#3A6EC6`.
- Primary text: white.
- Secondary text: grey 300.
- Main accent: blue `#0066FF`.
- Secondary accent: cyan `#22D3EE`.
- Default border: grey 700.
- Spacing scale: 0, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 px.
- Radius scale: 4, 8, 12, 16 px, with additional Tailwind rounded utilities used directly.
- Tailwind container widths are widened up to `100rem` for `max-w-7xl`.

### Responsive and accessibility behavior

- `html` and `body` clip horizontal overflow.
- Smooth scrolling is global.
- Safe-area insets are considered in the hero, timeline, and fixed UI.
- The hero has distinct layouts for mobile, tablet, short viewport, standard desktop, and tall desktop.
- Journey and Work become native scrolling on coarse pointers and reduced-motion systems.
- Marquee motion stops for reduced-motion users.
- Navigation transition durations are effectively removed for reduced-motion users.
- Custom pointer treatment applies only to fine pointers.
- Focus styling is largely left to browser/Tailwind defaults; a formal keyboard and contrast audit has not been completed.

### Potential stale CSS

- `.concept-b-marquee-track`, `.concept-b-marquee-text`, and `concept-b-marquee` remain in `utilities.css` but are not referenced by current components.
- Theme-toggle CSS was removed in the current uncommitted diff.

## 10. Assets

### Public asset footprint

- Fonts: 2 files, about 137 KB.
- Icons: 2 accordion SVGs.
- Images: 11 raster files, about 23 MB total.
- Logos: 43 files, about 343 KB total.
- Testimonials: 2 SVG logo files.

### Images actually used in the hero

- `public/images/hero-aurora.png`: 1672 × 941, about 1.37 MB.
- `public/images/youssef-product-design-v3.png`: 3061 × 2336, about 2.51 MB.

### Other large, currently unreferenced public images

- `youssef-hero-fullbleed.png`: about 9.25 MB.
- `youssef-product-design-v2.png`: about 2.71 MB.
- `youssef-kader-ux-specialist.jpeg`: about 1.97 MB and currently untracked.
- Several earlier portrait/hero variants range from about 255 KB to 1.08 MB.

Because Astro copies `public/` verbatim, unused public images are also copied into `dist/`. The verified build contains about 21.25 MB of PNG assets, dominated by unused variants. Move genuinely unused files out of `public/` or remove them only after owner confirmation.

### Missing referenced assets

- `public/images/services/product-design.jpg`
- `public/images/services/web-development.jpg`
- `public/images/services/ecommerce.jpg`
- `public/images/services/ux-consulting.jpg`
- `public/testimonials/ahmed-metwally.jpg`
- `public/testimonials/fadi-shamaa.jpg`
- `public/testimonials/sebastian.jpg`

Service images disappear on load failure. Testimonial portraits intentionally fall back to initials.

## 11. Dependency audit

### Directly used in current rendered code

- `astro`
- `@astrojs/react`
- `@astrojs/mdx`
- `@tailwindcss/vite`
- `react`
- `react-dom` through the React integration/runtime
- `gsap`

### Used only by currently unrendered helper code

- `clsx`
- `tailwind-merge`

These support `shimmer-button.tsx`, which no page imports.

### Installed but not currently imported by application source

- `@astrojs/tailwind` (Tailwind is instead wired through `@tailwindcss/vite`)
- `@fontsource-variable/geist` (local WOFF2 files are used instead)
- `class-variance-authority`
- `framer-motion`
- `geist`
- `lucide-react` after removal of the theme toggler
- `motion`
- `radix-ui`
- `react-icons`
- `shadcn` as a runtime dependency, though it may be retained as a CLI/tooling choice
- `tailwindcss` is required by the Tailwind pipeline even though component code does not import it
- `tw-animate-css`

Do not remove dependencies mechanically. First decide whether upcoming UI work needs the shadcn/animation stack, then prune and rebuild.

## 12. External links and placeholders that require owner input

1. Replace `https://calendly.com/YOUR-LINK` in `Hero.jsx`.
2. Replace `https://calendly.com/YOUR-SLUG/intro` in `Contact.jsx`.
3. Confirm the final Calendly custom-question order for `a1`, `a2`, and `a3`.
4. Supply client URLs or remove anchor behavior for all five logo-loop items.
5. Decide whether `/about` and `/blog` should be built, removed, or linked to homepage sections/external destinations.
6. Confirm whether Contact should remain before Services and Work.
7. Confirm final project case studies, titles, slugs, metadata, and imagery.
8. Confirm whether the public claims, employment dates, client names, and testimonials are approved for publication.

## 13. Repository and working-tree state

The branch is aligned with `origin/main`, but the working tree is intentionally dirty.

### Modified tracked files

- `src/pages/index.astro`
- `src/styles/base.css`
- `src/styles/tokens.css`
- `src/styles/utilities.css`

### Deleted tracked file

- `src/components/ui/animated-theme-toggler.tsx`

### Meaning of the tracked changes

- Removes the animated light/dark theme toggle from the homepage.
- Removes local-storage theme initialization.
- Removes the light theme token override.
- Sets the document to dark color scheme only.
- Removes light-theme logo rules and theme-toggle placement/reduced-motion CSS.

### Untracked source/asset/support files

- `.dev-server.pid`
- `.vite/`, a generated local Vite cache populated during build verification
- `artifacts/` containing 58 files and about 10.84 MB, mostly visual QA screenshots plus development logs
- `public/images/youssef-kader-ux-specialist.jpeg`
- `public/images/youssef-portrait-transparent.png`
- `public/images/youssef-product-design-transparent.png`
- `public/images/youssef-product-design-v2.png`
- `scaffold.py`
- `services-accordion-screenshot.png`
- `services-platforms-card-screenshot.png`
- `services-platforms-screenshot.png`
- `start-dev-server.cmd`
- `timeline-rmda-verification.png`

Treat all of these as user work. Do not run reset/clean commands, restore the deleted theme toggler, or delete screenshots/assets without explicit approval. Decide later which are product assets, working references, or disposable local artifacts.

## 14. Verification performed for this handover

Command used:

```powershell
$env:ASTRO_TELEMETRY_DISABLED='1'
pnpm build
```

Result on 23 August 2026:

- Build passed.
- Content sync and type generation passed.
- Static entrypoint build passed.
- Six pages generated.
- Four project cover images reused optimized cache entries.
- Build completed without reported warnings.

The first sandboxed build attempt could not access Astro's user-level telemetry directory; setting `ASTRO_TELEMETRY_DISABLED=1` avoided that part, and running outside the restricted file sandbox verified the project itself successfully. This was an environment restriction, not an application build failure.

No automated unit, integration, end-to-end, accessibility, or visual-regression suites exist. Existing screenshots are evidence of manual visual QA, especially for hero responsive states, the timeline, services, and projects.

## 15. Known issues and risks, in priority order

### P0: Launch blockers

1. Replace both Calendly placeholder URLs and verify the event/custom answers.
2. Resolve `/about` and `/blog` dead links.
3. Add the four missing service images or redesign the panels to work intentionally without images.
4. Replace/approve project placeholder content and write actual case-study bodies.
5. Verify all personal claims, roles, dates, testimonials, and brand/client permissions.

### P1: User experience and correctness

1. Change Contact's menu link to `/#contact` so it works from `/work` pages.
2. Replace `#` client links or render non-interactive logos.
3. Add global navigation or a consistent header to Work pages if desired; they currently only have simple back links.
4. Confirm homepage section order.
5. Add complete SEO/social metadata, canonical URL, favicon links, sitemap, and robots policy.
6. Check keyboard operation, focus visibility, screen-reader output, heading hierarchy, and color contrast.
7. Verify Calendly behavior with content blockers, slow networks, and widget load failure.

### P2: Performance and maintainability

1. Remove or relocate unused large public image variants after approval; they currently inflate deployment output.
2. Audit eager hydration. Hero can likely become Astro/static; other islands may use later hydration where appropriate.
3. Prune unused dependencies after confirming future plans.
4. Remove stale CSS and unused components only after validating that they are not planned work.
5. Replace the starter README with a concise setup/deployment guide, or point it to this handover.
6. Add lint, formatting, Astro checking, and at least smoke/end-to-end tests.
7. Add a documented deployment target and CI build.

### P3: Nice-to-have improvements

1. Use descriptive project slugs.
2. Move experience and testimonials into typed content/data structures.
3. Add image optimization for large raster assets rather than serving all originals from `public/`.
4. Add analytics only after privacy/consent decisions.
5. Add a custom 404 page.

## 16. Recommended continuation plan for the next tool

### Phase 1: Preserve and confirm

1. Read this file, `package.json`, `astro.config.mjs`, `src/pages/index.astro`, and `git diff` before editing.
2. Keep the current dark-only direction and preserve all uncommitted changes.
3. Ask the owner only for decisions that cannot safely be inferred: final Calendly URLs, missing routes, approved content/assets, and deployment destination.
4. Make a checkpoint commit only if the owner asks for one; do not mix cleanup with feature work.

Acceptance criteria:

- No user work is lost.
- The next scope is agreed.
- All owner-supplied URLs and content are recorded before implementation.

### Phase 2: Fix launch blockers

1. Replace both Calendly constants with the same approved event URL or deliberately separate URLs.
2. Test popup and fallback-tab submission, including query-string encoding and custom-answer mapping.
3. Fix menu destinations and cross-route anchors.
4. Add approved service images, with useful alt text, optimized dimensions, and compressed formats.
5. Replace generic project metadata and write complete case-study Markdown/MDX bodies.
6. Add or remove About/Blog according to the owner's decision.

Acceptance criteria:

- No placeholder URL, `href="#"`, or intentional navigation 404 remains.
- Contact submission opens the correct event with prefilled fields.
- Every visible image loads or has an intentional designed fallback.
- Every project detail page contains substantive content.

### Phase 3: Quality and accessibility

1. Test at minimum 375 × 667, 390 × 844, 768 × 768, 1024 × 768, 1366 × 768, 1440 × 900, and 1920 × 1080, matching existing QA artifacts.
2. Test keyboard-only navigation, menu focus behavior, accordion state, testimonial buttons, form fields, and project cards.
3. Test reduced motion and a coarse-pointer/touch viewport.
4. Check focus indicators, contrast, headings, link purpose, alt text, form error communication, and horizontal-scroll discoverability.
5. Confirm GSAP pinning does not create jumps after font/image loading or section reordering.

Acceptance criteria:

- No unintended horizontal page overflow.
- No overlapping fixed navigation, bottom blur, or pinned sections.
- The core flow is usable with keyboard and reduced motion.
- Mobile uses native scroll for Journey and Work.

### Phase 4: Performance and cleanup

1. Inventory which public portraits/hero variants are approved and used.
2. Move optimized source assets into `src/assets` where Astro should process them; keep truly static assets in `public`.
3. Convert oversized PNGs to appropriate WebP/AVIF outputs when visual quality is approved.
4. Reassess hydration directives and convert static React markup to Astro where practical.
5. Prune confirmed unused packages and stale CSS/components one group at a time, rebuilding after each group.
6. Decide whether QA screenshots and helper scripts belong in Git, a separate design folder, or local-only ignore rules.

Acceptance criteria:

- Production output no longer contains unused multi-megabyte image variants.
- No removed dependency or component is referenced.
- The production build remains green.

### Phase 5: Production readiness

1. Configure the deployment provider and document its build command, output directory, Node version, and domain.
2. Set Astro's `site` URL when the production domain is known.
3. Add canonical, Open Graph, Twitter, favicon, sitemap, robots, and optional structured data.
4. Add `astro check`, linting, formatting, and a production-build CI job.
5. Add a lightweight route/link/form smoke test.
6. Replace the starter README with setup, content-editing, testing, and deployment instructions.

Acceptance criteria:

- A clean checkout installs and builds with documented versions.
- CI validates every change.
- All metadata uses the real production domain and approved content.
- Deployment is reproducible without local-only files.

## 17. Standard verification checklist after every meaningful change

```powershell
pnpm install --frozen-lockfile
$env:ASTRO_TELEMETRY_DISABLED='1'
pnpm build
pnpm preview
```

Then manually verify:

- `/`
- `/work`
- Every `/work/<slug>` page
- Desktop and mobile menu destinations
- `#work` and `/#contact`
- Journey and Work desktop pinning
- Journey and Work touch scrolling
- About counters and text reveals
- Services accordion and images
- Testimonial autoplay, pause, and manual controls
- Contact validation and Calendly popup/fallback
- Reduced-motion behavior
- Console, network, 404, and missing-asset errors

Use `pnpm install --frozen-lockfile` on a clean environment. Do not reinstall dependencies merely to hide application errors, and do not commit `node_modules`, `dist`, caches, logs, PID files, or temporary screenshots.

## 18. Explicit non-features

The next tool should not assume any of these exist:

- No CMS/editor UI.
- No blog implementation.
- No About route.
- No contact API or email service.
- No database or persistent lead storage.
- No authentication or user accounts.
- No analytics, cookie consent, or tag manager.
- No internationalization.
- No light mode in the current working state.
- No deployment-provider configuration.
- No CI/CD workflows.
- No automated testing setup.
- No formal accessibility audit.
- No production-domain configuration.

## 19. Safe handover instruction for another coding tool

Use this as the opening instruction when transferring the project:

> Continue the Youssef Kader Astro portfolio from `HANDOVER.md`. Preserve the dirty working tree and the current dark-only theme. Before editing, inspect `git status`, `git diff`, `package.json`, `astro.config.mjs`, and the relevant source files. Do not delete untracked assets or restore the deleted theme toggler. Prioritize the P0 launch blockers, ask only for owner-controlled information such as real Calendly URLs and approved content, and run the documented production build plus responsive/manual checks after changes. Clearly separate verified facts from assumptions and report every file changed.
