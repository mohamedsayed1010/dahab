import { TrendingUp, TrendingDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getSilverPrices } from "../../../../api/silver/silverPrices";
import { useMemo } from "react";

const SilverPrices = () => {
  // ================= SILVER API =================
  const { data: silverData } = useQuery({
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
              <TrendingUp size={32} aria-hidden="true" className="text-success" />
            </div>
            <h2 className="text-success font-bold text-2xl md:text-4xl">بيع</h2>
          </div>

          <p className="text-center dark:text-white text-5xl md:text-7xl font-bold mt-3">
            {silver?.silver1000Sell ?? "لا يوجد اسعار"}
          </p>
        </div>

        {/* BUY */}
        <div className="bg-card border border-border rounded-3xl p-3 h-fit">
          <div className="flex items-center justify-center gap-6">
            <div className="w-12 h-12 rounded-full border border-red-500/30 flex items-center justify-center flex-shrink-0">
              <TrendingDown size={32} aria-hidden="true" className="text-danger" />
            </div>
            <h2 className="text-danger font-bold text-2xl md:text-4xl">شراء</h2>
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
            src="/icon.webp"
            alt="شعار دهب العربي"
            width="144"
            height="144"
            decoding="async"
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
        <table className="w-full table-fixed">
          <caption className="sr-only">
            أسعار الفضة حسب العيار: سعر البيع وسعر الشراء
          </caption>
          <thead>
            <tr className="bg-primary text-white font-semibold text-3xl">
              <th scope="col" className="p-3 text-center font-semibold">
                العيار
              </th>
              <th scope="col" className="p-3 text-center font-semibold">
                بيع
              </th>
              <th scope="col" className="p-3 text-center font-semibold">
                شراء
              </th>
            </tr>
          </thead>
          <tbody>
            {prices.map((item) => (
              <tr key={item.karat}>
                <th
                  scope="row"
                  className="p-3 text-center dark:text-white font-bold text-3xl border-t border-border"
                >
                  {item.karat}
                </th>

                <td className="p-3 text-center dark:text-white text-3xl font-bold border-t border-border">
                  {Math.ceil(item.sell)}
                </td>

                <td className="p-3 text-center dark:text-white text-3xl font-bold border-t border-border">
                  {Math.ceil(item.buy)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SilverPrices;
