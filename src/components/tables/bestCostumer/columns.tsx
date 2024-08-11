import { ColumnDef } from "@tanstack/react-table"
import { CustomersData } from "../../../api/req/store/statistic"

export const columns: ColumnDef<CustomersData>[] = [
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
          const amount = parseFloat(row.getValue("totalAmount"))
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount)
     
          return <div>{formatted}</div>
        },
    },
]
