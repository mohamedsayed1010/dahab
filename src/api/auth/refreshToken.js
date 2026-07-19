import axios from "axios";

export const refreshAccessToken = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  try {
    const { data } = await axios.post(
      "https://api.dahbelarby.com/api/auth/refresh-token",
      {
        accessToken,
        refreshToken,
      }
    );

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    return data;

  } catch (error) {

    if (
      error.response?.status === 401 ||
      error.response?.data?.message === "Invalid or expired refresh token"
    ) {
      // مسح بيانات الدخول
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      // تحويل إجباري للوجين
      window.location.href = "/login";
    }

    throw error;
  }
};