import { ColumnDef } from "@tanstack/react-table"
import { PaymentProps } from "../../../api/req/store/payment"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<PaymentProps>[] = [
  {
    accessorKey: "paymentId",
    header: "Name",
  },
  {
    accessorKey: "clientName",
    header: "Name",
  },
  {
    accessorKey: "clientEmail",
    header: "Email",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => {
        const amount = parseFloat(row.getValue("value"))
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)
   
        return <div className="font-medium">{formatted}</div>
      },
  },
  {
    accessorKey: "cupon",
    header: "Discount",
    cell: ({ row }) => {
        const discount = row.getValue("cupon");
        const discountValue = discount !== null ? discount : "Sem desconto";
        // @ts-ignore
        return <div>{discountValue}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
        const status = row.getValue("status");
        let background = "";
        switch (status) {
            case "pending":
                background = "bg-yellow-500"
                break;
            case "failed":
                background = "bg-red-500"
                break;
            default:
                background = "bg-green-500"
                break;
        }
        // @ts-ignore
        return <div className={`py-1 text-white bg-opacity-80 w-20 rounded-lg text-center ${background}`}>{status}</div>
      },
  },
  {
    accessorKey: "created_at",
    header: "Date",
  },
]
