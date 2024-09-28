import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { RxDragHandleHorizontal } from "react-icons/rx";
import type { WidgetsProps } from "../api/req/widgets";



type DraggableWidgetsProps = {
  item: WidgetsProps
  onClickOpen?: (id: number) => void,
}


export default function DraggableWidgetComponent({item, onClickOpen} : DraggableWidgetsProps) {

    console.log(item);

    function handleClickOpen(id: number) {
        if(onClickOpen) {
            onClickOpen(id)
        }
    }

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

  return(
        <li
            onClick={() => handleClickOpen(item.id)}
            key={item.id}
            data-dnd-id={item.id}
            ref={setNodeRef}
            style={style}
            className={`flex justify-between ${onClickOpen ? 'cursor-pointer' : ''} p-3 w-full border hover:bg-muted/50 items-center rounded-md ${
                isDragging && "shadow-lg"
            }`}
        >
            <div className="flex gap-2 w-[80%] items-center">
                <div className="w-auto flex items-center gap-2">
                    <RxDragHandleHorizontal {...listeners} {...attributes} className={`cursor-grab ${isDragging && "cursor-grabbing"}`} size={26} />
                    <div className="flex items-center justify-center rounded-md">
                        {item.visible ? (
                            <h1 className="px-1.5 mb-0.5 text-sm py-0.5 border border-green-700 text-green-700 font-semibold rounded-md">Ativado</h1>
                        ) : (
                            <h1 className="px-1.5 mb-0.5 text-sm py-0.5 border border-red-700 text-red-700 font-semibold rounded-md">Desativado</h1>
                        )}
                        
                    </div>
                </div>
                <div className="w-full flex justify-start items-center">
                    <span className="ml-1 mb-">{item.header}</span>
                </div>
            </div>
        </li>
  )
}