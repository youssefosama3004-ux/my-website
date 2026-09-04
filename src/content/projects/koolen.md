---
title: "Koolen"
tagline: "from promotional catalogue to guided product discovery"
description: "A UX-led redesign of a Saudi home-appliance store, creating a clearer shopping architecture across navigation, campaigns, product discovery, and decision support."
cover: "../../assets/projects/koolen-cover.svg"
type: "E-commerce"
services: ["UX Audit", "Heuristic Evaluation", "Information Architecture", "Homepage UX", "Product Discovery"]
tools: ["Figma", "Nielsen Heuristics"]
year: "2025"
dateRange: "July 2025"
role: "UX Specialist"
featured: true
order: 0
---

## Background

Koolen is a Saudi appliance e-commerce brand with a catalogue spanning small household appliances, kitchen products, refrigerators, washing machines, air conditioners, and heaters.

The challenge was not simply presenting more products. The experience needed to help customers answer three questions quickly:

1. What does Koolen sell?
2. Where can I find the product I need?
3. Why should I buy it here?

The previous homepage relied heavily on promotional banners, repeated product modules, and similar-looking cards. It offered plenty of commercial content, but weakened the shopping hierarchy.

![Placeholder for the original Koolen homepage](/images/projects/koolen/01-original-experience.svg)
*Visual placeholder — original homepage and key hierarchy callouts.*

## The original experience

The previous homepage followed a long promotional sequence:

> Hero campaign → Categories → Latest products → Promotional banner → Featured products → Service benefits → Special products → Another campaign → More products → Reviews → Footer

The page contained useful material, but almost everything competed for the same level of attention. It behaved more like a long promotional catalogue than a guided shopping experience.

Users saw many products and campaigns without a strong path telling them where to start, how to narrow the catalogue, or what to evaluate before purchasing.

## UX audit

I evaluated the homepage using Nielsen's ten usability heuristics, focusing on system feedback, real-world language, user control, consistency, error prevention, recognition, efficiency, minimalism, error recovery, and help.

| Area | Original UX problem | Priority |
| --- | --- | --- |
| Visibility of system status | Time-sensitive offers were not consistently surfaced as clear navigational states | Low–Medium |
| Match with the real world | Promotional content sometimes behaved differently from familiar e-commerce patterns | Low |
| User control and freedom | Users had limited shortcuts between browsing contexts | Medium |
| Consistency and standards | Product cards, section layouts, and content structures varied noticeably | High |
| Error prevention | Category and product paths lacked enough contextual guidance | Critical |
| Recognition over recall | Users had to scan many sections instead of relying on predictable taxonomy | Medium |

![Placeholder for the heuristic evaluation](/images/projects/koolen/02-ux-audit.svg)
*Visual placeholder — evaluation matrix and highest-priority findings.*

## Key finding: weak visual hierarchy

The user was not lacking content. They were lacking prioritization.

Multiple promotional banners, product carousels, differently sized cards, repeated discovery blocks, and competing headings fragmented attention. As users moved down the homepage, each section effectively said, “Look at me next.”

Instead of progressive disclosure, the interface repeatedly reset the user's attention.

## Product discovery problem

The original navigation gave customers limited visibility into the true size of Koolen's catalogue. A scalable information architecture needed to expose the major product families and their subcategories without asking users to discover everything through homepage scrolling.

The improved model organizes the catalogue into clear families:

- **Small home appliances:** vacuums, irons, steam cleaners, fans, and insect killers
- **Large home appliances:** washing machines and refrigerators
- **Kitchen appliances:** food preparation, cooking, coffee, ice makers, and water dispensers
- **Air conditioners:** split, inverter, smart, turbo, concealed, cassette, window, and portable
- **Heaters**

![Placeholder for the information architecture](/images/projects/koolen/03-information-architecture.svg)
*Visual placeholder — shallow navigation compared with the new hierarchical taxonomy.*

## Design objective

The objective was not simply to make Koolen look more modern.

> Create a scalable shopping architecture that prioritizes product discovery, campaigns, and purchase decisions without overwhelming the customer.

The redesign was guided by five principles:

1. **Navigation before promotion** — help users understand the product universe before asking them to process campaigns.
2. **Campaign hierarchy** — give seasonal offers a clear location and state.
3. **Consistent commerce components** — standardize cards, prices, discounts, availability, and calls to action.
4. **Contextual information** — connect reviews, promotions, and recommendations to the product or category being evaluated.
5. **Progressive disclosure** — show enough information to support the next decision without showing everything at once.

## The new experience

The redesigned structure introduced a clearer commerce-oriented information architecture. Promotions became discoverable destinations rather than content users only encountered while scrolling.

