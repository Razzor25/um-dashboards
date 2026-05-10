# Data Retrieval Layer Setup

## Environment Configuration

To use the GraphQL data retrieval layer, you need to configure the following environment variables in `.env.local`:

```bash
# GraphQL Configuration
ADM_GRAPHQL_ENDPOINT=https://your-graphql-endpoint.com/graphql
ADM_GRAPHQL_ADMIN_SECRET=your-secret-key-here
```

### Variables

- **ADM_GRAPHQL_ENDPOINT**: The GraphQL endpoint URL for the ADM service
- **ADM_GRAPHQL_ADMIN_SECRET**: The authentication secret for the GraphQL endpoint

## Files

- **`lib/api/graphql-client.ts`**: Core GraphQL client using the environment variables
- **`features/adm/services/inpatient-census-service.ts`**: HSC (Healthcare Service Case) data service that queries the hsc table

## Usage

### Fetching HSC Records

```typescript
import { fetchHscRecords } from "@/features/adm/services/inpatient-census-service";

const records = await fetchHscRecords("ytd", "org-id-here");
```

### Date Range Options

- `"today"` - Today only
- `"lastWeek"` - Last 7 days
- `"lastMonth"` - Last 30 days  
- `"last3Months"` - Last 3 months
- `"ytd"` - Year to date

## HSC Table Fields Mapped

The hsc table includes the following key fields used in the dashboard:

- `hscId` - Unique identifier
- `creatDttm` - Creation timestamp (used for date filtering)
- `indvId` - Individual/Member ID
- `authStrtDt` - Authorization start date
- `authEndDt` - Authorization end date
- `orgId` - Organization ID
- `hscStsTypId` - HSC status type
- `tatDueDttm` - TAT due datetime
- `reviewDueDttm` - Review due datetime
- `recvDttm` - Received datetime
- `authCatTypeId` - Authorization category type
- And 30+ additional fields

## Integration

To integrate with the UM Inpatient Census dashboard, the dashboard page component will fetch records based on the selected date range from the dropdown and apply the creat_dttm filter.
