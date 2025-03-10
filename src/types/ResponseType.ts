//프로젝트 공통 반환 타입 정의
export interface ResponseType<T = unknown> {
    status: number;
    message: string;
    field?: string; // 특정 필드에 대한 에러 메시지 (선택적)
    data?: T; // 성공 시 반환할 데이터 (선택적)
  }
  