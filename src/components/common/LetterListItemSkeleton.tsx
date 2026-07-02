const LetterListItemSkeleton = () => {
  return (
    <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 last:border-b-0 animate-pulse">
      <div className="flex items-center gap-3">
        {/* Status badge */}
        <div className="h-6 w-20 rounded-full bg-gray-200" />

        <div>
          {/* Title */}
          <div className="h-4 w-48 rounded bg-gray-200" />

          {/* Subtitle */}
          <div className="mt-2 h-3 w-32 rounded bg-gray-200" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Attachment icon */}
        <div className="h-4 w-4 rounded bg-gray-200" />

        {/* Date */}
        <div className="h-3 w-16 rounded bg-gray-200" />
      </div>
    </div>
  );
};

export default LetterListItemSkeleton;
