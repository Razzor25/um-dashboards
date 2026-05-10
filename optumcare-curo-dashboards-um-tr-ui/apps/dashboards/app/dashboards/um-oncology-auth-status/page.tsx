"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AuthStatusBarChart } from "@/app/components/AuthStatusBarChart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@uhg-netra-ai/core-react-components/ui/select";

type OncologyDateRangeKey = "last-7-days" | "last-30-days" | "last-90-days" | "year-to-date";

type OncologyChartDataPoint = {
  label: string;
  count: number;
};

type OncologyDetailedInformationRow = {
  authId: string;
  status: string;
  statusReason: string;
  memberName: string;
  createDate: string;
  decisionedDate: string;
  org: string;
  superCommunity: string;
};

type OncologyAuthStatusApiResponse = {
  trendByMonth: OncologyChartDataPoint[];
  trendByMonthStatus: {
    months: string[];
    series: Array<{
      label: string;
      values: number[];
    }>;
  };
  totalAuthsByStatus: OncologyChartDataPoint[];
  detailedInformationRows: OncologyDetailedInformationRow[];
};

const EMPTY_RESPONSE: OncologyAuthStatusApiResponse = {
  trendByMonth: [],
  trendByMonthStatus: {
    months: [],
    series: [],
  },
  totalAuthsByStatus: [],
  detailedInformationRows: [],
};

const DETAILED_INFO_PAGE_SIZE = 100;