A dedicated discounts destination and seasonal campaign area created separation between category navigation, campaign discovery, and regular merchandising.

![Placeholder for the homepage redesign](/images/projects/koolen/04-homepage-transformation.svg)
*Visual placeholder — before and after homepage with numbered UX callouts.*

## Improved product decision support

The product experience was structured around the information customers need at the point of decision:

- Product name and value proposition
- Current and previous price where applicable
- Purchase count
- Model number and weight
- Availability and stock state
- Clear Add to Cart action
- Detailed specifications and features
- Product description and reviews

Unavailable products communicate their state explicitly instead of forcing customers to discover it later in the purchase journey.

This improves system-status visibility, recognition over recall, and alignment with established e-commerce conventions.

![Placeholder for category and product screens](/images/projects/koolen/05-product-discovery.svg)
*Visual placeholder — category to PDP to Add to Cart journey.*

## Improved trust architecture

The experience reinforces three core expectations of online shoppers:

- **Secure shopping:** a safe and private experience
- **Customer service:** a clear way to get help
- **Fast shipping:** a concrete delivery proposition

Return and exchange information also became more task-oriented, including eligibility, time limits, refund information, customer responsibilities, contact details, and submission steps.

## Before and after

| Original experience | Redesigned experience |
| --- | --- |
| Promotion-heavy homepage | Structured commerce architecture |
| Shallow category visibility | Deep hierarchical category navigation |
| Seasonal offers communicated mainly through banners | Dedicated discounts and campaign destinations |
| Repetitive discovery patterns | Clear separation between categories, campaigns, and products |
| Inconsistent merchandising structures | More recognizable e-commerce patterns |
| Limited product context | Detailed product information and specifications |
| Availability was not consistently prominent | Explicit Add to Cart and Out of Stock states |
| Generic trust messaging near the page end | Dedicated security, support, and shipping propositions |
| Information depended heavily on scrolling | Key information accessible through navigation |

## What the redesign solved

### Product taxonomy

Customers gained a scalable model for navigating the appliance catalogue instead of relying on whichever products appeared on the homepage.

### Promotional discoverability

Dedicated discounts and seasonal campaign destinations made commercial activity easier to locate.

### Product-state communication

Available and unavailable products expose their states directly.

### Product evaluation

Product pages provide stronger specification, feature, and purchase context.

### Support

Returns and exchanges offer task-oriented instructions instead of relying only on direct support contact.

## Post-launch review: remaining UX debt

The live experience still presents opportunities for improvement. A case study should acknowledge these rather than imply that every usability issue disappeared after launch.

### Contextual relevance of reviews

Some category pages surface general store reviews—or reviews discussing another product type—rather than feedback relevant to the products being browsed.

**Recommendation:** separate store reviews from category and product reviews, and place each where it supports the relevant purchasing decision.

**Severity:** Medium

### Product-data consistency

Technical attributes such as wattage can appear differently between a product title, description, and specification list. For an appliance purchase, that inconsistency can materially reduce confidence.

**Recommendation:** establish a structured source of truth connecting each SKU to product cards, detail pages, filters, and comparisons.

**Severity:** High

### Localization quality

Unresolved template strings can make an otherwise Arabic storefront feel unfinished.

**Recommendation:** add a localization QA checklist covering untranslated keys, Arabic grammar, terminology, numeral conventions, RTL alignment, and mixed-language states.

**Severity:** Medium

![Placeholder for the post-launch review](/images/projects/koolen/06-live-review.svg)
*Visual placeholder — remaining UX debt and supporting evidence.*

## Outcome

The redesign transformed Koolen from a promotion-driven product catalogue into a more structured e-commerce ecosystem. Stronger taxonomy, campaign discoverability, product information, and transactional states reduce the amount of information customers must interpret before reaching a product decision.

A comparative review of the current experience suggests that several original heuristic problems were addressed, particularly navigation, product recognition, and system-status communication. It also uncovered remaining opportunities around contextual reviews, localization, and product-data consistency.

Because confirmed conversion or task-success analytics were not available, the case study avoids invented quantitative results.

## Metrics to track next

### Product discovery

- Category-to-product click-through rate
- Search usage and search exit rate
- Products viewed per session

### Commerce

- Product page to Add-to-Cart rate
- Add-to-Cart to checkout rate
- Checkout completion
- Revenue per session

### Navigation

- Mega-menu usage
- Category navigation success
- Homepage scroll depth
- Time to first product page

### Quality

- Zero-result searches
- Out-of-stock product-page exits
- Product-specification support tickets
- Return-reason distribution

## Learning

> Good e-commerce UX is not about showing more products. It is about reducing the number of decisions customers must make before finding the right one.

[Visit the current Koolen store](https://koolen.com.sa/)
