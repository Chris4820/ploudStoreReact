import { ColumnDef } from "@tanstack/react-table"
import { ServerProps } from "../../../api/req/store/server"
import { format } from "date-fns";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columnsServer: ColumnDef<ServerProps>[] = [
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
