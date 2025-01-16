"use client";

import { HtmlRenderer } from "@/components/html-renderer";
import { Badge } from "@/components/ui/badge";
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
    cell: ({ row }) => (
      <HtmlRenderer value={row.original.content} className="line-clamp-1" />
    ),
  },
  {
    accessorKey: "categories",
    header: "CATEGORIES",
    size: 50,
    cell: ({ row }) => (
      <span className="capitalize">{row.original.categories.join(", ")}</span>
    ),
  },

  {
    accessorKey: "is_published",
    header: () => <div className="w-full text-center">STATUS</div>,
    size: 30,
    cell: ({ row }) => {
      return (
        <div className="w-full flex justify-center">
          <Badge
            className={cn(
              "text-center",
              row.original.is_published ? "bg-teal-600" : "bg-gray-500"
            )}
          >
            {row.original.is_published ? "Published" : "Draft"}
          </Badge>
        </div>
      );
    },
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
            <TableRow key={headerGroup.id} className="hover:bg-inherit">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ width: `${header.getSize()}px` }}
                    className={cn(
                      "font-semibold border bg-slate-100 dark:bg-slate-900/40"
                    )}
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
