import { jwtDecode } from 'jwt-decode';

export type SessionObject = {
  accessToken?: string;
};

export function getCFName(session: SessionObject) {
  if (session && session.accessToken) {
    const token = jwtDecode(session.accessToken);
    return token['x-ecp-claims']['x-ecp-first-name'];
  }
  return '';
}

export async function getAdminOrUserRole(session: SessionObject) {
  if (session && session.accessToken) {
    const token = jwtDecode(session.accessToken);
    return token['x-ecp-claims']['x-ecp-cli-orgs'][0]['func-roles'][0]['role-name'] === 'sys_admin'
      ? 'system_mgmt_admin'
      : 'system_mgmt_user';
  }
  return '';
}

export function getCLName(session: SessionObject) {
  if (session && session.accessToken) {
    const token = jwtDecode(session.accessToken);
    return token['x-ecp-claims']['x-ecp-last-name'];
  }
  return '';
}

export function getCAltUserId(session: SessionObject) {
  if (session && session.accessToken) {
    const token = jwtDecode(session.accessToken);
    return token['x-ecp-claims']['x-ecp-alt-user-id'];
  }
  return '';
}

export function getCUserId(session: SessionObject) {
  if (session && session.accessToken) {
    const token = jwtDecode(session.accessToken);
    return token['x-ecp-claims']['x-ecp-user-id'];
  }
  return '';
}

export function getCEmail(session: SessionObject) {
  if (session && session.accessToken) {
    const token = jwtDecode(session.accessToken);
    return token['x-ecp-claims']['x-ecp-email'];
  }
  return '';
}

export function getCEcpSource(session: SessionObject) {
  if (session && session.accessToken) {
    const token = jwtDecode(session.accessToken);
    return token['x-ecp-claims']['x-ecp-source'];
  }
  return '';
}

export function getCActiveOrg(session: SessionObject) {
  if (session && session.accessToken) {
    const token = jwtDecode(session.accessToken);
    return token['x-ecp-claims']['x-ecp-cli-orgs'][0]['org-id'];
  }
  return '';
}

export function getCActiveRole(session: SessionObject) {
  if (session && session.accessToken) {
    const token = jwtDecode(session.accessToken);
    return token['x-ecp-claims']['x-ecp-cli-orgs'][0]['func-roles'][0]['role-name'];
  }
  return '';
}

export function getCAppRoles(session: SessionObject) {
  if (session && session.accessToken) {
    const token = jwtDecode(session.accessToken);
    return token['x-ecp-claims']['x-ecp-cli-orgs'][0]['func-roles'][0]['appl-roles'];
  }
  return '';
}
