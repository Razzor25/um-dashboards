import Link from "next/link";

const dashboards = [
  "UM TAT Compliance",
  "UM Oncology Auth Status",
  "UM Inpatient Census",
  "Curo Database Change Log",
  "UM Letters Filfilment - LMU 2.0",
  "UM Letters Filfilment - LMU 1.0",
];

const featuredDashboards = new Set([
  "UM TAT Compliance",
  "UM Oncology Auth Status",
  "UM Inpatient Census",
  "Curo Database Change Log",
  "UM Daily Report Stats",
]);

const dashboardHrefByName: Record<string, string> = {
  "UM TAT Compliance": "/dashboards/um-tat-compliance",
  "UM Oncology Auth Status": "/dashboards/um-oncology-auth-status",
  "UM Inpatient Census": "/dashboards/um-inpatient-census",
  "Curo Database Change Log": "/dashboards/curo-database-changes",
};

function renderOpenAction(dashboard: string) {
  const href = dashboardHrefByName[dashboard];

  if (href) {
    return (
      <Link
        href={href}
        className="rounded-lg border border-cyan-300 bg-cyan-50 px-3 py-1.5 text-sm font-medium text-cyan-800 transition-colors hover:border-cyan-400 hover:bg-cyan-100"
      >
        Open
      </Link>
    );
  }

  return (
    <button
      type="button"
      className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
    >
      Open
    </button>
  );
}

export default function Home() {
  return (
    <main className="app-width-left py-10 sm:py-14">
        <section className="rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-50 to-cyan-50 px-6 py-8 shadow-sm sm:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Welcome to Dashboards
          </h2>
          <p className="mt-3 max-w-3xl text-base text-slate-600 sm:text-lg">
            Explore your available dashboards below. The catalog is structured for fast scanning across utilization management, operations, clinical, and financial views.
          </p>
          <div className="mt-6 inline-flex rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700">
            {dashboards.length} dashboards available
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {dashboards.map((dashboard) => {
            const isFeatured = featuredDashboards.has(dashboard);

            return (
              <article
                key={dashboard}
                className={`group rounded-2xl border p-5 transition-all duration-200 ${
                  isFeatured
                    ? "border-cyan-300 bg-cyan-50/60 hover:border-cyan-500"
                    : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  {isFeatured ? "featured" : "dashboard"}
                </p>
                <h3 className="mt-3 text-lg font-semibold leading-snug text-slate-900">
                  {dashboard}
                </h3>
                {dashboard === "UM TAT Compliance" && (
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Tracks turnaround-time compliance with category chips and operational filters for business review.
                  </p>
                )}
                {dashboard === "UM Inpatient Census" && (
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Provides a live look at inpatient cases, allowing for efficient caseload assignment, better coordination, and facilitates the decision-making process.
                  </p>
                )}
                {dashboard === "Curo Database Change Log" && (
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Central log view for tracking database-level changes and release-related updates.
                  </p>
                )}
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm text-slate-500">Available</span>
                  {renderOpenAction(dashboard)}
                </div>
              </article>
            );
          })}
        </section>

        <div className="mt-8 text-sm text-slate-500">
          Need additional dashboards? Add new entries in app/page.tsx.
        </div>
      </main>
  );
}
