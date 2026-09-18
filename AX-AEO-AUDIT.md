# Agent Experience (AX) and Agent Engine Optimization (AEO) audit

**Site:** youssefkader.me  
**Date:** 17 September 2026  
**Method:** Local source and production-build review, plus a public availability check. The public-site request timed out from the audit environment, so the live deployment could not be independently validated.

## Executive summary

The site has a solid agent-readable foundation: static HTML, a permissive `robots.txt`, a sitemap, an `llms.txt` overview, canonical URLs, and JSON-LD for the person, business, and FAQs. An AI agent can understand who Youssef is, the services offered, and how to contact him.

The main weakness is reliability of the information map. The sitemap and `llms.txt` point agents to five work pages, but the current build generates none of those pages. This creates dead ends precisely where an agent needs evidence to recommend or qualify Youssef. The second important gap is actionability: “Book a call” is JavaScript-dependent, has no Calendly URL configured, and falls back to an email client rather than a stable booking or inquiry endpoint.

## Scores

| Area | Score | Assessment |
| --- | ---: | --- |
| Agent Experience | 6/10 | Clear identity and services, but agents encounter broken evidence links and cannot reliably complete the booking action. |
| Agent Engine Optimization | 6/10 | Strong crawl and structured-data baseline, weakened by an inaccurate sitemap and incomplete case-study surface. |

## What is working

- **Crawl access is open.** `robots.txt` allows all crawlers and names the XML sitemap.
- **The site is largely server-rendered.** Astro emits static HTML for the homepage and quick-info page, so core content does not depend on a browser executing React.
- **Identity is explicit.** JSON-LD describes Youssef as a `Person` and `ProfessionalService`, including location, languages, capabilities, services, and contact email.
- **Question-answer content is structured.** The homepage publishes `FAQPage` JSON-LD, which is useful for retrieval and answer generation.
- **An agent entry point exists.** `/llms.txt` states the professional profile, services, fit, evidence links, and contact method in concise plain language.
- **Canonical and social metadata are present.** This reduces ambiguity about the preferred public URL and page identity.

## Findings and recommendations

### P0 — Repair the evidence URLs before further optimization

**Evidence:** The generated `dist` folder contains only `/`, `/quick-info`, and the two no-index blog pages. It contains no `/work/*` pages. However, both `sitemap.xml` and `llms.txt` list five `/work/...` URLs.

**Impact:** An agent that wants proof of relevant experience will follow a dead link. That damages recommendation quality and can cause the agent to omit the portfolio entirely.

**Recommendation:** Choose one of the following and make all three sources agree: routes, sitemap, and `llms.txt`.

1. Re-enable and build the case-study routes, then keep those canonical URLs in the sitemap and `llms.txt`.
2. If the case studies are not ready, remove their URLs from the sitemap and `llms.txt`, and point the evidence section to the homepage portfolio instead.

### P0 — Make the contact action agent-completable

**Evidence:** The contact form is a React client island. `CALENDLY_EVENT_URL` is empty; submit falls back to a `mailto:` URL.

**Impact:** Agents can identify an email address, but cannot reliably schedule a call or submit a request through a stable web action. Some environments cannot open a local email client at all.

**Recommendation:** Add a public, direct booking URL once the calendar is ready, and expose it in all three places: visible HTML, JSON-LD/structured contact data, and `llms.txt`. Alternatively, use a server-backed contact endpoint that returns a clear success or validation response. Keep the email address as a fallback.

### P1 — Treat public availability as a release gate

**Evidence:** Requests to `https://youssefkader.me/` timed out during this audit.

**Impact:** Crawlability and agent usability are zero while the public origin is unavailable, slow, or blocked by an edge configuration.

**Recommendation:** Add an external uptime and response-time monitor for `/`, `/robots.txt`, `/sitemap.xml`, `/llms.txt`, and the booking URL. Test with an ordinary unauthenticated request after every deployment.

### P1 — Make the portfolio evidence easier to retrieve and compare

**Evidence:** The public agent map names case-study URLs but does not offer short, outcome-oriented summaries or a structured project list.

**Impact:** Agents need to infer fit from a general services list rather than cite specific relevant work.

**Recommendation:** For every live case study, provide a static page with: client/industry (where public), problem, role, scope, constraints, delivered outcome, technologies, and relevant services. Add `CreativeWork` or `CaseStudy`-appropriate JSON-LD where it accurately reflects the content, and list short summaries in `llms.txt`.

### P2 — Strengthen the agent entry point, without overclaiming support

**Evidence:** `llms.txt` exists and is concise, but it is primarily prose and only lists links as raw URLs. There is no `llms-full.txt` or page-level Markdown alternative.

**Impact:** This is usable today, but it gives agents less explicit structure and less source material for grounded responses.

**Recommendation:** Reformat `llms.txt` into a title, one-sentence summary, and named Markdown links with short descriptions. Add `llms-full.txt` only after the case studies are live; it should contain maintained, factual long-form content. `llms.txt` is a community convention rather than a universal indexing guarantee, so it complements—rather than replaces—crawlable HTML, sitemaps, and structured data.

### P2 — Add a compact agent-readable service and engagement brief

**Recommendation:** Create a static `/work-with-me` or `/services` page with ideal clients, engagement types, deliverables, languages, location/time-zone overlap, minimum project context, process, availability policy, and a direct contact/booking action. Link it from the primary navigation, sitemap, and `llms.txt`. This lowers the amount of inference an agent must perform before deciding whether to recommend contact.

## Recommended delivery order

1. Fix or remove the five broken work URLs across routes, `sitemap.xml`, and `llms.txt`.
2. Configure a real booking URL or server-side inquiry endpoint.
3. Verify public availability and add uptime monitoring.
