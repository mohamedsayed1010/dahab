import { useContext, useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { AuthContext } from "../../../context/AuthContext";
import { getCategories } from "../../../api/Categories/getCategories";
import { getProductById } from "../../../api/products/getProductById";
import { updateProduct } from "../../../api/products/updateProduct";

export default function useEditProductHook() {
  const { accessToken } = useContext(AuthContext);
  const { id } = useParams();
  console.log("ID:", id);
  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

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

  useEffect(() => {
    if (!product) return;

    formik.setValues({
      name: product.name || "",
      category:
        product.category?._id ||
        product.category ||
        "",
      weight: product.weight || "",
      workmanship: product.workmanship || "",
      karat: product.karat || "21",
      cashback: product.cashback || "",
      image: null,
    });

    setPreview(product.image);
  }, [product]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    formik.setFieldValue("image", file);
    setPreview(URL.createObjectURL(file));
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