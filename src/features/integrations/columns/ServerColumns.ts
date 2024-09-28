import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns";
import type { ServersProps } from "../../server/api/req/server";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columnsServer: ColumnDef<ServersProps>[] = [
    {
        accessorKey: "name",
        header: "Nome",
    },
    {
      accessorKey: "createdAt",
      header: "Data",
      cell: ({ row }) => {
        const date = new Date(row.original.createdAt);
        return format(date, "dd/MM/yyyy HH:mm");
      },
    }
]
