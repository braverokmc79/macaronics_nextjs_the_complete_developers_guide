import { NextResponse } from "next/server";

const payments = [
  { id: 1, firstName: "1.Colin", lastName: "Murray", teamName: "alpha", isTeamLeader: true, avatar: "/images/cm.jpg" },
  { id: 2, firstName: "2.Tom", lastName: "Phillips", teamName: "alpha", isTeamLeader: false },
  { id: 3, firstName: "3.Liam", lastName: "Fuentes", teamName: "alpha", isTeamLeader: false },
  { id: 4, firstName: "4.Tina", lastName: "Fey", teamName: "canary", isTeamLeader: true, avatar: "/images/tf.jpg" },
  { id: 5, firstName: "5.Katie", lastName: "Johnson", teamName: "canary", isTeamLeader: false },
  { id: 6, firstName: "6.Tina", lastName: "Jones", teamName: "canary", isTeamLeader: false },
  { id: 7, firstName: "7.Amy", lastName: "Adams", teamName: "delta", isTeamLeader: true },
  { id: 8, firstName: "8.Ryan", lastName: "Lopez", teamName: "delta", isTeamLeader: false, avatar: "/images/rl.jpg" },
  { id: 9, firstName: "9.Jenny", lastName: "Jones", teamName: "delta", isTeamLeader: false },
  { id: 10, firstName: "10.Colin", lastName: "Murray", teamName: "alpha", isTeamLeader: true, avatar: "/images/cm.jpg" },
  { id: 11, firstName: "11.Tom", lastName: "Phillips", teamName: "alpha", isTeamLeader: false },
  { id: 12, firstName: "12.Liam", lastName: "Fuentes", teamName: "alpha", isTeamLeader: false },
  { id: 13, firstName: "13.Tina", lastName: "Fey", teamName: "canary", isTeamLeader: true, avatar: "/images/tf.jpg" },
  { id: 14, firstName: "14.Katie", lastName: "Johnson", teamName: "canary", isTeamLeader: false },
  { id: 15, firstName: "15.Tina", lastName: "Jones", teamName: "canary", isTeamLeader: false },
  { id: 16, firstName: "16.Amy", lastName: "Adams", teamName: "delta", isTeamLeader: true },
  { id: 17, firstName: "17.Ryan", lastName: "Lopez", teamName: "delta", isTeamLeader: false, avatar: "/images/rl.jpg" },
  { id: 18, firstName: "18.Jenny", lastName: "Jones", teamName: "delta", isTeamLeader: false }
];

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  
  // ✅ `page`와 `pageSize`를 URL에서 가져오기
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 5;
  const searchType = searchParams.get("searchType") || "";
  const keyword = searchParams.get("keyword") || "";

  const filteredEmployees = payments.filter((payment) => {
    if (searchType === "firstName") {
      return payment.firstName.toLowerCase().includes(keyword.toLowerCase());
    }
    if (searchType === "teamName") {
      return payment.teamName.toLowerCase().includes(keyword.toLowerCase()); 
    }
    if (searchType === "all") {
      return (
        payment.firstName.toLowerCase().includes(keyword.toLowerCase()) ||
        payment.teamName.toLowerCase().includes(keyword.toLowerCase())
      );
    }
  
    return true; // 기본적으로 모든 직원 포함
  });
  
  console.log("filteredEmployees   :",filteredEmployees);

  // ✅ 데이터 슬라이싱 (페이지네이션 적용)
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredEmployees.slice(startIndex, endIndex);

  // console.log("GET  page 파라미터 ",searchParams.get("page"), searchType, keyword);
  // console.log("GET data 페이지와 페이지 사이즈: ",page, pageSize);
  // console.log("GET paginatedData: ",paginatedData);

  return NextResponse.json({
    status: 200,
    data: paginatedData,
    message: "success",
    page,
    pageSize,
    totalCount: filteredEmployees.length
  });
};
