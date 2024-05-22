import { ColumnDef } from "@tanstack/react-table"
import { VariableProps } from "../../../api/req/store/variable"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<VariableProps>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
      accessorKey: "variable",
      header: "Variável",
      cell: ({ row }) => {
          const variable = row.getValue("variable");
          return (
              <div className="bg-purple-500 bg-opacity-30 text-purple-700 rounded-lg inline-flex items-center justify-center px-1.5">
                  {variable}
              </div>
          );
      }
  }
]
