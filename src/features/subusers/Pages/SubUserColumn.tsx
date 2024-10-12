import { ColumnDef } from "@tanstack/react-table"
import type { SubUsersProps } from "../api/req/subuser"
import { format } from "date-fns";

export const columnsSubUsers: ColumnDef<SubUsersProps>[] = [
    {
      accessorKey: "user.name",
      header: "Nome",
    },
    {
        accessorKey: "user.email",
        header: "Email",
    },
    {
      accessorKey: "role.name",
      header: "Cargo",
    },
    {
      accessorKey: "createdAt",
      header: "Entrou em:",
      cell: ({ row }) => {
        const date = row.original.createdAt ? new Date(row.original.createdAt) : null;
        return date ? format(date, "dd/MM/yyyy HH:mm") : "Indefinido";
      },
    }
  ]