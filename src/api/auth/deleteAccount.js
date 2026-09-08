import axios from "axios";
import { refreshAccessToken } from "./refreshToken";

// Same base URL as the rest of the API layer. The env override exists only so
// the app can be pointed at a locally running backend during development; with
// no override it behaves exactly like every other module here.
const API_BASE_URL =
  import.meta.env?.VITE_API_BASE_URL || "https://api.dahbelarby.com";

const ENDPOINT = `${API_BASE_URL}/api/auth/account`;

/**
 * Permanently deletes the signed-in user's own account.
 *
 * The account is identified server-side by the access token; { name, phone }
 * is a confirmation the backend checks against that same account. No user id
 * is ever sent from here.
 *
 * Resolves with the API payload on success and throws the axios error
 * otherwise, so the caller decides what the user is shown.
 */
export const deleteAccount = async ({ name, phone }) => {
  const request = (accessToken) =>
    axios.delete(ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: { name, phone },
    });

  let accessToken = localStorage.getItem("accessToken");

  try {
    const { data } = await request(accessToken);

    return data;
  } catch (error) {
    // Follows the existing modules: one retry after refreshing an access
    // token that the server rejected as expired/invalid.
    if (error.response?.status === 401) {
      const tokens = await refreshAccessToken();

      accessToken = tokens.accessToken;

      const { data } = await request(accessToken);

      return data;
    }

    throw error;
  }
};
