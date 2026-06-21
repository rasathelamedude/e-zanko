import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export interface DataTableColumn<T> {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
  align?: "left" | "right";
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  getRowId: (row: T) => string;
  emptyMessage?: string;
}

export function DataTable<T>({
  columns,
  data,
  getRowId,
  emptyMessage = "No records found.",
}: DataTableProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead
              key={col.key}
              className={col.align === "right" ? "text-right" : undefined}
            >
              {col.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="text-center text-gray-400 py-8"
            >
              {emptyMessage}
            </TableCell>
          </TableRow>
        ) : (
          data.map((row) => (
            <TableRow key={getRowId(row)}>
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  className={col.align === "right" ? "text-right" : undefined}
                >
                  {col.render(row)}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
