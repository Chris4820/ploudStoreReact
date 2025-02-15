import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type Active,
  type Over,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useGetProducts } from "../api/store/product";
import { useNavigate } from "react-router-dom";
import CardEmptyComponent from "../../../components/commons/CardEmpty";
import { useUpdateOrderProduct } from "../mutation/UpdateOrderProductMutation";
import LoadingComponent from "../../../containers/LoadingComponent";
import type { ProductsProps } from "../api/req/products";
import queryClient from "../../../lib/reactquery/reactquery";
import DraggableComponent from "../../../components/DraggableComponent";

export function ProductSection({categoryId} : {categoryId: string | undefined }) {
  const [items, setItems] = useState<ProductsProps[]>([]);
  const sensors = useSensors(useSensor(PointerSensor));
  const { data: products, isLoading } = useGetProducts(categoryId);

  const { mutate: updateOrderProduct } = useUpdateOrderProduct();

  const navigate = useNavigate();

  useEffect(() => {
    if (products && products.length > 0) {
      setItems(products);
    }
    
  }, [products]);

  const handleDragEnd = ({ active, over }: { active: Active | null; over: Over | null }) => {
    if(active && over) {
      if (active.id !== over.id) {
        const newItems = Array.from(items);
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const [movedItem] = newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, movedItem);
        setItems(newItems);
        queryClient.setQueryData(['products', categoryId], newItems);
        

        const productsOrder = newItems.map((item) => item.id);
        updateOrderProduct(productsOrder);
      }
    }
  };

  if(isLoading) {
    return <LoadingComponent/>
  }
  
  if(!products || products.length === 0) {
    return <CardEmptyComponent title="Sem produtos" description="Parece que não existe produtos"/>
  }

  function goEditPage(id: number) {
    return navigate(`/dashboard/product/edit/${id}`)
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
              <DraggableComponent item={item} key={item.id} onClickEdit={(id: number) => goEditPage(id)}/>
            ))}
          </ul>
        </SortableContext>
      </DndContext>
      
    </section>
  );
}