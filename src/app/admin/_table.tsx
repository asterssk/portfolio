"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { TBlog } from "@/utils/types";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";

type Props = { data: TBlog[] };

const columns: ColumnDef<TBlog>[] = [
  {
    accessorKey: "created_at",
    header: "DATE POSTED",
    size: 40,
    cell: ({ row }) => {
      const date = row.original.created_at;
      const formatted = new Intl.DateTimeFormat("en-PH", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(date));

      return formatted;
    },
  },
  { accessorKey: "title", header: "TITLE", size: 70 },
  {
    accessorKey: "content",
    header: "CONTENT",
    cell: ({ row }) => <p className="line-clamp-2">{row.original.content}</p>,
  },
  {
    accessorKey: "type",
    header: "TYPE",
    size: 25,
    cell: ({ row }) => <span className="capitalize">{row.original.type}</span>,
  },
];

export function BlogTable({ data }: Props) {
  const router = useRouter();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md overflow-clip">
      <Table className="table-fixed border-collapse text-xs">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ width: `${header.getSize()}px` }}
                    className={cn("font-semibold border bg-slate-100")}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="cursor-pointer"
                onClick={() => router.push(`/admin/${row.original.id}`)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="border p-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
