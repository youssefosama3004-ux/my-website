import { Fragment, createContext, useContext } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";

const ItemContext = createContext(false);

export function Accordion({ className = "", children }) {
  return <div className={className}>{children}</div>;
}

export function AccordionItem({ className = "", children }) {
  return (
    <Disclosure as="div" className={className}>
      {({ open }) => (
        <ItemContext.Provider value={open}>{children}</ItemContext.Provider>
      )}
    </Disclosure>
  );
}

export function AccordionButton({ className = "", children, showArrow = true }) {
  const open = useContext(ItemContext);

  return (
    <DisclosureButton className={className}>
      {children}
      {showArrow && (
        <ChevronDown
          aria-hidden="true"
          className={`h-5 w-5 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      )}
    </DisclosureButton>
  );
}

export function AccordionPanel({ className = "", children }) {
  const open = useContext(ItemContext);

  return (
    <AnimatePresence initial={false}>
      {open && (
        <DisclosurePanel static as={Fragment}>
          <motion.div
            className={className}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 22 }}
          >
            {children}
          </motion.div>
        </DisclosurePanel>
      )}
    </AnimatePresence>
  );
}

export function AccordionPlusIcon({ className = "" }) {
  const open = useContext(ItemContext);

  return (
    <span
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-xl font-light leading-none transition-transform duration-300 ${open ? "rotate-45" : ""} ${className}`}
      aria-hidden="true"
    >
      +
    </span>
  );
}
