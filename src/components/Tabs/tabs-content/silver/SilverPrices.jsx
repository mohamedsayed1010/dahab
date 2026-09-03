import { TrendingUp, TrendingDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getSilverPrices } from "../../../../api/silver/silverPrices";
import { useMemo } from "react";

const SilverPrices = () => {
  // ================= SILVER API =================
  const { data: silverData, isLoading: silverLoading } = useQuery({
    queryKey: ["silver-prices"],
    queryFn: getSilverPrices,
  });

  const silver = silverData?.data?.[0];

  // ================= PRICES TABLE =================
  const prices = useMemo(() => {
    if (!silver) return [];

    return [
      {
        karat: "999",
        sell: silver.silver1000Sell,
        buy: silver.silver1000Buy,
      },

      {
        karat: "925",
        sell: silver.silver925Sell,
        buy: silver.silver925Buy,
      },

      {
        karat: "800",
        sell: silver.silver800Sell,
        buy: silver.silver800Buy,
      },
    ];
  }, [silver]);

  return (
    <div className="px-3 mt-4 w-[90%] md:w-[70%] mx-auto">
      {/* ================= BUY / SELL ================= */}
      <div className="grid grid-cols-2 gap-3 mb-4 mt-10">
        {/* SELL */}
        <div className="bg-card border border-border rounded-3xl p-3 h-fit">
          <div className="flex items-center justify-center gap-6">
            <div className="w-12 h-12 rounded-full border border-green-500/30 flex items-center justify-center flex-shrink-0">
              <TrendingUp size={32} className="text-success" />
            </div>
            <h3 className="text-success font-bold text-2xl md:text-4xl">بيع</h3>
          </div>

          <p className="text-center dark:text-white text-5xl md:text-7xl font-bold mt-3">
            {silver?.silver1000Sell ?? "لا يوجد اسعار"}
          </p>
        </div>

        {/* BUY */}
        <div className="bg-card border border-border rounded-3xl p-3 h-fit">
          <div className="flex items-center justify-center gap-6">
            <div className="w-12 h-12 rounded-full border border-red-500/30 flex items-center justify-center flex-shrink-0">
              <TrendingDown size={32} className="text-danger" />
            </div>
            <h3 className="text-danger font-bold text-2xl md:text-4xl">شراء</h3>
          </div>

          <p className="text-center dark:text-white text-5xl md:text-7xl font-bold mt-3">
            {silver?.silver1000Buy ?? "لا يوجد اسعار"}
          </p>
        </div>
      </div>
      {/* ================= LOGO ================= */}
      <div className="flex justify-center ">
        <div className="w-36 h-36 md:w-28 md:h-28 xl:w-36  xl:h-36  bg-black rounded-3xl flex items-center justify-center">
          <img
            src="/icon.png"
            alt="logo"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>
      {silver?.updatedAt && (
        <div className="flex mb-3">
          <div className="px-4 py-2 text-md text-textMuted">
            آخر تحديث:{" "}
            <span className="font-semibold">
              {new Date(silver.updatedAt).toLocaleString("ar-EG")}
            </span>
          </div>
        </div>
      )}

      {/* ================= TABLE ================= */}
      <div className="bg-card border border-border rounded-3xl overflow-hidden mb-4">
        <div className="grid grid-cols-3 bg-primary text-white font-semibold text-3xl">
          <div className="p-3 text-center">العيار</div>
          <div className="p-3 text-center">بيع</div>
          <div className="p-3 text-center">شراء</div>
        </div>

        {prices.map((item) => (
          <div
            key={item.karat}
            className="grid grid-cols-3 border-t border-border"
          >
            <div className="p-3 text-center dark:text-white font-bold text-3xl">
              {item.karat}
            </div>

            <div className="p-3 text-center dark:text-white text-3xl font-bold">
              {Math.ceil(item.sell)}
            </div>

            <div className="p-3 text-center dark:text-white text-3xl font-bold">
              {Math.ceil(item.buy)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SilverPrices;
