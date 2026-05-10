import { formatDate, formatDateTime } from "@/lib/formats";
import { PREHASHED_ORG_BY_ID } from "@/lib/constants/orgs";
import type { HscRecord } from "@/features/adm/services/inpatient-census-service";

export const UM_INPATIENT_CENSUS_EXPORT_HEADERS = [
  "Auth ID",
  "Member Name",
  "Subscriber ID",
  "Received",
  "Actual Admitted",
  "Next Review",
  "Admit Type",
  "LOS",
  "POS",
  "Service Detail",
  "Admitting Provider",
  "Facility",
  "Admitting Diagnosis",
  "Health Plan",
  "Line of Business",
  "PCP",
  "HCE Level",
  "HCE Readmission Risk",
  "Readmission",
  "Risk Score Assessment",
  "Referral Pathway",
  "Member State",
  "Clinician",
  "Total Approved",
  "Total Denied",
  "BH",
  "Medicare No",
  "DOB",
  "Super Community",
  "IPA",
  "Org",
] as const;

export function mapHscToInpatientCensusExportRow(
  hsc: HscRecord,
  refLookup: Map<number, string>,
): Array<string | number> {
  const resolveRef = (id: number | undefined | null): string => {
    if (id == null) return "/";
    return refLookup.get(id) || String(id);
  };

  const coverage = normalizeCoverageDetail(hsc.mbr_cov_dtl);
  const eligibility = coverage?.memberEligibilities?.[0];

  const memberName = buildMemberName(coverage?.firstName, coverage?.lastName, hsc.indv_id);
  const subscriberId = eligibility?.subscriberId || String(hsc.indv_id || "/");
  const nextReview = formatValidDateOrSlash(hsc.hsc_facl_nxt_rvw_dt);
  const lineOfBusiness = extractLineOfBusiness(coverage);
  const pcpName = extractPcpName(eligibility);
  const memberState = extractMemberState(coverage, resolveRef);
  const medicareNo = coverage?.mbiId || "/";
  const dob = formatValidDateOrSlash(coverage?.birthDate);

  return [
    hsc.hsc_id || "/",
    memberName,
    subscriberId,
    formatDateTime(hsc.creat_dttm),
    hsc.hsc_facl_actul_admis_dttm ? formatDate(hsc.hsc_facl_actul_admis_dttm) : "/",
    nextReview,
    resolveUnknown(resolveRef(hsc.auth_typ_ref_id)),
    calculateLos(hsc.hsc_facl_actul_admis_dttm),
    "Inpatient",
    resolveUnknown(resolveRef(hsc.hsc_facl_srvc_dtl_ref_id) || hsc.rev_prr_rsn_txt || "/"),
    resolveUnknown(hsc.hsc_prov_admitting_prov_name || "/"),
    resolveUnknown(hsc.hsc_prov_facility_name || hsc.org_id || "/"),
    resolveUnknown(hsc.hsc_diag_admitting_diag_desc || "/"),
    resolveUnknown(eligibility?.healthPlanName || "/"),
    lineOfBusiness,
    pcpName,
    resolveUnknown(hsc.pha_id_strat_hce_level || "/"),
    String(hsc.hsc_decn_readmis_risk_scor_id ?? "/"),
    resolveUnknown(hsc.hsc_facl_dschrg_dt_fr_ip_census || "/"),
    String(hsc.pha_readmit_risk_readmit_risk ?? "/"),
    resolveUnknown(hsc.pha_id_strat_referral_pathway || "/"),
    resolveUnknown(memberState),
    resolveUnknown(hsc.hsr_asgn_clinician_name || "/"),
    hsc.hsc_facl_approved_bed_day_cnt ?? 0,
    hsc.hsc_facl_denied_bed_day_cnt ?? 0,
    resolveUnknown(hsc.pha_id_strat_behavioral_health_category || "/"),
    resolveUnknown(medicareNo),
    dob,
    resolveUnknown(eligibility?.eligibilityPod?.superCommunity || "/"),
    resolveUnknown(eligibility?.eligibilityPod?.podName || "/"),
    resolveOrgName(hsc.org_id),
  ];
}

