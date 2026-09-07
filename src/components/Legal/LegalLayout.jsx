// Shared premium layout for the public legal pages (Terms / Privacy) so both
// stay visually consistent with the rest of Gold El Arby and are not duplicated.
export default function LegalLayout({ title, updated, children }) {
  return (
    <div className="w-[92%] md:w-[78%] lg:w-[60%] mx-auto my-8">
      <article className="bg-card border border-border rounded-3xl p-5 md:p-8 shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary text-center mb-2">
          {title}
        </h1>

        {updated && (
          <p className="text-center text-sm text-textMuted mb-6">
            آخر تحديث: {updated}
          </p>
        )}

        <div className="w-24 h-[3px] mx-auto mb-8 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent" />

        <div className="space-y-8 text-textPrimary dark:text-white leading-8 text-base md:text-lg">
          {children}
        </div>
      </article>
    </div>
  );
}

// A titled section with a valid heading level (h2 under the page h1).
export function LegalSection({ title, children }) {
  return (
    <section className="space-y-2">
      <h2 className="text-xl md:text-2xl font-bold text-primary">{title}</h2>
      {children}
    </section>
  );
}
