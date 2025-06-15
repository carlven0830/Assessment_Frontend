import type { ContentResponse } from "../models/base/contentResponse";
import type { ListResponse } from "../models/base/listResponse";
import type { AddProjectRequest } from "../models/request/addProjectRequest";
import type { FilterProjectRequest } from "../models/request/filterProjectRequest";
import type { ProjectResponse } from "../models/response/projectRespone";
import httpService from "./httpService";

export const getProjectList = (data: FilterProjectRequest) => {
  return httpService.get<ListResponse<ProjectResponse>>("Project/List", data);
};

export const getProject = (id: string) => {
  return httpService.get<ContentResponse<ProjectResponse>>(`Project/Get/${id}`);
};

export const addProject = (data: AddProjectRequest) => {
  return httpService.post<ContentResponse<ProjectResponse>>(
    "Project/Add",
    data
  );
};

export const deleteProject = (id: string) => {
  return httpService.delete<ContentResponse<ProjectResponse>>(
    `Project/Delete/${id}`
  );
};
