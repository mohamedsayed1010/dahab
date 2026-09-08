import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

import { AuthContext } from "../../context/auth-context";
import { deleteAccount } from "../../api/auth/deleteAccount";
import { cleanNameForSubmit } from "../../utils/normalizeArabicName";
import LegalLayout, { LegalSection } from "../Legal/LegalLayout";

// The page itself is public so Google Play reviewers can open it without an
// account; the DELETE request behind it always requires the access token.

// Same shape the sign-in screen sends, so the number matches the stored one
// whichever way the user types it.
const normalizePhone = (phone) => {
  if (!phone) return phone;

  if (phone.startsWith("+20")) return phone;

  if (phone.startsWith("20")) return `+${phone}`;

  return `+20${phone.replace(/^0/, "")}`;
};

// Mirrors the sign-in validation so a value accepted at login is accepted here.
const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(3, "الاسم قصير")
    .max(50, "الاسم طويل جداً")
    .matches(/^[A-Za-z\u0600-\u06FF\s]+$/, "الاسم يجب أن يحتوي على حروف فقط")
    .required("الاسم مطلوب"),

  phone: Yup.string()
    .required("رقم الموبايل مطلوب")
    .matches(/^01[0125][0-9]{8}$/, "رقم الموبايل غير صحيح"),
});

// Nothing from the server response is shown to the user: every case maps to a
// short Arabic sentence, so axios/Mongo/server internals never reach the UI.
const messageForError = (error) => {
  if (!error?.response) {
    return "تعذر الاتصال بالخادم. تأكد من الإنترنت وحاول مرة أخرى.";
  }

  const status = error.response.status;

  if (status === 400 || status === 403) {
    return "الاسم أو رقم الهاتف غير مطابق لبيانات حسابك.";
  }

  if (status === 401) {
    return "انتهت صلاحية الجلسة. برجاء تسجيل الدخول مرة أخرى ثم إعادة المحاولة.";
  }

  if (status === 404) {
    return "لم يتم العثور على هذا الحساب.";
  }

  return "تعذر حذف الحساب حالياً. برجاء المحاولة لاحقاً.";
};

