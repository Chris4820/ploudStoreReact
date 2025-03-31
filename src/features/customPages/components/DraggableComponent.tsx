import React, { useCallback, useMemo} from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from '@dnd-kit/sortable';
import { useQueryClient } from '@tanstack/react-query';
import { CSS } from '@dnd-kit/utilities';
import { RxDragHandleHorizontal } from 'react-icons/rx';
import { FormatDateTime } from "../../../utils/fomat";
import { useUpdateOrderPages } from '../mutation/updateOrder';
import type { CustomPageProps } from '../api/req';
import ButtonLink from '../../../components/commons/buttons/ButtonLink';
import NotFoundComponent from '../../../containers/404Component';

interface DraggableTableProps {
  items: CustomPageProps[];
}

export default function DraggableComponent({items}:  DraggableTableProps) {
  const queryClient = useQueryClient();
  const { mutate: updateOrder } = useUpdateOrderPages();

  // Otimização: Memoizar os IDs para evitar recálculos
  const ids = useMemo(() => items.map(item => item.id.toString()), [items]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  // Memoizar a função de drag para estabilidade de referência
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex(item => item.id.toString() === active.id);
    const newIndex = items.findIndex(item => item.id.toString() === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const newItems = arrayMove(items, oldIndex, newIndex);
    
    // Atualização otimista imediata
    queryClient.setQueryData(['page'], newItems);
    
    // Atualização assíncrona com rollback
    updateOrder(newItems.map(item => item.id), {
      onError: () => {
        queryClient.setQueryData(['page'], items);
      }
    });
  }, [items, queryClient, updateOrder]);


  if (items.length === 0) {
    return (
      <NotFoundComponent 
        title="Nenhuma página encontrada"
        description="Comece criando uma nova página personalizada"
      />
    );
  }

  return (
    <div className="mt-5 overflow-hidden rounded-lg border border-gray-700 shadow-sm">
  <div className="w-full max-w-full overflow-x-auto">
    <div className="min-w-[600px]">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="bg-gray-800 text-white">
          <div className="grid grid-cols-[50px_1fr_1fr_1fr_1fr_80px] md:grid-cols-[50px_1fr_1fr_1fr_1fr_1fr_120px] gap-4">
            <div className="py-2 px-2 text-left border-b border-gray-600">#</div>
            <div className="py-2 px-2 text-left border-b border-gray-600">Título</div>
            <div className="py-2 px-2 text-left border-b border-gray-600">URL</div>
            <div className="py-2 px-2 text-left border-b border-gray-600 hidden md:block">Menu</div>
            <div className="py-2 px-2 text-left border-b border-gray-600">Status</div>
            <div className="py-2 px-2 text-left border-b border-gray-600 hidden md:block">Criação</div>
            <div className="py-2 px-2 text-right border-b border-gray-600">Ações</div>
          </div>
        </div>
        <SortableContext items={ids} strategy={verticalListSortingStrategy}>
          <ul className="divide-y divide-gray-600">
            {items.map((item) => (
              <SortableItem key={item.id} item={item} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  </div>
</div>


  );
}

const SortableItem: React.FC<{ item: CustomPageProps }> = ({ item }) => {
  const {
    attributes,
    listeners,
    transform,
    setNodeRef,
    transition,
    isDragging,
  } = useSortable({ id: item.id.toString() });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <li ref={setNodeRef} style={style} className={`grid grid-cols-[50px_1fr_1fr_1fr_80px] md:grid-cols-[50px_1fr_1fr_1fr_1fr_1fr_120px] gap-4 bg-gray-700 ${isDragging ? 'shadow-lg bg-gray-600' : ''}`}>
  <div className="py-2 px-2 flex items-center">
    <RxDragHandleHorizontal {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-200" size={20} />
  </div>
  <div className="py-2 px-2 flex items-center">{item.title}</div>
  <div className="py-2 px-2 flex items-center truncate">/{item.slug}</div>
  <div className="py-2 px-2 flex items-center md:block">{item.menuName}</div>
  <div className="py-2 px-2 flex items-center">
    <span className={`inline-block text-white rounded-full border-2 px-2 py-1 text-sm font-medium ${item.isActive ? 'bg-green-900/50 border-green-900' : 'bg-red-600/90 border-red-900'}`}>
      {item.isActive ? 'Ativo' : 'Desativado'}
    </span>
  </div>
  <div className="py-2 px-2 flex items-center  md:block">
    {FormatDateTime(new Date(item.createdAt))}
  </div>
  <div className="py-2 px-2 flex items-center gap-1">
    <ButtonLink text='Editar' to={`edit/${item.id}`} />
  </div>
</li>

  );
};