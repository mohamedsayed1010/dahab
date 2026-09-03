import { useState, useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";

import { getProducts } from "../../api/products/products";
import { getSilverPrices } from "../../api/silver/silverPrices";

export default function useSilver(category) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [selectedKarat, setSelectedKarat] = useState("");
  const [sortByWeight, setSortByWeight] = useState("");

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const { data: silverData } = useQuery({
    queryKey: ["silver-prices"],
    queryFn: getSilverPrices,
  });

  const silver = useMemo(
    () => silverData?.data?.[0],
    [silverData]
  );

  const filteredProducts = useMemo(() => {
    return products.filter(
      (item) => item?.category?.name === category
    );
  }, [products, category]);

  const title = useMemo(() => {
    return filteredProducts?.[0]?.category?.name || category;
  }, [filteredProducts, category]);

  const weights = useMemo(() => {
    return [
      ...new Set(
        filteredProducts.map((item) => item.weight)
      ),
    ].sort((a, b) => a - b);
  }, [filteredProducts]);

  const types = useMemo(() => {
    return [
      ...new Set(
        filteredProducts.map((item) => item.name)
      ),
    ];
  }, [filteredProducts]);

  const displayedProducts = useMemo(() => {
    let productsList = filteredProducts.filter((item) => {
      const typeMatch =
        !selectedType || item.name === selectedType;

      const karatMatch =
        !selectedKarat ||
        Number(item.karat) === Number(selectedKarat);

      return typeMatch && karatMatch;
    });

    if (sortByWeight === "asc") {
      productsList.sort((a, b) => a.weight - b.weight);
    }

    if (sortByWeight === "desc") {
      productsList.sort((a, b) => b.weight - a.weight);
    }

    return productsList;
  }, [
    filteredProducts,
    selectedType,
    selectedKarat,
    sortByWeight,
  ]);

  const getPricePerGram = useCallback(
    (product) => {
      const karat = Number(product.karat);

      if (karat === 24) {
        return Math.ceil(silver?.silver1000Sell ?? 0);
      }

      if (karat === 21) {
        return Math.ceil(silver?.silver925Sell ?? 0);
      }

      if (karat === 18) {
        return Math.ceil(silver?.silver800Sell ?? 0);
      }

      return 0;
    },
    [silver]
  );

  const getTotal = useCallback(
    (product) => {
      return (
        (getPricePerGram(product) +
          Number(product.workmanship ?? 0)) *
        Number(product.weight ?? 0)
      );
    },
    [getPricePerGram]
  );

  return {
    isLoading,
    title,

    displayedProducts,
    weights,
    types,

    selectedType,
    setSelectedType,

    selectedKarat,
    setSelectedKarat,

    selectedImage,
    setSelectedImage,

    sortByWeight,
    setSortByWeight,

    getPricePerGram,
    getTotal,
  };
}