import { ColumnDef } from "@tanstack/react-table"
import type { CategoryData } from "../api/req/statistic"
import { FormatMoney } from "../../../utils/fomat";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columnsCategories: ColumnDef<CategoryData>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "totalSells",
        header: "Vendas",
    },
    {
        accessorKey: "totalAmount",
        header: "Amount",
        cell: ({ row }) => {
          return FormatMoney(row.original.totalAmount);
        },
    },
]