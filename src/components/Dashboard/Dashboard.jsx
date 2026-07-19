import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import useDashboardPrices from "./useDashboardPrices";


export default function Dashboard() {
  const { user, accessToken } = useContext(AuthContext);

  const { goldFormik, silverFormik } = useDashboardPrices(accessToken);


  return (
    <div className="p-6">

      {/* ================= WELCOME ================= */}
      <h1 className="text-3xl font-bold text-primary mb-6">
        👑 أهلاً بيك يا {user?.name}
      </h1>

      {/* ================= GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* ================= GOLD ================= */}
        <div className="bg-card border border-border p-6 rounded-xl">

          <h2 className="text-2xl font-bold mb-4 text-yellow-500">
            أسعار الذهب (عيار 21)
          </h2>

          <form onSubmit={goldFormik.handleSubmit} className="space-y-4">

            <input
              name="buy21"
              type="number"
              inputMode="numeric"
              placeholder="سعر الشراء"
              value={goldFormik.values.buy21}
              onChange={goldFormik.handleChange}
              className="w-full p-3 border rounded-lg bg-transparent dark:text-white"
            />

            <input
              name="sell21"
              type="number"
              inputMode="numeric"
              placeholder="سعر البيع"
              value={goldFormik.values.sell21}
              onChange={goldFormik.handleChange}
              className="w-full p-3 border rounded-lg bg-transparent dark:text-white"
            />

            <button className="w-full bg-yellow-500 text-black font-bold py-3 rounded-lg">
              تحديث الذهب
            </button>

          </form>
        </div>

        {/* ================= SILVER ================= */}
        <div className="bg-card border border-border p-6 rounded-xl">

          <h2 className="text-2xl font-bold mb-4 text-gray-300">
            أسعار الفضة (عيار 999)
          </h2>

          <form onSubmit={silverFormik.handleSubmit} className="space-y-4">

            <input
              name="silver1000Buy"
              type="number"
              inputMode="numeric"
              placeholder="سعر الشراء"
              value={silverFormik.values.silver1000Buy}
              onChange={silverFormik.handleChange}
              className="w-full p-3 border rounded-lg bg-transparent dark:text-white"
            />

            <input
              name="silver1000Sell"
              type="number"
              inputMode="numeric"
              placeholder="سعر البيع"
              value={silverFormik.values.silver1000Sell}
              onChange={silverFormik.handleChange}
              className="w-full p-3 border rounded-lg bg-transparent dark:text-white"
            />

            <button className="w-full bg-gray-400 text-black font-bold py-3 rounded-lg">
              تحديث الفضة
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}