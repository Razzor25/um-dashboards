"use client";

import React, { useMemo, useState, useEffect, useCallback, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@uhg-netra-ai/core-react-components/ui/select";
import { PREHASHED_ORG_BY_ID } from "@/lib/constants/orgs";
import { TAT_PRIORITY_OPTIONS, TAT_PRIORITY_REF_ID_BY_LABEL } from "@/lib/constants/priorities";
import {
  getExpeditedUrgentMemberTatChartData,
  getExpeditedUrgentProviderTatChartData,
  getRoutineProviderTatChartData,
  getStatusChartData,
  getRoutineTatChartData,
} from "@/lib/api/chart-data-actions";
import type { ChartDataPoint } from "@/lib/api/chart-data-service";
import { ChartsGrid } from "@/app/components/ChartsGrid";
import { FilterChip } from "@/app/components/FilterChip";
import {
  getTatCacheMetadata,
  getTatFilterOptions,
  getHscRecordsForTatCompliance,
  getRefCacheStatus,
  refreshRefCache,
} from "@/features/um/actions/tat-compliance-actions";
import type {
  TatCacheMetadata,
  TatDataSource,
  TatRecord,
  TatSortColumn,
} from "@/features/um/services/tat-compliance-service";
import type { RefCacheStatus } from "@/features/um/actions/tat-compliance-actions";
import { formatDateTimeInZone } from "@/lib/formats";

const requestCategoryChips = [
  "Non - Part B",
  "Injectable/Part - B",
] as const;

const DEFAULT_CACHE_START_YEAR = new Date().getFullYear() - 1;

const dateRangePresets = [
  { key: "this-week", label: "This week" },
  { key: "7-days", label: "7 days" },
  { key: "one-month", label: "1 month" },
  { key: "3-months", label: "3 months" },
  { key: "6-months", label: "6 months" },
  { key: "12-months", label: "12 months" },
  { key: "ytd", label: "Year to date" },
  //{ key: "last-year-start-now", label: `${DEFAULT_CACHE_START_YEAR} to now` },
  //{ key: "custom", label: "Custom" },
] as const;

const US_TIMEZONES = [
  { value: "America/New_York", label: "Eastern (ET)" },
  { value: "America/Chicago", label: "Central (CT)" },
  { value: "America/Denver", label: "Mountain (MT)" },
  { value: "America/Phoenix", label: "Arizona (MST)" },
  { value: "America/Los_Angeles", label: "Pacific (PT)" },
] as const;

type DateRangeKey = (typeof dateRangePresets)[number]["key"];

function toIsoDateOnly(value: Date): string {
  return value.toISOString().split("T")[0] ?? "";
}

function getDateRangeLengthInDays(fromDate: string, toDate: string): number {
  const start = new Date(fromDate);
  const end = new Date(toDate);
  const oneDayMs = 24 * 60 * 60 * 1000;
  const diff = Math.floor((end.getTime() - start.getTime()) / oneDayMs);
  return diff + 1;
}

function getDefaultDataSource(fromDate: string, toDate: string): TatDataSource {
  if (!fromDate || !toDate) return "graphql";
  return getDateRangeLengthInDays(fromDate, toDate) <= 7 ? "graphql" : "cache";
}

function getDateRangeFromPreset(preset: DateRangeKey): { fromDate: string; toDate: string } {
  const today = new Date();
  const toDate = toIsoDateOnly(today);

  if (preset === "this-week") {
    const start = new Date(today);
    const day = start.getDay();
    const diffToMonday = (day + 6) % 7;
    start.setDate(start.getDate() - diffToMonday);
    const fromDate = toIsoDateOnly(start);
    return { fromDate, toDate };
  }

  if (preset === "7-days") {
    const start = new Date(today);
    start.setDate(start.getDate() - 6);
    const fromDate = toIsoDateOnly(start);
    return { fromDate, toDate };
  }

  if (preset === "one-month") {
    const start = new Date(today);
    start.setMonth(start.getMonth() - 1);
    const fromDate = toIsoDateOnly(start);
    return { fromDate, toDate };
  }

  if (preset === "3-months") {
    const start = new Date(today.getFullYear(), today.getMonth() - 2, 1);
    const fromDate = toIsoDateOnly(start);
    return { fromDate, toDate };
  }

  if (preset === "6-months") {
    const start = new Date(today.getFullYear(), today.getMonth() - 5, 1);
    const fromDate = toIsoDateOnly(start);
    return { fromDate, toDate };
  }

  if (preset === "12-months") {
    const start = new Date(today.getFullYear(), today.getMonth() - 11, 1);
    const fromDate = toIsoDateOnly(start);
    return { fromDate, toDate };
  }

  if (preset === "ytd") {
    const ytdStart = new Date(today.getFullYear(), 0, 1);
    const fromDate = toIsoDateOnly(ytdStart);
    return { fromDate, toDate };
  } else if (preset === "last-year-start-now") {
    const fromDate = `${DEFAULT_CACHE_START_YEAR}-01-01`;
    return { fromDate, toDate };
  }

  return { fromDate: toDate, toDate };
}

const years = ["2026", "2025", "2024"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const priorities = [...TAT_PRIORITY_OPTIONS];
const requestTypes = [
  "All Request Types",
  "Referral",
  "Order Utility Referral",
  "Prior Auth",
  "Radiology Cardiology",
  "Home Health",
  "Durable Medical Equipment",
  "Outpatient Surgery",
  "Part B",
  "Outpatient Dx/Tx",
  "Outpatient Therapy",
  "Injectable",
  "Skilled Nursing Facility",
  "Palliative",
  "Ambulance",
  "Behavioral Health",
  "Precertification",
  "Genetics",
  "Dialysis",
  "Acute Inpatient Rehab",
  "Hospice",
  "Long Term Care(Custodial)",
  "LTAC",
  "Urgent Care",
  "Acute Rehab/Subacute",
  "Outpatient Rehab",
  "Inpatient",
  "Orthotics/Prosthetics",
  "LTAC AIR SNF",
  "Emergency Room",
  "Site of Service",
  "Appeal",
];
const lineOfBusinessOptions = ["All Lines of Business", "Loading..."];
const ipaOptions = [
  "All IPAs"
];
const superCommunityOptions = ["All Super Communities"];
const healthPlanOptions = ["All Health Plans"];

type FilterState = {
  year: string;
  month: string;
  priority: string[];
  requestType: string[];
  lineOfBusiness: string[];
  healthPlan: string[];
  superCommunity: string[];
  ipa: string[];
  orgs: string[];
  dateRangePreset: DateRangeKey;
  fromDate: string;
  toDate: string;
  timezone: string;
  dataSource: TatDataSource;
};

const defaultFilters: FilterState = {
  year: "2026",
  month: "April",
  priority: ["All Priorities"],
  requestType: ["All Request Types"],
  lineOfBusiness: ["All Lines of Business"],
  healthPlan: ["All Health Plans"],
  superCommunity: ["All Super Communities"],
  ipa: ["All IPAs"],
  orgs: [],
  dateRangePreset: "7-days",
  fromDate: "",
  toDate: "",
  timezone: "America/New_York",
  dataSource: "graphql",
};

const FILTER_OPTIONS = [
  { key: "priority", label: "Priority", options: priorities },
  { key: "requestType", label: "Request Type", options: requestTypes },
  { key: "lineOfBusiness", label: "Line of Business", options: lineOfBusinessOptions },
  { key: "healthPlan", label: "Health Plan", options: healthPlanOptions },
  { key: "superCommunity", label: "Super Community", options: superCommunityOptions },
  { key: "ipa", label: "IPA", options: ipaOptions },
  { key: "orgs", label: "Org", options: [] }, // Will be populated by useMemo
] as const;

type DynamicFilterOptionsState = {
  priority: string[];
  priorityRefIds: Record<string, number>;
  requestType: string[];
  lineOfBusiness: string[];
  healthPlan: string[];
  superCommunity: string[];
  ipa: string[];
  orgs: string[];
};

const PAGE_SIZE_OPTIONS = [50, 100, 200, 500];
const EXPORT_MAX_RECORDS = 250_000;

const TAT_COLUMNS = [
  { key: "hscId", label: "Auth Id" },
  { key: "tatDeadline", label: "TAT Deadline" },
  { key: "indvId", label: "Member Id" },
  { key: "authorizationType", label: "Request Type" },
  { key: "status", label: "Auth Decision (Status)" },
  { key: "received", label: "Received" },
  { key: "member", label: "Member" },
  { key: "org", label: "Org" },
  { key: "reviewDue", label: "Review Due" },
  { key: "timely", label: "Timely" },
  { key: "priority", label: "Priority" },
  { key: "authDecision", label: "Auth Decision" },
  { key: "decisioned", label: "Decisioned" },
  { key: "memberNodTatDeadline", label: "Member NOD TAT Deadline" },
  { key: "providerNodTatDeadline", label: "Provider NOD TAT Deadline" },
  { key: "memberWrittenSent", label: "Member Written Sent" },
  { key: "providerWrittenSent", label: "Provider Written Sent" },
  { key: "memberVerbalDone", label: "Member Verbal Done" },
  { key: "lineOfBusiness", label: "Line of Business" },
  { key: "healthPlan", label: "Health Plan" },
  { key: "superCommunity", label: "Super Community" },
  { key: "timing", label: "Timing" },
  { key: "ipa", label: "IPA" },
] as const;

type TatColumnKey = (typeof TAT_COLUMNS)[number]["key"];

const SORTABLE_COLUMNS: Record<TatSortColumn, string> = {
  received: "Received",
  hscId: "Auth Id",
  tatDeadline: "TAT Deadline",
  authorizationType: "Request Type",
  status: "Auth Decision (Status)",
  indvId: "Member Id",
  reviewDue: "Review Due",
  org: "Org",
  lineOfBusiness: "Line of Business",
  healthPlan: "Health Plan",
  superCommunity: "Super Community",
  ipa: "IPA",
  priority: "Priority",
  authDecision: "Auth Decision",
  decisioned: "Decisioned",
};

const SORTABLE_COLUMN_KEYS = new Set<TatSortColumn>(Object.keys(SORTABLE_COLUMNS) as TatSortColumn[]);

export default function UmTatCompliancePage() {
  type ChartsState = {
    status: ChartDataPoint[];
    priority: ChartDataPoint[];
    requestType: ChartDataPoint[];
    org: ChartDataPoint[];
    createdDate: ChartDataPoint[];
    routineTat: ChartDataPoint[];
  };

  type ChartLoadingState = {
    status: boolean;
    priority: boolean;
    requestType: boolean;
    org: boolean;
    createdDate: boolean;
    routineTat: boolean;
  };

  const [selectedChip, setSelectedChip] = useState<(typeof requestCategoryChips)[number]>(requestCategoryChips[0]);
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(defaultFilters);
  const [selectedFilters, setSelectedFilters] = useState<FilterState>(defaultFilters);
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [records, setRecords] = useState<TatRecord[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [chartsData, setChartsData] = useState<ChartsState>({
    status: [],
    priority: [],
    requestType: [],
    org: [],
    createdDate: [],
    routineTat: [],
  });
  const [chartLoading, setChartLoading] = useState<ChartLoadingState>({
    status: false,
    priority: false,
    requestType: false,
    org: false,
    createdDate: false,
    routineTat: false,
  });
  const [isChartsLoading, setIsChartsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageInput, setPageInput] = useState("1");
  const [pageSize, setPageSize] = useState(50);
  const [showColumnModal, setShowColumnModal] = useState(false);
  const [showCharts, setShowCharts] = useState(true);
  const [isExportingCsv, setIsExportingCsv] = useState(false);
  const [showDateRangeInfo, setShowDateRangeInfo] = useState(false);
  const [dynamicFilterOptions, setDynamicFilterOptions] = useState<DynamicFilterOptionsState>({
    priority: priorities,
    priorityRefIds: { ...TAT_PRIORITY_REF_ID_BY_LABEL },
    requestType: requestTypes,
    lineOfBusiness: lineOfBusinessOptions,
    healthPlan: healthPlanOptions,
    superCommunity: superCommunityOptions,
    ipa: ipaOptions,
    orgs: ["All Orgs", ...Object.values(PREHASHED_ORG_BY_ID).sort((left, right) => left.localeCompare(right))],
  });
  const [isFilterOptionsLoading, setIsFilterOptionsLoading] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<TatColumnKey[]>(
    TAT_COLUMNS.map((column) => column.key),
  );
  const [sortBy, setSortBy] = useState<TatSortColumn>("received");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [hasRenderedOnce, setHasRenderedOnce] = useState(false);
  const [refCacheStatus, setRefCacheStatus] = useState<RefCacheStatus>({ cachedAt: null, expiresAt: null, isStale: true });
  const [isRefCacheRefreshing, setIsRefCacheRefreshing] = useState(false);
  const [cacheMetadata, setCacheMetadata] = useState<TatCacheMetadata | null>(null);
  const [cacheSourceError, setCacheSourceError] = useState<string | null>(null);
  const latestRequestIdRef = useRef(0);
  const latestChartRequestIdRef = useRef(0);
  const latestFilterOptionsRequestIdRef = useRef(0);

  // Initialize date range based on default preset
  useEffect(() => {
    const { fromDate, toDate } = getDateRangeFromPreset(appliedFilters.dateRangePreset);
    const dataSource = getDefaultDataSource(fromDate, toDate);
    setAppliedFilters((current) => ({ ...current, fromDate, toDate, dataSource }));
    setSelectedFilters((current) => ({ ...current, fromDate, toDate, dataSource }));
  }, []);

  // Load initial ref cache status
  useEffect(() => {
    getRefCacheStatus().then(setRefCacheStatus).catch(console.error);
  }, []);

  useEffect(() => {
    if (appliedFilters.dataSource !== "cache") {
      setCacheSourceError(null);
      return;
    }

    let cancelled = false;

    const loadCacheMetadata = async () => {
      try {
        const metadata = await getTatCacheMetadata();
        if (!cancelled) {
          setCacheMetadata(metadata);
          setCacheSourceError(null);
        }
      } catch (err) {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : "Failed to load cache metadata";
          setCacheSourceError(message);
        }
      }
    };

    loadCacheMetadata();
    return () => {
      cancelled = true;
    };
  }, [appliedFilters.dataSource]);

  async function handleRefreshRefCache() {
    setIsRefCacheRefreshing(true);
    try {
      const status = await refreshRefCache();
      setRefCacheStatus(status);
    } catch (err) {
      console.error("Failed to refresh ref cache:", err);
    } finally {
      setIsRefCacheRefreshing(false);
    }
  }

  // Mark initial client render completion so chart loading starts after first paint.
  useEffect(() => {
    setHasRenderedOnce(true);
  }, []);

  // Load chart data independently (respect date range)
  useEffect(() => {
    if (!hasRenderedOnce || !appliedFilters.fromDate || !appliedFilters.toDate) return;

    let cancelled = false;
    const chartRequestId = ++latestChartRequestIdRef.current;

    const loadingStartState: ChartLoadingState = {
      status: true,
      priority: false,
      requestType: true,
      org: true,
      createdDate: true,
      routineTat: true,
    };

    const emptyChartsState: ChartsState = {
      status: [],
      priority: [],
      requestType: [],
      org: [],
      createdDate: [],
    routineTat: [],
    };

    type ChartStep = {
      key: keyof ChartsState;
      loader: () => Promise<ChartDataPoint[]>;
    };

    const chartFilters = {
      selectedChip,
      priority: appliedFilters.priority,
      requestType: appliedFilters.requestType[0],
      lineOfBusiness: appliedFilters.lineOfBusiness[0],
      healthPlan: appliedFilters.healthPlan[0],
      superCommunity: appliedFilters.superCommunity[0],
      ipa: appliedFilters.ipa[0],
      orgs: appliedFilters.orgs.length > 0 ? appliedFilters.orgs : undefined,
    };

    const steps: ChartStep[] = [
      {
        key: "status",
        loader: () => getStatusChartData(
          appliedFilters.fromDate,
          appliedFilters.toDate,
          appliedFilters.dataSource,
          chartFilters,
        ),
      },
      {
        key: "routineTat",
        loader: () => getRoutineTatChartData(
          appliedFilters.fromDate,
          appliedFilters.toDate,
          appliedFilters.dataSource,
          chartFilters,
        ),
      },
      {
        key: "requestType",
        loader: () => getExpeditedUrgentMemberTatChartData(
          appliedFilters.fromDate,
          appliedFilters.toDate,
          appliedFilters.dataSource,
          chartFilters,
        ),
      },
      {
        key: "org",
        loader: () => getRoutineProviderTatChartData(
          appliedFilters.fromDate,
          appliedFilters.toDate,
          appliedFilters.dataSource,
          chartFilters,
        ),
      },
      {
        key: "createdDate",
        loader: () => getExpeditedUrgentProviderTatChartData(
          appliedFilters.fromDate,
          appliedFilters.toDate,
          appliedFilters.dataSource,
          chartFilters,
        ),
      },
    ];

    const loadCharts = async () => {
      setIsChartsLoading(true);
      setChartsData(emptyChartsState);
      setChartLoading(loadingStartState);

      try {
        for (const step of steps) {
          if (cancelled || chartRequestId !== latestChartRequestIdRef.current) {
            return;
          }

          try {
            const chartData = await step.loader();
            if (!cancelled && chartRequestId === latestChartRequestIdRef.current) {
              setChartsData((current) => ({
                ...current,
                [step.key]: chartData,
              }));
            }
          } catch (stepError) {
            if (!cancelled && chartRequestId === latestChartRequestIdRef.current) {
              console.error(`Failed to load ${step.key} chart data:`, stepError);
              setChartsData((current) => ({
                ...current,
                [step.key]: [],
              }));
            }
          } finally {
            if (!cancelled && chartRequestId === latestChartRequestIdRef.current) {
              setChartLoading((current) => ({
                ...current,
                [step.key]: false,
              }));
            }
          }
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to load charts data:", err);
        }
      } finally {
        if (!cancelled && chartRequestId === latestChartRequestIdRef.current) {
          setIsChartsLoading(false);
        }
      }
    };

    // Defer chart fetch to the next macrotask so first paint is not delayed.
    const timer = window.setTimeout(loadCharts, 0);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [
    hasRenderedOnce,
    appliedFilters.dataSource,
    appliedFilters.fromDate,
    appliedFilters.toDate,
    appliedFilters.priority,
    appliedFilters.requestType,
    appliedFilters.lineOfBusiness,
    appliedFilters.healthPlan,
    appliedFilters.superCommunity,
    appliedFilters.ipa,
    appliedFilters.orgs,
    selectedChip,
  ]);

  // Load dynamic filter options from server-side distinct/aggregate queries.
  useEffect(() => {
    if (!appliedFilters.fromDate || !appliedFilters.toDate) return;

    let cancelled = false;
    const filterOptionsRequestId = ++latestFilterOptionsRequestIdRef.current;

    const loadFilterOptions = async () => {
      setIsFilterOptionsLoading(true);
      try {
        const options = await getTatFilterOptions({
          fromDate: appliedFilters.fromDate,
          toDate: appliedFilters.toDate,
          selectedChip,
          priority: appliedFilters.priority,
          requestType: appliedFilters.requestType[0],
          lineOfBusiness: appliedFilters.lineOfBusiness[0],
          healthPlan: appliedFilters.healthPlan[0],
          superCommunity: appliedFilters.superCommunity[0],
          ipa: appliedFilters.ipa[0],
          orgs: appliedFilters.orgs.length > 0 ? appliedFilters.orgs : undefined,
        }, "cache");

        if (!cancelled && filterOptionsRequestId === latestFilterOptionsRequestIdRef.current) {
          setDynamicFilterOptions(options);
          if (options.cache) {
            setCacheMetadata(options.cache);
          }
        }
      } catch (filterOptionsError) {
        if (!cancelled && filterOptionsRequestId === latestFilterOptionsRequestIdRef.current) {
          console.error("Failed to load filter options:", filterOptionsError);
        }
      } finally {
        if (!cancelled && filterOptionsRequestId === latestFilterOptionsRequestIdRef.current) {
          setIsFilterOptionsLoading(false);
        }
      }
    };

    const timer = window.setTimeout(loadFilterOptions, 0);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [
    appliedFilters.fromDate,
    appliedFilters.ipa,
    appliedFilters.healthPlan,
    appliedFilters.lineOfBusiness,
    appliedFilters.superCommunity,
    appliedFilters.orgs,
    appliedFilters.priority,
    appliedFilters.requestType,
    appliedFilters.toDate,
    selectedChip,
  ]);

  const loadData = useCallback(async (currentFilters: FilterState, currentPage: number) => {
    if (!currentFilters.fromDate || !currentFilters.toDate) return;
    const requestId = ++latestRequestIdRef.current;
    const shouldIncludeTotalCount = currentPage === 1;
    setIsLoading(true);
    setError(null);
    try {
      const result = await getHscRecordsForTatCompliance(
        {
          fromDate: currentFilters.fromDate,
          toDate: currentFilters.toDate,
          selectedChip,
          priority: currentFilters.priority,
          requestType: currentFilters.requestType[0],
          lineOfBusiness: currentFilters.lineOfBusiness[0],
          healthPlan: currentFilters.healthPlan[0],
          superCommunity: currentFilters.superCommunity[0],
          ipa: currentFilters.ipa[0],
          orgs: currentFilters.orgs.length > 0 ? currentFilters.orgs : undefined,
        },
        currentPage,
        pageSize,
        sortBy,
        sortDir,
        shouldIncludeTotalCount,
        currentFilters.dataSource,
      );
      if (requestId === latestRequestIdRef.current) {
        setRecords(result.records);
        if (shouldIncludeTotalCount && result.totalCount >= 0) {
          setTotalCount(result.totalCount);
        }
        if (result.cache) {
          setCacheMetadata(result.cache);
        }
      }
    } catch (err) {
      if (requestId === latestRequestIdRef.current) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      }
    } finally {
      if (requestId === latestRequestIdRef.current) {
        setIsLoading(false);
      }
    }
  }, [pageSize, selectedChip, sortBy, sortDir]);

  const handleSortClick = useCallback((columnKey: TatColumnKey) => {
    if (!SORTABLE_COLUMN_KEYS.has(columnKey as TatSortColumn)) {
      return;
    }

    const sortableColumn = columnKey as TatSortColumn;
    setPage(1);
    if (sortableColumn === sortBy) {
      setSortDir((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }

    setSortBy(sortableColumn);
    setSortDir("asc");
  }, [sortBy]);

  // Reload whenever applied filters or page changes (but only once dates are initialised)
  useEffect(() => {
    if (appliedFilters.fromDate && appliedFilters.toDate) {
      loadData(appliedFilters, page);
    }
  }, [appliedFilters, page, selectedChip, loadData]);

  const pageCount = Math.max(1, Math.ceil(totalCount / pageSize));
  const currentPage = Math.min(page, pageCount);
  const startRow = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endRow = totalCount === 0 ? 0 : Math.min(currentPage * pageSize, totalCount);
  const showInitialLoading = isLoading && records.length === 0;
  const exportDisabledReason =
    totalCount > EXPORT_MAX_RECORDS
      ? `Export is disabled because ${totalCount.toLocaleString()} records exceed the ${EXPORT_MAX_RECORDS.toLocaleString()} limit.`
      : totalCount === 0
        ? "Export is unavailable because there are no records for the current filters."
        : null;

  useEffect(() => {
    setPageInput(String(currentPage));
  }, [currentPage]);

  function applyPageInput() {
    const next = Number(pageInput);
    if (!Number.isFinite(next)) {
      setPageInput(String(currentPage));
      return;
    }
    const clamped = Math.max(1, Math.min(pageCount, Math.trunc(next)));
    setPage(clamped);
    setPageInput(String(clamped));
  }

  function toggleColumn(key: TatColumnKey) {
    setVisibleColumns((current) => {
      if (current.includes(key)) {
        if (current.length === 1) return current;
        return current.filter((columnKey) => columnKey !== key);
      }
      return [...current, key];
    });
  }

  function csvEscape(value: string): string {
    if (value.includes(",") || value.includes("\n") || value.includes("\"")) {
      return `"${value.replace(/\"/g, '""')}"`;
    }
    return value;
  }

  function getIsTimelyDisplay(record: TatRecord): string {
    if (record.decn_rndr_dttm && record.tat_due_dttm) {
      return new Date(record.decn_rndr_dttm) <= new Date(record.tat_due_dttm) ? "Yes" : "No";
    }
    return "—";
  }

  function getExportCellValue(record: TatRecord, key: TatColumnKey): string {
    const orgName = PREHASHED_ORG_BY_ID[record.org_id] ?? record.org_id;
    switch (key) {
      case "hscId":
        return record.hsc_id;
      case "tatDeadline":
        return record.tat_due_dttm ? formatDateTimeInZone(record.tat_due_dttm, appliedFilters.timezone) : "";
      case "indvId":
        return record.indv_id;
      case "authorizationType":
        return record.auth_typ_label ?? "";
      case "status":
        return record.hsc_sts_typ_label ?? "";
      case "received":
        return record.recv_dttm ? formatDateTimeInZone(record.recv_dttm, appliedFilters.timezone) : "";
      case "member":
        return record.member_name ?? "";
      case "org":
        return orgName;
      case "reviewDue":
        return record.review_due_dttm ? formatDateTimeInZone(record.review_due_dttm, appliedFilters.timezone) : "";
      case "timely":
        return getIsTimelyDisplay(record);
      case "priority":
        return record.rev_prr_ref_label ?? "";
      case "authDecision":
        return record.hsc_sts_typ_label ?? "";
      case "decisioned":
        return record.decn_rndr_dttm ? formatDateTimeInZone(record.decn_rndr_dttm, appliedFilters.timezone) : "";
      case "memberNodTatDeadline":
        return record.curr_tat_nod_mbr_dttm ? formatDateTimeInZone(record.curr_tat_nod_mbr_dttm, appliedFilters.timezone) : "";
      case "providerNodTatDeadline":
        return record.tat_nod_prov_dttm ? formatDateTimeInZone(record.tat_nod_prov_dttm, appliedFilters.timezone) : "";
      case "memberWrittenSent":
        return record.wrt_decn_mbr_cmnct_dttm ? formatDateTimeInZone(record.wrt_decn_mbr_cmnct_dttm, appliedFilters.timezone) : "";
      case "providerWrittenSent":
        return record.wrt_decn_prov_cmnct_dttm ? formatDateTimeInZone(record.wrt_decn_prov_cmnct_dttm, appliedFilters.timezone) : "";
      case "memberVerbalDone":
        return record.decn_mbr_cmnct_dttm ? formatDateTimeInZone(record.decn_mbr_cmnct_dttm, appliedFilters.timezone) : "";
      case "lineOfBusiness":
        return record.lob ?? "";
      case "healthPlan":
        return record.health_plan ?? "";
      case "superCommunity":
        return record.super_community ?? "";
      case "timing":
        return record.rev_term_typ_ref_label ?? "";
      case "ipa":
        return record.ipa ?? "";
      default:
        return "";
    }
  }

  async function handleExportCsv() {
    if (totalCount > EXPORT_MAX_RECORDS) {
      setError(`CSV export is limited to ${EXPORT_MAX_RECORDS.toLocaleString()} records. Narrow your filters and try again.`);
      return;
    }

    const exportPageSize = 1000;
    const pages = Math.max(1, Math.ceil(totalCount / exportPageSize));
    const rows: TatRecord[] = [];

    setIsExportingCsv(true);
    setError(null);

    try {
      for (let exportPage = 1; exportPage <= pages; exportPage += 1) {
        const result = await getHscRecordsForTatCompliance(
          {
            fromDate: appliedFilters.fromDate,
            toDate: appliedFilters.toDate,
            selectedChip,
            priority: appliedFilters.priority,
            requestType: appliedFilters.requestType[0],
            lineOfBusiness: appliedFilters.lineOfBusiness[0],
            healthPlan: appliedFilters.healthPlan[0],
            superCommunity: appliedFilters.superCommunity[0],
            ipa: appliedFilters.ipa[0],
            orgs: appliedFilters.orgs.length > 0 ? appliedFilters.orgs : undefined,
          },
          exportPage,
          exportPageSize,
          sortBy,
          sortDir,
          exportPage === 1,
          appliedFilters.dataSource,
        );

        if (result.records.length === 0) {
          break;
        }

        rows.push(...result.records);
      }

      const exportColumns = TAT_COLUMNS.filter((column) => visibleColumns.includes(column.key));
      const header = exportColumns.map((column) => csvEscape(column.label)).join(",");
      const body = rows
        .map((record) => exportColumns.map((column) => csvEscape(getExportCellValue(record, column.key))).join(","))
        .join("\n");

      const csv = `${header}\n${body}`;
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const today = new Date().toISOString().split("T")[0];
      link.href = url;
      link.download = `prior-auth-export-${today}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (exportError) {
      const message = exportError instanceof Error ? exportError.message : "Failed to export CSV";
      setError(message);
    } finally {
      setIsExportingCsv(false);
    }
  }

  const filterOptionsWithOrg = useMemo(
    () => FILTER_OPTIONS.map((f) => {
      if (f.key === "priority") return { ...f, options: dynamicFilterOptions.priority };
      if (f.key === "requestType") return { ...f, options: dynamicFilterOptions.requestType };
      if (f.key === "lineOfBusiness") return { ...f, options: dynamicFilterOptions.lineOfBusiness };
      if (f.key === "healthPlan") return { ...f, options: dynamicFilterOptions.healthPlan };
      if (f.key === "superCommunity") return { ...f, options: dynamicFilterOptions.superCommunity };
      if (f.key === "ipa") return { ...f, options: dynamicFilterOptions.ipa };
      if (f.key === "orgs") return { ...f, options: dynamicFilterOptions.orgs };
      return f;
    }),
    [dynamicFilterOptions]
  );

  const appliedSummary = useMemo(() => {
    const parts: string[] = [
      `Data Source: ${appliedFilters.dataSource === "cache" ? "Cached" : "Live"}`,
      `Sort: ${SORTABLE_COLUMNS[sortBy]} (${sortDir.toUpperCase()})`,
      `Date Range (Received): ${appliedFilters.fromDate || "—"} to ${appliedFilters.toDate || "—"}`,
      `Timezone: ${US_TIMEZONES.find((tz) => tz.value === appliedFilters.timezone)?.label ?? appliedFilters.timezone}`,
      `Request Category: ${selectedChip}`,
    ];

    if (appliedFilters.priority[0] !== defaultFilters.priority[0]) parts.push(`Priority: ${appliedFilters.priority[0]}`);
    if (appliedFilters.requestType[0] !== defaultFilters.requestType[0]) parts.push(`Request Type: ${appliedFilters.requestType[0]}`);
    if (appliedFilters.lineOfBusiness[0] !== defaultFilters.lineOfBusiness[0]) parts.push(`Line of Business: ${appliedFilters.lineOfBusiness[0]}`);
    if (appliedFilters.healthPlan[0] !== defaultFilters.healthPlan[0]) parts.push(`Health Plan: ${appliedFilters.healthPlan[0]}`);
    if (appliedFilters.superCommunity[0] !== defaultFilters.superCommunity[0]) parts.push(`Super Community: ${appliedFilters.superCommunity[0]}`);
    if (appliedFilters.ipa[0] !== defaultFilters.ipa[0]) parts.push(`IPA: ${appliedFilters.ipa[0]}`);
    if (appliedFilters.orgs.length > 0) {
      parts.push(`Orgs: ${appliedFilters.orgs.length === 1 ? appliedFilters.orgs[0] : `${appliedFilters.orgs.length} selected`}`);
    }

    return parts.join(" · ");
  }, [
    appliedFilters.fromDate,
    appliedFilters.dataSource,
    appliedFilters.ipa,
    appliedFilters.healthPlan,
    appliedFilters.lineOfBusiness,
    appliedFilters.superCommunity,
    appliedFilters.orgs,
    appliedFilters.priority,
    appliedFilters.requestType,
    appliedFilters.timezone,
    appliedFilters.toDate,
    selectedChip,
    sortBy,
    sortDir,
  ]);

  function toggleFilterValue(key: string, value: string) {
    setSelectedFilters((prev) => {
      if (key === "orgs") {
        const currentOrgs = prev.orgs;
        if (currentOrgs.includes(value)) {
          return { ...prev, orgs: currentOrgs.filter(o => o !== value) };
        } else {
          return { ...prev, orgs: [...currentOrgs, value] };
        }
      }
      const prev_value = prev[key as keyof FilterState];
      if (Array.isArray(prev_value)) {
        const defaultAllValue = defaultFilters[key as keyof FilterState] as string[];
        const allLabel = defaultAllValue[0]; // e.g. "All Priorities"
        if (value === allLabel) {
          // Selecting "All X" resets to just the all-label
          return { ...prev, [key]: [allLabel] };
        }
        // Selecting a specific option: remove the all-label, toggle the value
        const withoutAll = prev_value.filter(v => v !== allLabel);
        if (withoutAll.includes(value)) {
          const next = withoutAll.filter(v => v !== value);
          // If nothing left, revert to all-label
          return { ...prev, [key]: next.length > 0 ? next : [allLabel] };
        } else {
          return { ...prev, [key]: [...withoutAll, value] };
        }
      }
      return prev;
    });
  }

  function clearFilterSelections() {
    setSelectedFilters(defaultFilters);
  }

  function applyFilters() {
    setPage(1);
    setAppliedFilters(selectedFilters);
  }

  function handleFilterChange<Key extends keyof FilterState>(key: Key, value: FilterState[Key]) {
    if (key === "dateRangePreset" || key === "fromDate" || key === "toDate" || key === "timezone") {
      // Date and timezone changes apply immediately
      setAppliedFilters((current) => {
        const next = { ...current, [key]: value };
        if (key === "fromDate" || key === "toDate") {
          next.dataSource = getDefaultDataSource(next.fromDate, next.toDate);
        }
        return next;
      });
      setSelectedFilters((current) => {
        const next = { ...current, [key]: value };
        if (key === "fromDate" || key === "toDate") {
          next.dataSource = getDefaultDataSource(next.fromDate, next.toDate);
        }
        return next;
      });
      setPage(1);
    }
  }

  function handleDateRangePresetChange(preset: DateRangeKey) {
    setPage(1);
    const { fromDate, toDate } = getDateRangeFromPreset(preset);
    const dataSource = getDefaultDataSource(fromDate, toDate);
    setAppliedFilters((current) => ({
      ...current,
      dateRangePreset: preset,
      fromDate,
      toDate,
      dataSource,
    }));
    setSelectedFilters((current) => ({
      ...current,
      dateRangePreset: preset,
      fromDate,
      toDate,
      dataSource,
    }));
  }

  return (
    <main className="flex h-[calc(100vh-4rem)] bg-white">
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Top header with date filters and request category chips */}
        <section className="border-b border-slate-200 bg-white px-6 py-3 flex-shrink-0">
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="flex flex-wrap gap-3 items-center">
              <label htmlFor="date-range-preset" className="flex flex-col gap-1">
                <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-700">
                  Date Range
                  <span className="relative inline-flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowDateRangeInfo((current) => !current)}
                      className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border border-slate-400 text-[9px] font-bold leading-none text-slate-500 transition-colors hover:border-slate-500 hover:text-slate-700"
                      aria-label="Date range filter info"
                      aria-expanded={showDateRangeInfo}
                    >
                      i
                    </button>
                    {showDateRangeInfo && (
                      <span className="absolute left-5 top-1/2 z-20 -translate-y-1/2 whitespace-nowrap rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-700 shadow-sm">
                        Filters by Received date (recv_dttm)
                      </span>
                    )}
                  </span>
                </span>
                <Select
                  value={appliedFilters.dateRangePreset}
                  onValueChange={(value) => handleDateRangePresetChange(value as DateRangeKey)}
                >
                  <SelectTrigger
                    id="date-range-preset"
                    className="h-9 rounded-lg border-slate-300 bg-white px-2 text-sm text-slate-900 focus:border-cyan-500"
                  >
                    <SelectValue placeholder="Date Range" />
                  </SelectTrigger>
                  <SelectContent>
                    {dateRangePresets.map((preset) => (
                      <SelectItem key={preset.key} value={preset.key}>
                        {preset.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </label>
              <label htmlFor="timezone" className="flex flex-col gap-1">
                <span className="text-xs font-medium text-slate-700">Timezone</span>
                <Select
                  value={appliedFilters.timezone}
                  onValueChange={(value) => handleFilterChange("timezone", value)}
                >
                  <SelectTrigger
                    id="timezone"
                    className="h-9 rounded-lg border-slate-300 bg-white px-2 text-sm text-slate-900 focus:border-cyan-500"
                  >
                    <SelectValue placeholder="Timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    {US_TIMEZONES.map((tz) => (
                      <SelectItem key={tz.value} value={tz.value}>
                        {tz.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </label>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-slate-700">Data Source</span>
                <div className="inline-flex items-center rounded-lg border border-slate-300 bg-white p-0.5">
                  <button
                    type="button"
                    onClick={() => {
                      setPage(1);
                      setAppliedFilters((current) => ({ ...current, dataSource: "graphql" }));
                      setSelectedFilters((current) => ({ ...current, dataSource: "graphql" }));
                    }}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                      appliedFilters.dataSource === "graphql"
                        ? "bg-cyan-600 text-white"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    Live
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPage(1);
                      setAppliedFilters((current) => ({ ...current, dataSource: "cache" }));
                      setSelectedFilters((current) => ({ ...current, dataSource: "cache" }));
                    }}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                      appliedFilters.dataSource === "cache"
                        ? "bg-cyan-600 text-white"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    Cached
                  </button>
                </div>
              </div>
              <label htmlFor="from-date" className="flex flex-col gap-1">
                <span className="text-xs font-medium text-slate-700">From</span>
                <input
                  id="from-date"
                  type="date"
                  value={appliedFilters.fromDate}
                  onChange={(event) => handleFilterChange("fromDate", event.target.value)}
                  className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 outline-none transition-colors focus:border-cyan-500"
                />
              </label>
              <div className="flex items-end gap-2">
                <label htmlFor="to-date" className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-slate-700">To</span>
                  <input
                    id="to-date"
                    type="date"
                    value={appliedFilters.toDate}
                    onChange={(event) => handleFilterChange("toDate", event.target.value)}
                    className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 outline-none transition-colors focus:border-cyan-500"
                  />
                </label>
                <span className="group relative inline-flex">
                  <button
                    type="button"
                    aria-label="Excluded records"
                    className="mb-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-cyan-500 bg-cyan-50 text-xs font-bold leading-none text-cyan-700"
                  >
                    i
                  </button>
                  <span className="pointer-events-none absolute left-1/2 top-[125%] z-[60] hidden w-64 -translate-x-1/2 rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-700 shadow-lg group-hover:block group-focus-within:block">
                    excluding auth_typ_ref_id:
                    <br />
                    1002259: Draft
                    <br />
                    1002526: Abandoned
                    <br />
                    1005617: Draft Not Submitted
                    <br />
                    1005694: Draft Expired
                    <br />
                    {"and indv_id <= 0"}
                  </span>
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 items-end">
              {requestCategoryChips.map((chip) => {
                const isSelected = chip === selectedChip;

                return (
                  <FilterChip
                    key={chip}
                    label={chip}
                    isSelected={isSelected}
                    onClick={() => {
                      setPage(1);
                      setSelectedChip(chip);
                    }}
                    size="md"
                  />
                );
              })}
            </div>

            {appliedFilters.dataSource === "cache" ? (
              <div className="flex items-center gap-2 self-end rounded-lg border border-cyan-100 bg-cyan-50 px-3 py-2">
                <div className="flex flex-col items-end gap-0.5">
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-cyan-700">Cache Metadata</span>
                  <span className="text-[11px] text-cyan-800">
                    {cacheMetadata?.last_refresh_at
                      ? `Refreshed ${new Date(cacheMetadata.last_refresh_at).toLocaleString()}`
                      : "Refresh timestamp unavailable"}
                  </span>
                  <span className="text-[10px] text-cyan-700">
                    Records: {cacheMetadata?.record_count?.toLocaleString() ?? "—"}
                    {typeof cacheMetadata?.refresh_age_seconds === "number" && (
                      <span className="ml-1">· Age {Math.floor(cacheMetadata.refresh_age_seconds / 60)}m</span>
                    )}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 self-end">
                <div className="flex flex-col items-end gap-0.5">
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Ref Cache</span>
                  {refCacheStatus.cachedAt ? (
                    <>
                      <span className={`text-[11px] font-medium ${refCacheStatus.isStale ? "text-amber-600" : "text-slate-500"}`}>
                        Refreshed {new Date(refCacheStatus.cachedAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Expires {new Date(refCacheStatus.expiresAt!).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                        {refCacheStatus.isStale && <span className="ml-1 text-amber-500 font-semibold">· stale</span>}
                      </span>
                    </>
                  ) : (
                    <span className="text-[11px] text-slate-400">Not loaded</span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleRefreshRefCache}
                  disabled={isRefCacheRefreshing}
                  aria-label="Reload ref data cache"
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-500 transition-colors hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span className={`text-sm leading-none ${isRefCacheRefreshing ? "animate-spin" : ""}`}>↻</span>
                </button>
              </div>
            )}
          </div>
          {cacheSourceError && appliedFilters.dataSource === "cache" && (
            <div className="mt-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
              Cache source unavailable: {cacheSourceError}
            </div>
          )}
        </section>

        {/* Filter chips row */}
        <section className="border-b border-slate-200 bg-white px-6 py-3 flex-shrink-0">
          <div className="space-y-3">
            {/* Filter buttons and dropdowns */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">Filter</span>
              {filterOptionsWithOrg.map(({ key, label, options }) => {
                const isOrgsFilter = key === "orgs";
                const safeOptions = Array.isArray(options) ? options : [];
                const defaultOption = isOrgsFilter
                  ? "All Orgs"
                  : (defaultFilters[key as keyof FilterState] as string[])[0];
                const selectedValue = isOrgsFilter ? selectedFilters.orgs : (selectedFilters[key as keyof FilterState] as string[]);
                const appliedValue = isOrgsFilter ? appliedFilters.orgs : (appliedFilters[key as keyof FilterState] as string[]);
                const isOpen = openFilter === key;
                const isApplied = isOrgsFilter ? (appliedValue as string[]).length > 0 : (appliedValue as string[])[0] !== defaultOption;
                const isSelected = isOrgsFilter ? (selectedValue as string[]).length > 0 : (selectedValue as string[])[0] !== defaultOption;
                const selectedCount = isOrgsFilter ? (selectedValue as string[]).length : isSelected ? 1 : 0;
                
                // Disable these filters when using live data (GraphQL)
                const disabledFiltersForLiveData = ["lineOfBusiness", "healthPlan", "superCommunity", "ipa"];
                const isDisabledForLiveData = appliedFilters.dataSource === "graphql" && disabledFiltersForLiveData.includes(key);

                return (
                  <div key={key} className="relative z-50">
                    <button
                      type="button"
                      onClick={() => !isDisabledForLiveData && setOpenFilter(isOpen ? null : key)}
                      disabled={isDisabledForLiveData}
                      title={isDisabledForLiveData ? "This filter is disabled when using Live data" : ""}
                      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition-colors whitespace-nowrap ${
                        isDisabledForLiveData
                          ? "border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed opacity-60"
                          : isSelected
                          ? isApplied 
                            ? "border-cyan-400 bg-cyan-50 text-cyan-800"
                            : "border-amber-400 bg-amber-50 text-amber-800"
                          : isApplied
                          ? "border-cyan-400 bg-cyan-50 text-cyan-800"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {label}
                      {selectedCount > 0 && (
                        <span className={`ml-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none ${
                          isApplied && isSelected
                            ? "bg-cyan-600 text-white"
                            : isApplied
                            ? "bg-cyan-600 text-white"
                            : "bg-amber-600 text-white"
                        }`}>
                          {selectedCount}
                        </span>
                      )}
                      <span className="text-slate-400 text-[10px]">{isOpen ? "▲" : "▼"}</span>
                    </button>
                    {isOpen && !isDisabledForLiveData && (
                      <div className="absolute left-0 top-full mt-1 z-50 min-w-[180px] max-h-64 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-lg">
                        <div className="sticky top-0 flex items-center justify-between border-b border-slate-100 bg-white px-3 py-2">
                          <span className="text-xs font-semibold text-slate-700">{label}</span>
                          {isFilterOptionsLoading && (
                            <span className="text-[10px] font-medium text-slate-400">Loading…</span>
                          )}
                        </div>
                        {safeOptions.length === 0 ? (
                          <p className="px-3 py-2 text-xs text-slate-400">No options available</p>
                        ) : (
                          <ul className="py-1">
                            {safeOptions.map((option) => (
                              <li key={option}>
                                <label className="flex cursor-pointer items-center gap-2 px-3 py-1.5 hover:bg-slate-50">
                                  <input
                                    type="checkbox"
                                    name={key}
                                    value={option}
                                    checked={(selectedValue as string[]).includes(option)}
                                    onChange={() => toggleFilterValue(key, option)}
                                    className="rounded-sm border-slate-300"
                                  />
                                  <span className="text-xs text-slate-700">
                                    {option}
                                    {key === "priority" && dynamicFilterOptions.priorityRefIds[option] && (
                                      <span className="ml-1 text-slate-400 text-[11px]">({dynamicFilterOptions.priorityRefIds[option]})</span>
                                    )}
                                  </span>
                                </label>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
              
              {/* Apply and Clear buttons */}
              {(() => {
                const hasPendingChanges = Object.entries(selectedFilters).some(([key, value]) => {
                  // Skip non-filter fields
                  if (["dateRangePreset", "fromDate", "toDate", "timezone", "year", "month"].includes(key)) {
                    return false;
                  }

                  // Compare current selection with what's already applied
                  const appliedValue = appliedFilters[key as keyof FilterState];

                  if (Array.isArray(value) && Array.isArray(appliedValue)) {
                    if (value.length !== appliedValue.length) return true;
                    return !value.every((v, i) => v === appliedValue[i]);
                  }

                  return value !== appliedValue;
                });
                const hasSelections = Object.entries(selectedFilters).some(([key, value]) => {
                  if (["dateRangePreset", "fromDate", "toDate", "timezone", "year", "month"].includes(key)) {
                    return false;
                  }
                  const defaultValue = defaultFilters[key as keyof FilterState];
                  if (Array.isArray(value) && Array.isArray(defaultValue)) {
                    if (value.length !== defaultValue.length) return true;
                    return !value.every((v, i) => v === defaultValue[i]);
                  }
                  return value !== defaultValue;
                });
                return (
                  <div className="flex gap-2 ml-auto">
                    <button
                      type="button"
                      onClick={applyFilters}
                      disabled={!hasPendingChanges || isLoading}
                      className="cursor-pointer rounded-full border border-cyan-600 bg-cyan-600 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-cyan-700 disabled:cursor-not-allowed disabled:border-slate-300 disabled:bg-slate-300 disabled:opacity-60"
                    >
                      Apply Filters
                    </button>
                    <button
                      type="button"
                      onClick={clearFilterSelections}
                      disabled={!hasSelections}
                      className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Clear
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCharts((current) => !current)}
                      className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50"
                    >
                      {showCharts ? "Hide Charts" : "Show Charts"}
                    </button>
                  </div>
                );
              })()}
            </div>
          </div>
        </section>

        {/* Backdrop to close open filter dropdown */}
        {openFilter && (
          <div className="fixed inset-0 z-40" onClick={() => setOpenFilter(null)} />
        )}
        {showColumnModal && (
          <div className="fixed inset-0 z-40" onClick={() => setShowColumnModal(false)} />
        )}

        {/* Charts row (shown above Auths summary) */}
        <section className="border-b border-slate-200 bg-white px-6 py-3 flex-shrink-0">
          <div className="space-y-3">
            {showCharts && isChartsLoading && chartLoading.status && (
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-medium text-slate-600">
                Loading charts...
              </div>
            )}

            {showCharts && isChartsLoading && !chartLoading.status && (
              <div className="rounded-lg border border-cyan-200 bg-cyan-50 px-4 py-3 text-xs font-medium text-cyan-800">
                Refreshing charts...
              </div>
            )}

            {showCharts && (
              <ChartsGrid
                statusData={chartsData.status}
                priorityData={chartsData.priority}
                requestTypeData={chartsData.requestType}
                orgData={chartsData.org}
                createdDateData={chartsData.createdDate}
                routineTatData={chartsData.routineTat}
                statusLoading={chartLoading.status}
                priorityLoading={chartLoading.priority}
                requestTypeLoading={chartLoading.requestType}
                orgLoading={chartLoading.org}
                createdDateLoading={chartLoading.createdDate}
                routineTatLoading={chartLoading.routineTat}
              />
            )}
          </div>
        </section>

        {/* Results header */}
        <section className="border-b border-slate-200 bg-white px-6 py-3 flex-shrink-0">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-baseline gap-3">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">Auths</h2>
                <span className="text-2xl font-bold tracking-tight text-slate-900">
                  {isLoading ? "…" : totalCount.toLocaleString()}
                </span>
              </div>
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
                <span>
                  Page {currentPage} of {pageCount} &nbsp;·&nbsp; Showing {startRow}–{endRow} of {totalCount.toLocaleString()}
                </span>
                <span className="text-slate-300">·</span>
                <span className="font-medium text-slate-600">{appliedSummary}</span>
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="group relative inline-flex">
                <button
                  type="button"
                  onClick={handleExportCsv}
                  disabled={isLoading || isExportingCsv || totalCount === 0 || totalCount > EXPORT_MAX_RECORDS}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isExportingCsv ? "Exporting..." : "Export CSV"}
                </button>
                {exportDisabledReason && (
                  <span className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 hidden w-max max-w-xs -translate-x-1/2 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-md group-hover:block">
                    {exportDisabledReason}
                  </span>
                )}
              </div>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowColumnModal((current) => !current)}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
                >
                  ⚙ Columns
                </button>
                {showColumnModal && (
                  <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-lg border border-slate-200 bg-white p-2 shadow-lg">
                    <p className="px-2 pb-1 text-xs font-semibold text-slate-700">Visible Columns</p>
                    {TAT_COLUMNS.map((column) => (
                      <label key={column.key} className="flex items-center gap-2 rounded px-2 py-1 text-xs text-slate-700 hover:bg-slate-50">
                        <input
                          type="checkbox"
                          checked={visibleColumns.includes(column.key)}
                          onChange={() => toggleColumn(column.key)}
                          className="rounded border-slate-300"
                        />
                        <span>{column.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
              <label htmlFor="rows-per-page" className="text-xs font-semibold text-slate-500 whitespace-nowrap">
                Rows
              </label>
              <Select
                value={String(pageSize)}
                onValueChange={(value) => {
                  setPageSize(Number(value));
                  setPage(1);
                }}
              >
                <SelectTrigger
                  id="rows-per-page"
                  className="h-9 w-[92px] rounded-lg border-slate-300 bg-white px-2 text-sm text-slate-900 focus:border-slate-400"
                >
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
              <button
                type="button"
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                disabled={currentPage === 1 || isLoading}
                className="rounded-xl border border-slate-300 px-4 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>
              <label htmlFor="page-jump" className="text-xs font-semibold text-slate-500 whitespace-nowrap">
                Page
              </label>
              <input
                id="page-jump"
                type="number"
                min={1}
                max={pageCount}
                value={pageInput}
                onChange={(event) => setPageInput(event.target.value)}
                onBlur={applyPageInput}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    applyPageInput();
                  }
                }}
                className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900 outline-none transition focus:border-slate-400"
              />
              <button
                type="button"
                onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
                disabled={currentPage >= pageCount || isLoading}
                className="rounded-xl border border-slate-300 px-4 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </section>

        {/* Main content area */}
        <section className="flex-1 overflow-auto relative">
          {showInitialLoading && (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-cyan-600"></div>
                <p className="text-sm text-slate-600">Loading data…</p>
              </div>
            </div>
          )}

          {isLoading && records.length > 0 && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/70 backdrop-blur-[1px]">
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-lg">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-cyan-600"></div>
                <span className="text-sm font-medium text-slate-700">Applying filters…</span>
              </div>
            </div>
          )}

          {error && (
            <div className="m-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {!isLoading && !error && records.length === 0 && (
            <div className="flex items-center justify-center py-16">
              <p className="text-sm text-slate-500">No records found for the selected filters.</p>
            </div>
          )}

          {!error && records.length > 0 && (
            <div className="space-y-6 p-6">
              {/* Data Table */}
              <table className="min-w-full text-xs">
              <thead className="sticky top-0 z-10 bg-slate-50">
                <tr className="border-b border-slate-200">
                  {TAT_COLUMNS.filter((column) => visibleColumns.includes(column.key)).map((column) => (
                    <th
                      key={column.key}
                      className="whitespace-nowrap px-4 py-2 text-left font-semibold text-slate-600"
                    >
                      {SORTABLE_COLUMN_KEYS.has(column.key as TatSortColumn) ? (
                        <button
                          type="button"
                          onClick={() => handleSortClick(column.key)}
                          className="inline-flex items-center gap-1 rounded px-1 py-0.5 text-left text-slate-700 transition hover:bg-slate-100"
                          aria-label={`Sort by ${column.label}`}
                        >
                          <span>{column.label}</span>
                          <span
                            className={`inline-block w-3 text-center ${sortBy === column.key ? "text-cyan-700" : "text-transparent"}`}
                            aria-hidden="true"
                          >
                            {sortDir === "asc" ? "↑" : "↓"}
                          </span>
                        </button>
                      ) : (
                        column.label
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => {
                  const orgName = PREHASHED_ORG_BY_ID[record.org_id] ?? record.org_id;
                  return (
                    <tr
                      key={record.hsc_id}
                      className={`border-b border-slate-100 hover:bg-slate-50 ${
                        index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                      }`}
                    >
                      {visibleColumns.includes("hscId") && (
                        <td className="whitespace-nowrap px-4 py-2 font-mono">
                          <a
                            href={`https://localhost:4200/pa/member/${encodeURIComponent(record.indv_id)}/context?action=details&hscId=${encodeURIComponent(record.hsc_id)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-700 underline underline-offset-2 hover:text-cyan-900"
                          >
                            {record.hsc_id}
                          </a>
                        </td>
                      )}
                      {visibleColumns.includes("tatDeadline") && (
                        <td className="whitespace-nowrap px-4 py-2 text-slate-700">{record.tat_due_dttm ? formatDateTimeInZone(record.tat_due_dttm, appliedFilters.timezone) : "—"}</td>
                      )}
                      {visibleColumns.includes("indvId") && (
                        <td className="whitespace-nowrap px-4 py-2 font-mono text-slate-700">{record.indv_id}</td>
                      )}
                      {visibleColumns.includes("authorizationType") && (
                        <td className="whitespace-nowrap px-4 py-2 text-slate-700">
                          {record.auth_typ_label
                            ? <>{record.auth_typ_label}{record.auth_typ_ref_id && <span className="ml-1 text-slate-400 text-[11px]">({record.auth_typ_ref_id})</span>}</>
                            : "—"}
                        </td>
                      )}
                      {visibleColumns.includes("status") && (
                        <td className="whitespace-nowrap px-4 py-2 text-slate-700">
                          {record.hsc_sts_typ_label
                            ? <>{record.hsc_sts_typ_label}{record.hsc_sts_typ_id && <span className="ml-1 text-slate-400 text-[11px]">({record.hsc_sts_typ_id})</span>}</>
                            : "—"}
                        </td>
                      )}
                      {visibleColumns.includes("received") && (
                        <td className="whitespace-nowrap px-4 py-2 text-slate-700">{record.recv_dttm ? formatDateTimeInZone(record.recv_dttm, appliedFilters.timezone) : "—"}</td>
                      )}
                      {visibleColumns.includes("member") && (
                        <td className="px-4 py-2 text-slate-700">{record.member_name ?? "—"}</td>
                      )}
                      {visibleColumns.includes("org") && (
                        <td className="whitespace-nowrap px-4 py-2 text-slate-700">{orgName}</td>
                      )}
                      {visibleColumns.includes("reviewDue") && (
                        <td className="whitespace-nowrap px-4 py-2 text-slate-700">
                          {record.review_due_dttm ? formatDateTimeInZone(record.review_due_dttm, appliedFilters.timezone) : "—"}
                        </td>
                      )}
                      {visibleColumns.includes("timely") && (
                        <td className="whitespace-nowrap px-4 py-2 text-slate-700">{getIsTimelyDisplay(record)}</td>
                      )}
                      {visibleColumns.includes("priority") && (
                        <td className="whitespace-nowrap px-4 py-2 text-slate-700">
                          {record.rev_prr_ref_label
                            ? <>{record.rev_prr_ref_label}{record.rev_prr_ref_id && <span className="ml-1 text-slate-400 text-[11px]">({record.rev_prr_ref_id})</span>}</>
                            : "—"}
                        </td>
                      )}
                      {visibleColumns.includes("authDecision") && (
                        <td className="whitespace-nowrap px-4 py-2 text-slate-700">
                          {record.hsc_sts_typ_label
                            ? <>{record.hsc_sts_typ_label}{record.hsc_sts_typ_id && <span className="ml-1 text-slate-400 text-[11px]">({record.hsc_sts_typ_id})</span>}</>
                            : "—"}
                        </td>
                      )}
                      {visibleColumns.includes("decisioned") && (
                        <td className="whitespace-nowrap px-4 py-2 text-slate-700">{record.decn_rndr_dttm ? formatDateTimeInZone(record.decn_rndr_dttm, appliedFilters.timezone) : "—"}</td>
                      )}
                      {visibleColumns.includes("memberNodTatDeadline") && (
                        <td className="whitespace-nowrap px-4 py-2 text-slate-700">{record.curr_tat_nod_mbr_dttm ? formatDateTimeInZone(record.curr_tat_nod_mbr_dttm, appliedFilters.timezone) : "—"}</td>
                      )}
                      {visibleColumns.includes("providerNodTatDeadline") && (
                        <td className="whitespace-nowrap px-4 py-2 text-slate-700">{record.tat_nod_prov_dttm ? formatDateTimeInZone(record.tat_nod_prov_dttm, appliedFilters.timezone) : "—"}</td>
                      )}
                      {visibleColumns.includes("memberWrittenSent") && (
                        <td className="whitespace-nowrap px-4 py-2 text-slate-700">{record.wrt_decn_mbr_cmnct_dttm ? formatDateTimeInZone(record.wrt_decn_mbr_cmnct_dttm, appliedFilters.timezone) : "—"}</td>
                      )}
                      {visibleColumns.includes("providerWrittenSent") && (
                        <td className="whitespace-nowrap px-4 py-2 text-slate-700">{record.wrt_decn_prov_cmnct_dttm ? formatDateTimeInZone(record.wrt_decn_prov_cmnct_dttm, appliedFilters.timezone) : "—"}</td>
                      )}
                      {visibleColumns.includes("memberVerbalDone") && (
                        <td className="whitespace-nowrap px-4 py-2 text-slate-700">{record.decn_mbr_cmnct_dttm ? formatDateTimeInZone(record.decn_mbr_cmnct_dttm, appliedFilters.timezone) : "—"}</td>
                      )}
                      {visibleColumns.includes("lineOfBusiness") && (
                        <td className="whitespace-nowrap px-4 py-2 text-slate-700">{record.lob ?? "—"}</td>
                      )}
                      {visibleColumns.includes("healthPlan") && (
                        <td className="whitespace-nowrap px-4 py-2 text-slate-700">{record.health_plan ?? "—"}</td>
                      )}
                      {visibleColumns.includes("superCommunity") && (
                        <td className="whitespace-nowrap px-4 py-2 text-slate-700">{record.super_community ?? "—"}</td>
                      )}
                      {visibleColumns.includes("timing") && (
                        <td className="whitespace-nowrap px-4 py-2 text-slate-700">
                          {record.rev_term_typ_ref_label
                            ? <>{record.rev_term_typ_ref_label}{record.rev_term_typ_ref_id && <span className="ml-1 text-slate-400 text-[11px]">({record.rev_term_typ_ref_id})</span>}</>
                            : "—"}
                        </td>
                      )}
                      {visibleColumns.includes("ipa") && (
                        <td className="whitespace-nowrap px-4 py-2 text-slate-700">{record.ipa ?? "—"}</td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>

              <div className="sticky bottom-0 z-10 mt-4 flex flex-wrap items-center justify-end gap-2 border-t border-slate-200 bg-white/95 px-1 pt-3 pb-2 backdrop-blur">
                <label htmlFor="rows-per-page-bottom" className="text-xs font-semibold text-slate-500 whitespace-nowrap">
                  Rows
                </label>
                <Select
                  value={String(pageSize)}
                  onValueChange={(value) => {
                    setPageSize(Number(value));
                    setPage(1);
                  }}
                >
                  <SelectTrigger
                    id="rows-per-page-bottom"
                    className="h-9 w-[92px] rounded-lg border-slate-300 bg-white px-2 text-sm text-slate-900 focus:border-slate-400"
                  >
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
                <button
                  type="button"
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  disabled={currentPage === 1 || isLoading}
                  className="rounded-xl border border-slate-300 px-4 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>
                <label htmlFor="page-jump-bottom" className="text-xs font-semibold text-slate-500 whitespace-nowrap">
                  Page
                </label>
                <input
                  id="page-jump-bottom"
                  type="number"
                  min={1}
                  max={pageCount}
                  value={pageInput}
                  onChange={(event) => setPageInput(event.target.value)}
                  onBlur={applyPageInput}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      applyPageInput();
                    }
                  }}
                  className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
                  disabled={currentPage >= pageCount || isLoading}
                  className="rounded-xl border border-slate-300 px-4 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}