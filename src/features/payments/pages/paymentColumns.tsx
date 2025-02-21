import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns";
import type { PaymentProps } from "../api/req/payment";
import { FormatMoney } from "../../../utils/fomat";
import { t } from "../../../lib/reacti18next/i18n";

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
        return FormatMoney(row.original.value);
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
        cell: ({ row }) => {
          const status = row.original.status;
          let bgClass = "";
          let borderClass = "";
          let text = "";
          // Adapta estes valores de acordo com os status da tua aplicação
          switch (status.toUpperCase()) {
            case "SUCCESS":
              bgClass = "bg-green-900/50";
              borderClass = "border-green-900";
              text = t("success");
              break;
            case "PENDING":
              bgClass = "bg-yellow-900/50";
              borderClass = "border-yellow-900";
              text = t("pending");
              break;
            case "FAILED":
              bgClass = "bg-red-600/90";
              borderClass = "border-red-900";
              text = t("failed");
              break;
            default:
              bgClass = "bg-gray-600/90";
              borderClass = "border-gray-900";
              text = status;
          }
          return (
            <div className={`inline-block text-white rounded-full border-2 ${bgClass} ${borderClass} px-3 py-1 text-sm font-medium`}>
              <span className="text-sm mb-1">{text}</span>
            </div>
          );
        }
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