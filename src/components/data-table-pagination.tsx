import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps<TData> {
  position?: "center" | "left" | "right";
  table: Table<TData>;
  page: number;
  pageSize: number;
  totalCount: number;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  selectText?: boolean;
  displayText?: boolean;
  totalCountText?: boolean;
}

export function DataTablePagination<TData>({
  position = "center",
  table,
  page,
  pageSize,
  totalCount,
  setPage,
  setPageSize,
  selectText = false,
  displayText = false,
  totalCountText = false,
}: DataTablePaginationProps<TData>) {
  const pageCount = Math.ceil(totalCount / pageSize);
  const currentPage = page;
  let classPosition = "md:justify-center";
  if (position === "center") {
    classPosition = "md:justify-center";
  } else if (position === "left") {
    classPosition = "md:justify-start";
  } else if (position === "right") {
    classPosition = "md:justify-end";
  }


// 페이지 버튼 최적화
const getPaginationRange = () => {
  const range = [];
  const delta = 2;
  
  for (let i = 1; i <= pageCount; i++) {
    if (
      i === 1 || 
      i === pageCount || 
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      range.push(i);
    } else if (range[range.length - 1] !== "...") {
      range.push("...");
    }
  }
  return range;
};

  return (
    <div className={`flex items-center justify-center  ${classPosition}   space-x-2 py-4`}>
      <div className="flex items-center justify-between px-2 ">


       <div className="flex flex-col  md:flex-row items-center space-y-3 md:space-y-0   md:space-x-6 lg:space-x-8">

        <div
          className={`flex-1 text-sm text-muted-foreground px-3 ${
            !selectText && "hidden"
          } `}
        >
          {table.getFilteredSelectedRowModel().rows.length}개 선택됨 / 총{" "}
          {totalCount}개 행
        </div>


          <div
            className={`flex items-center space-x-2 ${
              !displayText && "hidden"
            }`}
          >
            <p className="text-sm font-medium">페이지당 행 개수</p>
            <Select
              value={`${pageSize}`}
              onValueChange={(value) => {
                setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[1,3, 5, 10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div
            className={`flex w-[150px] items-center justify-center text-sm font-medium ${
              !totalCountText && "hidden"
            }`}
          >
            페이지 {page} / 총 {pageCount}
          </div>


          <div className="flex items-center space-x-1 ">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => setPage(1)}
              disabled={page === 1}
               aria-label="첫 페이지"
            >
              <span className="sr-only">첫 페이지로 이동</span>
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              aria-label="이전 페이지"
            >
              <span className="sr-only">이전 페이지로 이동</span>
              <ChevronLeft />
            </Button>

           {/* 페이지 번호 버튼 */}
           {getPaginationRange().map((item, index) =>
              item === "..." ? (
                <span key={index} className="px-2 text-muted-foreground">
                  ...
                </span>
              ) : (
                <Button
                  key={index}
                  variant={currentPage === item ? "default" : "outline"}
                  className={`h-8 w-8 p-0 ${currentPage === item ? "bg-primary text-white" : ""}`}
                  onClick={() => setPage(item as number)}
                  aria-label={`페이지 ${item}`}
                >
                  {item}
                </Button>
              )
            )}

            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => setPage(page + 1)}
              disabled={page === pageCount}
               aria-label="다음 페이지"
            >
              <span className="sr-only">다음 페이지로 이동</span>
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => setPage(pageCount)}
              disabled={page === pageCount}
              aria-label="마지막 페이지"
            >
              <span className="sr-only">마지막 페이지로 이동</span>
              <ChevronsRight />
            </Button>
          </div>
        </div>
      
      
      
      
      </div>
    </div>
  );
}
