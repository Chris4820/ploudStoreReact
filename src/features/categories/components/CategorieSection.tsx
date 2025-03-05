import { DndContext, PointerSensor, closestCenter, useSensor, useSensors, type Active, type Over } from '@dnd-kit/core';
import CardEmptyComponent from '../../../components/commons/CardEmpty';
import { useGetCategorie } from '../api/store/categorie';
import { useNavigate } from 'react-router-dom';
import LoadingComponent from '../../../containers/LoadingComponent';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useUpdateOrderCategory } from '../mutation/updateOrderCategoryMutation';
import { useEffect, useState } from 'react';
import type { CategorieProps } from '../api/req/categorie';
import queryClient from '../../../lib/reactquery/reactquery';
import DraggableComponent from '../../../components/DraggableComponent';
import { t } from '../../../lib/reacti18next/i18n';

export function CategorieSection({ parentCategoryId }: { parentCategoryId: string | undefined }) {
    const [items, setItems] = useState<CategorieProps[]>([]);
    const sensors = useSensors(useSensor(PointerSensor));
    const { data: categories, isLoading } = useGetCategorie(parentCategoryId);
    const navigate = useNavigate();


    useEffect(() => {
        if (categories && categories.length > 0) {
          setItems(categories);
        }
        
      }, [categories]);

    const { mutate: UpdateOrderCategory } = useUpdateOrderCategory();

    const handleDragEnd = ({ active, over }: { active: Active | null; over: Over | null }) => {
        if (!active || !over || active.id === over.id) return;

        const newItems = Array.from(items);
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const [movedItem] = newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, movedItem);
        setItems(newItems);
        queryClient.setQueryData(['categories', parentCategoryId], newItems);
        // Enviar nova ordem para o servidor
        UpdateOrderCategory(newItems.map((item) => item.id));
    };

    if (isLoading) {
        return <LoadingComponent />;
    }

    if (!categories || categories.length <= 0) {
        return <CardEmptyComponent title={t("noFound.title")} description={t("noFound.description")} />;
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
                            <DraggableComponent 
                                key={item.id} 
                                item={item} 
                                onClickEdit={() => navigate(parentCategoryId ? `/dashboard/categories/edit/${item.id}?parent=${parentCategoryId}` : `/dashboard/categories/edit/${item.id}`)} 
                                onClickOpen={() => navigate(`${item.id}`)} 
                            />
                        ))}
                    </ul>
                </SortableContext>
            </DndContext>
        </section>
    );
}
