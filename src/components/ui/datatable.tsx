"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table"
import { CgSpinner } from "react-icons/cg"
import { useNavigate, useSearchParams } from "react-router-dom"
import CardEmptyComponent from "../commons/CardEmpty"
import Pagination from "./pagination"
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table"
import { t } from "../../lib/reacti18next/i18n"

export type MetaProps = {
  items: number
  pages: number
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  loading: boolean
  metaLoading?: boolean
  meta?: MetaProps
  link?: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  loading,
  metaLoading,
  meta,
  link,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1

  return (
    <div className="flex flex-col w-full">
      {/* Wrapper div with overflow-x-auto to enable horizontal scrolling */}
      <div className="w-full overflow-x-auto">
        <div className="rounded-md border shadow-sm min-w-full">
          <Table>
            <TableHeader className="bg-secondary">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="h-12">
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="first:pl-5 last:pr-5 last:text-end whitespace-nowrap">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center">
                    <div className="flex justify-center items-center h-full py-8">
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
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-expect-error
                        const updatedLink = link.replace("{id}", `${row.original.id}`)
                        navigate(updatedLink)
                      }
                    }}
                    className="cursor-pointer"
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="first:pl-5 last:pr-5 py-4 last:text-end whitespace-nowrap">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow className="min-h-[320px]">
                  <TableCell colSpan={columns.length} className="text-center">
                    <CardEmptyComponent title={t("noFound.title")} description={t("noFound.description")} />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      {!metaLoading && meta && (
        <div className="mt-4">
          <Pagination items={meta.items} pages={meta.pages} page={page} />
        </div>
      )}
    </div>
  )
}

