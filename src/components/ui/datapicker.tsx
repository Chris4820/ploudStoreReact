import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { cn } from "../../lib/utils";
import { Calendar } from "./calendar";
import { Checkbox } from "./checkbox";

type DatePickerComponentProps = {
  initialDate?: string | null; // Adicione a prop inicial
  onChange: (date: string | null) => void;
};

export function DatePickerDemo({ initialDate, onChange }: DatePickerComponentProps) {
  const [date, setDate] = useState<Date | null>(initialDate ? new Date(initialDate) : null);
  const [isDatePickerEnabled, setIsDatePickerEnabled] = useState(!!initialDate); // Ativa se a data inicial for fornecida

  useEffect(() => {
    if (initialDate) {
      setDate(new Date(initialDate));
      setIsDatePickerEnabled(true);
    }
  }, [initialDate]);

  const handleTimeChange = (hour: number, minute: number) => {
    if (date) {
      const updatedDate = new Date(date);
      updatedDate.setHours(hour);
      updatedDate.setMinutes(minute);
      setDate(updatedDate);
      onChange(updatedDate.toISOString());
    }
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
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

  const handleCheckboxChange = () => {
    setIsDatePickerEnabled(!isDatePickerEnabled);
    if (!isDatePickerEnabled) {
      const currentDate = new Date();
      setDate(currentDate);
      onChange(currentDate.toISOString());
    } else {
      setDate(null);
      onChange(null);
    }
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-between text-left font-normal",
              !date && "text-muted-foreground"
            )}
            disabled={!isDatePickerEnabled}
          >
            <div className="flex items-center w-full justify-between">
              <div className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "dd/MM/yyyy HH:mm") : <span>Pick a date</span>}
              </div>
            </div>
          </Button>
        </PopoverTrigger>
        <Checkbox 
          id="handleDatePicker" 
          onCheckedChange={handleCheckboxChange}
          defaultChecked={isDatePickerEnabled} 
          className="ml-4 cursor-pointer"
        />
        {isDatePickerEnabled && (
          <PopoverContent className="w-auto p-0">
            <div className="p-4">
              <Calendar
                mode="single"
                selected={date || undefined}
                onSelect={handleDateSelect}
                initialFocus
              />
              <div className="flex mt-4">
                <div className="flex flex-col mr-2">
                  <label htmlFor="hour" className="text-sm font-medium">
                    Hour
                  </label>
                  <input
                    id="hour"
                    type="number"
                    min={0}
                    max={23}
                    value={date ? date.getHours() : 0}
                    onChange={(e) => {
                      const newHour = Math.min(23, Math.max(0, Number(e.target.value)));
                      handleTimeChange(newHour, date ? date.getMinutes() : 0);
                    }}
                    className="border rounded-md p-1 bg-card"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="minute" className="text-sm font-medium">
                    Minute
                  </label>
                  <input
                    id="minute"
                    type="number"
                    min={0}
                    max={59}
                    value={date ? date.getMinutes() : 0}
                    onChange={(e) => {
                      const newMinute = Math.min(59, Math.max(0, Number(e.target.value)));
                      handleTimeChange(date ? date.getHours() : 0, newMinute);
                    }}
                    className="border rounded-md p-1 bg-card"
                  />
                </div>
              </div>
            </div>
          </PopoverContent>
        )}
      </Popover>
    </div>
  );
}
