import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "./animate-ui/components/headless/accordion";

const questions = [
  {
    question: "How long does a typical project take?",
    answer:
      "It depends on the size and scope. On average, the design phase takes around 4–6 weeks, with development taking another 4–6 weeks. Larger or more complex products can take longer depending on the tools, integrations, and scope.",
  },
  {
    question: "What platforms or tools do you use?",
    answer:
      "I choose the platform around the project rather than forcing one stack. Common options include WordPress, Shopify, Salla, Webflow, and custom React builds. My design workflow includes Figma, Adobe Creative Suite, and AI-assisted research and production tools where they genuinely help.",
  },
  {
    question: "Do you work with early-stage startups or only established businesses?",
    answer:
      "Both. I work with early-stage founders who need to turn an idea into a clear first product, as well as established businesses, agencies, and enterprise teams improving complex journeys, platforms, and digital services.",
  },
  {
    question: "Do you offer ongoing support or updates after launch?",
    answer:
      "Yes. Support can include design QA during implementation, refinement after launch, UX improvements, and ongoing updates. The right level of involvement is scoped around what the product needs after it goes live.",
  },
  {
    question: "What’s the process like if we want to work together?",
    answer:
      "We start with a discovery call to understand the problem, users, and constraints. Then I define the scope and priorities, design and build in tight feedback loops, and hand over a working product and the materials needed to keep it moving.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="relative z-10 border-t border-border bg-primary py-20 md:py-32" aria-labelledby="faq-heading">
      <div className="site-container grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--eyebrow-dot)]" aria-hidden="true" />
            <p className="text-sm uppercase tracking-widest text-fg">FAQ</p>
          </div>
          <h2 id="faq-heading" className="max-w-md text-4xl font-bold tracking-tight text-fg md:text-6xl">
            Answers to common client questions.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-fg-secondary md:text-lg">
            Clear expectations before we start make for better work once we do.
          </p>
        </div>

        <Accordion className="divide-y divide-border border-y border-border">
          {questions.map(({ question, answer }) => (
            <AccordionItem key={question} className="py-1">
              <AccordionButton className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left text-xl font-semibold text-fg hover:no-underline !transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] md:py-8 md:text-2xl" showArrow={false}>
                {({ open }) => (
                  <>
                    <span>{question}</span>
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-xl font-light leading-none transition-transform duration-300 ${open ? "rotate-45" : ""}`} aria-hidden="true">+</span>
                  </>
                )}
              </AccordionButton>
              <AccordionPanel className="overflow-hidden" keepRendered>
                <p className="max-w-2xl pb-7 pr-12 text-base leading-relaxed text-fg-secondary md:pb-9 md:text-lg">
                  {answer}
                </p>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export { questions };
