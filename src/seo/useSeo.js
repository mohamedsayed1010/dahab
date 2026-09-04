import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ORIGIN, getRouteMeta } from "./routeMeta";

const upsertMeta = (selector, attr, name, content) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const upsertCanonical = (href) => {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

// Keeps <head> in sync with the active route so shared links and browser
// tabs show the right title, and admin screens stay out of search results.
export default function useSeo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getRouteMeta(pathname);
    const { title, description, robots } = meta;
    const canonical =
      ORIGIN + (pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/");

    document.title = title;
    upsertMeta('meta[name="description"]', "name", "description", description);
    upsertMeta('meta[name="robots"]', "name", "robots", robots);
    upsertCanonical(canonical);

    upsertMeta('meta[property="og:title"]', "property", "og:title", title);
    upsertMeta(
      'meta[property="og:description"]',
      "property",
      "og:description",
      description
    );
    upsertMeta('meta[property="og:url"]', "property", "og:url", canonical);

    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    upsertMeta(
      'meta[name="twitter:description"]',
      "name",
      "twitter:description",
      description
    );
  }, [pathname]);

  return getRouteMeta(pathname);
}
