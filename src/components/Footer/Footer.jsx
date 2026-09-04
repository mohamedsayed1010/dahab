import {
  FaTelegramPlane,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaCode,
} from "react-icons/fa";
import { SiVodafone } from "react-icons/si";
import { RiVisaLine } from "react-icons/ri";
import { IoIosCall } from "react-icons/io";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-border bg-card">
      <div className="w-[95%] md:w-[90%] mx-auto py-6">
        <div className="flex flex-col items-center gap-6">
          {/* Top Section */}
          <div
            className="
    w-full
    grid grid-cols-3
    lg:grid-cols-4
    gap-4
    items-start
  "
          >
            {/* Follow Us */}
            <div className="flex flex-col items-center text-center gap-2">
              <h3 className="text-xs md:text-lg font-bold text-primary">
                تابعنا
              </h3>

              <div className="flex items-center justify-center gap-2 md:gap-4">
                <a
                  href="https://t.me/amr_elaraby_gold1"
                  aria-label="قناتنا على تيليجرام"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 hover:scale-110 transition"
                >
                  <FaTelegramPlane className="text-3xl md:text-5xl" />
                </a>

                <a
                  href="https://wa.me/201027070200"
                  aria-label="تواصل معنا على واتساب"
                  target="_blank"
                  rel="noreferrer"
                  className="text-green-500 hover:scale-110 transition"
                >
                  <FaWhatsapp className="text-3xl md:text-5xl" />
                </a>
              </div>
            </div>

            {/* Contact Us */}
            <div className="flex flex-col items-center text-center gap-2">
              <h3 className="text-xs md:text-lg font-bold text-primary">
                اتصل بنا
              </h3>

              <a
                href="tel:+201027070200"
                aria-label="اتصل بنا هاتفياً"
                className="text-black dark:text-white hover:scale-110 transition"
              >
                <IoIosCall className="text-3xl md:text-5xl" />
              </a>
            </div>

            {/* Payment Methods */}
            <div className="flex flex-col items-center text-center gap-2">
              <h3 className="text-xs md:text-lg font-bold text-primary">
                طرق الدفع
              </h3>

              <div className="flex items-center justify-center gap-2 md:gap-4">
                <a
                  href="http://vf.eg/vfcash?id=mt&qrId=LuMag9"
                  aria-label="الدفع عبر فودافون كاش"
                  target="_blank"
                  rel="noreferrer"
                  className="text-red-600 hover:scale-110 transition"
                >
                  <SiVodafone className="text-3xl md:text-4xl" />
                </a>

                <a
                  href="https://ipn.eg/S/instapaycf2d558e14b24/instapay/5MJCeR"
                  aria-label="الدفع عبر إنستاباي"
                  target="_blank"
                  rel="noreferrer"
                  className="
          flex items-center justify-center
          p-1.5 md:px-4 md:py-2
          rounded-xl
          text-white
          bg-gradient-to-r
          from-violet-600
          via-indigo-500
          to-cyan-400
          shadow-lg shadow-violet-500/30
          hover:scale-105
          transition
        "
                >
                  <RiVisaLine className="text-2xl md:text-3xl" />
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-center justify-center gap-2 font-semibold col-span-3 lg:col-span-1">
              <a
                href="https://www.google.com/maps/place/29%C2%B018'29.4%22N+30%C2%B050'23.6%22E/@29.3081627,30.8373223,17z/data=!3m1!4b1!4m4!3m3!8m2!3d29.3081627!4d30.8398972"
                aria-label="موقعنا على خرائط جوجل"
                target="_blank"
                rel="noreferrer"
                className="text-red-600 hover:scale-110 transition"
              >
                <FaMapMarkerAlt className="text-3xl" />
              </a>

              <div className="relative group">
                <span className="cursor-pointer text-center dark:text-white">
                  الفيوم شارع الجمهورية برج الحياة...
                </span>

                <div
                  className="
          absolute bottom-full mb-2 right-0
          hidden group-hover:block
          w-80
          p-3
          rounded-xl
          bg-card
          border border-border
          shadow-xl
          text-xl
          leading-6
          z-50
          whitespace-normal
          dark:text-white
        "
                >
                  الفيوم شارع الجمهورية برج الحياة بجوار جامع المغازي بين كوبري
                  مرزبان وكوبري الشيخ سالم مدخل محمد حسان الششنجي
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-border" />

          {/* Developer */}
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
      border border-border
      bg-card
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

            <p className="text-xs text-textMuted mt-3">
              جميع الحقوق محفوظة © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
