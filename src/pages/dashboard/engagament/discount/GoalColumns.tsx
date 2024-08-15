import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns";
import { GoalProps, GoalStatus } from "../../../../api/req/store/goal";

export const columnsGoals: ColumnDef<GoalProps>[] = [
    {
      accessorKey: "title",
      header: "Nome",
    },
    {
        accessorKey: "createdAt",
        header: "Criado em:",
        cell: ({ row }) => {
        const date = new Date(row.original.completedAt);
        return format(date, "dd/MM/yyyy HH:mm");
        },
    },
    {
      accessorKey: "completedAt",
      header: "Completado em:",
      cell: ({ row }) => {
        const date = new Date(row.original.completedAt);
        return format(date, "dd/MM/yyyy HH:mm");
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        let color;
        if (status === GoalStatus.COMPLETED) {
          color = "green";
        }else if(status === GoalStatus.FAILED) {
          color = "red"
        }else {
          color = "pink"
        }
      return (
        <span className={`bg-${color}-500`}>
          {status}
        </span>
        );
      },
    },
  ]