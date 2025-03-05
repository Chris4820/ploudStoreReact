import { ColumnDef } from "@tanstack/react-table"
import type { CustomersData } from "../api/req/statistic"
import { FormatMoney } from "../../../utils/fomat";
import { t } from "../../../lib/reacti18next/i18n";

export const columnsCustomer: ColumnDef<CustomersData>[] = [
    {
        accessorKey: "name",
        header: () => t("client"),
    },
    {
        accessorKey: "totalSells",
        header: () => t("sales"),
    },
    {
        accessorKey: "totalAmount",
        header: () => t("total"),
        cell: ({ row }) => {
          return FormatMoney(row.original.totalAmount);
        },
    },
]
