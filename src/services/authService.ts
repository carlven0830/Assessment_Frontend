import type { ContentResponse } from "../models/base/contentResponse";
import type { LoginRequest } from "../models/request/loginRequest";
import type { EmployeeResponse } from "../models/response/empResponse";
import httpService from "./httpService";

export const loginEmployee = (data: LoginRequest) => {
  return httpService.post<ContentResponse<EmployeeResponse>>(
    "Account/LoginEmployee",
    data
  );
};

export const getJwtToken = async (action: string) => {
  const accountId = localStorage.getItem("accountId") || "";
  const sessionKey = localStorage.getItem("sessionKey") || "";

  const resp = await httpService.post<ContentResponse<EmployeeResponse>>(
    "Account/JwtToken",
    {
      accountId,
      sessionKey,
      action,
    }
  );

  if (resp.status == 200) {
    const token = resp.token;

    if (token) {
      localStorage.setItem("token", token);
    }
  }

  return resp;
};
