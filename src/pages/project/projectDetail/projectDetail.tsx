import { useState, useEffect, useRef } from "react";
import type { ProjectResponse } from "../../../models/response/projectRespone";
import { getJwtToken } from "../../../services/authService";
import { getProject } from "../../../services/projectService";
import { useParams } from "react-router-dom";
import "./projectDetail.css";

function ProjectDetail() {
  const [data, setData] = useState<ProjectResponse | null>(null);
  const { id } = useParams<{ id: string }>();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;

    const fetchData = async () => {
      try {
        if (!id) return;

        await getJwtToken("GetProject");

        const resp = await getProject(id);

        if (resp.status == 200) {
          setData(resp.content);
        }
      } catch (error) {
        console.error("Get project detail failed", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="projectDetailContainer">
      <div className="projectDetailTitle">
        <h2>Project Detail</h2>
      </div>
      <div className="projectDetailWrapper">
        <div className="projectDetailGroup">
          <h3>Project Title</h3>
          <p>{data?.projectTitle}</p>
        </div>
        <div className="projectDetailGroup">
          <h3>Project Description</h3>
          <p>{data?.projectDescription}</p>
        </div>
        <div className="projectDetailGroup">
          <h3>Status</h3>
          <p>{data?.status}</p>
        </div>
        <div className="projectDetailGroup">
          <h3>Assigned Employees</h3>
          <p>{data?.assignedEmpName.join(", ")}</p>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