export default function UmOncologyAuthStatusPage() {
  const [dateRange, setDateRange] = useState<OncologyDateRangeKey>("last-30-days");
  const [data, setData] = useState<OncologyAuthStatusApiResponse>(EMPTY_RESPONSE);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalRows = data.detailedInformationRows.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / DETAILED_INFO_PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedRows = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * DETAILED_INFO_PAGE_SIZE;
    return data.detailedInformationRows.slice(startIndex, startIndex + DETAILED_INFO_PAGE_SIZE);
  }, [safeCurrentPage, data.detailedInformationRows]);

  useEffect(() => {
    const controller = new AbortController();

    const loadData = async () => {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const response = await fetch(`/api/cgp/oncology-auth-status?dateRange=${encodeURIComponent(dateRange)}`, {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          const body = (await response.json().catch(() => null)) as { error?: string } | null;
          throw new Error(body?.error ?? "Failed to load oncology auth status data");
        }

        const body = (await response.json()) as OncologyAuthStatusApiResponse;
        setData(body);
        setCurrentPage(1);
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }
        const message = error instanceof Error ? error.message : "Unexpected error while loading data";
        setErrorMessage(message);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    void loadData();
    return () => controller.abort();
  }, [dateRange]);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Oncology - Auth Status</h1>
        <p className="mt-1 text-sm text-slate-500">Authorization status dashboard for Oncology.</p>
        <div className="mx-auto mt-4 grid w-full max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <label htmlFor="date-range" className="mb-1 block text-sm font-medium text-slate-700">
              Referred Date
            </label>
            <Select value={dateRange} onValueChange={(value) => setDateRange(value as OncologyDateRangeKey)}>
              <SelectTrigger id="date-range" className="w-full rounded-lg border-slate-300 bg-white text-sm text-slate-700 focus:border-cyan-400">
                <SelectValue placeholder="Referred Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                <SelectItem value="last-90-days">Last 90 Days</SelectItem>
                <SelectItem value="year-to-date">Year to Date</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="request-type" className="mb-1 block text-sm font-medium text-slate-700">
              Request Type
            </label>
            <Select defaultValue="all">
              <SelectTrigger id="request-type" className="w-full rounded-lg border-slate-300 bg-white text-sm text-slate-700 focus:border-cyan-400">
                <SelectValue placeholder="Request Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="routine">Routine</SelectItem>
                <SelectItem value="expedited">Expedited</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="channel-type" className="mb-1 block text-sm font-medium text-slate-700">
              Request Channel
            </label>
            <Select defaultValue="all">
              <SelectTrigger id="channel-type" className="w-full rounded-lg border-slate-300 bg-white text-sm text-slate-700 focus:border-cyan-400">
                <SelectValue placeholder="Request Channel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="fax">Fax</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
                <SelectItem value="portal">Portal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="super-community" className="mb-1 block text-sm font-medium text-slate-700">
              Super Community
            </label>
            <Select defaultValue="all">
              <SelectTrigger id="super-community" className="w-full rounded-lg border-slate-300 bg-white text-sm text-slate-700 focus:border-cyan-400">
                <SelectValue placeholder="Super Community" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="community-a">Community A</SelectItem>
                <SelectItem value="community-b">Community B</SelectItem>
                <SelectItem value="community-c">Community C</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="org" className="mb-1 block text-sm font-medium text-slate-700">
              Org
            </label>
            <Select defaultValue="all">
              <SelectTrigger id="org" className="w-full rounded-lg border-slate-300 bg-white text-sm text-slate-700 focus:border-cyan-400">
                <SelectValue placeholder="Org" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="100">Midwest</SelectItem>
                <SelectItem value="120">California</SelectItem>
                <SelectItem value="390">WellMed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="mx-auto w-full max-w-5xl rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {errorMessage}
        </div>
      )}

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 lg:grid-cols-2">
        <AuthStatusBarChart
          title="Trend by Month"
          data={data.trendByMonth}
          xAxisLabels={data.trendByMonthStatus.months}
          series={data.trendByMonthStatus.series}
          isLoading={isLoading}
        />
        <AuthStatusBarChart title="Total Auths by Status" data={data.totalAuthsByStatus} isLoading={isLoading} />
      </div>
      <div className="mx-auto w-full max-w-7xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-start">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-600">
            DETAILED INFORMATION
          </h2>
          {!isLoading && totalRows > 0 && (
            <div className="flex flex-col items-start gap-3 text-sm text-slate-600 sm:items-end">
              <p>
                Showing {(safeCurrentPage - 1) * DETAILED_INFO_PAGE_SIZE + 1}-
                {Math.min(safeCurrentPage * DETAILED_INFO_PAGE_SIZE, totalRows)} of {totalRows}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentPage((prev) => Math.max(1, Math.min(prev, totalPages) - 1))}
                  disabled={safeCurrentPage === 1}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-slate-500">
                  Page {safeCurrentPage} of {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, Math.min(prev, totalPages) + 1))}
                  disabled={safeCurrentPage === totalPages}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="mt-4 max-h-[32rem] overflow-auto rounded-xl border border-slate-200">
          <table className="min-w-[1200px] divide-y divide-slate-200 text-sm whitespace-nowrap">
            <thead className="sticky top-0 z-10 bg-slate-50 text-left text-xs uppercase tracking-[0.08em] text-slate-600">
              <tr>
                <th className="px-3 py-2">Auth ID</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Status Reason</th>
                <th className="px-3 py-2">Member Name</th>
                <th className="px-3 py-2">Create Date</th>
                <th className="px-3 py-2">Decisioned Date</th>
                <th className="px-3 py-2">Org</th>
                <th className="px-3 py-2">Super Community</th>
              </tr>
            </thead>
            <tbody className="bg-white text-slate-700">
              {isLoading && (
                <tr>
                  <td className="px-3 py-3 text-slate-500" colSpan={8}>
                    Loading detailed information...
                  </td>
                </tr>
              )}
              {!isLoading && data.detailedInformationRows.length === 0 && (
                <tr>
                  <td className="px-3 py-3 text-slate-500" colSpan={8}>
                    No records found for the selected filters.
                  </td>
                </tr>
              )}
              {!isLoading &&
                paginatedRows.map((row) => (
                  <tr key={`${row.authId}-${row.createDate}`} className="border-t border-slate-100">
                    <td className="px-3 py-3">{row.authId}</td>
                    <td className="px-3 py-3">{row.status}</td>
                    <td className="px-3 py-3">{row.statusReason}</td>
                    <td className="px-3 py-3">{row.memberName}</td>
                    <td className="px-3 py-3">{row.createDate}</td>
                    <td className="px-3 py-3">{row.decisionedDate}</td>
                    <td className="px-3 py-3">{row.org}</td>
                    <td className="px-3 py-3">{row.superCommunity}</td>
                  </tr>
                ))}
            </tbody>
          </table>

          {!isLoading && totalRows > 0 && (
            <div className="sticky bottom-0 z-10 flex items-center justify-end gap-2 border-t border-slate-200 bg-white px-3 py-2">
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(1, Math.min(prev, totalPages) - 1))}
                disabled={safeCurrentPage === 1}
                className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm text-slate-500">
                Page {safeCurrentPage} of {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, Math.min(prev, totalPages) + 1))}
                disabled={safeCurrentPage === totalPages}
                className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
