import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getLastTelegramPrice } from "../api/telegram/telegram";
import { GoldPriceContext } from "./gold-price-context";

export function GoldPriceProvider({ children }) {
  // Seeded from the last persisted price so there's a value on first paint /
  // offline, then updated as fresh prices arrive.
  const [ouncePrice, setOuncePrice] = useState(
    () => Number(localStorage.getItem("ouncePrice")) || null
  );

  const { data } = useQuery({
    queryKey: ["last-telegram-price"],
    queryFn: getLastTelegramPrice,
    refetchOnMount: true,
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 1,
  });

  // Adjust state while rendering when new query data arrives (React's
  // recommended pattern for deriving state from a changing value) instead of
  // syncing it inside an effect. Guarded by an identity check so it doesn't
  // loop, and only a genuinely valid price overwrites the last known one.
  const [seenData, setSeenData] = useState(data);
  if (data !== seenData) {
    setSeenData(data);
    const price = data?.success ? Number(data.data.lastPrice) : 0;
    if (price) setOuncePrice(price);
  }

  // Persisting to localStorage is a real external side effect, so it stays in
  // an effect.
  useEffect(() => {
    if (ouncePrice) {
      localStorage.setItem("ouncePrice", ouncePrice);
    }
  }, [ouncePrice]);

  return (
    <GoldPriceContext.Provider value={{ ouncePrice }}>
      {children}
    </GoldPriceContext.Provider>
  );
}
