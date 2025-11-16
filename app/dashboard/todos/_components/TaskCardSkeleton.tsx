export function TaskCardSkeleton() {
  return (
    <div className="bg-white rounded-lg border p-6 animate-pulse">
      {/* Header */}
      <div className="flex flex-wrap justify-between mb-4">
        <div className="h-5 bg-slate-200 rounded w-3/4 mb-2"></div>
        <div className="flex items-center gap-1">
          <div className="h-5 w-16 bg-slate-200 rounded"></div>
          <div className="h-5 w-5 bg-slate-200 rounded"></div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-slate-200 rounded w-full"></div>
        <div className="h-4 bg-slate-200 rounded w-5/6"></div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4">
        <div className="h-4 bg-slate-200 rounded w-1/3"></div>
        <div className="flex gap-2">
          <div className="h-8 w-8 bg-slate-200 rounded"></div>
          <div className="h-8 w-8 bg-slate-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}
