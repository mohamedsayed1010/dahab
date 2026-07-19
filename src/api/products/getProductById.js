import axios from "axios";
import { refreshAccessToken } from "../auth/refreshToken";

export const getProductById = async ({ id }) => {
  let accessToken = localStorage.getItem("accessToken");

  try {
    const { data } = await axios.get(
      `https://api.dahbelarby.com/api/products/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return data.data;
  } catch (error) {
    if (error.response?.status === 401) {
      const tokens = await refreshAccessToken();

      accessToken = tokens.accessToken;

      const { data } = await axios.get(
        `https://api.dahbelarby.com/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return data.data;
    }

    throw error;
  }
};