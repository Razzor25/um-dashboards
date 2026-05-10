"use client";

import { Input } from "@uhg-netra-ai/core-react-components/ui/input";
import { Label } from "@uhg-netra-ai/core-react-components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@uhg-netra-ai/core-react-components/ui/select";
import React, { useEffect, useMemo, useState } from "react";

type DatabaseChangeLogResponse = {
  columns: string[];
  rows: Array<Record<string, string>>;
  orderField: string | null;
};

type FilterKey = "team_name" | "release_number" | "db_domain_name" | "change_type";
type FilterSelectionState = Partial<Record<FilterKey, Set<string>>>;

const MULTISELECT_FILTERS: Array<{ key: FilterKey; label: string }> = [
  { key: "team_name", label: "Team Name" },
  { key: "release_number", label: "Release Number" },
  { key: "db_domain_name", label: "DB Domain Name" },
  { key: "change_type", label: "Change Type" },
];

const PAGE_SIZE_OPTIONS = [10, 50, 100, 200, 500];
const DEFAULT_PAGE_SIZE = 10;
const WRAP_COLUMNS = new Set(["change_description", "sql_change", "additional_notes"]);
const COLUMN_LABELS: Record<string, string> = {
  change_id: "Change ID",
  team_name: "Team Name",
  change_type: "Change Type",
  change_type_other_dec: "Change Type Other Desc",
  change_description: "Change Description",
  sql_change: "SQL Change",
  release_number: "Release Number",
  expected_stage_date: "Expected Stage Date",
  expected_prod_date: "Expected Prod Date",
  additional_notes: "Additional Notes",
  create_dttm: "Create Date",
  change_dttm: "Change Date",
  db_domain_name: "DB Domain Name",
};

function normalizeValue(value: string | undefined): string {
  if (!value || value.trim().length === 0) {
    return "-";
  }
  return value;
}

