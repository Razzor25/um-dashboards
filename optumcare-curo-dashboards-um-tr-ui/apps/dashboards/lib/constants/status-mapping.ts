// Status ID to category mapping for authorization records
// Adjust these mappings based on your actual status IDs
const STATUS_APPROVED_IDS = [
  1000895, // Approved
];

const STATUS_DENIED_IDS = [
  1000935, // Denied
];

const STATUS_PARTIALLY_FAVORABLE_IDS = [
  1005006, // Partially Favorable
];

export type StatusCategory = "Approved" | "Denied" | "Partially Favorable";

export function categorizeStatus(statusId: number | null): StatusCategory | null {
  if (statusId === null) return null;

  if (STATUS_APPROVED_IDS.includes(statusId)) {
    return "Approved";
  }
  if (STATUS_DENIED_IDS.includes(statusId)) {
    return "Denied";
  }
  if (STATUS_PARTIALLY_FAVORABLE_IDS.includes(statusId)) {
    return "Partially Favorable";
  }

  // Default to partially favorable for unmapped statuses
  return "Partially Favorable";
}

export function getStatusCounts(records: Array<{ hsc_sts_typ_id: number | null }>) {
  const counts: Record<StatusCategory, number> = {
    Approved: 0,
    Denied: 0,
    "Partially Favorable": 0,
  };

  for (const record of records) {
    const category = categorizeStatus(record.hsc_sts_typ_id);
    if (category) {
      counts[category]++;
    }
  }

  return counts;
}
