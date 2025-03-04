import { ColumnDef } from "@tanstack/react-table"
import type { SubUsersProps } from "../api/req/subuser"
import { FormatDateTime } from "../../../utils/fomat";

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
        const date = row.original.createdAt ? FormatDateTime(new Date(row.original.createdAt)) : "Indefinido";
        return date;
      },
    }
  ]