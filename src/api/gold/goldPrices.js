import axios from "axios";
import { refreshAccessToken } from "../auth/refreshToken"; // عدل المسار

export const getGoldPrices = async () => {
  let accessToken = localStorage.getItem("accessToken");

  try {
    const { data } = await axios.get(
      "https://api.dahbelarby.com/api/gold-prices",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return data;
  } catch (error) {
    if (error.response?.status === 401) {
      await refreshAccessToken();

      accessToken = localStorage.getItem("accessToken");

      const { data } = await axios.get(
        "https://api.dahbelarby.com/api/gold-prices",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return data;
    }

    throw error;
  }
};