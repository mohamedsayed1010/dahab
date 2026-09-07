import useEditProductHook from "./useEditProductHook";

export default function EditProduct() {
  const {
    formik,
    categories,
    preview,
    handleImageChange,
    fileInputRef,
    isLoading,
  } = useEditProductHook();

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-3">
      <h1 className="text-xl font-bold text-primary mb-2">
        تعديل المنتج
      </h1>

      <div className="bg-card border border-border rounded-xl p-3">
        <form
          onSubmit={formik.handleSubmit}
          className="space-y-2"
        >
          {/* NAME */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="اسم المنتج"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 border border-border rounded-lg bg-transparent dark:text-white"
            />

            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.name}
              </p>
            )}
          </div>

          {/* CATEGORY */}
          <div>
            <select
              name="category"
              aria-label="التصنيف"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 border border-border rounded-lg bg-transparent dark:text-white"
            >
              <option value="">اختر الفئة</option>

              {categories.map((cat) => (
                <option
                  key={cat._id}
                  value={cat._id}
                  className="dark:text-black"
                >
                  {cat.name}
                </option>
              ))}
            </select>

            {formik.touched.category &&
              formik.errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.category}
                </p>
              )}
          </div>

          {/* WEIGHT */}
          <div>
            <input
              type="number"
              inputMode="numeric"
              name="weight"
              placeholder="الوزن"
              value={formik.values.weight}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 border border-border rounded-lg bg-transparent dark:text-white"
            />

            {formik.touched.weight &&
              formik.errors.weight && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.weight}
                </p>
              )}
          </div>

          {/* WORKMANSHIP */}
          <div>
            <input
              type="number"
              inputMode="numeric"
              name="workmanship"
              placeholder="المصنعية"
              value={formik.values.workmanship}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 border border-border rounded-lg bg-transparent dark:text-white"
            />

            {formik.touched.workmanship &&
              formik.errors.workmanship && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.workmanship}
                </p>
              )}
          </div>

          {/* KARAT */}
          <div>
            <input
              type="number"
              inputMode="numeric"
              name="karat"
              placeholder="العيار"
              value={formik.values.karat}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 border border-border rounded-lg bg-transparent dark:text-white"
            />

            {formik.touched.karat &&
              formik.errors.karat && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.karat}
                </p>
              )}
          </div>

          {/* CASHBACK */}
          <div>
            <input
              type="number"
              inputMode="numeric"
              name="cashback"
              placeholder="إعادة البيع (اختياري)"
              value={formik.values.cashback}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 border border-border rounded-lg bg-transparent dark:text-white"
            />

            {formik.touched.cashback &&
              formik.errors.cashback && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.cashback}
                </p>
              )}
          </div>

          {/* IMAGE */}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              aria-label="صورة المنتج"
              onChange={handleImageChange}
              className="w-full"
            />
          </div>

          {/* PREVIEW */}
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-40 h-40 object-cover rounded-lg border"
            />
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="
              w-full
              bg-primary
              text-black
              font-bold
              py-3
              rounded-lg
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {formik.isSubmitting
              ? "جاري التعديل..."
              : "حفظ التعديلات"}
          </button>
        </form>
      </div>
    </div>
  );
}