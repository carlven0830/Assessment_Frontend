import { useEffect, useRef, useState } from "react";
import { addProject } from "../../../services/projectService";
import { getJwtToken } from "../../../services/authService";
import { useNavigate } from "react-router-dom";
import "./addProject.css";
import { getEmpList } from "../../../services/employeeService";
import { OrderByEnum } from "../../../models/enums/orderByEnum";
import type { EmployeeResponse } from "../../../models/response/empResponse";

function AddProject() {
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [employeeList, setEmployeeList] = useState<EmployeeResponse[]>([]);
  const [assignedEmpName, setAssignedEmpName] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      await getJwtToken("GetEmployeeList");
      const resp = await getEmpList({
        pageNum: 1,
        pageSize: 10,
        isPageList: true,
        orderBy: OrderByEnum.CreateDate,
        asc: true,
      });
      if (resp.status == 200) {
        setEmployeeList(resp.content || []);
      }
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleSelect = (name: string) => {
    setAssignedEmpName((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const addData = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await getJwtToken("AddProject");

      const employeeIds = employeeList
        .filter((emp) => assignedEmpName.includes(emp.empName))
        .map((emp) => emp.id);

      const resp = await addProject({
        projectTitle,
        projectDescription,
        employeeIds,
      });

      if (resp.status == 200) {
        console.log("Project content", resp.content);

        navigate("/project");
      }
    } catch (error) {
      console.error("Failed add project", error);
    }
  };

  return (
    <div className="addProjectContainer">
      <div className="addProjectTitle">Add Project</div>
      <form onSubmit={addData}>
        <div>
          <label>Project Title</label>
        </div>
        <div className="formGroup">
          <input
            type="text"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Project Description</label>
        </div>
        <div className="formGroup">
          <input
            type="text"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Assigned Employees</label>
        </div>
        <div className="formGroupSelect">
          <div className="dropdown" ref={dropdownRef}>
            <input
              type="text"
              readOnly
              value={assignedEmpName.join(", ")}
              onClick={toggleDropdown}
              className="dropdown-input"
            />
            {dropdownOpen && (
              <div className="dropdown-menu">
                {employeeList.map((emp) => (
                  <label key={emp.empName} className="dropdown-item">
                    <input
                      type="checkbox"
                      value={emp.empName}
                      checked={assignedEmpName.includes(emp.empName)}
                      onChange={() => handleSelect(emp.empName)}
                    />
                    {emp.empName}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
        <button type="submit" className="addProjectBtn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddProject;
