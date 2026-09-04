import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Tabs from "../Tabs/Tabs";
import useSeo from "../../seo/useSeo";

export default function Layout() {
  const meta = useSeo();

  // Public pages render their data as tables/cards with no page heading, so
  // the h1 is supplied here for search engines and screen readers.
  const showHeading = meta.robots === "index, follow";

  return (
    <div className="bg-theme  bg-cover bg-left-top bg-no-repeat min-h-screen">
      <Navbar />
      <Tabs />
      <main>
        {showHeading && <h1 className="sr-only">{meta.heading}</h1>}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
