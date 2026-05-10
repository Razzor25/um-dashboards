"use client";

import React, { useMemo, useState, useEffect } from "react";
import { getHscRecords } from "@/features/adm/actions/inpatient-census-actions";
import { formatDate, formatDateTime } from "@/lib/formats";
import { PREHASHED_ORG_BY_ID } from "@/lib/constants/orgs";
import { FilterSelect } from "@/app/components/FilterSelect";
import { FilterChip } from "@/app/components/FilterChip";
import type { HscRecord, DateRangeKey } from "@/features/adm/services/inpatient-census-service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@uhg-netra-ai/core-react-components/ui/select";

type StatusFilter =
  | "Active Admissions"
  | "Discharged Pending Closure"
  | "Discharged Closed"
  | "Anticipated Admission"
  | "Other";

type AuthRecord = {
  authId: string;
  subscriberId: string;
  received: string;
  receivedAt: string;
  actualAdmitted: string;
  nextReview: string;
  admitType: string;
  los: number;
  pos: string;
  serviceDetail: string;
  member: string;
  admittingDiagnosis: string;
    admittingProvider: string;
    facility: string;
  healthPlan: string;
  lineOfBusiness: string;
  pcp: string;
  hceLevel: string;
  hceReadmissionRisk: string;
  readmission: string;
  riskScoreAssessment: string;
  referralPathway: string;
  memberState: string;
  clinician: string;
  totalApproved: number;
  totalDenied: number;
  bh: string;
  medicareNo: string;
  dob: string;
  superCommunity: string;
  ipa: string;
  org: string;
  status: StatusFilter;
};

type SortKey =
  | "authId"
  | "member"
  | "subscriberId"
  | "received"
  | "actualAdmitted"
  | "nextReview"
  | "admitType"
  | "los"
  | "pos"
  | "serviceDetail"
  | "admittingProvider"
  | "facility"
  | "member"
  | "admittingDiagnosis"
  | "healthPlan"
  | "lineOfBusiness"
  | "pcp"
  | "hceLevel"
  | "hceReadmissionRisk"
  | "readmission"
  | "riskScoreAssessment"
  | "referralPathway"
  | "memberState"
  | "clinician"
  | "totalApproved"
  | "totalDenied"
  | "bh"
  | "medicareNo"
  | "dob"
  | "superCommunity"
  | "ipa"
  | "org";

const DEFAULT_PAGE_SIZE = 50;
const PAGE_SIZE_OPTIONS = [50, 100, 200, 500];

type FilterKey =
  | "admitType"
  | "clinician"
  | "facility"
  | "hceLevel"
  | "hceReadmissionRisk"
  | "healthPlan"
  | "memberState"
  | "bh"
  | "org"
  | "serviceDetail"
  | "ipa";

const MULTISELECT_FILTERS: { key: FilterKey; label: string }[] = [
  { key: "admitType", label: "Admit Type" },
  { key: "clinician", label: "Clinician" },
  { key: "facility", label: "Facility" },
  { key: "hceLevel", label: "HCE Level" },
  { key: "hceReadmissionRisk", label: "HCE Readmission Risk" },
  { key: "healthPlan", label: "Health Plan" },
  { key: "memberState", label: "Member State" },
  { key: "bh", label: "BH" },
  { key: "org", label: "Org" },
  { key: "serviceDetail", label: "Service Detail" },
  { key: "ipa", label: "IPA" },
];

const dateRanges: { key: DateRangeKey; label: string }[] = [
  { key: "ytd", label: "Year to date" },
  { key: "last3Years", label: "Last 3 years" },
  { key: "lastYear", label: "Last year" },
  { key: "last3Months", label: "Last 3 months" },
  { key: "lastMonth", label: "Last month" },
  { key: "lastWeek", label: "Last week" },
  { key: "today", label: "Today" },
];

const statusFilters: StatusFilter[] = [
  "Active Admissions",
  "Discharged Pending Closure",
  "Discharged Closed",
  "Anticipated Admission",
  "Other",
];

const CHIP_STATUS_DETAILS: Record<StatusFilter, Array<{ id: number; label: string }>> = {
  "Active Admissions": [
    { id: 1004238, label: "Open (Admitted)" },
  ],
  "Discharged Pending Closure": [
    { id: 1004239, label: "Open (Discharged)" },
  ],
  "Discharged Closed": [
    { id: 1006597, label: "Closed (Discharged)" },
  ],
  "Anticipated Admission": [
    { id: 1002259, label: "Draft" },
    { id: 1005617, label: "Draft Not Submitted" },
  ],
  "Other": [
    { id: 1000894, label: "Canceled" },
    { id: 1002526, label: "Abandoned" },
    { id: 1004361, label: "Terminated" },
    { id: 1005694, label: "Draft Expired" },
  ],
};

type ColumnGroup = {
  name: string;
  columns: { key: SortKey; label: string; hscField: string }[];
};

