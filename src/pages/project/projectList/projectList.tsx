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
import { toast } from "react-toastify";

function ProjectList() {
  const [data, setData] = useState<ProjectResponse[]>([]);
  const hasFetched = useRef(false); // prevent multiple call api
  const navigate = useNavigate();

  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;

    const fetchData = async () => {
      var respJwt = await getJwtToken("GetProjectList");

      if (!respJwt || respJwt.status !== 200 || !respJwt.token) {
        toast.error("Session expired. Redirecting to login.");
        navigate("/login");
      }

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

  const viewData = (row: ProjectResponse) => {
    navigate(`/project/${row.id}`);
  };

  const addData = () => {
    navigate("/project/add");
  };

  const updateData = (row: ProjectResponse) => {
    navigate(`/project/edit/${row.id}`, { state: row });
  };

  const deleteData = async (row: ProjectResponse) => {
    try {
      var respJwt = await getJwtToken("DeleteProject");

      if (!respJwt || respJwt.status !== 200 || !respJwt.token) {
        toast.error("Session expired. Redirecting to login.");
        navigate("/login");
      }

      const resp = await deleteProject(row.id);

      if (resp.status == 200) {
        toast.success(resp.message);

        setData((prev) => prev.filter((p) => p.id !== row.id));
      } else {
        toast.error(resp.message);
      }
    } catch (error) {
      console.error("Failed delete project", error);

      toast.error("Failed delete project");
    }
  };

  return (
    <>
      <div className="projectListContainer">
        <div className="projectListTitle">
          <h1>Project</h1>
        </div>
        <div className="projectListGroup">
          <button onClick={addData}>Create</button>
        </div>
        <Table
          columns={projectColumns}
          data={data}
          onDetail={viewData}
          onEdit={updateData}
          onDelete={deleteData}
        ></Table>
      </div>
    </>
  );
}

export default ProjectList;
