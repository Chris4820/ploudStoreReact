import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { cn } from "../../lib/utils";
import { Calendar } from "./calendar";
import { Checkbox } from "./checkbox";

type DatePickerComponentProps = {
  initialDate: string | null;
  onChange: (date: string | null) => void;
  buttonDisable?: boolean
};

export function DatePickerDemo({ initialDate, onChange, buttonDisable = false }: DatePickerComponentProps) {
  const [isDatePickerEnabled, setIsDatePickerEnabled] = useState(!!initialDate);
  const [date, setDate] = useState<Date | null>(isDatePickerEnabled && initialDate ? new Date(initialDate) : null
  );

  const handleTimeChange = (hour: number, minute: number) => {
    if (date) {
      const updatedDate = new Date(date);
      updatedDate.setHours(hour);
      updatedDate.setMinutes(minute);
      setDate(updatedDate);
      onChange(updatedDate.toISOString());
    }
  };

  const handleDateSelect = (selectedDate?: Date) => {
    if (selectedDate) {
      const updatedDate = new Date(selectedDate);
      if (date) {
        updatedDate.setHours(date.getHours());
        updatedDate.setMinutes(date.getMinutes());
      }
      setDate(updatedDate);
      onChange(updatedDate.toISOString());
    } else {
      setDate(null);
      onChange(null);
    }
  };

  const toggleDatePicker = () => {
    setIsDatePickerEnabled((prev) => {
      const newState = !prev;
      if (!newState) {
        setDate(null);
        onChange(null);
      } else {
        const currentDate = new Date();
        setDate(currentDate);
        onChange(currentDate.toISOString());
      }
      return newState;
    });
  };

  return (
    <div className={`${!buttonDisable && 'flex items-center space-x-4'}`}>
      <Checkbox id="toggleDatePicker" className={`${buttonDisable && 'hidden'}`} checked={isDatePickerEnabled} onCheckedChange={toggleDatePicker} />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn("w-[280px] justify-between text-left font-normal", !date && "text-muted-foreground")}
            disabled={!isDatePickerEnabled}
          >
            <div className="flex items-start w-full gap-2">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "dd/MM/yyyy HH:mm") : <span>Selecionar data</span>}
            </div>
          </Button>
        </PopoverTrigger>
        {isDatePickerEnabled && (
          <PopoverContent className="w-auto p-4">
            <Calendar mode="single" selected={date || undefined} onSelect={handleDateSelect} initialFocus />
            <div className="flex mt-4 space-x-4">
              <div className="flex flex-col">
                <label htmlFor="hour" className="text-sm font-medium">Hora</label>
                <input
                  id="hour"
                  type="number"
                  min={0}
                  max={23}
                  value={date ? date.getHours() : 0}
                  onChange={(e) => handleTimeChange(Number(e.target.value), date ? date.getMinutes() : 0)}
                  className="border rounded-md p-1 bg-card w-16"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="minute" className="text-sm font-medium">Minuto</label>
                <input
                  id="minute"
                  type="number"
                  min={0}
                  max={59}
                  value={date ? date.getMinutes() : 0}
                  onChange={(e) => handleTimeChange(date ? date.getHours() : 0, Number(e.target.value))}
                  className="border rounded-md p-1 bg-card w-16"
                />
              </div>
            </div>
          </PopoverContent>
        )}
      </Popover>
    </div>
  );
}