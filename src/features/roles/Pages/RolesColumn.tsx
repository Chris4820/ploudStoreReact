import { ColumnDef } from "@tanstack/react-table"
import type { RoleProps } from "../api/req";
import { FormatDateTime } from "../../../utils/fomat";

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
        const date = row.original.createdAt ? FormatDateTime(new Date(row.original.createdAt)) : "Indefinido";
        return date;
      },
    }
  ]