export default function DeleteAccountPage() {
  const { accessToken, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isAuthenticated = Boolean(accessToken);

  const formik = useFormik({
    initialValues: { name: "", phone: "" },
    validationSchema,
    // Submitting only asks for confirmation; nothing is sent yet.
    onSubmit: () => setConfirmOpen(true),
  });

  const confirmDelete = async () => {
    setIsDeleting(true);

    try {
      const data = await deleteAccount({
        name: cleanNameForSubmit(formik.values.name),
        phone: normalizePhone(formik.values.phone),
      });

      // Success is claimed only when the backend confirms the deletion.
      if (!data?.success) {
        throw new Error("unconfirmed");
      }

      setConfirmOpen(false);

      // Clears the access token, the refresh token and the stored user.
      logout();

      // <Toaster /> lives above the router, so this survives the redirect.
      toast.success("تم حذف حسابك بنجاح");

      navigate("/login", { replace: true });
    } catch (error) {
      setConfirmOpen(false);

      toast.error(
        error?.message === "unconfirmed"
          ? "تعذر حذف الحساب حالياً. برجاء المحاولة لاحقاً."
          : messageForError(error)
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <LegalLayout title="حذف الحساب">
      <p>
        يمكنك حذف حسابك في دهب العربي نهائيًا من خلال إدخال بيانات حسابك.
      </p>

      <div className="rounded-2xl border border-red-500/40 bg-red-500/5 p-4 text-red-600 dark:text-red-400 font-semibold">
        تنبيه: حذف الحساب إجراء نهائي وقد لا يمكن التراجع عنه.
      </div>

      {/* ================= FORM / LOGIN PROMPT ================= */}
      {isAuthenticated ? (
        <form onSubmit={formik.handleSubmit} className="space-y-5" noValidate>
          <div>
            <label
              htmlFor="delete-account-name"
              className="block mb-2 font-bold text-textPrimary dark:text-white"
            >
              الاسم
            </label>

            <input
              id="delete-account-name"
              name="name"
              autoComplete="name"
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
              <p className="text-red-500 text-sm mt-2">{formik.errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="delete-account-phone"
              className="block mb-2 font-bold text-textPrimary dark:text-white"
            >
              رقم الهاتف
            </label>

            <input
              id="delete-account-phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              maxLength={11}
              autoComplete="tel"
              placeholder="رقم الهاتف (010...)"
              value={formik.values.phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 11);

                formik.setFieldValue("phone", value);
              }}
              onBlur={formik.handleBlur}
              className="w-full p-3 rounded-xl border border-border bg-transparent dark:text-white"
            />

            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-sm mt-2">{formik.errors.phone}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isDeleting}
            className="w-full bg-red-600 text-white font-bold py-3 rounded-xl disabled:opacity-60"
          >
            {isDeleting ? "جاري الحذف..." : "حذف الحساب"}
          </button>
        </form>
      ) : (
        <div className="rounded-2xl border border-border p-4 space-y-3">
          <p className="font-semibold">
            لتنفيذ الحذف من داخل التطبيق، سجّل الدخول بحسابك أولاً ثم ارجع إلى
            هذه الصفحة.
          </p>

          <Link
            to="/login"
            className="inline-block bg-primary text-black font-bold py-3 px-6 rounded-xl"
          >
            تسجيل الدخول
          </Link>
        </div>
      )}

      {/* ================= GOOGLE PLAY DISCLOSURE ================= */}
      <LegalSection title="كيف تطلب حذف حسابك">
        <p>
          سجّل الدخول إلى تطبيق «دهب العربي»، ثم افتح القائمة الجانبية واختر
          «حذف الحساب»، وأدخل <strong>الاسم</strong> و
          <strong> رقم الهاتف</strong> المسجَّلين في حسابك، ثم أكِّد الحذف.
          نتحقق من أن الاسم ورقم الهاتف يخصّان الحساب الذي سجّلت الدخول به،
          ويُنفَّذ الحذف على حسابك أنت فقط.
        </p>

        <p>
          إذا تعذّر عليك الوصول إلى التطبيق، يمكنك طلب الحذف عبر واتساب أو
          الاتصال على{" "}
          <a href="tel:+201027070200" className="text-primary font-bold">
            ‎+20 102 707 0200
          </a>{" "}
          من رقم الهاتف المسجَّل في الحساب.
        </p>
      </LegalSection>

      <LegalSection title="ما البيانات التي يتم حذفها">
        <p>
          يُحذف سجل حسابك بالكامل من قاعدة بياناتنا، ويشمل: الاسم، ورقم الهاتف،
          ونوع الحساب (مستخدم/إدارة)، وتاريخ إنشاء الحساب. هذه هي كل البيانات
          الشخصية التي نحتفظ بها عنك؛ لا نحفظ كلمات مرور ولا بيانات دفع.
        </p>

        <p>
          بعد الحذف تنتهي صلاحية جلستك ويتم تسجيل خروجك، وتُمسح بيانات الدخول
          المحفوظة على جهازك. لن تتمكن من استخدام الحساب مرة أخرى، ويمكنك إنشاء
          حساب جديد لاحقاً بنفس رقم الهاتف إذا رغبت.
        </p>
      </LegalSection>

      <LegalSection title="ما البيانات التي قد تبقى">
        <p>
          لا نحتفظ بأي بيانات شخصية بعد الحذف. البيانات العامة للتطبيق — مثل
          أسعار الذهب والفضة والمنتجات المعروضة — ليست مرتبطة بحسابك ولا تحتوي
          على بياناتك، لذلك تبقى كما هي.
        </p>

        <p>
          قد تحتفظ خوادم الاستضافة بسجلات تشغيل فنية مؤقتة (مثل سجلات الأخطاء)
          لا تتضمن اسمك أو رقم هاتفك، وتُحذف تلقائياً بمرور الوقت.
        </p>
      </LegalSection>

      {/* ================= CONFIRMATION ================= */}
      <Dialog
        open={confirmOpen}
        onClose={() => !isDeleting && setConfirmOpen(false)}
        dir="rtl"
        aria-labelledby="delete-account-confirm-title"
      >
        <DialogTitle id="delete-account-confirm-title" sx={{ fontWeight: 700 }}>
          هل أنت متأكد من رغبتك في حذف حسابك؟
        </DialogTitle>

        <DialogContent>
          <p className="text-sm leading-7">
            تنبيه: حذف الحساب إجراء نهائي وقد لا يمكن التراجع عنه.
          </p>
        </DialogContent>

        <DialogActions sx={{ gap: 1, p: 2 }}>
          <button
            type="button"
            onClick={() => setConfirmOpen(false)}
            disabled={isDeleting}
            className="px-5 py-2 rounded-xl border border-border font-bold disabled:opacity-60"
          >
            إلغاء
          </button>

          <button
            type="button"
            onClick={confirmDelete}
            disabled={isDeleting}
            className="px-5 py-2 rounded-xl bg-red-600 text-white font-bold disabled:opacity-60"
          >
            {isDeleting ? "جاري الحذف..." : "تأكيد حذف الحساب"}
          </button>
        </DialogActions>
      </Dialog>
    </LegalLayout>
  );
}
