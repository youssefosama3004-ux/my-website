# Accessibility audit — localhost

Tested on 2026-09-06 against `http://localhost:4321` using axe-core in Microsoft Edge, plus manual keyboard checks.

## Scope

- 10 routes
- Light and dark themes
- Desktop (1440 × 1000) and mobile (390 × 844)
- 40 automated page/theme/viewport scans
- WCAG 2 A/AA, WCAG 2.1 AA, WCAG 2.2 AA, and axe best-practice rules

Routes: `/`, `/quick-info`, `/work`, `/work/koolen`, `/work/horizon-app`, `/work/project2`, `/work/project3`, `/work/project4`, `/blog`, and `/blog/coming-soon`.

## Findings

### Serious

1. **Hidden carousel copies contain focusable links** (`aria-hidden-focus`)
   - Affects the two logo loops on the homepage in every tested theme and viewport.
   - Duplicate `<ul aria-hidden="true">` elements still contain anchors, so keyboard and assistive-technology state disagree.
   - Remove duplicated links from the tab order, or make duplicated trees inert.

2. **Full-screen menu does not contain keyboard focus or close with Escape**
   - After the eight visible menu links, Tab moves to homepage controls behind the open overlay.
   - Escape leaves `aria-expanded="true"`.
   - Move focus into the menu when it opens, contain focus while open, close on Escape, and restore focus to the toggle.

3. **Dark-theme link contrast is slightly below AA** (`color-contrast`)
   - Accent link is `#0066ff` on black: 4.34:1; normal text requires 4.5:1.
   - Affects the blog preview link and the Koolen external-store link (including the mobile case-study rendering).
   - Use a lighter accent for text links in dark contexts without changing the brand button/background color.

4. **Case-study tables cannot be reached as scrollable regions on mobile** (`scrollable-region-focusable`)
   - Affects the horizontally scrollable tables in the Koolen and Horizon case studies.
   - Give each scroll wrapper keyboard focus and an accessible label/region description.

5. **Automatically moving content has no keyboard-accessible pause control** (manual WCAG 2.2.2 review)
   - Testimonial rotation pauses only on mouse hover.
   - Logo marquees continuously move and pause only on pointer hover (reduced-motion support is present, but other users still need control).
   - Add pause/play controls and also pause while keyboard focus is within the component.

### Moderate

6. **The fixed “Quick info” link sits outside a landmark** (`region`)
   - Affects every tested route except `/quick-info`.
   - Put it inside `header`, `nav`, `main`, or another appropriately labelled landmark.

7. **No keyboard skip link** (manual WCAG 2.4.1 review)
   - Add a visible-on-focus “Skip to main content” link before repeated navigation.

8. **Several links are placeholders**
   - Menu social links and client-logo links use `href="#"`.
   - They appear actionable to keyboard and screen-reader users but only jump to the page top.
   - Replace with real destinations or render non-links until destinations exist.

### Needs manual confirmation

9. **`aria-label` is applied to a paragraph for the `98%` statistic**
   - axe could not determine whether the ARIA attribute is valid/useful on this element.
   - Prefer visible text alone, or put the accessible name on an element with an appropriate role.

## Passed checks

- `/quick-info` produced zero automated violations in all four theme/viewport combinations.
- Document language and page titles are present.
- Images tested have accessible alternatives.
- Form controls have accessible labels.
- Buttons and primary navigation links have accessible names.
- No automated heading-order, duplicate-ID, or missing-main-landmark failures were found.
- Reduced-motion handling exists for the prominent star, logo-loop, carousel, and flip animations.

## Suggested fix order

1. Menu keyboard behavior and hidden carousel links.
2. Dark-theme contrast and mobile scrollable tables.
3. Motion pause controls.
4. Landmark, skip-link, and placeholder-link cleanup.
