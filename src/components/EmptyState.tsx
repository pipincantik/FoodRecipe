export default function EmptyState({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="text-center py-20 px-6">
      <p className="font-display italic text-2xl text-[var(--color-cream)]/80 mb-2">
        {title}
      </p>
      {description && (
        <p className="text-sm text-[var(--color-cream)]/50 max-w-md mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
