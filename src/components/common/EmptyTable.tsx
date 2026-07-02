const EmptyTable = ({ message }: { message?: string }) => {
  return (
    <tr>
      <td colSpan={4} className="py-16 text-center text-muted-foreground text-sm">
        {message || "No results found"}
      </td>
    </tr>
  );
};

export default EmptyTable;
