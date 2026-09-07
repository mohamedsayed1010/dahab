import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { getUsdEgp } from "../../../../api/money/money";
import { getGoldPrices } from "../../../../api/gold/goldPrices";
import { useGoldPrice } from "../../../../context/gold-price-context";

export function useGold() {
// ================= GOLD PRICE CONTEXT =================
  const { ouncePrice } = useGoldPrice();

  // ================= USD =================
  const { data, isLoading } = useQuery({
    queryKey: ["usd-egp"],
    queryFn: getUsdEgp,
    refetchInterval: 30000,
  });

  // ================= GOLD API =================
  const { data: goldData } = useQuery({
    queryKey: ["gold-prices"],
    queryFn: getGoldPrices,
  });

  const gold = goldData?.data?.[0];
  const usdEgp = data?.rate;

  // ================= PRICES TABLE =================
  const prices = useMemo(() => {
    if (!gold) return [];

    return [
      {
        karat: "24",
        sell: gold.sell24,
        buy: gold.buy24,
      },
      {
        karat: "21",
        sell: gold.sell21,
        buy: gold.buy21,
      },
      {
        karat: "18",
        sell: gold.sell18,
        buy: gold.buy18,
      },
    ];
  }, [gold]);

  // ================= CALCULATIONS =================
  const goldGramPriceEGP = Number(gold?.sell21) || 0;

  const fairPrice =
    ouncePrice && usdEgp
      ? (Number(ouncePrice) * Number(usdEgp)) / 35.55
      : 0;

  const jewelerDollar =
    goldGramPriceEGP && ouncePrice
      ? (goldGramPriceEGP * 35.55) / Number(ouncePrice)
      : 0;

  const diff = goldGramPriceEGP - fairPrice;

  // ================= RETURN =================
  return {
    gold,
    usdEgp,
    isLoading,
    ouncePrice,
    prices,
    fairPrice,
    jewelerDollar,
    diff,
  };
}