import { useEffect, useRef, useState } from "react";
import { testimonials } from "../data/testimonials";

const SLIDE_DURATION = 6000;
const CALENDLY_EVENT_URL = "https://calendly.com/YOUR-SLUG/intro";

const sourceOptions = [
  "Referral",
  "LinkedIn",
  "Google",
  "Portfolio",
  "Upwork",
  "Other",
];

function Avatar({ testimonial }) {
  const [failed, setFailed] = useState(false);
  const isLogo = testimonial.avatar.endsWith(".svg");
  const initials = testimonial.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-surface text-sm font-semibold text-fg">
      {!failed ? (
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className={`h-full w-full ${isLogo ? "object-contain p-2.5" : "object-cover"}`}
          onError={() => setFailed(true)}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}

export default function Contact() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    help: "",
    source: "",
  });
  const latestTickRef = useRef(Date.now());

  const activeTestimonial = testimonials[activeIndex];

  useEffect(() => {
    const cssHref = "https://assets.calendly.com/assets/external/widget.css";
    const scriptSrc = "https://assets.calendly.com/assets/external/widget.js";

    if (!document.querySelector(`link[href="${cssHref}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = cssHref;
      document.head.appendChild(link);
    }

    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;
      document.body.appendChild(script);
    }

    if (window.ScrollTrigger?.refresh) {
      window.ScrollTrigger.refresh();
    }
  }, []);

  useEffect(() => {
    latestTickRef.current = Date.now();

    const timer = window.setInterval(() => {
      const now = Date.now();
      const delta = now - latestTickRef.current;
      latestTickRef.current = now;

      if (isPaused) return;

      setElapsed((currentElapsed) => {
        const nextElapsed = currentElapsed + delta;

        if (nextElapsed >= SLIDE_DURATION) {
          setActiveIndex((currentIndex) => (currentIndex + 1) % testimonials.length);
          return 0;
        }

        return nextElapsed;
      });
    }, 100);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const submitForm = (event) => {
    event.preventDefault();

    const url =
      `${CALENDLY_EVENT_URL}` +
      `?name=${encodeURIComponent(form.name)}` +
      `&email=${encodeURIComponent(form.email)}` +
      `&a1=${encodeURIComponent(form.company)}` +
      `&a2=${encodeURIComponent(form.help)}` +
      `&a3=${encodeURIComponent(form.source)}`;

    if (window.Calendly?.initPopupWidget) {
      window.Calendly.initPopupWidget({ url });
      return;
    }

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const fieldClassName =
    "w-full rounded-2xl border border-border bg-surface px-4 py-3.5 text-base text-fg outline-none transition-colors duration-200 placeholder:text-fg-muted focus:border-[var(--color-blue-500)]";

  return (
    <section id="contact" className="relative bg-primary px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-center gap-3">
          <span
            className="h-2.5 w-2.5 rounded-full bg-[var(--color-blue-500)]"
            aria-hidden="true"
          />
          <h3 className="text-sm uppercase tracking-widest text-fg md:text-base">
            Contact
          </h3>
        </div>

        <div className="grid overflow-hidden rounded-3xl border border-border bg-card md:grid-cols-2">
          <div
            className="relative flex min-h-[520px] flex-col border-b border-border p-8 md:border-b-0 md:border-r md:p-10 lg:p-12"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <span
              className="mb-8 block text-7xl font-semibold leading-none text-fg opacity-15"
              aria-hidden="true"
            >
              “
            </span>

            <div className="relative flex flex-1 flex-col">
              <blockquote
                key={activeTestimonial.quote}
                className="text-xl font-medium leading-relaxed text-fg md:text-2xl"
              >
                {activeTestimonial.quote}
              </blockquote>

              <div className="mt-auto pt-12">
                <div className="flex items-center gap-4">
                  <Avatar testimonial={activeTestimonial} />
                  <div>
                    <p className="font-semibold text-fg">{activeTestimonial.name}</p>
                    <p className="mt-1 text-sm text-fg-secondary">
                      {activeTestimonial.role}
                    </p>
                  </div>
                </div>

                <div className="mt-10 grid grid-cols-5 gap-2">
                  {testimonials.map((testimonial, index) => {
                    const fill =
                      index < activeIndex
                        ? 100
                        : index === activeIndex
                          ? Math.min((elapsed / SLIDE_DURATION) * 100, 100)
                          : 0;

                    return (
                      <button
                        key={testimonial.name}
                        type="button"
                        className="h-1.5 overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--text-primary)_14%,transparent)]"
                        onClick={() => {
                          setActiveIndex(index);
                          setElapsed(0);
                        }}
                        aria-label={`Show testimonial from ${testimonial.name}`}
                      >
                        <span
                          className="block h-full rounded-full bg-[var(--color-blue-500)]"
                          style={{ width: `${fill}%` }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-10 lg:p-12">
            <h2 className="text-3xl font-bold tracking-wide text-fg md:text-5xl">
              Book a call
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-fg-secondary">
              Tell me what you’re building, and I’ll help you figure out the
              clearest next step.
            </p>

            <form className="mt-10 space-y-4" onSubmit={submitForm}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="sr-only">Full name</span>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={updateField("name")}
                    placeholder="Full name"
                    className={fieldClassName}
                  />
                </label>
                <label className="block">
                  <span className="sr-only">Your company</span>
                  <input
                    type="text"
                    value={form.company}
                    onChange={updateField("company")}
                    placeholder="Your company"
                    className={fieldClassName}
                  />
                </label>
              </div>

              <label className="block">
                <span className="sr-only">Email</span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={updateField("email")}
                  placeholder="Email"
                  className={fieldClassName}
                />
              </label>

              <label className="block">
                <span className="sr-only">How can I help?</span>
                <textarea
                  required
                  value={form.help}
                  onChange={updateField("help")}
                  placeholder="Tell me about your project..."
                  rows={5}
                  className={`${fieldClassName} resize-none`}
                />
              </label>

              <label className="block">
                <span className="sr-only">How did you hear about me?</span>
                <select
                  value={form.source}
                  onChange={updateField("source")}
                  className={fieldClassName}
                >
                  <option value="">How did you hear about me?</option>
                  {sourceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--color-blue-500)] px-5 py-4 font-semibold text-accent-fg transition-colors duration-300 hover:bg-[var(--color-blue-600)]"
              >
                Proceed with call booking <span aria-hidden="true">→</span>
              </button>

              <p className="text-sm leading-relaxed text-fg-muted">
                By clicking, you agree to be contacted about your project.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
