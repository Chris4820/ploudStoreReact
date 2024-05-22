import { ColumnDef } from "@tanstack/react-table"
import { BsCart4 } from "react-icons/bs"
import { PaymentProps } from "../../../api/req/store/payment"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string,
  name: string,
  email: string,
  cupom: string,
  amount: number,
  status: "pending" | "processing" | "success" | "failed"
  createdAt: string,
}

export const columns: ColumnDef<PaymentProps>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "cupom",
        header: "Cupom",
    },
    {
        id: "actions",
        header: "Cart",
        cell: () => {
            return(
                <BsCart4 className="cursor-pointer" size={22}/>
            )
        }
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
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "createdAt",
        header: "Data",
    },
]
