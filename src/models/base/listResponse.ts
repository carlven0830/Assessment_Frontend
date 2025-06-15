import type { BaseResponse } from "./baseResponse";

export interface ListResponse<T> extends BaseResponse {
  content: T[] | null;
  totalPages: number;
  totalCount: number;
}
