import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { easeOutExpo } from "../../lib/motion";

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
  emptyMessage,
}: DataTableProps<T>) {
  const { t } = useTranslation();

  const resolvedEmptyMessage = emptyMessage ?? t("No records found.");

  const getAlignmentClass = (align?: "left" | "right") => {
    if (align === "right") return "text-end";
    if (align === "left") return "text-start";

    return undefined;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead key={col.key} className={getAlignmentClass(col.align)}>
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
              className="py-8 text-center text-muted-foreground"
            >
              {resolvedEmptyMessage}
            </TableCell>
          </TableRow>
        ) : (
          data.map((row, index) => (
            <motion.tr
              key={getRowId(row)}
              data-slot="table-row"
              className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.28,
                delay: Math.min(index * 0.035, 0.35),
                ease: easeOutExpo,
              }}
            >
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  className={getAlignmentClass(col.align)}
                >
                  {col.render(row)}
                </TableCell>
              ))}
            </motion.tr>
          ))
        )}
      </TableBody>
    </Table>
  );
}
