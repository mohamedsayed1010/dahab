export default function ImagePreviewModal({ src, alt, onClose }) {
  if (!src) return null;

  return (
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
      onClick={onClose}
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
          type="button"
          onClick={onClose}
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
            src={src}
            alt={alt}
            className="
              w-full
              max-h-[80vh]
              object-contain
            "
          />
        </div>
      </div>
    </div>
  );
}
