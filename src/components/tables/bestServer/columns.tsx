import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BestServer = {
  id: string,
  name: string,
  purchase: number,
  amount: number,
}

export const columns: ColumnDef<BestServer>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "purchase",
        header: "Purchase",
    },
    {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => {
          const amount = parseFloat(row.getValue("amount"))
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount)
     
          return <div>{formatted}</div>
        },
    },
]
