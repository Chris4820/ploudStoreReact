import { ColumnDef } from "@tanstack/react-table"
import type { CategoryData } from "../api/req/statistic"
import { FormatMoney } from "../../../utils/fomat";
import { t } from "../../../lib/reacti18next/i18n";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columnsCategories: ColumnDef<CategoryData>[] = [
    {
        accessorKey: "name",
        header: () => t("category"),
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