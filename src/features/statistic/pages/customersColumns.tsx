import { ColumnDef } from "@tanstack/react-table"
import type { CustomersData } from "../api/req/statistic"
import { FormatMoney } from "../../../utils/fomat";

export const columnsCustomer: ColumnDef<CustomersData>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "totalSells",
        header: "Purchase",
    },
    {
        accessorKey: "totalAmount",
        header: "Amount",
        cell: ({ row }) => {
          return FormatMoney(row.original.totalAmount);
        },
    },
]
