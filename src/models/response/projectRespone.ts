import type { EntityResponse } from "./entityResponse";

export interface ProjectResponse extends EntityResponse {
  projectTitle: string;
  projectDescription: string;
  status: string;
  assignedEmpName: string[];
}
