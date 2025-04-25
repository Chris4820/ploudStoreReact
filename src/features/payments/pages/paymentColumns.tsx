import { ColumnDef } from "@tanstack/react-table"
import type { PaymentProps } from "../api/req/payment";
import { FormatDateTime, FormatMoney } from "../../../utils/fomat";
import { t } from "../../../lib/reacti18next/i18n";

export const columnsPayment: ColumnDef<PaymentProps>[] = [
    {
      accessorKey: "clientIdentifier",
      header: () => t("client"),
    },
    {
        accessorKey: "clientEmail",
        header: "Email",
        cell: ({ row }) => {
          return row.original.clientEmail ? row.original.clientEmail : "Indefinido";
        },
    },
    {
      accessorKey: "totalAmount",
      header: () => t("price"),
      cell: ({ row }) => {
        return FormatMoney(row.original.totalAmount);
      },
    },
    {
        accessorKey: "paymentStatus",
        header: () => t("status"),
        cell: ({ row }) => {
          const status = row.original.paymentStatus;
          let bgClass = "";
          let borderClass = "";
          let text = "";
          // Adapta estes valores de acordo com os status da tua aplicação
          switch (status.toUpperCase()) {
            case "SUCCESS":
              bgClass = "bg-green-900/50";
              borderClass = "border-green-900";
              text = "success";
              break;
            case "PENDING":
              bgClass = "bg-yellow-900/50";
              borderClass = "border-yellow-900";
              text = "pending";
              break;
            case "FAILED":
              bgClass = "bg-red-600/90";
              borderClass = "border-red-900";
              text = "failed";
              break;
            default:
              bgClass = "bg-gray-600/90";
              borderClass = "border-gray-900";
              text = status;
          }
          return (
            <div className={`inline-block text-white rounded-full border-2 ${bgClass} ${borderClass} px-3 py-1 text-sm font-medium`}>
              <span className="text-sm mb-1">{t(`ordersPage.${text}`)}</span>
            </div>
          );
        }
    },
    {
      accessorKey: "createdAt",
      header: () => t("date"),
      cell: ({ row }) => {
        const date = row.original.createdAt ? FormatDateTime(new Date(row.original.createdAt)) : "Indefinido";
        return date;
      },
    }
  ]