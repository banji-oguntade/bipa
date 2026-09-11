"use client";

import { usePathname } from "next/navigation";
import { AppHeader } from "./app-header";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-bg text-ink">
      <AppHeader pathname={pathname} />
      {children}
    </div>
  );
}
