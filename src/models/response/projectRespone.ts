import type { StatusEnum } from "../enums/statusEnum";
import type { EntityResponse } from "./entityResponse";

export interface ProjectResponse extends EntityResponse {
  projectTitle: string;
  projectDescription: string;
  status: keyof typeof StatusEnum;
  assignedEmpName: string[];
}
