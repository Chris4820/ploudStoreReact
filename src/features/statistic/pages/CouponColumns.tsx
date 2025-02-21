import { ColumnDef } from "@tanstack/react-table"
import type { CouponData } from "../api/req/statistic"
import { FormatMoney } from "../../../utils/fomat";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columnsCupon: ColumnDef<CouponData>[] = [
    {
        accessorKey: "code",
        header: "Código",
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
