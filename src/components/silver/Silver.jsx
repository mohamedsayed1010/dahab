import AppLoader from "../AppLoader";
import useSilver from "./useSilver";

export default function Silver({ category }) {
  const {
    isLoading,
    title,

    displayedProducts,

    types,

    selectedType,
    setSelectedType,

    selectedKarat,
    setSelectedKarat,

    sortByWeight,
    setSortByWeight,

    selectedImage,
    setSelectedImage,

    getPricePerGram,
    getTotal,
  } = useSilver(category);

  if (isLoading) {
    return <AppLoader />;
  }

  const karatLabel = {
    24: "1000",
    21: "925",
    18: "800",
  };

  return (
    <>
      <div className="w-[95%] md:w-[80%] mx-auto mt-5">
        <h1 className="text-center text-primary text-3xl md:text-5xl font-bold mb-6">
          {title}
        </h1>

        <div className="flex md:flex-row gap-2 justify-center mb-6">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="
              px-4
              py-2
              rounded-xl
              border
              border-border
              bg-card
              dark:text-white
            "
          >
            <option value="">اختار الصنف</option>

            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <select
            value={selectedKarat}
            onChange={(e) => setSelectedKarat(e.target.value)}
            className="
              px-4
              py-2
              rounded-xl
              border
              border-border
              bg-card
              dark:text-white
            "
          >
            <option value="">العيار</option>
            <option value="24">1000</option>
            <option value="21">925</option>
            <option value="18">800</option>
          </select>

          <select
            value={sortByWeight}
            onChange={(e) => setSortByWeight(e.target.value)}
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
            <option value="">ترتيب</option>
            <option value="asc">أقل وزن</option>
            <option value="desc">أعلى وزن</option>
          </select>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedProducts.map((item) => (
            <div
              key={item._id}
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
                  h-[220px]
                  md:h-[300px]
                  overflow-hidden
                  cursor-pointer
                  bg-bg
                "
                onClick={() => setSelectedImage(item)}
              >
                <img
                  src={item.image}
                  alt={item.name}
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

              <div className="p-3 text-center">
                <h2 className="font-bold text-sm md:text-lg text-textPrimary">
                  {item.name}
                </h2>

                <div className="space-y-1 mt-2">
                  <p className="dark:text-white text-sm">
                    العيار: {karatLabel[item.karat] || item.karat}
                  </p>

                  <p className="dark:text-white text-sm">
                    الوزن: {item.weight}
                  </p>

                  <p className="dark:text-white text-sm">
                    سعر الجرام:{" "}
                    {Math.ceil(
                      getPricePerGram(item)
                    ).toLocaleString()}
                  </p>

                  <p className="dark:text-white text-sm">
                    المصنعية والضريبة:{" "}
                    {item.workmanship.toLocaleString()}
                  </p>
                </div>

                <div className="border-t border-border mt-3 pt-3">
                  <p className="dark:text-white font-extrabold text-lg">
                    {Math.ceil(getTotal(item)).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
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
              border
              border-primary/20
              shadow-2xl
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
                z-10
                w-10
                h-10
                rounded-full
                bg-black/70
                text-white
                text-xl
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
                  max-h-[60vh]
                  object-cover
                "
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}