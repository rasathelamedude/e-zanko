const EmptyTable = ({ message }: { message?: string }) => {
  return (
    <tr>
      <td colSpan={4} className="py-16 text-center text-slate-400 text-sm">
        {message || "No results found"}
      </td>
    </tr>
  );
};

export default EmptyTable;
