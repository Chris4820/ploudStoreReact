import { useCallback, useMemo } from "react";
import NotFoundComponent from "../../../containers/404Component";
import { type CustomPageProps } from "../api/req";
import { useUpdateOrderPages } from "../mutation/updateOrder";
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import queryClient from "../../../lib/reactquery/reactquery";
import { CSS } from "@dnd-kit/utilities";
import { RxDragHandleHorizontal } from "react-icons/rx";
import { FormatDateTime } from "../../../utils/fomat";
import ButtonLink from "../../../components/commons/buttons/ButtonLink";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { Trash } from "lucide-react";
import DeleteModal from "../../../components/modal/deleteModal";
import { useDeletePage } from "../mutation/delete";

interface DraggableTableProps {
  items: CustomPageProps[];
}

export default function PagesDragComponent({ items }: DraggableTableProps) {
  const { mutate: updateOrder } = useUpdateOrderPages();

  const ids = useMemo(() => items.map((item) => item.id.toString()), [items]);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const oldIndex = items.findIndex(
        (item) => item.id.toString() === active.id
      );
      const newIndex = items.findIndex(
        (item) => item.id.toString() === over.id
      );

      if (oldIndex === -1 || newIndex === -1) return;

      const newItems = arrayMove(items, oldIndex, newIndex);
      queryClient.setQueryData(["page"], newItems);
      updateOrder(newItems.map((item) => item.id), {
        onError: () => {
          queryClient.setQueryData(["page"], items);
        },
      });
    },
    [items, updateOrder]
  );

  if (items.length === 0) {
    return (
      <NotFoundComponent
        title="Nenhuma página encontrada"
        description="Comece criando uma nova página personalizada"
      />
    );
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        <Table className="w-full border border-gray-700 rounded-lg overflow-hidden">
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>URL</TableHead>
              <TableHead className="hidden md:table-cell">Menu</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Criação</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <SortableItem key={item.id} item={item} />
            ))}
          </TableBody>
        </Table>
      </SortableContext>
    </DndContext>
  );
}

const SortableItem: React.FC<{ item: CustomPageProps }> = ({ item }) => {
  const { attributes, listeners, transform, setNodeRef, transition, isDragging } =
    useSortable({ id: item.id.toString() });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };
  const {mutate: deleteCustomPage} = useDeletePage();

  return (
    <TableRow ref={setNodeRef} style={style} className={isDragging ? "bg-gray-600 shadow-lg" : ""}>
      <TableCell>
        <RxDragHandleHorizontal
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-200"
          size={20}
        />
      </TableCell>
      <TableCell>{item.title}</TableCell>
      <TableCell className="truncate">/{item.slug}</TableCell>
      <TableCell className="hidden md:table-cell">{item.menuName}</TableCell>
      <TableCell>
        <span
          className={`inline-block text-white rounded-full border-2 px-2 py-1 text-sm font-medium ${item.isActive ? "bg-green-900/50 border-green-900" : "bg-red-600/90 border-red-900"}`}
        >
          {item.isActive ? "Ativo" : "Desativado"}
        </span>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {FormatDateTime(new Date(item.createdAt))}
      </TableCell>
      <TableCell className="flex items-center justify-end gap-2">
        <ButtonLink text="Editar" to={`edit/${item.id}`} className="px-3 py-1 text-sm" />
        <DeleteModal
        description="Deseja apagar esta página?"
        title="Apagar página"
        onConfirm={() => deleteCustomPage(item.id)}
        key={item.id}>
          <Button size="icon" variant="outline" className="hover:bg-destructive/90 bg-destructive/90 transition">
            <Trash className="text-white" size={22} />
          </Button>
        </DeleteModal>
        
      </TableCell>
    </TableRow>
  );
};
