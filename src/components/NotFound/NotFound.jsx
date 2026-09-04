import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <p className="text-6xl font-bold text-primary">404</p>
      <h1 className="text-2xl font-semibold text-textPrimary">
        الصفحة غير موجودة
      </h1>
      <p className="max-w-md text-textSecondary">
        الرابط الذي فتحته غير صحيح أو تم نقل الصفحة.
      </p>
      <Link
        to="/"
        className="mt-2 rounded-xl bg-primary px-6 py-2 font-semibold text-white transition hover:bg-primaryHover"
      >
        العودة للرئيسية
      </Link>
    </section>
  );
}
