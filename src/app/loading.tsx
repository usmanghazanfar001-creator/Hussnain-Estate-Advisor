export default function Loading() {
  return (
    <div
      className="flex min-h-[60vh] items-center justify-center bg-sand-50"
      role="status"
      aria-label="Loading"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-ink-900/15 border-t-gold-500" />
    </div>
  );
}
