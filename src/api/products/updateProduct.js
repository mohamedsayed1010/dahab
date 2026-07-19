import axios from "axios";
import { refreshAccessToken } from "../auth/refreshToken";

export const updateProduct = async ({
  id,
  values,
}) => {
  let accessToken = localStorage.getItem("accessToken");

  const formData = new FormData();

  formData.append("name", values.name);
  formData.append("category", values.category);
  formData.append("weight", values.weight);
  formData.append("workmanship", values.workmanship);
  formData.append("karat", values.karat);

  if (values.cashback !== "" && values.cashback !== undefined) {
    formData.append("cashback", values.cashback);
  }

  if (values.image instanceof File) {
    formData.append("image", values.image);
  }

  try {
    const { data } = await axios.put(
      `https://api.dahbelarby.com/api/products/${id}`,
      formData,
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

      const { data } = await axios.put(
        `https://api.dahbelarby.com/api/products/${id}`,
        formData,
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