const columnGroups: ColumnGroup[] = [
  {
    name: "Requested Order",
    columns: [
      { key: "authId", label: "Auth ID", hscField: "hsc_id" },
      { key: "member", label: "Member Name", hscField: "mbr_cov_dtl.lastName, mbr_cov_dtl.firstName" },
      { key: "subscriberId", label: "Subscriber ID", hscField: "mbr_cov_dtl.memberEligibilities[0].subscriberId" },
      { key: "received", label: "Received", hscField: "creat_dttm" },
      { key: "actualAdmitted", label: "Actual Admitted", hscField: "hsc_facl.actul_admis_dttm::date" },
      { key: "nextReview", label: "Next Review", hscField: "hsc_facl.nxt_rvw_dt" },
      { key: "admitType", label: "Admit Type", hscField: "ref_id: hsc_facl.admis_typ_ref_id" },
      { key: "los", label: "LOS", hscField: "hsc_facl.actul_admis_dttm" },
      { key: "pos", label: "POS", hscField: "ref_id: hsc.srvc_pl_ref_id" },
      { key: "serviceDetail", label: "Service Detail", hscField: "hsc_facl.srvc_dtl_ref_id" },
      { key: "admittingProvider", label: "Admitting Provider", hscField: "hsc_prov.prov_role_ref_id=1002775" },
      { key: "facility", label: "Facility", hscField: "hsc_prov.prov_role_ref_id=1000908" },
      { key: "admittingDiagnosis", label: "Admitting Diagnosis", hscField: "hsc_diag(diag_typ_ref_id=1004535, pri_ind=1) -> icd10.full_desc" },
      { key: "healthPlan", label: "Health Plan", hscField: "mbr_cov_dtl.memberEligibilities[0].healthPlanName" },
      { key: "lineOfBusiness", label: "Line of Business", hscField: "jsonb_array_elements(mbr_cov_dtl.memberEligibilities)->>lobValue" },
      { key: "pcp", label: "PCP", hscField: "mbr_cov_dtl.memberEligibilities[0].pcp.name" },
      { key: "hceLevel", label: "HCE Level", hscField: "pha_id_strat.hce_level (joined by indv_id)" },
      { key: "hceReadmissionRisk", label: "HCE Readmission Risk", hscField: "hsc_decn.readmis_risk_scor_id" },
      { key: "readmission", label: "Readmission", hscField: "hsc_facl.dschrg_dt_fr_ip_census" },
      { key: "riskScoreAssessment", label: "Risk Score Assessment", hscField: "pha_readmit_risk.readmit_risk" },
      { key: "referralPathway", label: "Referral Pathway", hscField: "pha_id_strat.referral_pathway (joined by indv_id)" },
      { key: "memberState", label: "Member State", hscField: "mbr_cov_dtl.memberAddresses[0].stateValue" },
      { key: "clinician", label: "Clinician", hscField: "hsr_asgn.asgn_to_user_nm (asgn_typ_ref_id=1002281)" },
      { key: "totalApproved", label: "Total Approved", hscField: "hsc_facl.approved_bed_day_cnt" },
      { key: "totalDenied", label: "Total Denied", hscField: "hsc_facl.denied_bed_day_cnt" },
      { key: "bh", label: "BH", hscField: "pha_id_strat.behavioral_health_category (joined by indv_id)" },
      { key: "medicareNo", label: "Medicare No", hscField: "mbr_cov_dtl.mbiId" },
      { key: "dob", label: "DOB", hscField: "mbr_cov_dtl.birthDate" },
      { key: "superCommunity", label: "Super Community", hscField: "mbr_cov_dtl.memberEligibilities[0].eligibilityPod.superCommunity" },
      { key: "ipa", label: "IPA", hscField: "mbr_cov_dtl.memberEligibilities[0].eligibilityPod.podName" },
      { key: "org", label: "Org", hscField: "org_id -> PREHASHED_ORG_BY_ID" },
    ],
  },
];

// Flatten for easy lookup
const columns: { key: SortKey; label: string; hscField: string }[] = columnGroups.flatMap((g) => g.columns);

