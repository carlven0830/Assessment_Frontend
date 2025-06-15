import type { BaseResponse } from "./baseResponse";

export interface ContentResponse<T> extends BaseResponse {
  content: T | null;
}
