import { useContext, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [otpStep, setOtpStep] = useState(false);
  const [code, setCode] = useState("");

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);


  // ================= NORMALIZE PHONE =================
const normalizePhone = (phone) => {
  if (!phone) return phone;

  if (phone.startsWith("+20")) {
    return phone;
  }

  return `+20${phone.replace(/^0/, "")}`;
};

  // ================= VALIDATION =================
  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .min(3, "الاسم قصير")
      .max(50, "الاسم طويل جداً")
      .matches(
        /^[A-Za-z\u0600-\u06FF\s]+$/,
        "الاسم يجب أن يحتوي على حروف فقط"
      )
      .test("valid-name", "ادخل اسم صحيح", (value) => {
        if (!value) return false;

        const name = value.trim();

        // يمنع aaaaaaa أو سسسسسسس
        if (/(.)\1{4,}/.test(name)) {
          return false;
        }

        // يمنع اسم أقل من 3 حروف حقيقية
        const lettersOnly = name.replace(/\s/g, "");

        if (lettersOnly.length < 3) {
          return false;
        }

        return true;
      })
      .required("الاسم مطلوب"),

    phone: Yup.string()
      .required("رقم الموبايل مطلوب")
      .matches(/^01[0125][0-9]{8}$/, "رقم الموبايل غير صحيح")
      .test(
        "valid-phone",
        "برجاء إدخال رقم موبايل صحيح",
        (value) => {
          if (!value) return false;

          if (/^(\d)\1+$/.test(value)) return false;

          const body = value.slice(3);

          if (/^(\d)\1+$/.test(body)) return false;

          if (/^(10){4,}|(01){4,}|(12){4,}|(21){4,}$/.test(body))
            return false;

          const blackList = [
            "01010101010",
            "01111111111",
            "01222222222",
            "01000000000",
            "01234567890",
            "01012345678",
            "01123456789",
            "01234567891",
          ];

          if (blackList.includes(value)) return false;

          const counts = {};

          for (const digit of value) {
            counts[digit] = (counts[digit] || 0) + 1;

            if (counts[digit] >= 8) return false;
          }

          return true;
        }
      ),
  });

  // ================= SIGNIN =================
  const signin = async (values) => {
    try {
      setIsLoading(true);

      const formattedValues = {
        ...values,
        phone: normalizePhone(values.phone),
      };

      const { data } = await axios.post(
        "https://api.dahbelarby.com/api/auth/signin",
        formattedValues
      );

      // ================= ADMIN LOGIN =================
const ADMIN_PHONES = [
  "+201027070200",
  "+201557070595", // الرقم الثاني
];

if (ADMIN_PHONES.includes(data.user?.phone)) {
  login({
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    user: {
      ...data.user,
      role: "admin",
    },
  });

  toast.success("أهلاً Admin 👑");
  navigate("/dashboard");
  return;
}

      // ================= USER LOGIN =================
      localStorage.setItem(
        "pendingAccessToken",
        data.accessToken
      );
      localStorage.setItem(
        "pendingRefreshToken",
        data.refreshToken
      );
      localStorage.setItem(
        "pendingUser",
        JSON.stringify(data.user)
      );

      toast.success("تم إرسال الكود على تيليجرام");
      setOtpStep(true);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "حدث خطأ"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ================= VERIFY CODE =================
  const verifyCode = async (phone) => {
    if (!code) {
      return toast.error("ادخل الكود");
    }

    try {
      setIsLoading(true);

      const pendingAccessToken =
        localStorage.getItem("pendingAccessToken");
      const pendingRefreshToken =
        localStorage.getItem("pendingRefreshToken");
      const pendingUser = JSON.parse(
        localStorage.getItem("pendingUser")
      );

      await axios.post(
        "https://api.dahbelarby.com/api/telegram/verify-code",
        {
          phone: normalizePhone(phone),
          code,
        },
        {
          headers: {
            Authorization: `Bearer ${pendingAccessToken}`,
          },
        }
      );

      // تسجيل الدخول بعد نجاح OTP
      login({
        accessToken: pendingAccessToken,
        refreshToken: pendingRefreshToken,
        user: {
          ...pendingUser,
          role: "user",
        },
      });

      // تنظيف البيانات المؤقتة
      localStorage.removeItem("pendingAccessToken");
      localStorage.removeItem("pendingRefreshToken");
      localStorage.removeItem("pendingUser");

      toast.success("تم تسجيل الدخول بنجاح");
      navigate("/");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "الكود غير صحيح"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ================= FORMIK =================
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
    },

    validationSchema,

    onSubmit: (values) => {
      if (otpStep) {
        verifyCode(values.phone);
      } else {
        signin(values);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4">
      <div className="bg-card border border-border w-full max-w-md rounded-2xl p-3">
        <h1 className="text-2xl font-bold text-center my-6 dark:text-white">
          تسجيل الدخول
        </h1>

        <form
          onSubmit={formik.handleSubmit}
          className="space-y-6"
        >
          <input
            name="name"
            placeholder="الاسم"
            value={formik.values.name}
            onChange={(e) => {
              const value = e.target.value.replace(
                /[^A-Za-z\u0600-\u06FF\s]/g,
                ""
              );

              formik.setFieldValue("name", value);
            }}
            onBlur={formik.handleBlur}
            className="w-full p-3 rounded-xl border border-border bg-transparent dark:text-white"
          />

          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm">
              {formik.errors.name}
            </p>
          )}

          <input
            name="phone"
            type="tel"
            inputMode="numeric"
            maxLength={11}
            placeholder="رقم الموبايل (010...)"
            value={formik.values.phone}
            onChange={(e) => {
              const value = e.target.value
                .replace(/\D/g, "")
                .slice(0, 11);

              formik.setFieldValue("phone", value);
            }}
            onBlur={formik.handleBlur}
            className="w-full p-3 rounded-xl border border-border bg-transparent dark:text-white"
          />

          {formik.touched.phone && formik.errors.phone && (
            <p className="text-red-500 text-sm">
              {formik.errors.phone}
            </p>
          )}

          {otpStep && (
            <input
              type="text"
              placeholder="كود التحقق"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-3 rounded-xl border border-border bg-transparent dark:text-white"
            />
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-black font-bold py-3 rounded-xl"
          >
            {isLoading
              ? "جاري..."
              : otpStep
              ? "تسجيل الدخول"
              : "إرسال الكود"}
          </button>
        </form>
      </div>
    </div>
  );
}