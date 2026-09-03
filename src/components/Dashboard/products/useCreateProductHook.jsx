import { useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { createProduct } from "../../../api/products/createProduct";
import { getCategories } from "../../../api/Categories/getCategories";

export default function useCreateProductHook() {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  // ================= CATEGORIES =================
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // ================= VALIDATION =================
  const validationSchema = Yup.object({
    name: Yup.string().required("اسم المنتج مطلوب"),

    category: Yup.string().required("التصنيف مطلوب"),

    weight: Yup.number()
      .typeError("الوزن يجب أن يكون رقمًا")
      .required("الوزن مطلوب")
      .positive("الوزن يجب أن يكون أكبر من صفر"),

    workmanship: Yup.number()
      .typeError("المصنعية يجب أن تكون رقمًا")
      .required("المصنعية مطلوبة")
      .min(0, "المصنعية لا يمكن أن تكون سالبة"),

    karat: Yup.number()
      .typeError("العيار يجب أن يكون رقمًا")
      .required("العيار مطلوب"),

    cashback: Yup.number()
      .typeError("إعادة البيع يجب أن تكون رقمًا")
      .nullable()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .min(0, "إعادة البيع لا يمكن أن تكون سالبة"),
  });

  // ================= FORMIK =================
  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      weight: "",
      workmanship: "",
      karat: "21",
      cashback: "",
      image: null,
    },

    validationSchema,

    onSubmit: async (values) => {
      try {
        await createProduct({
          values,
        });

        toast.success("تم إضافة المنتج بنجاح ✅");

        formik.resetForm();
        setPreview(null);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            "حدث خطأ أثناء إضافة المنتج"
        );
      }
    },
  });

  // ================= IMAGE =================
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    formik.setFieldValue("image", file);

    setPreview(URL.createObjectURL(file));
  };

  return {
    formik,
    categories,
    isLoading,
    preview,
    handleImageChange,
    fileInputRef,
  };
}