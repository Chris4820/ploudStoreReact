import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns";
import type { RoleProps } from "../api/req";

export const columnsRoles: ColumnDef<RoleProps>[] = [
    {
      accessorKey: "name",
      header: "Nome",
    },
    {
        accessorKey: "description",
        header: "Descrição",
    },
    {
      accessorKey: "createdAt",
      header: "Criado em:",
      cell: ({ row }) => {
        const date = row.original.createdAt ? new Date(row.original.createdAt) : null;
        return date ? format(date, "dd/MM/yyyy HH:mm") : "Indefinido";
      },
    }
  ]