import { useSearchParams } from "react-router-dom"
import { Button } from "./button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";



type PaginationProps = {
  pages: number,
  items: number,
  page: number
}


export default function Pagination({page, items, pages}: PaginationProps) {

  const [, setSearchParams] = useSearchParams();

  function firstPage() {
    setSearchParams(param => {
      param.set('page', '1');

    return param;
    })
  }

  function previousPage() {
    if(page - 1 >= 0) {
      setSearchParams(param => {
        param.set('page', String(page - 1));
  
      return param;
      })
    }
  }

  function nextPage() {
    if(page + 1 <= pages) {
      setSearchParams(param => {
        param.set('page', String(page + 1));
  
      return param;
      })
    }
  }

  function lastPage() {
    setSearchParams(param => {
      param.set('page', String(pages));

    return param;
    })
  }
  
   // Calcular o intervalo de itens exibidos na página atual
   const startItem = (page - 1) * 5 + 1;
   const endItem = Math.min(page * 5, items);  // O menor valor entre o fim da página e o total de itens

  return(
    <div className="flex text-sm items-center justify-between text-zinc-500 mt-5">

      
        <span>Mostrando {startItem} a {endItem} de {items} itens</span>

      <div className="flex items-center gap-5">

      <span>Page {page} de {pages}</span>

        <div className="space-x-1.5">
          <Button onClick={firstPage} size={'icon'} disabled={page <= 1}>
              <ChevronsLeft className="size-4"/>
              <span className="sr-only">Primeira página</span>
          </Button>

          <Button onClick={previousPage} size={'icon'} disabled={page <= 1}>
              <ChevronLeft className="size-4"/>
              <span className="sr-only">Página anterior</span>
          </Button>

          <Button onClick={nextPage} size={'icon'} disabled={page >= pages}>
              <ChevronRight className="size-4"/>
              <span className="sr-only">Próxima página</span>
          </Button>

          <Button onClick={lastPage} size={'icon'} disabled={page >= pages}>
              <ChevronsRight className="size-4"/>
              <span className="sr-only">Última página</span>
          </Button>

        </div>
      </div>

    </div>

  )
}