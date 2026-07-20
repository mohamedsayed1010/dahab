import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { HiArrowDownTray } from "react-icons/hi2";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import {
  FaTelegramPlane,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaCode,
} from "react-icons/fa";
import { BsBank2 } from "react-icons/bs";
import { SiVodafone } from "react-icons/si";
import { IoIosCall } from "react-icons/io";


import ThemeToggle from "../ThemeToggle/ThemeToggle";
import usePWAInstall from "../../context/usePWAInstall";
import IOSInstallModal from "../IOSInstallModal/IOSInstallModal";

export default function Navbar() {
  const {accessToken: token, user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);

  const { installApp, canInstall, isIOS, isStandalone } = usePWAInstall();

  const isAdmin = user?.role === "admin";

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  const handleInstall = () => {
    if (isIOS) {
      setShowIOSModal(true);
      return;
    }

    if (canInstall) installApp();
  };

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="w-full px-4 py-3 flex items-center justify-between border-b border-border">
        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {!isStandalone && (
            <button
              onClick={handleInstall}
              className="flex flex-col items-center text-primary"
            >
              <HiArrowDownTray size={20} />
              <span className="text-xs">تثبيت</span>
            </button>
          )}

          <img
            src="/icon.png"
            alt="Logo"
            className="h-12 w-12 rounded-md bg-black"
          />

          <ThemeToggle />
        </div>

        {/* LEFT */}
        <div className="flex items-center gap-3">
          {token && (
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
              {user?.name?.[0]?.toUpperCase()}
            </div>
          )}

          <IconButton onClick={toggleDrawer(true)}>
            <MenuIcon className="text-primary" />
          </IconButton>
        </div>
      </nav>

      {/* DRAWER */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <div className="w-72 p-4">
          {/* USER INFO */}
          <div className="mb-4">
            {token ? (
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                  {user?.name?.[0]?.toUpperCase()}
                </div>

                <div>
                  <p className="font-bold text-lg">{user?.name}</p>
                  <p className="text-sm text-gray-500">مرحباً بك</p>
                </div>
              </div>
            ) : (
              <div>
                <p className="font-bold text-gray-600">Guest User</p>
                <p className="text-sm text-gray-500">مرحباً بك</p>
              </div>
            )}
          </div>

          <Divider />

          {/* NAVIGATION */}
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate("/");
                  setOpen(false);
                }}
              >
                <ListItemText primary="الرئيسية" />
              </ListItemButton>
            </ListItem>

            {!token && (
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate("/login");
                    setOpen(false);
                  }}
                >
                  <ListItemText primary="تسجيل الدخول" />
                </ListItemButton>
              </ListItem>
            )}

            {token && isAdmin && (
              <ListItem disablePadding>
                <ListItemButton onClick={handleLogout}>
                  <ListItemText primary="تسجيل الخروج" />
                </ListItemButton>
              </ListItem>
            )}
          </List>

          <Divider />

          <Divider />

          {/* ================= ADMIN OR USER SECTION ================= */}
          {isAdmin ? (
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate("/dashboard");
                    setOpen(false);
                  }}
                >
                  <ListItemText primary=" الاسعار" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate("create-product");
                    setOpen(false);
                  }}
                >
                  <ListItemText primary="إضافة منتج" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate("products");
                    setOpen(false);
                  }}
                >
                  <ListItemText primary=" تعديل المنتجات" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate("/users");
                    setOpen(false);
                  }}
                >
                  <ListItemText primary="المستخدمين" />
                </ListItemButton>
              </ListItem>
            </List>
          ) : (
            <>
              {/* ADDRESS */}
              <List>
                <ListItem>
                  <div className="w-full text-right">
                    <p className="text-primary font-bold text-lg mb-2">
                      العنوان
                    </p>

                    <p className="text-sm text-gray-600 leading-6">
                      الفيوم شارع الجمهورية برج الحياة بجوار جامع المغازي بين
                      كوبري مرزبان وكوبري الشيخ سالم مدخل محمد حسان الششنجي
                    </p>

                    <a
                      href="https://www.google.com/maps/place/29%C2%B018'29.4%22N+30%C2%B050'23.6%22E"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 mt-2 text-primary"
                    >
                      <FaMapMarkerAlt />
                      <span>عرض الموقع</span>
                    </a>
                  </div>
                </ListItem>

                <Divider />

                {/* SOCIAL */}
                <ListItem>
                  <div className="w-full">
                    <p className="text-primary font-bold text-lg mb-2 text-right">
                      طرق الدفع
                    </p>

                    <div className="flex flex-col gap-3">
                      <a
                        href="https://ipn.eg/S/instapaycf2d558e14b24/instapay/5MJCeR"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-primary"
                      >
                        <BsBank2 />
                        <span> انستابي</span>
                      </a>

                      <a
                        href="http://vf.eg/vfcash?id=mt&qrId=LuMag9"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-primary"
                      >
                        <SiVodafone />
                        <span>فودافون كاش</span>
                      </a>
                    </div>
                  </div>
                </ListItem>

                <Divider />

                <ListItem>
                  <div className="w-full">
                    <p className="text-primary font-bold text-lg mb-2 text-right">
                      اتصل بنا
                    </p>

                    <div className="flex flex-col gap-3">
                      <a
                        href="tel:+201027070200"
                        className="inline-flex items-center gap-2 text-primary"
                      >
                        <IoIosCall />
                        <span>اتصال</span>
                      </a>
                    </div>
                  </div>
                </ListItem>
                <Divider />
                <ListItem>
                  <div className="w-full">
                    <p className="text-primary font-bold text-lg mb-2 text-right">
                      تابعنا
                    </p>

                    <div className="flex flex-col gap-3">
                      <a
                        href="https://t.me/amr_elaraby_gold1"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-primary"
                      >
                        <FaTelegramPlane />
                        <span>قناة التليجرام</span>
                      </a>

                      <a
                        href="https://wa.me/201027070200"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-primary"
                      >
                        <FaWhatsapp />
                        <span>واتساب</span>
                      </a>
                    </div>
                  </div>
                </ListItem>

                <Divider />

                {/* DEVELOPER */}
                <ListItem>
                  <div className="text-center">
                    <div
                      className="
                      inline-flex
                      items-center
                      gap-4
                      flex-wrap
                      justify-center
                      px-5
                      py-3
                      rounded-2xl
                      border
                      border-border
                      shadow-sm
                    "
                    >
                      <div
                        className="
                        w-11 h-11
                        rounded-full
                        bg-primary/10
                        flex items-center justify-center
                      "
                      >
                        <FaCode className="text-xl text-primary" />
                      </div>

                      <div className="text-center">
                        <p className="text-xs text-textMuted">
                          Developed & Designed By
                        </p>

                        <a
                          href="https://portfolio-mohamed-orpin.vercel.app/"
                          target="_blank"
                          rel="noreferrer"
                          className="
                          font-bold
                          text-lg
                          text-primary
                          hover:underline
                          transition
                        "
                        >
                          Mohamed Sayed
                        </a>
                      </div>

                      <a
                        href="https://wa.me/201010318747"
                        target="_blank"
                        rel="noreferrer"
                        className="
                        px-4 py-2
                        rounded-xl
                        bg-primary
                        text-white
                        font-semibold
                        hover:scale-105
                        transition
                      "
                      >
                        تواصل
                      </a>
                    </div>
                  </div>
                </ListItem>
              </List>
            </>
          )}
        </div>
      </Drawer>

      {/* IOS MODAL */}
      <IOSInstallModal
        open={showIOSModal}
        onClose={() => setShowIOSModal(false)}
      />
    </>
  );
}
