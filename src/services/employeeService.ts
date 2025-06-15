import type { ListRequest } from "../models/base/listRequest";
import type { ListResponse } from "../models/base/listResponse";
import type { EmployeeResponse } from "../models/response/empResponse";
import httpService from "./httpService";

export const getEmpList = (data: ListRequest) => {
  return httpService.get<ListResponse<EmployeeResponse>>("Employee/List", data);
};
