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
  }
]