type MemberEligibility = {
  subscriberId?: string;
  lobValue?: string;
  healthPlanName?: string;
  pcp?: {
    name?: string;
  };
  pcpInfo?: {
    name?: string;
  };
  eligibilityPod?: {
    superCommunity?: string;
    podName?: string;
  };
};

type MemberAddress = {
  state?: string;
  stateValue?: string;
};

type CoverageDetail = {
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  mbiId?: string;
  memberAddresses?: MemberAddress[];
  memberEligibilities?: MemberEligibility[];
};

function normalizeCoverageDetail(value: unknown): CoverageDetail | null {
  if (!value) {
    return null;
  }

  if (typeof value === "string") {
    try {
      return JSON.parse(value) as CoverageDetail;
    } catch {
      return null;
    }
  }

  if (typeof value === "object") {
    return value as CoverageDetail;
  }

  return null;
}

function buildMemberName(firstName?: string, lastName?: string, fallback?: string): string {
  const first = (firstName || "").trim();
  const last = (lastName || "").trim();

  if (first || last) {
    const comma = first && last ? ", " : "";
    return `${last}${comma}${first}`.trim();
  }

  return fallback ? String(fallback) : "/";
}

function extractLineOfBusiness(coverage: CoverageDetail | null): string {
  const eligibilities = coverage?.memberEligibilities || [];
  if (eligibilities.length === 0) {
    return "/";
  }

  const values = Array.from(
    new Set(
      eligibilities
        .map((eligibility) => (eligibility.lobValue ? String(eligibility.lobValue).trim() : ""))
        .filter((value) => value.length > 0),
    ),
  );

  return values.length > 0 ? values.join(", ") : "/";
}

function extractPcpName(eligibility?: MemberEligibility): string {
  const pcpName = eligibility?.pcp?.name || eligibility?.pcpInfo?.name || "";
  const normalized = String(pcpName).trim();
  return normalized || "/";
}

function extractMemberState(
  coverage: CoverageDetail | null,
  resolveRef: (id: number | undefined | null) => string,
): string {
  const addresses = coverage?.memberAddresses || [];
  if (addresses.length === 0) {
    return "/";
  }

  const preferred =
    addresses.find((address) => (address.stateValue || "").trim().length > 0) || addresses[0];
  if (!preferred) {
    return "/";
  }

  const stateValue = (preferred.stateValue || "").trim();
  if (stateValue) {
    return stateValue;
  }

  const stateRefId = Number(preferred.state);
  if (!Number.isNaN(stateRefId)) {
    const resolved = resolveRef(stateRefId).trim();
    if (resolved) {
      return resolved;
    }
  }

  return "/";
}

function formatValidDateOrSlash(value?: string): string {
  if (!value) {
    return "/";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return "/";
  }

  return formatDate(parsed);
}

function calculateLos(actualAdmittedDate: string | undefined): number {
  if (!actualAdmittedDate) {
    return 0;
  }

  const admitted = new Date(`${actualAdmittedDate}T12:00:00Z`);
  if (Number.isNaN(admitted.getTime())) {
    return 0;
  }

  const today = new Date();
  const current = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
  const admittedUtc = Date.UTC(admitted.getUTCFullYear(), admitted.getUTCMonth(), admitted.getUTCDate());

  return Math.max(0, Math.floor((current - admittedUtc) / (24 * 60 * 60 * 1000)));
}

function resolveOrgName(orgId?: string): string {
  if (!orgId) {
    return "/";
  }

  const normalized = String(orgId).trim();
  return PREHASHED_ORG_BY_ID[normalized] || normalized;
}

function resolveUnknown(value: string): string {
  return value.trim().toLowerCase() === "unknown" ? "/" : value;
}
