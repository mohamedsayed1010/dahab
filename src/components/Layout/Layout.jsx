import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Tabs from "../Tabs/Tabs";
import useSeo from "../../seo/useSeo";

// Lightweight fallback shown only while a lazily-loaded route chunk is being
// fetched. The chrome (Navbar/Tabs/Footer) stays mounted around it, so this is
// a small in-content spinner rather than a full-page flash.
function RouteFallback() {
  return (
    <div
      className="flex justify-center items-center py-20"
      role="status"
      aria-live="polite"
    >
      <div className="h-10 w-10 rounded-full border-4 border-border border-t-primary animate-spin" />
      <span className="sr-only">جارٍ التحميل...</span>
    </div>
  );
}

export default function Layout() {
  const meta = useSeo();

  // Supply an h1 only for indexable pages that don't already render one.
  const showHeading = meta.robots === "index, follow" && !meta.ownH1;

  return (
    <div className="bg-theme  bg-cover bg-left-top bg-no-repeat min-h-screen">
      <Navbar />
      <Tabs />
      <main>
        {showHeading && <h1 className="sr-only">{meta.heading}</h1>}
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
