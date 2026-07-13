type PageLoadingProps = {
  title?: string;
};

export default function PageLoading({ title = "Shop Mart" }: PageLoadingProps) {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="size-12 animate-spin rounded-full border-4 border-zinc-200 border-t-emerald-600" />
        <h1 className="text-2xl font-bold tracking-normal text-zinc-900">{title}</h1>
      </div>
    </main>
  );
}
