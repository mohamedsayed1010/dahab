import { Home } from "lucide-react";
import { LuArrowUpDown } from "react-icons/lu";
import { GiMetalBar, GiRingBox, GiPowerRing } from "react-icons/gi";
import { FaCoins } from "react-icons/fa6";

export const tabs = [
  {
    id: "home",
    label: "الرئيسية",
    icon: Home,
    path: "/",
  },
  {
    id: "gold",
    label: "دهب",
    children: [
      {
        id: "bars-list",
        label: "سبــــــايك ",
        icon: GiMetalBar,
        path: "/bars/list",
      },
      // {
      //   id: "coins",
      //   label: "جنيهات21",
      //   icon: FaCoins,
      //   path: "/bars/coins",
      // },
      {
        id: "new",
        label: "جـــــــديد",
        icon: GiRingBox,
        path: "/jewelry/new",
      },
      {
        id: "used",
        label: "مستعمل",
        icon: GiPowerRing,
        path: "/jewelry/used",
      },
    ],
  },
  {
    id: "silver",
    label: "فضة",
    children: [
      {
        id: "prices",
        label: "أســعــار",
        icon: LuArrowUpDown,
        path: "/silver/prices",
      },
      {
        id: "silver-bars",
        label: "سبــــــايك",
        icon: GiMetalBar,
        path: "/silver/bars",
      },
      {
        id: "silver-products",
        label: "مشغولات ",
        icon: GiRingBox,
        path: "/silver/products",
      },
    ],
  },
];