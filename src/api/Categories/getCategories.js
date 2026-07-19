import axios from "axios";
import { refreshAccessToken } from "../auth/refreshToken"; // عدل المسار لو مختلف

export const getCategories = async () => {
  let accessToken = localStorage.getItem("accessToken");

  try {
    const { data } = await axios.get(
      "https://api.dahbelarby.com/api/categories",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return data.data;
  } catch (error) {
    if (error.response?.status === 401) {
      await refreshAccessToken();

      accessToken = localStorage.getItem("accessToken");

      const { data } = await axios.get(
        "https://api.dahbelarby.com/api/categories",
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