const authRecords: Array<Partial<AuthRecord>> = [
  {
    authId: "AUTH-10241",
    subscriberId: "SUB-884201",
    received: "Apr 21, 2026",
    receivedAt: "2026-04-21",
    actualAdmitted: "Apr 21, 2026",
    nextReview: "Apr 24, 2026",
    admitType: "Urgent",
    los: 4,
    pos: "Inpatient",
    serviceDetail: "Medical stabilization",
    admittingProvider: "Dr. L. Patel",
    member: "Amelia Torres",
    facility: "Northside Medical Center",
    admittingDiagnosis: "CHF exacerbation",
    healthPlan: "UnitedHealthcare",
    lineOfBusiness: "Medicaid",
    pcp: "Dr. E. Harper",
    hceLevel: "Level 2",
    hceReadmissionRisk: "High",
    readmission: "Yes",
    riskScoreAssessment: "8.9",
    referralPathway: "ED",
    memberState: "TX",
    totalApproved: 4,
    totalDenied: 0,
    bh: "No",
    medicareNo: "M1024901",
    dob: "02/14/1954",
    superCommunity: "Gulf Coast",
    ipa: "Lone Star IPA",
    org: "Optum South",
    status: "Active Admissions",
  },
  {
    authId: "AUTH-10237",
    subscriberId: "SUB-884155",
    received: "Apr 19, 2026",
    receivedAt: "2026-04-19",
    actualAdmitted: "Apr 20, 2026",
    nextReview: "Apr 23, 2026",
    admitType: "Elective",
    los: 2,
    pos: "Inpatient",
    serviceDetail: "Post-op monitoring",
    admittingProvider: "Dr. K. Morgan",
    member: "Joseph Kim",
    facility: "Curo Regional Hospital",
    admittingDiagnosis: "Hip replacement",
    healthPlan: "UnitedHealthcare",
    lineOfBusiness: "Commercial",
    pcp: "Dr. R. Mason",
    hceLevel: "Level 1",
    hceReadmissionRisk: "Medium",
    readmission: "No",
    riskScoreAssessment: "5.4",
    referralPathway: "Direct Admit",
    memberState: "AZ",
    totalApproved: 2,
    totalDenied: 0,
    bh: "No",
    medicareNo: "M1024877",
    dob: "11/06/1961",
    superCommunity: "Desert Valley",
    ipa: "Sonoran IPA",
    org: "Optum West",
    status: "Active Admissions",
  },
  {
    authId: "AUTH-10229",
    subscriberId: "SUB-884002",
    received: "Apr 17, 2026",
    receivedAt: "2026-04-17",
    actualAdmitted: "Apr 18, 2026",
    nextReview: "Closed",
    admitType: "Urgent",
    los: 6,
    pos: "Inpatient",
    serviceDetail: "Respiratory management",
    admittingProvider: "Dr. P. Owens",
    member: "Diana Brooks",
    facility: "St. Mary Health",
    admittingDiagnosis: "COPD flare",
    healthPlan: "UnitedHealthcare",
    lineOfBusiness: "Medicare",
    pcp: "Dr. S. Lane",
    hceLevel: "Level 3",
    hceReadmissionRisk: "High",
    readmission: "Yes",
    riskScoreAssessment: "9.1",
    referralPathway: "ED",
    memberState: "NM",
    totalApproved: 6,
    totalDenied: 1,
    bh: "No",
    medicareNo: "M1024812",
    dob: "09/02/1949",
    superCommunity: "High Plains",
    ipa: "Mesa IPA",
    org: "Optum Southwest",
    status: "Discharged Pending Closure",
  },
  {
    authId: "AUTH-10214",
    subscriberId: "SUB-883921",
    received: "Apr 15, 2026",
    receivedAt: "2026-04-15",
    actualAdmitted: "Pending",
    nextReview: "Apr 22, 2026",
    admitType: "Observation",
    los: 1,
    pos: "Facility",
    serviceDetail: "Chest pain workup",
    admittingProvider: "Dr. N. Ibrahim",
    member: "Marcus Allen",
    facility: "Eastview Community Hospital",
    admittingDiagnosis: "Rule out ACS",
    healthPlan: "UnitedHealthcare",
    lineOfBusiness: "Commercial",
    pcp: "Dr. V. Simon",
    hceLevel: "Level 1",
    hceReadmissionRisk: "Low",
    readmission: "No",
    riskScoreAssessment: "3.6",
    referralPathway: "PCP",
    memberState: "TX",
    totalApproved: 1,
    totalDenied: 0,
    bh: "No",
    medicareNo: "M1024788",
    dob: "03/29/1980",
    superCommunity: "Metroplex",
    ipa: "North Texas IPA",
    org: "Optum South",
    status: "Anticipated Admission",
  },
  {
    authId: "AUTH-10188",
    subscriberId: "SUB-883610",
    received: "Apr 10, 2026",
    receivedAt: "2026-04-10",
    actualAdmitted: "Apr 11, 2026",
    nextReview: "Apr 22, 2026",
    admitType: "Urgent",
    los: 11,
    pos: "Inpatient",
    serviceDetail: "Sepsis treatment",
    admittingProvider: "Dr. A. Reeves",
    member: "Gloria Young",
    facility: "Lakeshore Medical",
    admittingDiagnosis: "Sepsis",
    healthPlan: "UnitedHealthcare",
    lineOfBusiness: "Medicare",
    pcp: "Dr. H. Lowe",
    hceLevel: "Level 4",
    hceReadmissionRisk: "High",
    readmission: "No",
    riskScoreAssessment: "9.5",
    referralPathway: "ED",
    memberState: "OK",
    totalApproved: 10,
    totalDenied: 1,
    bh: "No",
    medicareNo: "M1024622",
    dob: "07/18/1947",
    superCommunity: "Red River",
    ipa: "Prairie IPA",
    org: "Optum Central",
    status: "Active Admissions",
  },
  {
    authId: "AUTH-10140",
    subscriberId: "SUB-883211",
    received: "Mar 27, 2026",
    receivedAt: "2026-03-27",
    actualAdmitted: "Mar 28, 2026",
    nextReview: "Closed",
    admitType: "Elective",
    los: 3,
    pos: "Inpatient",
    serviceDetail: "Cardiac monitoring",
    admittingProvider: "Dr. C. Quinn",
    member: "Helen Price",
    facility: "Riverbend Heart Institute",
    admittingDiagnosis: "AFib",
    healthPlan: "UnitedHealthcare",
    lineOfBusiness: "Commercial",
    pcp: "Dr. F. Grant",
    hceLevel: "Level 2",
    hceReadmissionRisk: "Medium",
    readmission: "No",
    riskScoreAssessment: "6.2",
    referralPathway: "Specialist",
    memberState: "CO",
    totalApproved: 3,
    totalDenied: 0,
    bh: "No",
    medicareNo: "M1024330",
    dob: "04/25/1958",
    superCommunity: "Front Range",
    ipa: "Rocky Mountain IPA",
    org: "Optum Mountain",
    status: "Discharged Pending Closure",
  },
  {
    authId: "AUTH-10094",
    subscriberId: "SUB-882845",
    received: "Mar 03, 2026",
    receivedAt: "2026-03-03",
    actualAdmitted: "Pending",
    nextReview: "Apr 22, 2026",
    admitType: "Urgent",
    los: 2,
    pos: "Inpatient",
    serviceDetail: "Behavioral health stabilization",
    admittingProvider: "Dr. T. Booker",
    member: "Naomi Sanders",
    facility: "Harborview Behavioral Health",
    admittingDiagnosis: "Major depression",
    healthPlan: "UnitedHealthcare",
    lineOfBusiness: "Medicaid",
    pcp: "Dr. M. Ellis",
    hceLevel: "Level 2",
    hceReadmissionRisk: "Medium",
    readmission: "Yes",
    riskScoreAssessment: "7.0",
    referralPathway: "Behavioral Health",
    memberState: "CA",
    totalApproved: 2,
    totalDenied: 0,
    bh: "Yes",
    medicareNo: "M1024019",
    dob: "08/15/1989",
    superCommunity: "Pacific Care",
    ipa: "Bay Area IPA",
    org: "Optum West",
    status: "Anticipated Admission",
  },
  {
    authId: "AUTH-10031",
    subscriberId: "SUB-882490",
    received: "Feb 12, 2026",
    receivedAt: "2026-02-12",
    actualAdmitted: "Feb 13, 2026",
    nextReview: "Closed",
    admitType: "Urgent",
    los: 8,
    pos: "Inpatient",
    serviceDetail: "Stroke recovery",
    admittingProvider: "Dr. J. Alvarez",
    member: "Walter Gomez",
    facility: "Mercy General",
    admittingDiagnosis: "Ischemic stroke",
    healthPlan: "UnitedHealthcare",
    lineOfBusiness: "Medicare",
    pcp: "Dr. D. Peters",
    hceLevel: "Level 4",
    hceReadmissionRisk: "High",
    readmission: "No",
    riskScoreAssessment: "8.3",
    referralPathway: "ED",
    memberState: "NV",
    totalApproved: 8,
    totalDenied: 0,
    bh: "No",
    medicareNo: "M1023621",
    dob: "12/05/1951",
    superCommunity: "Silver State",
    ipa: "Desert Plains IPA",
    org: "Optum West",
    status: "Discharged Pending Closure",
  },
  {
    authId: "AUTH-09987",
    subscriberId: "SUB-881955",
    received: "Jan 29, 2026",
    receivedAt: "2026-01-29",
    actualAdmitted: "Jan 30, 2026",
    nextReview: "Feb 02, 2026",
    admitType: "Elective",
    los: 5,
    pos: "Inpatient",
    serviceDetail: "Spinal fusion",
    admittingProvider: "Dr. R. Duncan",
    member: "Patricia Cole",
    facility: "Summit Orthopedics",
    admittingDiagnosis: "Lumbar stenosis",
    healthPlan: "UnitedHealthcare",
    lineOfBusiness: "Commercial",
    pcp: "Dr. C. Burke",
    hceLevel: "Level 2",
    hceReadmissionRisk: "Low",
    readmission: "No",
    riskScoreAssessment: "4.2",
    referralPathway: "Specialist",
    memberState: "UT",
    totalApproved: 5,
    totalDenied: 0,
    bh: "No",
    medicareNo: "M1023188",
    dob: "06/10/1963",
    superCommunity: "Wasatch",
    ipa: "Summit IPA",
    org: "Optum Mountain",
    status: "Active Admissions",
  },
  {
    authId: "AUTH-09910",
    subscriberId: "SUB-881500",
    received: "Dec 18, 2025",
    receivedAt: "2025-12-18",
    actualAdmitted: "Dec 19, 2025",
    nextReview: "Closed",
    admitType: "Urgent",
    los: 7,
    pos: "Inpatient",
    serviceDetail: "Diabetic ketoacidosis",
    admittingProvider: "Dr. G. Watts",
    member: "Olivia Murphy",
    facility: "Cedar Valley Hospital",
    admittingDiagnosis: "DKA",
    healthPlan: "UnitedHealthcare",
    lineOfBusiness: "Medicaid",
    pcp: "Dr. T. Cole",
    hceLevel: "Level 3",
    hceReadmissionRisk: "Medium",
    readmission: "Yes",
    riskScoreAssessment: "7.7",
    referralPathway: "ED",
    memberState: "KS",
    totalApproved: 6,
    totalDenied: 1,
    bh: "No",
    medicareNo: "M1022710",
    dob: "01/22/1972",
    superCommunity: "Plains Care",
    ipa: "Heartland IPA",
    org: "Optum Central",
    status: "Discharged Pending Closure",
  },
];

