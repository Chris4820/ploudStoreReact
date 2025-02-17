import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns";
import type { PaymentProps } from "../api/req/payment";
import { formatMoney } from "../../../utils/fomat";
import type { StoreInformationProps } from "../../stores/api/req/store";

export const columnsPayment = (store: StoreInformationProps | undefined): ColumnDef<PaymentProps>[] => [
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
        return formatMoney(row.original.value, store);
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
      accessorKey: "createdAt",
      header: "Data",
      cell: ({ row }) => {
        const dateValue = row.original.createdAt;
        if (!dateValue) return "N/D";
        const date = new Date(dateValue);
        // Verifica se a data é válida
        if (isNaN(date.getTime())) return "N/D";
        return format(date, "dd/MM/yyyy HH:mm");
      },
    }
  ]