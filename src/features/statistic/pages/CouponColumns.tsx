import { ColumnDef } from "@tanstack/react-table"
import type { CouponData } from "../api/req/statistic"
import { FormatMoney } from "../../../utils/fomat";
import { t } from "../../../lib/reacti18next/i18n";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columnsCupon: ColumnDef<CouponData>[] = [
    {
        accessorKey: "code",
        header: () => t("coupon"),
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
