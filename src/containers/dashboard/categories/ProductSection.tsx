import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "../../../components/ui/button";
import { RxDragHandleHorizontal } from "react-icons/rx";
import { useGetProducts } from "../../../api/store/store/product";
import { ProductProps } from "../../../api/req/store/categorie";
import { useNavigate } from "react-router-dom";
import { DeleteProductModal } from "../../modal/product/DeleteProductModal";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu";
import { IoSettingsOutline } from "react-icons/io5";
import CardEmptyComponent from "../../../components/commons/CardEmpty";
import { orderProducts } from "../../../api/req/store/products";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function ProductSection({categoryId} : {categoryId: number }) {
  const [items, setItems] = useState<ProductProps[]>([]);

  const [isMove, setIsMove] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor));
  const { data: products, isLoading } = useGetProducts(categoryId);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (products && products.length > 0) {
      setItems(products);
    }
    
  }, [products]);

  const handleDragEnd = ({ active, over }: any) => {
    if (active.id !== over.id) {
      if(!isMove) {
        setIsMove(true);
      } 
      const newItems = Array.from(items);
      const oldIndex = items.findIndex((item) => item.productId === active.id);
      const newIndex = items.findIndex((item) => item.productId === over.id);
      const [movedItem] = newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, movedItem);
      setItems(newItems);
    }
  };

  async function updateOrderProducts() {
    const products = items.map((item) => {
      return { productId: item.productId}
    })
    updateOrder(products);
    setIsMove(false);

  }

  const { mutate: updateOrder } = useMutation({
    mutationFn: orderProducts,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['products', categoryId]})
    }
  });

  if(isLoading) {
    return <h1>Aguarde...</h1>
  }
  if(!products || products.length === 0) {
    return <CardEmptyComponent title="Sem produtos" desc="Parece que não existe produtos"/>
  }

  return (
    <section>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((item) => item.productId)}
          strategy={verticalListSortingStrategy}
        >
          <ul className="space-y-1">
            {items.map((item) => (
              <DraggableItem item={item} key={item.productId} categoryId={categoryId}/>
            ))}
          </ul>
        </SortableContext>
      </DndContext>
      {isMove && (
        <div className="mt-4 flex w-full justify-end items-center">
          <Button onClick={() => updateOrderProducts()}>Salvar posições</Button>
        </div>
      )}
      
    </section>
  );
}

const DraggableItem = ({ item, categoryId }: { item: ProductProps, categoryId: number }) => {
  const navigate = useNavigate();
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: item.productId,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : 1,
    transition
  };

  return (
    <li
      key={item.productId}
      data-dnd-id={item.productId}
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
          <DropdownMenuItem onSelect={() => navigate(`/dashboard/product/edit/${item.productId}`)}>Editar</DropdownMenuItem>
          <DeleteProductModal categoryId={categoryId} product={item}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Eliminar</DropdownMenuItem>
          </DeleteProductModal>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
      </div>
    </li>
  );
};
