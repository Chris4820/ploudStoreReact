import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns";
import type { BlogsProps } from "../api/req";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const NewsColumn: ColumnDef<BlogsProps>[] = [
    {
        accessorKey: "title",
        header: "Título",
    },
    {
      accessorKey: "author",
      header: "Autor",
    },
    {
      accessorKey: "isVisible",
      header: "Status",
      cell: ({ row }) => {
        const isVisible = row.original.isVisible as boolean; // Garante que seja booleano
        return (
          <span className={`px-1.5 mb-0.5 text-sm py-0.5 border font-semibold rounded-md ${isVisible ? "border-green-700 text-green-700" : "border-red-700 text-red-700"}`}>
            {isVisible ? "Visível" : "Não Visível"}
          </span>
        );
      },
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