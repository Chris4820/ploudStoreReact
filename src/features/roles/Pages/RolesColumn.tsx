import { ColumnDef } from "@tanstack/react-table"
import { FormatDateTime } from "../../../utils/fomat";
import type { RolesProps } from "../api/req";

export const columnsRoles: ColumnDef<RolesProps>[] = [
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