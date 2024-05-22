import { RxDragHandleHorizontal } from "react-icons/rx";
import { Button } from "../../../components/ui/button";
import { CategorieProps, orderCategories } from "../../../api/req/store/categorie";
import CardEmptyComponent from "../../../components/commons/CardEmpty";
import { useNavigate } from "react-router-dom";
import { useGetCategorie } from "../../../api/store/store/categorie";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CSS } from "@dnd-kit/utilities";
import { DndContext, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu";
import { IoSettingsOutline } from "react-icons/io5";

  export function CategorieSection({ parentCategoryId }: { parentCategoryId: number | null }) {

    const [items, setItems] = useState<CategorieProps[]>([]);

  const [isMove, setIsMove] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor));
  const { data: categories, isLoading } = useGetCategorie(parentCategoryId ? Number(parentCategoryId) : null);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (categories && categories.length > 0) {
      setItems(categories);
    }
    
  }, [categories]);

  const handleDragEnd = ({ active, over }: any) => {
    if (active.id !== over.id) {
      if(!isMove) {
        setIsMove(true);
      } 
      const newItems = Array.from(items);
      const oldIndex = items.findIndex((item) => item.categoryId === active.id);
      const newIndex = items.findIndex((item) => item.categoryId === over.id);
      const [movedItem] = newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, movedItem);
      console.log(newItems);
      setItems(newItems);
    }
  };

  async function updateOrderCategories() {
    const categories = items.map((item) => {
      return { categoryId: item.categoryId}
    })
    updateOrder(categories);
    setIsMove(false);

  }

  const { mutate: updateOrder } = useMutation({
    mutationFn: orderCategories,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['categorie', parentCategoryId]})
    }
  });

  if(isLoading) {
    return <h1>Aguarde...</h1>
  }
  if(!categories || categories.length === 0) {
    return <CardEmptyComponent title="Sem categorias" desc="Parece que não existe nenhuma categoria"/>
  }
    
  return (
    <section>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((item) => item.categoryId)}
          strategy={verticalListSortingStrategy}
        >
          <ul className="space-y-1">
            {items.map((item) => (
              <DraggableItem item={item} key={item.categoryId} parentId={parentCategoryId}/>
            ))}
          </ul>
        </SortableContext>
      </DndContext>
      {isMove && (
        <div className="mt-4 flex w-full justify-end items-center">
          <Button onClick={() => updateOrderCategories()}>Salvar posições</Button>
        </div>
      )}
      
    </section>
  );
}

const DraggableItem = ({ item, parentId }: { item: CategorieProps, parentId: number | null }) => {
    const navigate = useNavigate();
    const {
      attributes,
      isDragging,
      listeners,
      setNodeRef,
      transform,
      transition,
    } = useSortable({
      id: item.categoryId,
    });
  
    const style = {
      transform: CSS.Translate.toString(transform),
      opacity: isDragging ? 0.4 : 1,
      transition
    };
  
    return (
      <li
        key={item.categoryId}
        data-dnd-id={item.categoryId}
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
              <h1 className="px-1.5 mb-0.5 text-sm py-0.5 border border-green-700 text-green-700 font-semibold rounded-md">Ativado</h1>
            </div>
          </div>
          <div className="w-full flex justify-start items-center">
                <span className="ml-1 mb-">{item.name}</span>
              </div>
        </div>
        
        <div className="flex gap-2 items-center">
            <Button onClick={() => navigate(`${item.categoryId}`)}>Abrir</Button>
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} size={"icon"}>
            <IoSettingsOutline size={26}/>
          </Button>
          
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <label className="p-2 font-semibold text-base">Opções</label>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem 
            onSelect={() => navigate(parentId ? `/dashboard/category/edit/${item.categoryId}?parent=${parentId}` : `/dashboard/category/edit/${item.categoryId}`)}>Editar</DropdownMenuItem>
            {/*<DeleteProductModal categoryId={parentId} product={item}>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Eliminar</DropdownMenuItem>
            </DeleteProductModal>*/}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
        </div>
      </li>
    );
  };
  

