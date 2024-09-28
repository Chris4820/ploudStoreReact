import { DndContext, PointerSensor, closestCenter, useSensor, useSensors, type Active, type Over } from '@dnd-kit/core';
import CardEmptyComponent from '../../../components/commons/CardEmpty';
import { useNavigate } from 'react-router-dom';
import LoadingComponent from '../../../containers/LoadingComponent';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
import { useGetWidgets } from '../api/store/widgets';
import type { WidgetsProps } from '../api/req/widgets';
import DraggableWidgetComponent from './DraggableComponentWidget';
import { useUpdateOrderWidget } from '../mutation/updateOrderMutation';
import queryClient from '../../../lib/reactquery/reactquery';

export function WidgetsSection() {
    const [items, setItems] = useState<WidgetsProps[]>([]);
    const sensors = useSensors(useSensor(PointerSensor));
    const { data: widgets, isLoading } = useGetWidgets();
    const navigate = useNavigate();

    useEffect(() => {
        if (widgets && widgets.length > 0) {
          setItems(widgets);
        }
        
      }, [widgets]);

      const { mutate: updateOrderWidgets } = useUpdateOrderWidget();

    const handleDragEnd = ({ active, over }: { active: Active | null; over: Over | null }) => {
        if (!active || !over || active.id === over.id) return;

        const newItems = Array.from(items);
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const [movedItem] = newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, movedItem);
        setItems(newItems);

        queryClient.setQueryData(['widgets'], newItems);
        // Enviar nova ordem para o servidor
        updateOrderWidgets(newItems.map((item) => item.id));
    };

    if (isLoading) {
        return <LoadingComponent />;
    }

    if (!widgets || widgets.length <= 0) {
        return <CardEmptyComponent title="Sem Widgets" description="Parece que ainda não configurou nenhum Widget" />;
    }

    return (
        <section>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={items.map((item) => item.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <ul className="space-y-1">
                        {items.map((item) => (
                            <DraggableWidgetComponent 
                                key={item.widgetType} 
                                item={item} 
                                onClickOpen={() => navigate(`edit/${(item.widgetType).toLowerCase()}`)} 
                            />
                        ))}
                    </ul>
                </SortableContext>
            </DndContext>
        </section>
    );
}
