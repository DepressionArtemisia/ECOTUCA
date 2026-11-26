"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import styles from "./navigation-menu.module.css";

type NavigationGroup = {
  label?: string;
  items: { label: string; href: string; icon: ReactNode }[];
};

export function NavigationMenu({ groups, label, title, activeHref, footer }: {
  groups: NavigationGroup[];
  label: string;
  title: string;
  activeHref?: string;
  footer?: ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const id = useId();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (dialog.current?.open) dialog.current.close();
  }, [pathname]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    function syncViewport() {
      if (desktop.matches && dialog.current?.open) dialog.current.close();
    }
    desktop.addEventListener("change", syncViewport);
    return () => desktop.removeEventListener("change", syncViewport);
  }, []);

  function openMenu() {
    const panel = dialog.current;
    if (!panel || panel.open) return;
    trigger.current?.focus({ preventScroll: true });
    panel.showModal();
    closeButton.current?.focus({ preventScroll: true });
    setIsOpen(true);
  }

  function closeMenu() {
    const panel = dialog.current;
    if (!panel?.open) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      panel.close();
    } else {
      setIsClosing(true);
    }
  }

  return (
    <div className="lg:hidden">
      <button
        ref={trigger}
        type="button"
        className={cn("icon-control", styles.trigger)}
        aria-label={label}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={id}
        onClick={openMenu}
      >
        <Menu size={21} strokeWidth={1.85} aria-hidden="true" />
      </button>
      <dialog
        ref={dialog}
        id={id}
        aria-labelledby={`${id}-title`}
        className={styles.sheet}
        data-closing={isClosing || undefined}
        onCancel={(event) => { event.preventDefault(); closeMenu(); }}
        onClick={(event) => {
          const target = event.target;
          if (target === event.currentTarget ||
              (target instanceof Element && target.closest("a[href]") && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey)) {
            closeMenu();
          }
        }}
        onAnimationEnd={(event) => {
          if (event.target === event.currentTarget && isClosing) event.currentTarget.close();
        }}
        onClose={() => { setIsOpen(false); setIsClosing(false); }}
      >
        <div className={styles.surface}>
          <header className={styles.header}>
            <h2 id={`${id}-title`}>{title}</h2>
            <button ref={closeButton} type="button" className={cn("icon-control", styles.close)} aria-label="Fechar menu" onClick={closeMenu}>
              <X size={22} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </header>

          <nav className={styles.navigation} aria-label={label}>
            {groups.map(({ label: groupLabel, items }) => (
              <div key={groupLabel ?? "links"} className={styles.group}>
                {groupLabel && <h3 className={styles.groupLabel}>{groupLabel}</h3>}
                <ul className={styles.links}>
                  {items.map(({ href, label: itemLabel, icon }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className={styles.link}
                        aria-current={(activeHref ?? pathname) === href ? "page" : undefined}
                      >
                        <span className={styles.itemIcon} aria-hidden="true">{icon}</span>
                        <span className="min-w-0">{itemLabel}</span>
                        <ChevronRight className={styles.chevron} size={17} strokeWidth={1.75} aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {footer && <footer className={styles.footer}>{footer}</footer>}
        </div>
      </dialog>
    </div>
  );
}
