function LetterCardSkeleton() {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white h-full">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
        <div className="h-4 w-12 rounded bg-gray-200 animate-pulse" />
        <div className="h-3 w-4 rounded bg-gray-100 animate-pulse" />
      </div>

      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`px-4 py-4 border-s-4 border-s-transparent ${
            i !== 4 ? "border-b border-gray-100" : ""
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div
              className="h-3.5 rounded bg-gray-200 animate-pulse"
              style={{
                width: `${[50, 60, 45, 55, 48][i]}%`,
                animationDelay: `${i * 80}ms`,
              }}
            />
            <div
              className="h-5 w-14 rounded-full bg-gray-100 animate-pulse"
              style={{ animationDelay: `${i * 80 + 40}ms` }}
            />
          </div>
          <div
            className="h-3.5 rounded bg-gray-100 animate-pulse mb-1.5"
            style={{
              width: `${[70, 65, 75, 60, 68][i]}%`,
              animationDelay: `${i * 80 + 60}ms`,
            }}
          />
          <div
            className="h-2.5 w-16 rounded bg-gray-100 animate-pulse"
            style={{ animationDelay: `${i * 80 + 90}ms` }}
          />
        </div>
      ))}
    </div>
  );
}

function LetterDetailsSkeleton() {
  return (
    <div className="border border-gray-200 rounded-xl p-6 bg-white h-full">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="h-6 w-16 rounded-full bg-gray-200 animate-pulse" />
          <div className="h-3 w-16 rounded bg-gray-100 animate-pulse" />
        </div>
        <div className="h-9 w-28 rounded-md bg-gray-100 animate-pulse" />
      </div>

      <div className="h-7 w-2/3 rounded bg-gray-200 animate-pulse mb-6" />

      <div className="pb-4 mb-4 border-b border-gray-100">
        <div className="h-3 w-12 rounded bg-gray-100 animate-pulse mb-2" />
        <div className="h-4 w-40 rounded bg-gray-200 animate-pulse" />
      </div>

      <div>
        <div className="h-3 w-16 rounded bg-gray-100 animate-pulse mb-2" />
        <div className="space-y-2">
          <div className="h-3.5 rounded bg-gray-100 animate-pulse w-full" />
          <div className="h-3.5 rounded bg-gray-100 animate-pulse w-full" />
          <div className="h-3.5 rounded bg-gray-100 animate-pulse w-4/5" />
        </div>
      </div>
    </div>
  );
}

function InboxSkeleton() {
  return (
    <div className="flex gap-4 h-full">
      <div className="w-80 shrink-0">
        <LetterCardSkeleton />
      </div>
      <div className="flex-1">
        <LetterDetailsSkeleton />
      </div>
    </div>
  );
}

export default InboxSkeleton;