function transformHscToAuthRecord(hsc: HscRecord, index: number, ref: Record<number, string>): AuthRecord {
  const creatDttm = new Date(hsc.creat_dttm);
  const resolve = (id: number | undefined | null) => (id != null ? (ref[id] ?? String(id)) : "");
  const subscriberId = extractSubscriberId(hsc.mbr_cov_dtl, hsc.indv_id, index);
  const los = calculateLos(hsc.hsc_facl_actul_admis_dttm);
  const pcpName = extractPcpName(hsc.mbr_cov_dtl);
  const nextReview = formatValidDateOrBlank(hsc.hsc_facl_nxt_rvw_dt);
  const eligibility = extractPrimaryEligibility(hsc.mbr_cov_dtl);
  const lineOfBusiness = extractLineOfBusiness(hsc.mbr_cov_dtl);
  const medicareNo = extractMedicareNo(hsc.mbr_cov_dtl);
  const memberName = extractMemberName(hsc.mbr_cov_dtl, hsc.indv_id);
  const memberState = extractMemberState(hsc.mbr_cov_dtl, resolve);

  return {
    authId: String(hsc.hsc_id) || `AUTH-${index}`,
    subscriberId,
    received: formatDateTime(creatDttm),
    receivedAt: (hsc.creat_dttm || "").split("T")[0] ?? "",
    actualAdmitted: hsc.hsc_facl_actul_admis_dttm ? formatDate(new Date(hsc.hsc_facl_actul_admis_dttm)) : "Pending",
    nextReview,
    admitType: resolve(hsc.auth_typ_ref_id) || "Unknown",
    los,
    pos: "-",
    serviceDetail: resolve(hsc.hsc_facl_srvc_dtl_ref_id) || hsc.rev_prr_rsn_txt || "Service",
    member: memberName,
    admittingProvider: hsc.hsc_prov_admitting_prov_name || "Unknown",
    facility: hsc.hsc_prov_facility_name || hsc.org_id || "Unknown",
    admittingDiagnosis: hsc.hsc_diag_admitting_diag_desc || "Unknown",
    healthPlan: eligibility?.healthPlanName || "Unknown",
    lineOfBusiness,
    pcp: pcpName,
    hceLevel: hsc.pha_id_strat_hce_level || "Unknown",
    hceReadmissionRisk: String(hsc.hsc_decn_readmis_risk_scor_id ?? ""),
    readmission: hsc.hsc_facl_dschrg_dt_fr_ip_census || "",
    riskScoreAssessment: String(hsc.pha_readmit_risk_readmit_risk ?? ""),
    referralPathway: hsc.pha_id_strat_referral_pathway || "Unknown",
    memberState,
    clinician: hsc.hsr_asgn_clinician_name || "Unknown",
    totalApproved: hsc.hsc_facl_approved_bed_day_cnt ?? 0,
    totalDenied: hsc.hsc_facl_denied_bed_day_cnt ?? 0,
    bh: hsc.pha_id_strat_behavioral_health_category || "Unknown",
    medicareNo,
    dob: "/",
    superCommunity: eligibility?.eligibilityPod?.superCommunity || "Unknown",
    ipa: eligibility?.eligibilityPod?.podName || "Unknown",
    org: resolveOrgName(hsc.org_id),
    status: "Active Admissions" as StatusFilter,
  };
}

