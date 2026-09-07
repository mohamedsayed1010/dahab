import { useContext, useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { AuthContext } from "../../../context/auth-context";
import { getCategories } from "../../../api/Categories/getCategories";
import { getProductById } from "../../../api/products/getProductById";
import { updateProduct } from "../../../api/products/updateProduct";

export default function useEditProductHook() {
  const { accessToken } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  // Preview for a newly chosen file only; the existing product image is handled
  // as a derived fallback below (so we never sync state inside an effect).
  const [selectedPreview, setSelectedPreview] = useState(null);

  // Categories
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(accessToken),
    enabled: !!accessToken,
  });

  // Product
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById({ id, accessToken }),
    enabled: !!id && !!accessToken,
  });

  const validationSchema = Yup.object({
    name: Yup.string().required("اسم المنتج مطلوب"),

    category: Yup.string().required("التصنيف مطلوب"),

    weight: Yup.number()
      .typeError("الوزن يجب أن يكون رقمًا")
      .required("الوزن مطلوب"),

    workmanship: Yup.number()
      .typeError("المصنعية يجب أن تكون رقمًا")
      .required("المصنعية مطلوبة"),

    karat: Yup.number()
      .typeError("العيار يجب أن يكون رقمًا")
      .required("العيار مطلوب"),

    cashback: Yup.number()
      .nullable()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      ),
  });

  const formik = useFormik({
    // Populate the form from the fetched product. `enableReinitialize` resets
    // the fields whenever these initial values change (i.e. once the product
    // query resolves), which replaces a populate-in-effect.
    enableReinitialize: true,

    initialValues: {
      name: product?.name || "",
      category: product?.category?._id || product?.category || "",
      weight: product?.weight || "",
      workmanship: product?.workmanship || "",
      karat: product?.karat || "21",
      cashback: product?.cashback || "",
      image: null,
    },

    validationSchema,

    onSubmit: async (values) => {
      try {
        await updateProduct({
          id,
          values,
          accessToken,
        });

        toast.success("تم تعديل المنتج بنجاح ✅");

        navigate("/products");
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            "حدث خطأ أثناء تعديل المنتج"
        );
      }
    },
  });

  // A freshly selected file wins; otherwise fall back to the product's existing
  // image. Derived during render — no effect, no state sync.
  const preview = selectedPreview ?? product?.image ?? null;

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    formik.setFieldValue("image", file);
    setSelectedPreview(URL.createObjectURL(file));
  };

  return {
    formik,
    categories,
    preview,
    handleImageChange,
    fileInputRef,
    isLoading,
  };
}