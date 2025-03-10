"use client";

import { useSearchParams } from "next/navigation";

import { useState, useCallback } from "react";
import { toast } from "@/hooks/custom-use-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/useDebounce";
import { PaymentsDataTable } from "../components/payments/payments-data-table";
import { PaymentsDataTableColumns } from "../components/payments/payments-data-table-columns";

const fetchPayments= async ({ queryKey }: { queryKey: [string, number, number, string, string] }) => {
  const [, page, pageSize, searchType, keyword] = queryKey;
  const queryString = `${process.env.NEXT_PUBLIC_API_ROUTES_TYPE}/payments?page=${page}&pageSize=${pageSize}&searchType=${searchType}&keyword=${keyword}`;
  
  const response = await fetch(queryString);
  if (!response.ok) {
    throw new Error("데이터를 불러오는 중 오류가 발생했습니다.");
  }
  return response.json();
};

export default function PaymentsPage() {
  const searchParams = useSearchParams();
  const pageFromParams = Number(searchParams.get("page")) || 1;
  const pageSizeFromParams = Number(searchParams.get("pageSize")) || 1;

  const [page, setPage] = useState(pageFromParams);
  const [pageSize, setPageSize] = useState(pageSizeFromParams);
  const [searchType, setSearchType] = useState("");
  const [keyword, setKeyword] = useState("");
  const [tempKeyword, setTempKeyword] = useState(""); // 🔹 검색 입력을 위한 임시 상태
  const debouncedKeyword = useDebounce(tempKeyword, 300); // 300ms 디바운스 적용

  const queryClient = useQueryClient();

  // ✅ React Query로 데이터 가져오기
  const { data, error, isFetching } = useQuery({
    queryKey: ["employees", page, pageSize, searchType, debouncedKeyword],
    queryFn: fetchPayments,
    staleTime: 15000, // 15초 동안 캐시 유지
    refetchOnWindowFocus: false, // 포커스 시 자동 리패치 방지
  });


  // 🔹 검색 입력 처리 (Enter 키로만 검색 실행)
  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value); // keyword 상태 업데이트 (검색 실행)
    setTempKeyword(e.target.value); // 입력 값은 tempKeyword에만 저장
  };

  // 🔹 Enter 키를 눌렀을 때 검색 실행
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  

  // 🔹 검색 버튼 클릭 시 실행 (검색 타입이 없을 경우 알림)
  const handleSearch = useCallback(() => {
    if (!searchType) {
      toast({
        variant: "default",
        position: "top",
        description: "✅ 검색 타입을 선택해 주세요.",
      });
      return;
    }
    setKeyword(tempKeyword); // 사용자가 입력한 검색어 반영
    setPage(1);
    queryClient.invalidateQueries({ queryKey: ["employees", page, pageSize, searchType, keyword] });
  }, [searchType, tempKeyword, page, pageSize, keyword, queryClient]);


  //⭕ 페이징
  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  }, []);


  return (
    <div className="container mx-auto py-10">

    <PaymentsDataTable 
        isLoading={isFetching} 
        error={error}
        paymentsColumns={PaymentsDataTableColumns} 
        data={data?.data || []} 
        page={page} 
        pageSize={pageSize} 
        totalCount={data?.totalCount || 0} 
        setPage={handlePageChange} 
        setPageSize={handlePageSizeChange}
        searchType={searchType}
        keyword={keyword}
        setSearchType={setSearchType}
        setKeyword={setKeyword}
        handleSearch={handleSearch}
        handleKeywordChange={handleKeywordChange}
        handleKeyDown={handleKeyDown}

      />
    </div>
  );
}
