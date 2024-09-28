import { ColumnDef } from "@tanstack/react-table"
import { CouponsProps, CouponType } from "../api/req/coupons"
import { format } from "date-fns";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columnsCoupon: ColumnDef<CouponsProps>[] = [
    {
        accessorKey: "code",
        header: "Codigo",
    },
    {
      accessorKey: "value", // O campo base que você quer acessar
      header: "Desconto",
      cell: ({ row }) => {
          const value = row.original.value; // Obtém o valor da linha atual
          const type = row.original.type; // Obtém o tipo da linha atual
  
          // Formata o valor conforme o tipo
          return type === CouponType.PERCENTAGE ? `${value}%` : `${value}€`;
      }
  },
  {
    accessorKey: "usages",
    header: "Usos",
    cell: ({ row }) => {
        const usages = row.original.usages;
        const limit = row.original.limit;

        // Se existir um limite, mostra usages/limit, senão mostra apenas usages
        return limit ? `${usages}/${limit}` : `${usages}`;
    },
  },
  {
    accessorKey: "created_at",
    header: "Expira em",
    cell: ({ row }) => {
      const date = row.original.expire_at ? new Date(row.original.expire_at) : null;
      return date ? format(date, "dd/MM/yyyy HH:mm") : "Indefinido";
    },
  }
]