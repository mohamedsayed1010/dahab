import AppLoader from "../AppLoader";
import ScrollToTopButton from "../ScrollToTopButton/ScrollToTopButton";
import useBars from "./useBars";

export default function Bars({ category }) {
const {
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
} = useBars(category);

  if (isLoading) {
    return <AppLoader/>;
  }

  return (
    <>
      <div className="w-[95%] md:w-[80%] mx-auto mt-2">
        <h1 className="text-center text-primary text-3xl md:text-5xl font-bold mb-3">
          {title}
        </h1>

        <div className="flex justify-center mb-6 gap-4">
          <select
            value={selectedWeight}
            onChange={(e) => setSelectedWeight(e.target.value)}
            className="
              px-1
              py-2
              rounded-xl
              border
              border-border
              bg-card
              dark:text-white
            "
          >
            <option value="">اختار الوزن</option>

            {weights.map((weight) => (
              <option key={weight} value={weight}>
                {weight}
              </option>
            ))}
          </select>
            <select
    value={sortByWeight}
    onChange={(e) => setSortByWeight(e.target.value)}
    className="
              px-2
              py-2
              rounded-xl
              border
              border-border
              bg-card
              dark:text-white
    "
  >
    <option value="">ترتيب </option>
    <option value="asc">اقل وزن</option>
    <option value="desc">أعلى وزن</option>
  </select>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedProducts.map((product) => {
            const total = getTotal(product);

            return (
              <div
                key={product._id}
                className="
                  bg-card
                  border
                  border-border
                  rounded-2xl
                  overflow-hidden
                  shadow-sm
                  hover:shadow-xl
                  hover:-translate-y-1
                  transition-all
                  duration-300
                "
              >
                <div
                  className="
                    bg-bg
                    h-[150px] md:h-[300px]
                    flex
                    items-center
                    justify-center
                    overflow-hidden
                    cursor-pointer
                  "
                  onClick={() => setSelectedImage(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name || "product image"}
                    loading="lazy"
                    className="
                      w-full
                      h-full
                      object-cover
                      hover:scale-110
                      transition-transform
                      duration-500
                    "
                  />
                </div>

                <div className="px-3">
                  <h2 className="text-center font-bold text-sm md:text-xl text-textPrimary">
                    {product.name}
                  </h2>

                  <div className="space-y-1">
                    <span className="dark:text-white text-sm md:text-base text-nowrap block">
                      الوزن {product.weight}
                    </span>

                    <span className="dark:text-white pl-1 text-sm block">
                      سعر الجرام :
                      {" "}
                      {Math.ceil(
                        getPricePerGram(product)
                      )}
                    </span>

                    <span className="dark:text-white text-sm block">
                      مصنعية :
                      {" "}
                      {product.workmanship.toLocaleString()}
                    </span>

                    <div className="gap-2">
                      <div className="flex items-center gap-1 mb-1">
                        <span className="text-textPrimary font-bold text-sm">
                          الكمية
                        </span>

                        <input
                          type="number"
                          min={1}
                          value={
                            quantities[product._id] ?? ""
                          }
                          onChange={(e) =>
                            handleQuantityChange(
                              product._id,
                              e.target.value
                            )
                          }
                          onBlur={() =>
                            handleQuantityBlur(
                              product._id
                            )
                          }
                          className="
                            w-12
                            text-center
                            border
                            border-border
                            rounded-lg
                            py-1
                            bg-card
                            dark:text-white
                            font-bold
                          "
                        />
                      </div>

                      <select
                        value={
                          priceType[product._id] ??
                          "sell"
                        }
                        onChange={(e) =>
                          handlePriceTypeChange(
                            product._id,
                            e.target.value
                          )
                        }
                        className="
                          border
                          border-border
                          rounded-lg
                          px
                          mb-1
                          py-2
                          text-center
                          bg-card
                          dark:text-white
                          text-base
                          font-light
                        "
                      >
                        <option value="sell">
                          بيع
                        </option>
                        <option value="buy">
                        اعادة البيع
                        </option>
                      </select>
                    </div>

                    <div className="border-t border-border flex ">
                      <p className="dark:text-white  pl-1 my-3 text-sm">
                        الإجمالي
                      </p>

                      <p className="dark:text-white font-extrabold text-xl md:text-xl my-2">
                        {Math.ceil(
                          total
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedImage && (
        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/90
            backdrop-blur-sm
            flex
            items-center
            justify-center
            p-4
          "
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="
              bg-card
              rounded-3xl
              overflow-hidden
              w-full
              max-w-5xl
              shadow-2xl
              border
              border-primary/20
              relative
            "
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="
                absolute
                top-3
                left-3
                z-20
                w-10
                h-10
                rounded-full
                bg-black/70
                text-white
                text-xl
                hover:scale-110
                transition
              "
            >
              ✕
            </button>

            <div className="bg-black">
              <img
                src={selectedImage.image}
                alt={selectedImage.name}
                className="
                  w-full
                  max-h-[80vh]
                  object-contain
                "
              />
            </div>
          </div>
        </div>
      )}

      <ScrollToTopButton />
    </>
  );
}