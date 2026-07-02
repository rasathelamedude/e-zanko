interface ExtraColumn {
  width?: string;
}

interface TableSkeletonProps {
  gridCols: string;
  columnHeaders: string[];
  rows?: number;
  hasSubtitle?: boolean;
  hasActions?: boolean;
  extraColumns?: ExtraColumn[];
  widths?: number[];
}

function TableSkeleton({
  gridCols,
  columnHeaders,
  rows = 5,
  hasSubtitle = false,
  hasActions = false,
  extraColumns = [],
  widths = [60, 52, 48, 56, 50],
}: TableSkeletonProps) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5">
        <div className="flex items-center gap-2">
          <div className="h-4 w-20 rounded bg-muted animate-pulse" />
          <div className="h-3 w-14 rounded bg-muted/50 animate-pulse" />
        </div>
        <div className="h-8 w-32 rounded-full bg-muted/50 animate-pulse" />
      </div>

      <div className={`grid ${gridCols} px-5 py-2.5 border-y border-border`}>
        {columnHeaders.map((col, i) => (
          <span
            key={i}
            className={`text-[11px] font-medium tracking-widest text-muted-foreground uppercase ${
              col === "STATUS" || col === "ACTIONS" ? "text-right" : ""
            }`}
          >
            {col}
          </span>
        ))}
      </div>

      {[...Array(rows)].map((_, i) => (
        <div
          key={i}
          className={`grid ${gridCols} items-center px-5 py-[18px] border-b border-border last:border-0`}
        >
          <div className="flex flex-col gap-1.5">
            <div
              className="h-3.5 rounded bg-muted animate-pulse"
              style={{
                width: `${widths[i % widths.length]}%`,
                animationDelay: `${i * 80}ms`,
              }}
            />
            {hasSubtitle && (
              <div
                className="h-3 rounded bg-muted/60 animate-pulse"
                style={{
                  width: `${widths[i % widths.length] - 20}%`,
                  animationDelay: `${i * 80 + 40}ms`,
                }}
              />
            )}
          </div>

          {/* extra middle columns e.g. President, Dean, Department Head, Year Level */}
          {extraColumns.map((col, ci) => (
            <div
              key={ci}
              className={`h-3.5 ${col.width ?? "w-20"} rounded bg-muted/50 animate-pulse`}
              style={{ animationDelay: `${i * 80 + 60 + ci * 20}ms` }}
            />
          ))}

          <div className="flex justify-end">
            <div
              className="h-6 w-16 rounded-full bg-muted/60 animate-pulse"
              style={{ animationDelay: `${i * 80 + 100}ms` }}
            />
          </div>

          {hasActions && (
            <div className="flex justify-end gap-3">
              <div
                className="h-3 w-3 rounded bg-muted/50 animate-pulse"
                style={{ animationDelay: `${i * 80 + 140}ms` }}
              />
              <div
                className="h-3 w-3 rounded bg-muted/50 animate-pulse"
                style={{ animationDelay: `${i * 80 + 160}ms` }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default TableSkeleton;