function resolveOrgName(orgId?: string): string {
  if (!orgId) {
    return "Unknown";
  }

  const normalized = String(orgId).trim();
  return PREHASHED_ORG_BY_ID[normalized] || normalized;
}

function formatValidDateOrBlank(value?: string): string {
  if (!value) {
    return "";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return "";
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
  const msPerDay = 24 * 60 * 60 * 1000;

  return Math.max(0, Math.floor((current - admittedUtc) / msPerDay));
}

type MemberEligibility = {
  subscriberId?: string;
  lobValue?: string;
  healthPlanName?: string;
  eligibilityPod?: {
    superCommunity?: string;
    podName?: string;
  };
};

type MemberCoverageDetail = {
  firstName?: string;
  lastName?: string;
  mbiId?: string;
  memberAddresses?: Array<{
    state?: string;
    stateValue?: string;
  }>;
  memberEligibilities?: MemberEligibility[];
};

function extractMemberState(
  coverageDetail: unknown,
  resolveRef: (id: number | undefined | null) => string,
): string {
  const detail = normalizeCoverageDetail(coverageDetail);
  const addresses = detail?.memberAddresses ?? [];
  if (addresses.length === 0) {
    return "-";
  }

  const preferred =
    addresses.find((address) => (address.stateValue || "").trim().length > 0) || addresses[0];

  if (!preferred) {
    return "-";
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

  return "-";
}

function extractMemberName(coverageDetail: unknown, fallbackIndvId?: string): string {
  const detail = normalizeCoverageDetail(coverageDetail);
  return buildMemberName(detail?.firstName, detail?.lastName, fallbackIndvId);
}

function buildMemberName(firstName?: string, lastName?: string, fallback?: string): string {
  const first = (firstName || "").trim();
  const last = (lastName || "").trim();

  if (first || last) {
    const comma = first && last ? ", " : "";
    return `${last}${comma}${first}`.trim();
  }

  return fallback ? String(fallback) : "Unknown";
}

function extractSubscriberId(
  coverageDetail: unknown,
  fallbackIndvId: string,
  index: number,
): string {
  const detail = normalizeCoverageDetail(coverageDetail);
  const eligibilities = detail?.memberEligibilities ?? [];

  if (eligibilities.length > 1) {
    return "<multiple eligibilities>";
  }

  if (eligibilities.length === 1) {
    const firstEligibility = eligibilities[0];
    if (firstEligibility) {
      return firstEligibility.subscriberId || String(fallbackIndvId) || `SUB-${index}`;
    }
  }

  return String(fallbackIndvId) || `SUB-${index}`;
}

function extractPcpName(coverageDetail: unknown): string {
  const detail = normalizeCoverageDetail(coverageDetail);
  const eligibilities = detail?.memberEligibilities ?? [];

  if (eligibilities.length === 0) return "Unknown";

  const pcpName = (eligibilities[0] as any)?.pcp?.name;
  return pcpName ? String(pcpName).trim() : "Unknown";
}

function extractPrimaryEligibility(coverageDetail: unknown): MemberEligibility | null {
  const detail = normalizeCoverageDetail(coverageDetail);
  const eligibilities = detail?.memberEligibilities ?? [];
  return eligibilities.length > 0 ? (eligibilities[0] ?? null) : null;
}

function extractLineOfBusiness(coverageDetail: unknown): string {
  const detail = normalizeCoverageDetail(coverageDetail);
  const eligibilities = detail?.memberEligibilities ?? [];

  if (eligibilities.length === 0) {
    return "Unknown";
  }

  const lobValues = Array.from(
    new Set(
      eligibilities
        .map((eligibility) => (eligibility.lobValue ? String(eligibility.lobValue).trim() : ""))
        .filter((value) => value.length > 0),
    ),
  );

  return lobValues.length > 0 ? lobValues.join(", ") : "Unknown";
}

function extractMedicareNo(coverageDetail: unknown): string {
  const detail = normalizeCoverageDetail(coverageDetail);
  const mbiId = detail?.mbiId;
  return mbiId ? String(mbiId).trim() : "Unknown";
}

function normalizeCoverageDetail(value: unknown): MemberCoverageDetail | null {
  if (!value) {
    return null;
  }

  if (typeof value === "string") {
    try {
      return JSON.parse(value) as MemberCoverageDetail;
    } catch {
      return null;
    }
  }

  if (typeof value === "object") {
    return value as MemberCoverageDetail;
  }

  return null;
}

export default function UmInpatientCensusPage() {
  const [dateRange, setDateRange] = useState<DateRangeKey>("today");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("Active Admissions");
  const [sortKey, setSortKey] = useState<SortKey>("received");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [records, setRecords] = useState<AuthRecord[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleColumns, setVisibleColumns] = useState<Set<SortKey>>(
    new Set(columns.map((c) => c.key))
  );
  const [forceShownColumns, setForceShownColumns] = useState<Set<SortKey>>(new Set());
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());
  const [showColumnModal, setShowColumnModal] = useState(false);
  const [isExportingCsv, setIsExportingCsv] = useState(false);
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [columnFilters, setColumnFilters] = useState<Record<string, Set<string>>>({});
  const [filterPanelOpen, setFilterPanelOpen] = useState(true);
  const [filterPanelPinned, setFilterPanelPinned] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const filtersForServer: Record<string, string[]> = {};
        for (const [key, set] of Object.entries(columnFilters)) {
          if (set.size > 0) filtersForServer[key] = Array.from(set);
        }
        const { records: hscRecords, totalCount: count, refLookup } = await getHscRecords(
          dateRange,
          page,
          pageSize,
          statusFilter,
          sortKey,
          sortDirection,
          filtersForServer,
        );
        const transformedRecords = hscRecords.map((hsc, index) => transformHscToAuthRecord(hsc, index, refLookup));

        setRecords(transformedRecords);
        setTotalCount(count);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load data";
        setError(errorMessage);
        console.error("Error loading HSC data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [dateRange, page, pageSize, statusFilter, sortKey, sortDirection, columnFilters]);

  const sortedRecords = useMemo(() => {
    return [...records].sort((left, right) => {
      const leftValue = getSortValue(left, sortKey);
      const rightValue = getSortValue(right, sortKey);

      if (typeof leftValue === "number" && typeof rightValue === "number") {
        return sortDirection === "asc" ? leftValue - rightValue : rightValue - leftValue;
      }

      const comparison = String(leftValue).localeCompare(String(rightValue), undefined, {
        numeric: true,
        sensitivity: "base",
      });

      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [records, sortDirection, sortKey]);

  const filterOptions = useMemo(() => {
    const opts: Record<string, string[]> = {};
    for (const { key } of MULTISELECT_FILTERS) {
      const values = new Set<string>();
      for (const record of records) {
        const v = String(record[key] ?? "").trim();
        if (v && v.toLowerCase() !== "unknown" && v !== "-") {
          values.add(v);
        }
      }
      opts[key] = Array.from(values).sort();
    }
    return opts;
  }, [records]);

  const autoHiddenColumnKeys = useMemo(() => {
    if (sortedRecords.length === 0) {
      return new Set<SortKey>();
    }

    const keys = new Set<SortKey>();
    for (const column of columns) {
      if (!visibleColumns.has(column.key)) {
        continue;
      }

      if (forceShownColumns.has(column.key)) {
        continue;
      }

      const hasAnyValue = sortedRecords.some((record) => hasDisplayValue(record[column.key]));
      if (!hasAnyValue) {
        keys.add(column.key);
      }
    }

    return keys;
  }, [sortedRecords, visibleColumns, forceShownColumns]);

  const displayedColumns = useMemo(
    () => columns.filter((column) => visibleColumns.has(column.key) && !autoHiddenColumnKeys.has(column.key)),
    [visibleColumns, autoHiddenColumnKeys],
  );

  const manuallyHiddenColumns = useMemo(
    () => columns.filter((column) => !visibleColumns.has(column.key)),
    [visibleColumns],
  );

  const autoHiddenColumns = useMemo(
    () => columns.filter((column) => visibleColumns.has(column.key) && autoHiddenColumnKeys.has(column.key)),
    [visibleColumns, autoHiddenColumnKeys],
  );

  const pageCount = Math.max(1, Math.ceil(totalCount / pageSize));
  const currentPage = Math.min(page, pageCount);

  function handleSort(column: SortKey) {
    setPage(1);

    if (sortKey === column) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }

    setSortKey(column);
    setSortDirection("asc");
  }

  function toggleColumn(columnKey: SortKey) {
    setVisibleColumns((current) => {
      const next = new Set(current);
      if (next.has(columnKey)) {
        next.delete(columnKey);
      } else {
        next.add(columnKey);
      }
      return next;
    });

    setForceShownColumns((current) => {
      const next = new Set(current);
      next.delete(columnKey);
      return next;
    });
  }

  function showAutoHiddenColumn(columnKey: SortKey) {
    setVisibleColumns((current) => {
      const next = new Set(current);
      next.add(columnKey);
      return next;
    });

    setForceShownColumns((current) => {
      const next = new Set(current);
      next.add(columnKey);
      return next;
    });
  }

  function toggleGroup(groupName: string) {
    setCollapsedGroups((current) => {
      const next = new Set(current);
      if (next.has(groupName)) {
        next.delete(groupName);
      } else {
        next.add(groupName);
      }
      return next;
    });
  }

  function showAllColumns() {
    setVisibleColumns(new Set(columns.map((c) => c.key)));
    setForceShownColumns(new Set());
    setCollapsedGroups(new Set());
  }

  function hideAllColumns() {
    setVisibleColumns(new Set());
    setForceShownColumns(new Set());
  }

  function handleExportCsv() {
    if (isExportingCsv) {
      return;
    }

    setIsExportingCsv(true);

    const params = new URLSearchParams({
      dateRange,
      statusFilter,
    });

    const filtersForServer: Record<string, string[]> = {};
    for (const [key, set] of Object.entries(columnFilters)) {
      if (set.size > 0) {
        filtersForServer[key] = Array.from(set);
      }
    }

    if (Object.keys(filtersForServer).length > 0) {
      params.set("columnFilters", JSON.stringify(filtersForServer));
    }

    const exportUrl = `/api/adm/inpatient-census/export?${params.toString()}`;
    window.location.href = exportUrl;

    // Browser download navigation is fire-and-forget; reset the button after brief cooldown.
    window.setTimeout(() => {
      setIsExportingCsv(false);
    }, 1500);
  }

  function toggleFilterValue(key: string, value: string) {
    setPage(1);
    setColumnFilters((prev) => {
      const next = { ...prev };
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

  function clearFilter(key: string) {
    setPage(1);
    setColumnFilters((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function clearAllFilters() {
    setPage(1);
    setColumnFilters({});
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-white">
      {openFilter && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpenFilter(null)}
        />
      )}
      <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <section className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:flex-wrap">
            <div className="flex items-center gap-3 flex-shrink-0">
              <label
                htmlFor="date-range"
                className="text-xs font-semibold text-slate-500 whitespace-nowrap"
              >
                Date Range
              </label>
              <FilterSelect
                id="date-range"
                label=""
                value={dateRange}
                options={dateRanges.map((range) => range.key)}
                optionLabels={dateRanges.map((range) => range.label)}
                size="md"
                onChange={(value) => {
                  setDateRange(value as DateRangeKey);
                  setPage(1);
                }}
              />
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              {statusFilters.map((filter) => {
                const isSelected = filter === statusFilter;
                const detailItems = CHIP_STATUS_DETAILS[filter];

                return (
                  <div key={filter} className="relative group">
                    <FilterChip
                      label={filter}
                      isSelected={isSelected}
                      onClick={() => {
                        setStatusFilter(filter);
                        setPage(1);
                      }}
                      size="sm"
                    >
                      <div className="relative group ml-2">
                        <button
                          type="button"
                          aria-label={`Status mapping for ${filter}`}
                          className="inline-flex h-3 w-3 items-center justify-center rounded-full border border-slate-400 text-[8px] font-semibold leading-none text-slate-600"
                        >
                          i
                        </button>
                        <div className="pointer-events-none absolute left-1/2 top-[125%] z-[60] hidden w-64 -translate-x-1/2 rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-700 shadow-lg group-hover:block group-focus-within:block">
                          <p className="mb-2 font-semibold text-slate-900">Status IDs for {filter}</p>
                          <ul className="space-y-1">
                            {detailItems.map((item) => (
                              <li key={item.id}>
                                {item.id}: {item.label}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </FilterChip>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleExportCsv}
              disabled={isLoading || isExportingCsv}
              className="flex-shrink-0 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isExportingCsv ? "Preparing CSV..." : "Export CSV"}
            </button>
          </div>

          {/* Multiselect filter row */}
          <div className="flex flex-wrap gap-2 items-center border-t border-slate-100 pt-2 mt-1">
            <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">Filter</span>
            {MULTISELECT_FILTERS.map(({ key, label }) => {
              const selected = columnFilters[key];
              const count = selected?.size ?? 0;
              const isOpen = openFilter === key;
              const options = filterOptions[key] ?? [];

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
                    <div className="absolute left-0 top-full mt-1 z-50 min-w-[180px] max-h-64 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-lg">
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
                              <label className="flex cursor-pointer items-center gap-2 px-3 py-1.5 hover:bg-slate-50">
                                <input
                                  type="checkbox"
                                  checked={selected?.has(option) ?? false}
                                  onChange={() => toggleFilterValue(key, option)}
                                  className="rounded border-slate-300"
                                />
                                <span className="text-xs text-slate-700">{option}</span>
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
            {Object.values(columnFilters).some((s) => s && s.size > 0) && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-100 transition-colors whitespace-nowrap"
              >
                Clear all
              </button>
            )}
          </div>
        </section>

        <section className="flex min-h-0 flex-1 flex-col rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-2 border-b border-slate-200 px-6 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-baseline gap-3">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">Admissions</h2>
                <span className="text-2xl font-bold tracking-tight text-slate-900">{totalCount}</span>
              </div>
              <p className="text-xs text-slate-500">
                Sorted by {getColumnLabel(sortKey)} ({sortDirection})
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm text-slate-500">
                Page {currentPage} of {pageCount} &nbsp;·&nbsp; Showing {sortedRecords.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}–{(currentPage - 1) * pageSize + sortedRecords.length} of {totalCount}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowColumnModal(!showColumnModal)}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
                >
                  ⚙ Columns
                </button>
                <label htmlFor="page-size-top" className="text-xs font-semibold text-slate-500 whitespace-nowrap">
                  Rows
                </label>
                <Select
                  value={String(pageSize)}
                  onValueChange={(value) => {
                    setPageSize(Number(value));
                    setPage(1);
                  }}
                >
                  <SelectTrigger id="page-size-top" className="h-9 w-[92px] rounded-lg border-slate-300 text-sm text-slate-900">
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
              <label htmlFor="page-jump-top" className="text-xs font-semibold text-slate-500 whitespace-nowrap">
                Page
              </label>
              <Select value={String(currentPage)} onValueChange={(value) => setPage(Number(value))}>
                <SelectTrigger id="page-jump-top" className="h-9 w-[92px] rounded-lg border-slate-300 text-sm text-slate-900">
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
                disabled={currentPage === pageCount || sortedRecords.length === 0}
                className="rounded-xl border border-slate-300 px-4 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>

          {isLoading && (
            <div className="flex items-center justify-center px-6 py-12">
              <div className="text-center">
                <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-cyan-600"></div>
                <p className="text-sm text-slate-600">Loading data...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center px-6 py-12">
              <div className="rounded-lg bg-red-50 p-4 text-center">
                <p className="text-sm font-medium text-red-900">Error loading data</p>
                <p className="mt-1 text-xs text-red-700">{error}</p>
              </div>
            </div>
          )}

          {!isLoading && !error && (
            <>
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
                  <div className="space-y-2">
                    {columnGroups.map((group) => {
                      const isCollapsed = collapsedGroups.has(group.name);
                      const visibleInGroup = group.columns.filter((c) => visibleColumns.has(c.key)).length;

                      return (
                        <div key={group.name} className="rounded-lg bg-white p-2">
                          <button
                            type="button"
                            onClick={() => toggleGroup(group.name)}
                            className="mb-1 flex w-full items-center justify-between text-left text-sm font-medium text-slate-900 hover:text-slate-700"
                          >
                            <span>{group.name} ({visibleInGroup}/{group.columns.length})</span>
                            <span className="text-slate-400">{isCollapsed ? "▶" : "▼"}</span>
                          </button>
                          {!isCollapsed && (
                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                              {group.columns.map((column) => (
                                <label
                                  key={column.key}
                                  className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 hover:bg-slate-100"
                                >
                                  <input
                                    type="checkbox"
                                    checked={visibleColumns.has(column.key)}
                                    onChange={() => toggleColumn(column.key)}
                                    className="rounded border-slate-300"
                                  />
                                  <span className="text-xs text-slate-700">{column.label}</span>
                                </label>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              <div className="min-h-0 flex-1 overflow-auto">
                {/* Hidden Columns Bar */}
                {(manuallyHiddenColumns.length > 0 || autoHiddenColumns.length > 0) && (
                  <div className="border-b border-slate-200 bg-blue-50 px-4 py-2 flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-medium text-slate-600">Hidden columns:</span>
                    {manuallyHiddenColumns.map((column) => (
                        <button
                          key={column.key}
                          type="button"
                          onClick={() => toggleColumn(column.key)}
                          className="inline-flex items-center gap-1 rounded-md bg-white border border-blue-200 px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100 transition-colors"
                        >
                          {column.label}
                          <span className="text-blue-400">+</span>
                        </button>
                      ))}
                    {autoHiddenColumns.map((column) => (
                      <button
                        key={`auto-${column.key}`}
                        type="button"
                        onClick={() => showAutoHiddenColumn(column.key)}
                        className="inline-flex items-center rounded-md bg-slate-100 border border-slate-200 px-2 py-1 text-xs font-medium text-slate-600"
                        title="Automatically hidden on this page because all rows are empty. Click to show anyway."
                      >
                        {column.label} (auto) +
                      </button>
                    ))}
                  </div>
                )}
                <table className="min-w-[2400px] w-full border-separate border-spacing-0">
                  <thead className="sticky top-0 z-10 bg-slate-50">
                    <tr>
                      {displayedColumns.map((column) => {
                          const isSorted = sortKey === column.key;

                          return (
                            <th key={column.key} className="group border-b border-slate-200 px-2 py-2 text-left">
                              <div className="flex items-center justify-between gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleSort(column.key)}
                                  className="flex items-center gap-2 text-xs font-semibold text-slate-500 transition-colors hover:text-slate-900"
                                >
                                  <span>{column.label}</span>
                                  <span className="text-slate-400">{isSorted ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => toggleColumn(column.key)}
                                  title="Hide column"
                                  className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center justify-center w-5 h-5 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-600 text-lg leading-none"
                                >
                                  ×
                                </button>
                              </div>
                            </th>
                          );
                        })}
                    </tr>
                  </thead>
                  <tbody>
                    {sortedRecords.length > 0 ? (
                      sortedRecords.map((record) => (
                        <tr key={record.authId} className="odd:bg-white even:bg-slate-50/50">
                          {displayedColumns.map((column) => (
                              <td key={`${record.authId}-${column.key}`} className="group relative border-b border-slate-100 px-2 py-0.5 text-sm text-slate-700">
                                <div className="pointer-events-none absolute left-1/2 top-[120%] z-20 hidden w-max -translate-x-1/2 rounded-lg border border-slate-300 bg-slate-900 px-2 py-1 text-[10px] font-semibold text-white shadow-lg group-hover:block whitespace-nowrap">
                                  {column.hscField}
                                </div>
                                {formatCellDisplayValue(record[column.key])}
                              </td>
                            ))}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={Math.max(displayedColumns.length, 1)} className="px-4 py-12 text-center text-sm text-slate-500">
                          No authorizations found for the selected date range and filter.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="sticky bottom-0 z-10 flex flex-col gap-2 border-t border-slate-200 bg-white px-6 py-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-500">
                  Page {currentPage} of {pageCount}
                </p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setPage((current) => Math.max(1, current - 1))}
                    disabled={currentPage === 1}
                    className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <label htmlFor="page-jump-bottom" className="sr-only">
                    Jump to page
                  </label>
                  <Select value={String(currentPage)} onValueChange={(value) => setPage(Number(value))}>
                    <SelectTrigger id="page-jump-bottom" className="h-10 w-[128px] rounded-lg border-slate-300 text-sm text-slate-900">
                      <SelectValue placeholder="Page" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
                        <SelectItem key={pageNumber} value={String(pageNumber)}>
                          Page {pageNumber}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <button
                    type="button"
                    onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
                    disabled={currentPage === pageCount || sortedRecords.length === 0}
                    className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

function getSortValue(record: AuthRecord, key: SortKey) {
  if (key === "received") {
    return new Date(`${record.receivedAt}T12:00:00Z`).getTime();
  }

  return record[key];
}

function getColumnLabel(key: SortKey) {
  return columns.find((column) => column.key === key)?.label ?? key;
}

function formatCellDisplayValue(value: string | number): string {
  const normalized = String(value).trim();
  if (normalized.toLowerCase() === "unknown") {
    return "-";
  }

  return String(value);
}

function hasDisplayValue(value: string | number): boolean {
  if (value == null) {
    return false;
  }

  if (typeof value === "number") {
    return !Number.isNaN(value);
  }

  const normalized = String(value).trim();
  if (!normalized) {
    return false;
  }

  const lowered = normalized.toLowerCase();
  const emptyMarkers = new Set(["unknown", "invalid date", "null", "undefined", "n/a", "na", "none"]);

  return !emptyMarkers.has(lowered);
}
