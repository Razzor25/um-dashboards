"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navItems = [
  { label: "Home", href: "/", matchPath: "/", icon: HomeIcon },
  {
    label: "UM TAT Compliance",
    href: "/dashboards/um-tat-compliance",
    matchPath: "/dashboards/um-tat-compliance",
    icon: ClockCheckIcon,
  },
  {
    label: "UM Inpatient Census",
    href: "/dashboards/um-inpatient-census",
    matchPath: "/dashboards/um-inpatient-census",
    icon: HospitalIcon,
  },
  {
    label: "Curo Database Changes",
    href: "/dashboards/curo-database-changes",
    matchPath: "/dashboards/curo-database-changes",
    icon: DatabaseIcon,
  },
  {
    label: "UM Oncology Auth Status",
    href: "/dashboards/um-oncology-auth-status",
    matchPath: "/dashboards/um-oncology-auth-status",
    icon: ShieldIcon,
  },
  { label: "UM Daily Report Stats", href: "/", matchPath: null, icon: ReportIcon },
  { label: "Operations", href: "/", matchPath: null, icon: GridIcon },
  { label: "Financial", href: "/", matchPath: null, icon: ChartIcon },
];

export function LeftNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-16 shrink-0 border-r border-slate-200 bg-slate-50/70 lg:block">
      <div className="sticky top-16 flex items-center justify-center px-1.5 py-4">
        <nav className="flex flex-col items-center gap-2">
          {navItems.map((item) => {
            const isActive = item.matchPath === null ? false : pathname === item.matchPath;
            const Icon = item.icon;

            return (
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  aria-label={item.label}
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl border transition-colors ${
                    isActive
                      ? "border-slate-400 bg-transparent text-slate-900"
                      : "border-transparent bg-transparent text-slate-600 hover:border-slate-200 hover:bg-white hover:text-slate-900"
                  }`}
                >
                  <Icon />
                </Link>
                <span className="pointer-events-none absolute left-full top-1/2 z-10 ml-3 -translate-y-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                  {item.label}
                </span>
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M3 10.5L12 3l9 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.25 9.75V21h13.5V9.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HospitalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M6 21V5.25A2.25 2.25 0 018.25 3h7.5A2.25 2.25 0 0118 5.25V21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 7.5v6M9 10.5h6M8.25 21v-4.5h7.5V21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClockCheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7.75v4.25l3 1.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.75 16.25l1.5 1.5 3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M12 3l7.5 3v5.25c0 4.5-3.15 8.625-7.5 9.75-4.35-1.125-7.5-5.25-7.5-9.75V6L12 3z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.75 12l1.5 1.5 3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ReportIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M7.5 3.75h6l3 3V20.25A.75.75 0 0115.75 21h-8.5a.75.75 0 01-.75-.75v-15a1.5 1.5 0 011.5-1.5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.5 3.75v3h3M9 12h6M9 15h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M4.5 4.5h6v6h-6zM13.5 4.5h6v6h-6zM4.5 13.5h6v6h-6zM13.5 13.5h6v6h-6z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M4.5 19.5h15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7.5 16.5V12M12 16.5V7.5M16.5 16.5V10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <ellipse cx="12" cy="6.75" rx="7.5" ry="2.75" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4.5 6.75v9.5c0 1.52 3.36 2.75 7.5 2.75s7.5-1.23 7.5-2.75v-9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.5 11.5c0 1.52 3.36 2.75 7.5 2.75s7.5-1.23 7.5-2.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}