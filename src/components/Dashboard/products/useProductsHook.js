import { useContext, useMemo, useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { getProducts } from "../../../api/products/products";
import { deleteProduct } from "../../../api/products/deleteProduct";
import { updateProduct } from "../../../api/products/updateProduct";
import { AuthContext } from "../../../context/AuthContext";
import { getCategories } from "../../../api/Categories/getCategories";

export default function useProductsHook() {
  const { token } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // ================= FILTERS =================
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMetal, setSelectedMetal] = useState("");
  const [selectedKarat, setSelectedKarat] = useState("");
  const [selectedType, setSelectedType] = useState("");

  // ================= GET PRODUCTS =================
  const {
    data: products = [],
    isLoading: productsLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(token),
    enabled: !!token,
  });

  // ================= GET CATEGORIES =================
  const {
    data: categories = [],
    isLoading: categoriesLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(token),
    enabled: !!token,
  });

  // ================= PRODUCT TYPES =================
  const types = useMemo(() => {
    return [...new Set(products.map((item) => item.name))].sort();
  }, [products]);

  // ================= FILTERED PRODUCTS =================
  const displayedProducts = useMemo(() => {
    return products.filter((item) => {
      const categoryMatch =
        !selectedCategory ||
        item.category?._id === selectedCategory ||
        item.category === selectedCategory;

      const metalMatch =
        !selectedMetal ||
        (selectedMetal === "gold"
          ? item.category?.type?.includes("gold")
          : item.category?.type?.includes("silver"));

      const karatMatch =
        !selectedKarat ||
        Number(item.karat) === Number(selectedKarat);

      const typeMatch =
        !selectedType ||
        item.name === selectedType;

      return (
        categoryMatch &&
        metalMatch &&
        karatMatch &&
        typeMatch
      );
    });
  }, [
    products,
    selectedCategory,
    selectedMetal,
    selectedKarat,
    selectedType,
  ]);

  // ================= DELETE PRODUCT =================
  const { mutate: removeProduct, isPending: isDeleting } = useMutation({
    mutationFn: ({ id }) =>
      deleteProduct({
        id,
        token,
      }),

    onSuccess: () => {
      toast.success("تم حذف المنتج 🗑️");

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "حصل خطأ أثناء الحذف"
      );
    },
  });

  // ================= UPDATE PRODUCT =================
  const { mutate: editProduct, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, values }) =>
      updateProduct({
        id,
        values,
        token,
      }),

    onSuccess: () => {
      toast.success("تم تعديل المنتج بنجاح ✅");

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "حصل خطأ أثناء تعديل المنتج"
      );
    },
  });

  return {
    products,
    displayedProducts,

    categories,
    types,

    productsLoading,
    categoriesLoading,

    isLoading: productsLoading || categoriesLoading,

    selectedCategory,
    setSelectedCategory,

    selectedMetal,
    setSelectedMetal,

    selectedKarat,
    setSelectedKarat,

    selectedType,
    setSelectedType,

    removeProduct,
    isDeleting,

    editProduct,
    isUpdating,
  };
}