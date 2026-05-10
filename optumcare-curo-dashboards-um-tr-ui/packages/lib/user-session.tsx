import axios from 'axios';
import { headers } from 'next/headers';

export const getUserSession = async () => {
  try {
    const response = await axios.post(
      process.env.NEXTAUTH_URL + `/api/session`,
      {},
      {
        headers: Object.fromEntries(headers()),
      },
    );

    return response.data;
  } catch (error) {
    console.error('Retrieved user session failed', error.response?.data || error.message);
  }
};
