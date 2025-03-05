import { useSearchParams } from "react-router-dom"
import { Button } from "./button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { t } from "../../lib/reacti18next/i18n";



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

  return(
    <div className="flex items-center justify-between p-4 rounded-lg">

      <span className="font-semibold">{items} {t("itensFound")}</span>

      <div className="flex items-center gap-5">

        <span className="font-medium">{t("page")} {page} {t("of")} {pages + 1}</span>

        <div className="flex space-x-2">
          <Button onClick={firstPage} size={'icon'} disabled={page <= 1} aria-label="Ir para a primeira página">
              <ChevronsLeft className="size-4"/>
          </Button>

          <Button onClick={previousPage} size={'icon'} disabled={page <= 1} aria-label="Ir para a página anterior">
              <ChevronLeft className="size-4"/>
          </Button>

          <Button onClick={nextPage} size={'icon'} disabled={page >= pages} aria-label="Ir para a próxima página">
              <ChevronRight className="size-4"/>
          </Button>

          <Button onClick={lastPage} size={'icon'} disabled={page >= pages} aria-label="Ir para a última página">
              <ChevronsRight className="size-4"/>
          </Button>
        </div>
      </div>
    </div>
  )
}