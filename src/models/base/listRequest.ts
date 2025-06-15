import type { OrderByEnum } from "../enums/orderByEnum";

export interface ListRequest {
  pageNum: number;
  pageSize: number;
  orderBy: OrderByEnum;
  asc: boolean;
  isPageList: boolean;
}
