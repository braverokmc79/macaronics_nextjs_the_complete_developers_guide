"use client"
import {
  ColumnDef,
  ColumnFiltersState,  
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DataTablePagination } from "@/components/data-table-pagination"
import PaymentsLoading from "../../payments/loading"

interface DataTableProps<TData, TValue> {
  isLoading: boolean
  error: unknown
  paymentsColumns: ColumnDef<TData, TValue>[]
  data: TData[]
  page: number
  pageSize: number
  totalCount: number
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
  searchType: string
  keyword: string
  setSearchType: (searchType: string) => void
  setKeyword: (keyword: string) => void
  handleSearch: () => void
  handleKeywordChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
}


export function PaymentsDataTable<TData, TValue>({
  isLoading,
  error,
  paymentsColumns,
  data,
  page, pageSize, totalCount,setPage,setPageSize,
  searchType, keyword, setSearchType,  handleSearch,
  handleKeywordChange,handleKeyDown
}: DataTableProps<TData, TValue>) {
 
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] =useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

 
  const table = useReactTable({
    data,
    columns: paymentsColumns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,  
      rowSelection, 
    },

    manualPagination: true,
    pageCount: Math.ceil(totalCount / pageSize),
  })

  return (
    <div>
        
        <div className="flex items-center py-4">    
          
        <div className="w-6/12 grid grid-cols-[30%_60%_1fr] gap-2">
            <Select onValueChange={setSearchType} value={searchType}>
              <SelectTrigger>
                <SelectValue placeholder="검색 타입을 선택해 주세요." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="firstName">성명</SelectItem>
                <SelectItem value="teamName">팀명</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="search"
              placeholder="검색"
              value={keyword}
              onChange={(event) => handleKeywordChange(event)}
              onKeyDown={(event) => handleKeyDown(event)}
              className="max-w-sm"
            />

            <Button
              variant="default"
              className="ml-auto bg-blue-600 text-white hover:bg-blue-700 transition-all"
              onClick={handleSearch}
            >
              검색
            </Button>
          </div>



        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
            컬럼 표시/숨기기
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">

            {table.getAllColumns().filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>


        </div>

        <div className="flex-1 text-sm text-muted-foreground mb-5">
        {table.getFilteredRowModel().rows.length} 중{" "}
        {table.getFilteredSelectedRowModel().rows.length} 행이 선택되었습니다.
        </div>
        
        <div className="rounded-md border ">


    


       {isLoading && (
        <PaymentsLoading />
      )}

       {!isLoading && <Table>
            <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                    return (
                    <TableHead key={header.id}>
                        {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                            )}
                    </TableHead>
                    )
                })}
                </TableRow>
            ))}
            </TableHeader>
            <TableBody>
            {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                >
                    {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                    ))}
                </TableRow>
                ))
            ) : (
                <TableRow>
                <TableCell colSpan={paymentsColumns.length} className="h-24 text-center">

                 {error ? <div className="text-center text-red-500">데이터를 불러오는 중 오류가 발생했습니다.</div>
                  :"데이터가 없습니다."                 
                 }
                   
                </TableCell>
                </TableRow>
            )}
            </TableBody>
        </Table>
}
        </div>
        
        
        
           
        <DataTablePagination 
              position="right"
              table={table}
              page={page} 
              pageSize={pageSize} 
              totalCount={totalCount} 
              setPage={setPage} 
              setPageSize={setPageSize}
              selectText={true}
              displayText={true}
              totalCountText={true}  
         />
        
 </div>
  )
}
