"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker, useDayPicker, useNavigation } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger } from "./select"
import { ko } from "date-fns/locale";  // 한국어 로케일


export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [open, setOpen] = React.useState(true) // 캘린더 열림/닫힘 상태

  return open ?(
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      onDayClick={() => setOpen(false)}
     
      modifiers={{
        saturday: (date) => date.getDay() === 6, // 토요일
        sunday: (date) => date.getDay() === 0, // 일요일
      }}
      modifiersClassNames={{
        saturday: "text-blue-500", // 토요일 파란색
        sunday: "text-red-500", // 일요일 빨간색
      }}

      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium hidden",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        caption_dropdowns: "flex gap-1 flex-row-reverse", // 년도 드롭다운이 먼저 나오도록 flex-r
  
        ...classNames,
      }}
      components={{
      
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("h-4 w-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("h-4 w-4", className)} {...props} />
        ),
        Dropdown:(dropdownProps)=>{
         // 1.log(dropdownProps);
          const {currentMonth, goToMonth} =useNavigation();
          const {fromYear, fromMonth, fromDate, toYear, toMonth, toDate}  =useDayPicker();

          let selectValues : {value:string; label:string}[] = [];

          if(dropdownProps.name==="months"){
            selectValues = Array.from({length: 12}, (_, i) => {
              return {
                value:i.toString(),
                label: format(new Date(new Date().getFullYear(), i), "MMMM", { locale: ko })
              }               
            });
          }else if(dropdownProps.name==="years"){
            
            const earliestYear=fromYear || fromMonth?.getFullYear() || fromDate?.getFullYear()
            const latestYear=toYear || toMonth?.getFullYear() || toDate?.getFullYear()
            if(earliestYear && latestYear){
                               
                selectValues = Array.from(
                  { length: latestYear - earliestYear + 1 },
                  (_, i) => {
                    return {
                      value: (latestYear - i).toString(), //년도 내림차순으로 변경
                      label: (latestYear - i).toString(), //년도 내림차순으로 변경
                    };
                  }
                );

            }
          }

          // 캡션을 한국어로 표시하도록 로케일 적용
          const caption = format(currentMonth, dropdownProps.name === "months" ? "MMMM" : "yyyy", { locale: ko }); // 월 또는 연도 캡션 한국어로 변경
          
          return(
            <>
            <Select
              onValueChange={(newValue)=>{
                if(dropdownProps.name==="months"){
                  const newDate = new Date(currentMonth);
                  newDate.setMonth(parseInt(newValue));
                  goToMonth(newDate);
                }else if(dropdownProps.name==="years"){
                  const newDate = new Date(currentMonth);
                  newDate.setFullYear(parseInt(newValue));
                  goToMonth(newDate);
                }
              }}
              value={dropdownProps.value?.toString()}>

              <SelectTrigger>{caption}</SelectTrigger>
              <SelectContent>
                 {selectValues.map((value) => (
                   <SelectItem key={value.value} value={value.value}>{value.label}</SelectItem>
                 ))}
              </SelectContent>
            </Select>
            
            </>
          ) ;
        }
      }}
      {...props}
    />
  ) :null;

}
Calendar.displayName = "Calendar"

export { Calendar }
