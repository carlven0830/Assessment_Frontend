import type { StatusEnum } from "../enums/statusEnum";
import type { AddProjectRequest } from "./addProjectRequest";

export interface UpdateProjectRequest extends AddProjectRequest {
  id: string;
  status: StatusEnum;
}
