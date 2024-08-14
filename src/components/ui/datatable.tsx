"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";
import { CgSpinner } from "react-icons/cg";
import { useNavigate, useSearchParams } from "react-router-dom";
import CardEmptyComponent from "../commons/CardEmpty";
import Pagination from "./pagination";
import { MetaProps } from "../../api/req/store/statistic";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading: boolean;
  meta?: MetaProps
  link?: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  loading,
  meta,
  link
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

  return (
    <>
    <div className="rounded-md border">
      <Table>
        <TableHeader className="bg-secondary">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="h-12">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="first:pl-5 last:pr-5 last:text-end">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                <div className="flex justify-center items-center h-full">
                  <CgSpinner className="animate-spin" size={40} />
                </div>
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => {
                    if (link) {
                      // Replace {id} in link with row.original.id
                      //@ts-expect-error
                      const updatedLink = link.replace('{id}', `${row.original.id}`);
                      navigate(updatedLink);
                    }
                }}
                className="cursor-pointer"
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="first:pl-5 last:pr-5 py-4 last:text-end">
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="min-h-[320px]">
              <TableCell  colSpan={columns.length} className="text-center">
                <CardEmptyComponent
                  title="Sem resultados"
                  description="Nenhum resultado foi encontrado!"
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    {meta && data.length > 0 && (
        <Pagination items={meta.items} pages={meta.pages} page={page} />
      )}
    </>
  );
}