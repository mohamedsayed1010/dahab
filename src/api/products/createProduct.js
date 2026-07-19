import axios from "axios";
import { refreshAccessToken } from "../auth/refreshToken";

export const createProduct = async ({ values }) => {
  let accessToken = localStorage.getItem("accessToken");

  const formData = new FormData();

  formData.append("name", values.name);
  formData.append("category", values.category);
  formData.append("weight", values.weight);
  formData.append("workmanship", values.workmanship);
  formData.append("karat", values.karat);

  if (values.cashback) {
    formData.append("cashback", values.cashback);
  }

  if (values.image) {
    formData.append("image", values.image);
  }

  try {
    const { data } = await axios.post(
      "https://api.dahbelarby.com/api/products",
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return data;
  } catch (error) {
    if (error.response?.status === 401) {
      const tokens = await refreshAccessToken();

      accessToken = tokens.accessToken;

      const { data } = await axios.post(
        "https://api.dahbelarby.com/api/products",
        formData,
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