export default function CuroDatabaseChangesPage() {
  const [data, setData] = useState<DatabaseChangeLogResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [openFilter, setOpenFilter] = useState<FilterKey | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<FilterSelectionState>({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [sortKey, setSortKey] = useState<string>("create_dttm");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [isExportingCsv, setIsExportingCsv] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(new Set());
  const [showColumnModal, setShowColumnModal] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const response = await fetch("/api/other/database-changes", { cache: "no-store" });
        if (!response.ok) {
          const body = (await response.json().catch(() => null)) as { error?: string } | null;
          throw new Error(body?.error ?? "Failed to load database change log");
        }

        const payload = (await response.json()) as DatabaseChangeLogResponse;
        setData(payload);
        setVisibleColumns(new Set(payload.columns));
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : "Failed to load database change log");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const columns = data?.columns ?? [];
  const rows = data?.rows ?? [];
  const hasNoColumns = !errorMessage && !isLoading && columns.length === 0;
  const hasColumns = !errorMessage && columns.length > 0;

  const filterOptions = useMemo(() => {
    const options: Record<FilterKey, string[]> = {
      team_name: [],
      release_number: [],
      db_domain_name: [],
      change_type: [],
    };

    for (const { key } of MULTISELECT_FILTERS) {
      const unique = new Set<string>();
      for (const row of rows) {
        unique.add(normalizeValue(row[key]));
      }
      options[key] = Array.from(unique).sort((a, b) => a.localeCompare(b));
    }

    return options;
  }, [rows]);

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      for (const { key } of MULTISELECT_FILTERS) {
        const selectedValues = selectedFilters[key];
        if (!selectedValues || selectedValues.size === 0) {
          continue;
        }

        const rowValue = normalizeValue(row[key]);
        if (!selectedValues.has(rowValue)) {
          return false;
        }
      }
      return true;
    });
  }, [rows, selectedFilters]);

  const sortedRows = useMemo(() => {
    return [...filteredRows].sort((left, right) => {
      const leftValue = normalizeValue(left[sortKey]);
      const rightValue = normalizeValue(right[sortKey]);

      const leftNumber = Number(leftValue);
      const rightNumber = Number(rightValue);
      const bothNumeric =
        leftValue !== "-" &&
        rightValue !== "-" &&
        Number.isFinite(leftNumber) &&
        Number.isFinite(rightNumber);

      if (bothNumeric) {
        return sortDirection === "asc" ? leftNumber - rightNumber : rightNumber - leftNumber;
      }

      const comparison = leftValue.localeCompare(rightValue, undefined, {
        numeric: true,
        sensitivity: "base",
      });

      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [filteredRows, sortDirection, sortKey]);

  const totalCount = sortedRows.length;
  const pageCount = Math.max(1, Math.ceil(totalCount / pageSize));
  const currentPage = Math.min(page, pageCount);

  useEffect(() => {
    if (page !== currentPage) {
      setPage(currentPage);
    }
  }, [page, currentPage]);

  const pagedRows = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedRows.slice(startIndex, startIndex + pageSize);
  }, [sortedRows, currentPage, pageSize]);

  function handleSort(column: string) {
    setPage(1);

    if (sortKey === column) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }

    setSortKey(column);
    setSortDirection("asc");
  }

  function getSortIndicator(column: string): string {
    if (sortKey !== column) {
      return "↕";
    }

    return sortDirection === "asc" ? "▲" : "▼";
  }

  function toggleFilterValue(key: FilterKey, value: string) {
    setPage(1);
    setSelectedFilters((current) => {
      const next = { ...current };
      const set = new Set(next[key] ?? []);
      if (set.has(value)) {
        set.delete(value);
      } else {
        set.add(value);
      }
      next[key] = set;
      return next;
    });
  }

  function clearFilter(key: FilterKey) {
    setPage(1);
    setSelectedFilters((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function clearAllFilters() {
    setPage(1);
    setSelectedFilters({});
  }

  function toggleColumn(columnKey: string) {
    setVisibleColumns((current) => {
      const next = new Set(current);
      if (next.has(columnKey)) {
        next.delete(columnKey);
      } else {
        next.add(columnKey);
      }
      return next;
    });
  }

  function showAllColumns() {
    setVisibleColumns(new Set(columns));
  }

  function hideAllColumns() {
    setVisibleColumns(new Set());
  }

  const displayedColumns = useMemo(
    () => columns.filter((column) => visibleColumns.has(column)),
    [columns, visibleColumns],
  );

  const hiddenColumns = useMemo(
    () => columns.filter((column) => !visibleColumns.has(column)),
    [columns, visibleColumns],
  );

  function handleExportCsv() {
    if (isExportingCsv) {
      return;
    }

    setIsExportingCsv(true);

    const params = new URLSearchParams({
      sortKey,
      sortDirection,
    });

    const filtersForServer: Record<string, string[]> = {};
    for (const [key, set] of Object.entries(selectedFilters)) {
      if (set && set.size > 0) {
        filtersForServer[key] = Array.from(set);
      }
    }

    if (Object.keys(filtersForServer).length > 0) {
      params.set("filters", JSON.stringify(filtersForServer));
    }

    globalThis.location.href = `/api/other/database-changes/export?${params.toString()}`;

    globalThis.setTimeout(() => {
      setIsExportingCsv(false);
    }, 1500);
  }

  const hasActiveFilters = Object.values(selectedFilters).some((set) => set && set.size > 0);

  return (
    <main className="app-width-left flex h-[calc(100vh-4rem)] flex-col overflow-hidden py-8 sm:py-10">
      {isLoading && (
        <section className="rounded-3xl border border-slate-200 bg-white px-6 py-4 shadow-sm sm:px-8">
          <p className="text-sm text-slate-600">Loading data...</p>
        </section>
      )}

      {errorMessage && (
        <section className="rounded-3xl border border-rose-200 bg-rose-50 px-6 py-4 shadow-sm sm:px-8">
          <p className="text-sm text-rose-700">{errorMessage}</p>
        </section>
      )}

      {hasNoColumns && (
        <section className="rounded-3xl border border-amber-200 bg-amber-50 px-6 py-4 shadow-sm sm:px-8">
          <p className="text-sm text-amber-800">
            No columns were discovered for database_change_form.
          </p>
        </section>
      )}

      {hasColumns && (
        <div className="flex min-h-0 flex-1 flex-col">
          {openFilter && (
            <button
              type="button"
              aria-label="Close filter menu"
              onClick={() => setOpenFilter(null)}
              className="fixed inset-0 z-40 cursor-default"
            />
          )}

          <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">Filter</span>
              {MULTISELECT_FILTERS.map(({ key, label }) => {
                const selected = selectedFilters[key];
                const count = selected?.size ?? 0;
                const isOpen = openFilter === key;
                const options = filterOptions[key];

                return (
                  <div key={key} className="relative z-50">
                    <button
                      type="button"
                      onClick={() => setOpenFilter(isOpen ? null : key)}
                      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition-colors whitespace-nowrap ${
                        count > 0
                          ? "border-cyan-400 bg-cyan-50 text-cyan-800"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {label}
                      {count > 0 && (
                        <span className="ml-1 rounded-full bg-cyan-600 px-1.5 py-0.5 text-[10px] font-bold text-white leading-none">
                          {count}
                        </span>
                      )}
                      <span className="text-slate-400 text-[10px]">{isOpen ? "▲" : "▼"}</span>
                    </button>
                    {isOpen && (
                      <div className="absolute left-0 top-full mt-1 z-50 min-w-[220px] max-h-64 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-lg">
                        <div className="sticky top-0 flex items-center justify-between border-b border-slate-100 bg-white px-3 py-2">
                          <span className="text-xs font-semibold text-slate-700">{label}</span>
                          {count > 0 && (
                            <button
                              type="button"
                              onClick={() => clearFilter(key)}
                              className="text-[10px] font-medium text-cyan-600 hover:text-cyan-800"
                            >
                              Clear
                            </button>
                          )}
                        </div>
                        {options.length === 0 ? (
                          <p className="px-3 py-2 text-xs text-slate-400">No options available</p>
                        ) : (
                          <ul className="py-1">
                            {options.map((option) => (
                              <li key={option}>
                                <Label className="flex cursor-pointer items-center gap-2 px-3 py-1.5 hover:bg-slate-50">
                                  <Input
                                    type="checkbox"
                                    checked={selected?.has(option) ?? false}
                                    onChange={() => toggleFilterValue(key, option)}
                                    className="rounded border-slate-300"
                                  />
                                  <span className="text-xs text-slate-700">{option}</span>
                                </Label>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-medium text-red-600 transition-colors hover:bg-red-100 whitespace-nowrap"
                >
                  Clear all
                </button>
              )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowColumnModal(!showColumnModal)}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
                >
                  ⚙ Columns
                </button>
                <button
                  type="button"
                  onClick={handleExportCsv}
                  disabled={isExportingCsv}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isExportingCsv ? "Preparing CSV..." : "Export CSV"}
                </button>
              </div>
            </div>
          </section>

          <section className="mt-4 flex min-h-0 flex-1 flex-col rounded-3xl border border-slate-200 bg-white shadow-sm">
            {showColumnModal && (
              <div className="border-b border-slate-200 bg-slate-50 px-6 py-3">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-900">Column Visibility</h3>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={showAllColumns}
                      className="rounded px-2 py-1 text-xs font-medium text-slate-600 hover:bg-white hover:text-slate-900"
                    >
                      Show All
                    </button>
                    <button
                      type="button"
                      onClick={hideAllColumns}
                      className="rounded px-2 py-1 text-xs font-medium text-slate-600 hover:bg-white hover:text-slate-900"
                    >
                      Hide All
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                  {columns.map((column) => (
                    <label
                      key={column}
                      className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 hover:bg-white"
                    >
                      <input
                        type="checkbox"
                        checked={visibleColumns.has(column)}
                        onChange={() => toggleColumn(column)}
                        className="rounded border-slate-300"
                      />
                      <span className="text-xs text-slate-700">{COLUMN_LABELS[column] ?? column}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            <div className="flex flex-col gap-2 border-b border-slate-200 px-6 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-baseline gap-3">
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900">Changes</h2>
                  <span className="text-2xl font-bold tracking-tight text-slate-900">{totalCount}</span>
                </div>
                <p className="text-sm text-slate-500">
                  Page {currentPage} of {pageCount} &nbsp;·&nbsp; Showing {pagedRows.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}-{Math.min(totalCount, (currentPage - 1) * pageSize + pagedRows.length)} of {totalCount}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <label htmlFor="db-change-page-size" className="text-xs font-semibold text-slate-500 whitespace-nowrap">
                    Rows
                  </label>
                  <Select
                    value={String(pageSize)}
                    onValueChange={(value) => {
                      setPageSize(Number(value));
                      setPage(1);
                    }}
                  >
                    <SelectTrigger id="db-change-page-size" className="h-9 w-[92px] rounded-lg border-slate-300 text-sm text-slate-900">
                      <SelectValue placeholder="Rows" />
                    </SelectTrigger>
                    <SelectContent>
                      {PAGE_SIZE_OPTIONS.map((size) => (
                        <SelectItem key={size} value={String(size)}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <button
                  type="button"
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  disabled={currentPage === 1}
                  className="rounded-xl border border-slate-300 px-4 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>
                <label htmlFor="db-change-page-jump" className="text-xs font-semibold text-slate-500 whitespace-nowrap">
                  Page
                </label>
                <Select
                  value={String(currentPage)}
                  onValueChange={(value) => setPage(Number(value))}
                >
                  <SelectTrigger id="db-change-page-jump" className="h-9 w-[92px] rounded-lg border-slate-300 text-sm text-slate-900">
                    <SelectValue placeholder="Page" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
                      <SelectItem key={pageNumber} value={String(pageNumber)}>
                        {pageNumber}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <button
                  type="button"
                  onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
                  disabled={currentPage === pageCount || pagedRows.length === 0}
                  className="rounded-xl border border-slate-300 px-4 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-auto">
              {hiddenColumns.length > 0 && (
                <div className="border-b border-slate-200 bg-blue-50 px-4 py-2 flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-medium text-slate-600">Hidden columns:</span>
                  {hiddenColumns.map((column) => (
                    <button
                      key={column}
                      type="button"
                      onClick={() => toggleColumn(column)}
                      className="inline-flex items-center gap-1 rounded-md bg-white border border-blue-200 px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100 transition-colors"
                    >
                      {COLUMN_LABELS[column] ?? column}
                      <span className="text-blue-400">+</span>
                    </button>
                  ))}
                </div>
              )}
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead className="sticky top-0 z-10 bg-slate-50">
                  <tr>
                    {displayedColumns.map((column) => (
                      <th
                        key={column}
                        scope="col"
                        className="group whitespace-nowrap px-4 py-3 font-semibold uppercase tracking-wide text-slate-700"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => handleSort(column)}
                            className="inline-flex items-center gap-2 text-left transition-colors hover:text-slate-900"
                          >
                            <span>{COLUMN_LABELS[column] ?? column}</span>
                            <span className="text-xs text-slate-400">{getSortIndicator(column)}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleColumn(column)}
                            title="Hide column"
                            className="inline-flex h-5 w-5 items-center justify-center rounded text-lg leading-none text-slate-400 opacity-0 transition-opacity hover:bg-slate-200 hover:text-slate-600 group-hover:opacity-100"
                          >
                            ×
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {pagedRows.length === 0 ? (
                    <tr>
                      <td colSpan={displayedColumns.length} className="px-4 py-6 text-center text-slate-500">
                        No records found for the selected filters.
                      </td>
                    </tr>
                  ) : (
                    pagedRows.map((row) => {
                      const rowKey = `${row.change_id ?? "no-change-id"}-${row.create_dttm ?? "no-create-dttm"}`;

                      return (
                        <tr key={rowKey} className="hover:bg-slate-50">
                          {displayedColumns.map((column) => (
                            <td
                              key={`${rowKey}-${column}`}
                              className={`px-4 py-3 text-slate-700 align-top ${
                                WRAP_COLUMNS.has(column)
                                  ? "max-w-[28rem] whitespace-normal break-words"
                                  : "whitespace-nowrap"
                              }`}
                            >
                              {String(row[column] ?? "-")}
                            </td>
                          ))}
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>

              <div className="sticky bottom-0 z-10 flex flex-wrap items-center justify-end gap-3 border-t border-slate-200 bg-white px-6 py-3">
                <div className="flex items-center gap-2">
                  <label htmlFor="db-change-page-size-bottom" className="text-xs font-semibold text-slate-500 whitespace-nowrap">
                    Rows
                  </label>
                  <Select
                    value={String(pageSize)}
                    onValueChange={(value) => {
                      setPageSize(Number(value));
                      setPage(1);
                    }}
                  >
                    <SelectTrigger id="db-change-page-size-bottom" className="h-9 w-[92px] rounded-lg border-slate-300 text-sm text-slate-900">
                      <SelectValue placeholder="Rows" />
                    </SelectTrigger>
                    <SelectContent>
                      {PAGE_SIZE_OPTIONS.map((size) => (
                        <SelectItem key={size} value={String(size)}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <button
                  type="button"
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  disabled={currentPage === 1}
                  className="rounded-xl border border-slate-300 px-4 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>
                <label htmlFor="db-change-page-jump-bottom" className="text-xs font-semibold text-slate-500 whitespace-nowrap">
                  Page
                </label>
                <Select
                  value={String(currentPage)}
                  onValueChange={(value) => setPage(Number(value))}
                >
                  <SelectTrigger id="db-change-page-jump-bottom" className="h-9 w-[92px] rounded-lg border-slate-300 text-sm text-slate-900">
                    <SelectValue placeholder="Page" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
                      <SelectItem key={pageNumber} value={String(pageNumber)}>
                        {pageNumber}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <button
                  type="button"
                  onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
                  disabled={currentPage === pageCount || pagedRows.length === 0}
                  className="rounded-xl border border-slate-300 px-4 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
