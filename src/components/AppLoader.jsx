export default function AppLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background">
      <div className="flex flex-col items-center">
        {/* Logo */}
        <div className="relative">
          {/* Spinner */}
          <div className="absolute inset-0 rounded-full border-[3px] border-primary/20 border-t-primary animate-spin" />

          {/* Logo */}
          <div className="w-28 h-28 rounded-3xl bg-black flex items-center justify-center p-2">
            <img
              src="/icon.webp"
              alt="Gold App"
              className="w-full h-full rounded-2xl object-cover"
            />
          </div>
        </div>

        {/* Loading Text */}
        <p className="mt-8 text-xl font-semibold text-textPrimary">
          جاري تحميل البيانات...
        </p>

        <div className="flex gap-2 mt-4">
          <span className="w-2 h-2 rounded-full bg-primary animate-bounce" />
          <span
            className="w-2 h-2 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="w-2 h-2 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
}