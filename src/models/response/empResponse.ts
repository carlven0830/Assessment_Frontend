import type { AccResponse } from "./accResponse";

export interface EmployeeResponse extends AccResponse {
  empName: string;
  empPosition: string;
  empLevel: string;
}
