import { useEffect, useRef, useState } from "react";
import { getJwtToken } from "../../../services/authService";
import {
  deleteProject,
  getProjectList,
} from "../../../services/projectService";
import type { ProjectResponse } from "../../../models/response/projectRespone";
import Table from "../../../components/table/table";
import { projectColumns } from "../../../models/data/projectColumn";
import { OrderByEnum } from "../../../models/enums/orderByEnum";
import "./projectList.css";
import { useNavigate } from "react-router-dom";

function ProjectList() {
  const [data, setData] = useState<ProjectResponse[]>([]);
  const hasFetched = useRef(false); // prevent multiple call api
  const navigate = useNavigate();

  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;

    const fetchData = async () => {
      await getJwtToken("GetProjectList");

      const resp = await getProjectList({
        pageNum: 1,
        pageSize: 10,
        isPageList: true,
        orderBy: OrderByEnum.CreateDate,
        asc: true,
        projectTitle: "",
        projectDescription: "",
        status: null,
        assignedEmpName: "",
      });

      if (resp.status == 200) {
        setData(resp.content || []);
      }
    };

    fetchData();
  }, []);

  const handleDetail = (row: ProjectResponse) => {
    navigate(`/project/${row.id}`);
  };

  const addProject = () => {
    navigate("/project/add");
  };

  const handleDelete = async (row: ProjectResponse) => {
    try {
      await getJwtToken("DeleteProject");

      const resp = await deleteProject(row.id);

      if (resp.status == 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Failed delete project", error);
    }
  };

  return (
    <>
      <div className="projectTitle">
        <h1>Task Page</h1>
      </div>
      <div className="projectCreateGroup">
        <button onClick={addProject}>Create</button>
      </div>
      <Table
        columns={projectColumns}
        data={data}
        onDetail={handleDetail}
        onEdit={(row) => console.log("Edit", row)}
        onDelete={handleDelete}
      ></Table>
    </>
  );
}

export default ProjectList;
