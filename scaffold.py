import os

# Create directories
os.makedirs('src/content/projects', exist_ok=True)
os.makedirs('src/components', exist_ok=True)

# 1. config.ts
config_content = '''import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    tagline: z.string(),
    description: z.string(),
    cover: image(),
    type: z.string(),
    services: z.array(z.string()),
    tools: z.array(z.string()),
    year: z.string(),
    dateRange: z.string(),
    role: z.string(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

export const collections = {
  projects,
};
'''
with open('src/content/config.ts', 'w') as f:
    f.write(config_content)

# 2. Markdown files
dummy_md = '''---
title: "{title}"
tagline: "a connected nutrition platform"
description: "Redesigned an unusable mobile app and designed a new practitioner dashboard from scratch."
cover: "../../assets/youssef-logo.svg"
type: "Web App"
services: ["Product Design", "Mobile App", "User Experience"]
tools: ["Figma", "Astro"]
year: "2025"
dateRange: "2025 — 2026"
role: "Product Designer"
featured: true
order: {order}
---
'''
for i, title in enumerate(["NutriFlow", "Project Alpha", "Project Beta", "Project Gamma"]):
    with open(f'src/content/projects/project{i+1}.md', 'w') as f:
        f.write(dummy_md.format(title=title, order=i+1))

# 3. Projects.astro
projects_astro = '''---
import { getCollection } from "astro:content";
import { Image } from "astro:assets";

const allProjects = await getCollection("projects");
const featured = allProjects
  .filter((p) => p.data.featured)
  .sort((a, b) => a.data.order - b.data.order);
const total = featured.length;
---

<section id="work" class="relative py-24 md:py-32 px-6">
  <div class="max-w-7xl mx-auto">

    {/* Section heading */}
    <h2 class="text-5xl md:text-7xl font-semibold tracking-tight mb-16 md:mb-24">
      <span class="text-[var(--text-primary)]">A Look at </span>
      <span class="text-[var(--text-secondary)]">My Work.</span>
    </h2>

    {/* 2-column card grid */}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-20">
      {featured.map((project, i) => (
        <a href={/work/} class="group block">

          {/* Cover */}
          <div class="overflow-hidden rounded-3xl mb-6 bg-slate-100">
            <Image
              src={project.data.cover}
              alt={project.data.title}
              class="w-full aspect-[4/3] object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </div>

          {/* Number + date range */}
          <div class="flex items-center justify-between text-xs md:text-sm uppercase tracking-widest text-[var(--text-secondary)] mb-5">
            <span class="tabular-nums">{String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
            <span>{project.data.dateRange}</span>
          </div>

          {/* Title + tagline */}
          <h3 class="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight mb-5">
            <span class="text-[var(--text-primary)]">{project.data.title} — </span>
            <span class="text-[var(--text-secondary)]">{project.data.tagline}.</span>
          </h3>

          {/* Description */}
          <p class="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed mb-6 max-w-xl">
            {project.data.description}
          </p>

          {/* Tags — first highlighted */}
          <div class="flex flex-wrap gap-2 mb-8">
            {project.data.services.map((service, si) => (
              <span class={px-4 py-1.5 rounded-full border text-xs uppercase tracking-wide whitespace-nowrap transition-colors }>
                {service}
              </span>
            ))}
          </div>

          {/* Divider + role */}
          <div class="border-t border-[var(--border-default,rgba(255,255,255,0.1))] pt-5">
            <p class="text-xs uppercase tracking-widest text-[var(--text-secondary)]">
              Role — {project.data.role}
            </p>
          </div>

        </a>
      ))}
    </div>

    {/* View all link */}
    <div class="mt-20 text-center">
      <a href="/work" class="inline-block text-base md:text-lg text-[var(--text-secondary)] hover:text-[var(--color-blue-500)] transition-colors">
        View all work ?
      </a>
    </div>

  </div>
</section>
'''
with open('src/components/Projects.astro', 'w') as f:
    f.write(projects_astro)
