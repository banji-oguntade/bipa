import Link from "next/link";
import { History, LayoutDashboard, MessagesSquare } from "lucide-react";
import React from "react";

const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/practice",
    label: "Practice",
    icon: MessagesSquare,
  },
  {
    href: "/aboutus",
    label: "About Us",
    icon: LayoutDashboard,
  },

] as const;

type AppHeaderProps = {
  pathname: string;
};

export function AppHeader({ pathname }: AppHeaderProps) {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex min-h-14 max-w-[1080px] flex-wrap items-center justify-between gap-3 px-4 py-2 sm:px-8">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-display text-base font-bold"
        >
          <span
            className="flex size-[22px] items-center justify-center rounded-md bg-primary"
            aria-hidden="true"
          />
          PrepAI · Behavioral
        </Link>

        <nav className="flex items-center gap-1" aria-label="Main navigation">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive =
              pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary-wash text-primary-ink"
                    : "text-ink-soft hover:bg-surface-sunken hover:text-ink",
                ].join(" ")}
              >
                <Icon size={15} aria-hidden="true" />
                {label}
              </Link>
            );
          })}

          <button
            type="button"
            disabled
            title="Coming soon"
            className="flex h-9 cursor-not-allowed items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-ink-faint"
          >
            <History size={15} aria-hidden="true" />
            History
          </button>
        </nav>
      </div>
    </header>
  );
}
