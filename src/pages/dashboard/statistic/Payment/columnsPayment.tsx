import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns";
import { PaymentProps } from "../../../../api/req/store/payment";

export const columnsPayment: ColumnDef<PaymentProps>[] = [
    {
      accessorKey: "clientIdentifier",
      header: "Cliente",
    },
    {
        accessorKey: "clientEmail",
        header: "Email",
    },
    {
      accessorKey: "value",
      header: "Preço",
      cell: ({ row }) => {
        const value = row.original.value;
        return value + "€";
      },
    },
    {
      accessorKey: "coupon",
      header: "Cupom",
      cell: ({ row }) => {
        const cupon = row.original.coupon;
        return cupon ? cupon.name : "Não utilizado";
      },
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
      accessorKey: "created_at",
      header: "Data",
      cell: ({ row }) => {
        const date = new Date(row.original.created_at);
        return format(date, "dd/MM/yyyy HH:mm");
      },
    }
  ]