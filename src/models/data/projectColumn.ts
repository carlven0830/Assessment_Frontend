import type { TableTitle } from "../configs/tableTitle";
import type { ProjectResponse } from "../response/projectRespone";

export const projectColumns: TableTitle<ProjectResponse>[] = [
  { header: "Project Title", label: "projectTitle" },
  { header: "Project Description", label: "projectDescription" },
  { header: "Status", label: "status" },
  { header: "Assigned Employees", label: "assignedEmpName" },
  { header: "Create Date", label: "createDate" },
];
