import type { ListRequest } from "../base/listRequest";
import type { StatusEnum } from "../enums/statusEnum";

export interface FilterProjectRequest extends ListRequest {
  projectTitle: string;
  projectDescription: string;
  status: StatusEnum | null;
  assignedEmpName: string;
}
