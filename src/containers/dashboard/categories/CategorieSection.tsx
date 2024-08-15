import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CSS } from '@dnd-kit/utilities';
import { DndContext, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../../../components/ui/dropdown-menu';
import { IoSettingsOutline } from 'react-icons/io5';
import { RxDragHandleHorizontal } from 'react-icons/rx';
import { Button } from '../../../components/ui/button';
import LoadingComponent from '../../LoadingComponent';
import CardEmptyComponent from '../../../components/commons/CardEmpty';
import { CategorieProps, orderCategories } from '../../../api/req/store/categorie';
import { useGetCategorie } from '../../../api/store/store/categorie';
import { useNavigate } from 'react-router-dom';

export function CategorieSection({ parentCategoryId }: { parentCategoryId: number | null }) {
    const [items, setItems] = useState<CategorieProps[]>([]);
    const sensors = useSensors(useSensor(PointerSensor));
    const { data: categories, isLoading } = useGetCategorie(parentCategoryId);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (categories && categories.length > 0) {
            setItems(categories);
        }
    }, [categories]);

    const handleDragEnd = ({ active, over }: { active: any; over: any }) => {
        if (active.id !== over.id) {
            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over.id);
            const newItems = Array.from(items);
            const [movedItem] = newItems.splice(oldIndex, 1);
            newItems.splice(newIndex, 0, movedItem);

            setItems(newItems);

            // Get the new order of category IDs
            const newOrder = newItems.map((item) => item.id);

            // Update the order by sending all categories
            updateOrder(newOrder);
        }
    };

    const { mutate: updateOrder } = useMutation({
        mutationFn: (newOrder: number[]) => orderCategories(newOrder, parentCategoryId ?? undefined),
        onSuccess: () => {
            // Atualiza o cache com a nova ordem de categorias
            queryClient.setQueryData(['categories', parentCategoryId], (oldData: CategorieProps[] | undefined) => {
                if (!oldData) return oldData;

                // Cria um mapeamento dos IDs para as categorias
                const categoryMap = new Map<number, CategorieProps>();
                oldData.forEach(item => categoryMap.set(item.id, item));

                // Reordena os itens com base na nova ordem
                const newData = items.map(item => categoryMap.get(item.id)!).filter(item => item !== undefined) as CategorieProps[];

                return newData;
            });
        }
    });

    if (isLoading) {
        return <LoadingComponent />;
    }
    if (!categories || categories.length === 0) {
        return <CardEmptyComponent title="Sem categorias" description="Parece que não existe nenhuma categoria" />;
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
                            <DraggableItem item={item} key={item.id} parentId={parentCategoryId} />
                        ))}
                    </ul>
                </SortableContext>
            </DndContext>
        </section>
    );
}

const DraggableItem = ({ item, parentId }: { item: CategorieProps; parentId: number | null }) => {
    const navigate = useNavigate();
    const {
        attributes,
        isDragging,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({
        id: item.id,
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.4 : 1,
        transition
    };

    return (
        <li
            key={item.id}
            data-dnd-id={item.id}
            ref={setNodeRef}
            style={style}
            className={`flex justify-between p-3 w-full bg-muted items-center rounded-md ${
                isDragging && "shadow-lg"
            }`}
        >
            <div className="flex gap-2 w-[80%] items-center">
                <div className="w-auto flex items-center gap-2">
                    <RxDragHandleHorizontal {...listeners} {...attributes} className={`cursor-grab ${isDragging && "cursor-grabbing"}`} size={26} />
                    <div className="flex items-center justify-center rounded-md">
                        {item.enable ? (
                            <h1 className="px-1.5 mb-0.5 text-sm py-0.5 border border-green-700 text-green-700 font-semibold rounded-md">Ativado</h1>
                        ) : (
                            <h1 className="px-1.5 mb-0.5 text-sm py-0.5 border border-red-700 text-red-700 font-semibold rounded-md">Desativado</h1>
                        )}
                        
                    </div>
                </div>
                <div className="w-full flex justify-start items-center">
                    <span className="ml-1 mb-">{item.name}</span>
                </div>
            </div>
            <div className="flex gap-2 items-center">
                <Button onClick={() => navigate(`${item.id}`)}>Abrir</Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={"ghost"} size={"icon"}>
                            <IoSettingsOutline size={26} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <label className="p-2 font-semibold text-base">Opções</label>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem 
                                onSelect={() => navigate(parentId ? `/dashboard/category/edit/${item.id}?parent=${parentId}` : `/dashboard/category/edit/${item.id}`)}>
                                Editar
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </li>
    );
};
