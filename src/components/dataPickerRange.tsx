import { addDays, format, subYears } from "date-fns";
import { DateRange } from "react-day-picker";
import { CalendarIcon, Search } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import { Calendar } from "./ui/calendar";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { t } from "../lib/reacti18next/i18n";

type DateRangePickComponentProps = {
  defaultRange?: "Hoje" | "lastWeek" | "lastMonth" | "sinceAlways";
  onChangeRange: (date: DateRange) => void,
};

export function DateRangePickComponent({ defaultRange = "lastWeek", onChangeRange }: DateRangePickComponentProps) {
  const [searchParams] = useSearchParams();
  const [enableSearch, setEnableSearch] = useState(false);

  const today = new Date();
  const oneYearAgo = subYears(today, 1);

  // Função para definir datas iniciais com base no `defaultRange`
  const getInitialDateRange = () => {
    switch (defaultRange) {
      case "Hoje":
        return { from: today, to: today };
      case "lastWeek":
        return { from: addDays(today, -7), to: today };
      case "lastMonth":
        return { from: addDays(today, -30), to: today };
      case "sinceAlways":
        return { from: oneYearAgo, to: today };
      default:
        return { from: addDays(today, -7), to: today }; // Padrão para "Última Semana"
    }
  };

  // Inicializa o intervalo de datas com base no `defaultRange` e parâmetros da URL, se existirem
  const initialDateRange = getInitialDateRange();
  const initialFrom = searchParams.get("startDate") ? new Date(searchParams.get("startDate")!) : initialDateRange.from;
  const initialTo = searchParams.get("endDate") ? new Date(searchParams.get("endDate")!) : initialDateRange.to;
  const [currentDateRange, setCurrentDateRange] = useState<DateRange>({ from: initialFrom, to: initialTo });
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<string>(
    searchParams.get("startDate") && searchParams.get("endDate")
      ? `${format(initialFrom, "dd/MM/yyyy")} - ${format(initialTo, "dd/MM/yyyy")}`
      : defaultRange
  );

  function onDateRangeChange() {
    setEnableSearch(false);
    onChangeRange(currentDateRange)
  }

  // Seleção de intervalos rápidos
  const handleRangeSelect = (range: string) => {
    let from: Date | undefined;
    let to: Date | undefined;

    switch (range) {
      case "today":
        from = today;
        to = today;
        break;
      case "lastWeek":
        from = addDays(today, -7);
        to = today;
        break;
      case "lastMonth":
        from = addDays(today, -30);
        to = today;
        break;
      case "sinceAlways":
        from = undefined;
        to = undefined;
        break;
      default:
        return;
    }

    setCurrentDateRange({ from, to });
    setSelectedLabel(range);
    setIsOpen(false);
    setEnableSearch(true);
  };

  // Atualiza o rótulo se a seleção do calendário mudar
  const handleCalendarSelect = (newRange: DateRange) => {
    setCurrentDateRange(newRange);
    const formattedFrom = newRange.from ? format(newRange.from, "dd/MM/yyyy") : "";
    const formattedTo = newRange.to ? format(newRange.to, "dd/MM/yyyy") : "";
    setSelectedLabel(`${formattedFrom} - ${formattedTo}`);
    setEnableSearch(true);
  };

  return (
    <div className="grid gap-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center gap-2">
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("w-auto justify-start text-left font-normal", !currentDateRange.from && "text-muted-foreground")}
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="flex items-center">
                <CalendarIcon className="mr-1 h-4 w-4" />
                <span className="font-semibold">{t("dateRange.period")}</span>
              </div>
              <span className="mx-2">|</span>
              <span className="bg-muted text-[12px] rounded-md p-1">{selectedLabel}</span>
            </Button>
          </PopoverTrigger>
          <Button 
            size={"icon"} 
            disabled={!enableSearch}
            onClick={() => onDateRangeChange()}>
            <Search size={18} />
          </Button>
        </div>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-4 gap-4">
            <div className="grid grid-cols-2 text-[15px]">
              {["today", "lastWeek", "lastMonth", "sinceAlways"].map(range => (
                <Button
                  key={range}
                  id="range"
                  variant="ghost"
                  className="p-2 hover:bg-muted rounded-md"
                  onClick={() => handleRangeSelect(range)}
                >
                  {t(`dateRange.${range}`)}
                </Button>
              ))}
            </div>
            <hr className="my-2" />
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col items-center">
                <h4 className="mb-2 text-center font-semibold">{t("dateRange.startDate")}</h4>
                <Calendar
                  mode="single"
                  selected={currentDateRange.from}
                  onSelect={(date) => {
                    if (date && (!currentDateRange.to || date <= currentDateRange.to)) {
                      handleCalendarSelect({ from: date, to: currentDateRange.to });
                    }
                  }}
                  disabled={{ after: currentDateRange.to || today }}
                />
              </div>

              <div className="flex flex-col items-center">
                <h4 className="mb-2 text-center font-semibold">{t("dateRange.endDate")}</h4>
                <Calendar
                  mode="single"
                  selected={currentDateRange.to}
                  onSelect={(date) => {
                    if (date && (!currentDateRange.from || date >= currentDateRange.from)) {
                      handleCalendarSelect({ from: currentDateRange.from, to: date });
                    }
                  }}
                  disabled={{ before: currentDateRange.from, after: today }}
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
