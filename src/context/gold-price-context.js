import { createContext, useContext } from "react";

// Context object + consumer hook, kept out of the provider's component module
// so Fast Refresh works for the provider file.
export const GoldPriceContext = createContext();

export const useGoldPrice = () => useContext(GoldPriceContext);
