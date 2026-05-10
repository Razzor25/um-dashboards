export const TAT_PRIORITY_REF_IDS = {
  Urgent: 1000163,
  Routine: 1000161,
  Expedited: 1002495,
} as const;

export const TAT_PRIORITY_OPTIONS = [
  "All Priorities",
  "Urgent",
  "Routine",
  "Expedited",
] as const;

export const TAT_PRIORITY_REF_ID_BY_LABEL: Record<string, number> = {
  Urgent: TAT_PRIORITY_REF_IDS.Urgent,
  Routine: TAT_PRIORITY_REF_IDS.Routine,
  Expedited: TAT_PRIORITY_REF_IDS.Expedited,
};

export const TAT_PRIORITY_REF_IDS_BY_LABEL: Record<string, number[]> = {
  Urgent: [TAT_PRIORITY_REF_IDS.Urgent],
  Routine: [TAT_PRIORITY_REF_IDS.Routine],
  Expedited: [TAT_PRIORITY_REF_IDS.Expedited],
};