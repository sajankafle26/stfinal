// app/courses/[slug]/loading.tsx
export default function Loading() {
  return (
    <section className="min-h-[60vh] bg-slate-50">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="animate-pulse space-y-8">
          <div className="h-12 w-2/3 bg-slate-200 rounded" />
          <div className="h-6 w-1/2 bg-slate-200 rounded" />
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="h-[360px] bg-slate-200 rounded-3xl" />
            <div className="h-[360px] bg-slate-200 rounded-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
