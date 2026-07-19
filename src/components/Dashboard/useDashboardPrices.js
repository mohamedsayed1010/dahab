import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-hot-toast";
import { refreshAccessToken } from "../../api/auth/refreshToken";

export default function useDashboardPrices(accessToken) {

  const sendRequest = async (method, url, values) => {
    let token = accessToken;

    try {
      const { data } = await axios({
        method,
        url,
        data: values,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;

    } catch (error) {

      if (error.response?.status === 401) {

        const tokens = await refreshAccessToken();

        token = tokens.accessToken;

        const { data } = await axios({
          method,
          url,
          data: values,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return data;
      }

      throw error;
    }
  };


  // ================= GOLD =================
  const goldFormik = useFormik({
    initialValues: {
      buy21: "",
      sell21: "",
    },

    onSubmit: async (values) => {
      try {

        await sendRequest(
          "post",
          "https://api.dahbelarby.com/api/gold-prices",
          values
        );

        toast.success("تم تحديث أسعار الذهب 👑");
        goldFormik.resetForm();

      } catch (error) {
        toast.error("خطأ في تحديث الذهب");
      }
    },
  });


  // ================= SILVER =================
  const silverFormik = useFormik({
    initialValues: {
      silver1000Buy: "",
      silver1000Sell: "",
    },

    onSubmit: async (values) => {
      try {

        await sendRequest(
          "post",
          "https://api.dahbelarby.com/api/silver-prices",
          values
        );

        toast.success("تم تحديث أسعار الفضة 🪙");
        silverFormik.resetForm();

      } catch (error) {
        toast.error(
          error?.response?.data?.message || "خطأ في تحديث الفضة"
        );
      }
    },
  });


  return {
    goldFormik,
    silverFormik,
  };
}