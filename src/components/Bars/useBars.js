import { useState, useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";

import { getProducts } from "../../api/products/products";
import { getGoldPrices } from "../../api/gold/goldPrices";
import { getSilverPrices } from "../../api/silver/silverPrices";

export default function useBars(category) {
  const [quantities, setQuantities] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState("");
  const [priceType, setPriceType] = useState({});
  const [sortByWeight, setSortByWeight] = useState("");

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const { data: goldData } = useQuery({
    queryKey: ["gold-prices"],
    queryFn: getGoldPrices,
  });

  const { data: silverData } = useQuery({
    queryKey: ["silver-prices"],
    queryFn: getSilverPrices,
  });

  const gold = useMemo(
    () => goldData?.data?.[0],
    [goldData]
  );

  const silver = useMemo(
    () =>  silverData?.data?.[0],
    [silverData]
  );

const filteredProducts = useMemo(() => {
  const categories = Array.isArray(category)
    ? category
    : [category];

  return products.filter((item) =>
    categories.includes(item?.category?.name)
  );
}, [products, category]);

const title = useMemo(() => {
  if (Array.isArray(category)) {
    return "السبائك والجنيهات";
  }

  return filteredProducts?.[0]?.category?.name || category;
}, [filteredProducts, category]);

  const weights = useMemo(() => {
    return [
      ...new Set(
        filteredProducts.map((item) => item.weight)
      ),
    ].sort((a, b) => a - b);
  }, [filteredProducts]);

 const displayedProducts = useMemo(() => {
  let products = [...filteredProducts];

  if (selectedWeight) {
    products = products.filter(
      (product) =>
        product.weight === Number(selectedWeight)
    );
  }

  if (sortByWeight === "asc") {
    products.sort((a, b) => a.weight - b.weight);
  }

  if (sortByWeight === "desc") {
    products.sort((a, b) => b.weight - a.weight);
  }

  return products;
}, [filteredProducts, selectedWeight, sortByWeight]);

  const getPricePerGram = useCallback(
    (product) => {
      const type = product?.category?.type;
      const mode = priceType[product._id] ?? "sell";

      if (type === "gold") {
        return mode === "sell"
          ? Math.ceil(gold?.sell24 ?? 0)
          : Math.ceil(gold?.buy24 ?? 0);
      }

      if (type === "Coins") {
        return mode === "sell"
          ? Math.ceil(gold?.sell21 ?? 0)
          : Math.ceil(gold?.buy21 ?? 0);
      }

      if (type === "silver") {
        return mode === "sell"
          ? Math.ceil(silver?.silver1000Sell ?? 0)
          : Math.ceil(silver?.silver1000Buy ?? 0);
      }

      return 0;
    },
    [gold, silver, priceType]
  );
const getTotal = useCallback(
  (product) => {
    const mode = priceType[product._id] ?? "sell";
    const quantity = quantities[product._id] ?? 1;
    const pricePerGram = getPricePerGram(product);

    const extraCost =
      mode === "buy"
        ? Number(product.cashback ?? 0)
        : Number(product.workmanship ?? 0);

    return (
      (pricePerGram + extraCost) *
      product.weight *
      quantity
    );
  },
  [quantities, getPricePerGram, priceType]
);

  const handleQuantityChange = useCallback(
    (id, value) => {
      setQuantities((prev) => ({
        ...prev,
        [id]: value === "" ? "" : Number(value),
      }));
    },
    []
  );

  const handleQuantityBlur = useCallback((id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] || 1,
    }));
  }, []);

  const handlePriceTypeChange = useCallback(
    (id, value) => {
      setPriceType((prev) => ({
        ...prev,
        [id]: value,
      }));
    },
    []
  );

return {
  isLoading,

  title,
  weights,
  displayedProducts,

  quantities,
  priceType,
  selectedWeight,
  selectedImage,
  sortByWeight,

  setSelectedWeight,
  setSelectedImage,
  setSortByWeight,

  getPricePerGram,
  getTotal,

  handleQuantityChange,
  handleQuantityBlur,
  handlePriceTypeChange,
};
}