export const ORIGIN = "https://dahbelarby.com";
export const SITE_NAME = "دهب العربي";

export const DEFAULT_DESCRIPTION =
  "تابع أسعار الذهب والفضة لحظة بلحظة مع دهب العربي: سعر جرام الذهب عيار 24 و21 و18، السبائك والجنيهات الذهب، المشغولات الجديدة والمستعملة، وأسعار الفضة.";

const page = (title, description, robots = "index, follow") => ({
  title: `${title} | ${SITE_NAME}`,
  heading: title,
  description,
  robots,
});

// Admin and auth screens are marked noindex: they hold no public content.
const PRIVATE = "noindex, nofollow";

export const ROUTE_META = {
  "/": {
    title: `${SITE_NAME} | أسعار الذهب والفضة لحظة بلحظة في مصر`,
    heading: "أسعار الذهب والفضة لحظة بلحظة",
    description: DEFAULT_DESCRIPTION,
    robots: "index, follow",
  },
  "/bars/list": page(
    "سبائك الذهب",
    "أسعار سبائك الذهب بمختلف الأوزان لحظة بلحظة، محدثة مباشرة مع تغير سعر الذهب العالمي."
  ),
  "/jewelry/new": page(
    "المشغولات الذهبية الجديدة",
    "أسعار المشغولات الذهبية الجديدة عيار 24 و21 و18 لحظة بلحظة، شاملة المصنعية."
  ),
  "/jewelry/used": page(
    "المشغولات الذهبية المستعملة",
    "أسعار بيع وشراء المشغولات الذهبية المستعملة عيار 24 و21 و18 محدثة لحظة بلحظة."
  ),
  "/silver/prices": page(
    "أسعار الفضة",
    "سعر جرام الفضة لحظة بلحظة بمختلف العيارات، محدث مباشرة على مدار اليوم."
  ),
  "/silver/bars": page(
    "سبائك الفضة",
    "أسعار سبائك الفضة بمختلف الأوزان محدثة لحظة بلحظة."
  ),
  "/silver/products": page(
    "منتجات الفضة",
    "تشكيلة منتجات ومشغولات الفضة المتاحة لدى دهب العربي وأسعارها."
  ),
  "/login": page("تسجيل الدخول", "سجل الدخول لمتابعة أسعار الذهب والفضة لحظة بلحظة.", PRIVATE),
  "/dashboard": page("لوحة التحكم", "لوحة تحكم الإدارة.", PRIVATE),
  "/products": page("إدارة المنتجات", "إدارة منتجات المتجر.", PRIVATE),
  "/create-product": page("إضافة منتج", "إضافة منتج جديد.", PRIVATE),
  "/users": page("المستخدمون", "إدارة المستخدمين.", PRIVATE),
};

export const NOT_FOUND_META = page(
  "الصفحة غير موجودة",
  "الصفحة المطلوبة غير موجودة على موقع دهب العربي.",
  PRIVATE
);

// These pages render their own visible <h1>; the layout must not add a second.
const OWN_H1 = new Set([
  "/bars/list",
  "/jewelry/new",
  "/jewelry/used",
  "/silver/bars",
  "/silver/products",
]);

export const getRouteMeta = (pathname) => {
  const key = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  if (ROUTE_META[key]) return { ...ROUTE_META[key], ownH1: OWN_H1.has(key) };
  if (/^\/products\/edit\/[^/]+$/.test(key)) {
    return page("تعديل منتج", "تعديل بيانات منتج.", PRIVATE);
  }
  return NOT_FOUND_META;
};
