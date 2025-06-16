import { useEffect, useRef, useState } from "react";
import { addProject, updateProject } from "../../../services/projectService";
import { getJwtToken } from "../../../services/authService";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./projectForm.css";
import { getEmpList } from "../../../services/employeeService";
import { OrderByEnum } from "../../../models/enums/orderByEnum";
import type { EmployeeResponse } from "../../../models/response/empResponse";
import { StatusEnum } from "../../../models/enums/statusEnum";
import type { ProjectResponse } from "../../../models/response/projectRespone";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import type { UpdateProjectRequest } from "../../../models/request/updateProjectRequest";
import type { AddProjectRequest } from "../../../models/request/addProjectRequest";

const addProjectSchema: yup.ObjectSchema<AddProjectRequest> = yup.object({
  projectTitle: yup.string().required("Title is required"),
  projectDescription: yup.string().required("Description is required"),
  employeeIds: yup.array().of(yup.string().required()).required(),
});

const updateProjectSchema: yup.ObjectSchema<UpdateProjectRequest> = yup.object({
  projectTitle: yup.string().required("Title is required"),
  projectDescription: yup.string().required("Description is required"),
  employeeIds: yup.array().of(yup.string().required()).required(),
  id: yup.string().required("ID is required"),
  status: yup
    .mixed<StatusEnum>()
    .oneOf([StatusEnum.Pending, StatusEnum.InProgress, StatusEnum.Completed])
    .required("Status is required"),
});

function ProjectForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const location = useLocation();

  const [employeeList, setEmployeeList] = useState<EmployeeResponse[]>([]);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const statusDropdownRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const projectData = location.state as ProjectResponse | undefined;
  const statusOptions = Object.keys(StatusEnum).filter((key) =>
    isNaN(Number(key))
  ) as (keyof typeof StatusEnum)[];

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<AddProjectRequest | UpdateProjectRequest>({
    resolver: yupResolver(isEdit ? updateProjectSchema : addProjectSchema),
    defaultValues: {
      projectTitle: "",
      projectDescription: "",
      employeeIds: [],
      ...(isEdit && {
        id: id as string,
        status: StatusEnum.Pending,
      }),
    },
  });

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
    if (isEdit && projectData) {
      setValue("projectTitle", projectData.projectTitle);
      setValue("projectDescription", projectData.projectDescription);
      setValue("status", StatusEnum[projectData.status]);
      const empIds = employeeList
        .filter((emp) => projectData.assignedEmpName.includes(emp.empName))
        .map((emp) => emp.id);
      setValue("employeeIds", empIds);
    }
  }, [isEdit, projectData, employeeList, setValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(event.target as Node)
      ) {
        setStatusDropdownOpen(false);
      }

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

  const dataSubmit = async (data: AddProjectRequest | UpdateProjectRequest) => {
    try {
      if (isEdit) {
        var respJwt = await getJwtToken("UpdateProject");

        if (!respJwt || respJwt.status !== 200 || !respJwt.token) {
          toast.error("Session expired. Redirecting to login.");
          navigate("/login");
        }

        const resp = await updateProject(data as UpdateProjectRequest);

        if (resp.status == 200) {
          console.log("Project content", resp.content);

          toast.success(resp.message);

          navigate("/project");
        } else {
          toast.error(resp.message);
        }
      } else {
        var respJwt = await getJwtToken("AddProject");

        if (!respJwt || respJwt.status !== 200 || !respJwt.token) {
          toast.error("Session expired. Redirecting to login.");
          navigate("/login");
        }

        const resp = await addProject(data as AddProjectRequest);

        if (resp.status == 200) {
          console.log("Project content", resp.content);

          toast.success(resp.message);

          navigate("/project");
        } else {
          toast.error(resp.message);
        }
      }
    } catch (error) {
      console.error("Failed submit project data", error);

      toast.error("Failed submit project data");
    }
  };

  return (
    <div className="addProjectContainer">
      <div className="addProjectTitle">
        {isEdit ? "Update Project" : "Add Project"}
      </div>
      <form onSubmit={handleSubmit(dataSubmit)}>
        <div>
          <label>Project Title</label>
        </div>
        <div className="formGroup">
          <input type="text" {...register("projectTitle")} />
          {errors.projectTitle && (
            <p className="errorText">{errors.projectTitle.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="">Project Description</label>
        </div>
        <div className="formGroup">
          <input type="text" {...register("projectDescription")} />
          {errors.projectDescription && (
            <p className="errorText">{errors.projectDescription.message}</p>
          )}
        </div>

        {isEdit && (
          <>
            <div>
              <label>Status</label>
            </div>
            <div className="formGroupSelect">
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <div className="dropdown" ref={statusDropdownRef}>
                    <input
                      type="text"
                      readOnly
                      value={StatusEnum[field.value]}
                      onClick={() => setStatusDropdownOpen((prev) => !prev)}
                      className="dropdownInput"
                    />
                    {statusDropdownOpen && (
                      <div className="dropdownMenu">
                        {statusOptions.map((key) => (
                          <div
                            key={key}
                            className="dropdownItem select"
                            onClick={() => {
                              field.onChange(StatusEnum[key]);
                              setStatusDropdownOpen(false);
                            }}
                          >
                            {key}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              />
              {isEdit && "status" in errors && errors.status?.message && (
                <p className="errorText">{errors.status.message}</p>
              )}
            </div>
          </>
        )}

        <div>
          <label>Assigned Employees</label>
        </div>
        <Controller
          control={control}
          name="employeeIds"
          render={({ field }) => (
            <div className="formGroupSelect">
              <div className="dropdown" ref={dropdownRef}>
                <input
                  type="text"
                  readOnly
                  value={employeeList
                    .filter((emp) => field.value.includes(emp.id))
                    .map((emp) => emp.empName)
                    .join(", ")}
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="dropdownInput"
                />
                {dropdownOpen && (
                  <div className="dropdownMenu">
                    {employeeList.map((emp) => (
                      <label key={emp.empName} className="dropdownItem">
                        <input
                          type="checkbox"
                          value={emp.id}
                          checked={field.value.includes(emp.id)}
                          onChange={() => {
                            const checked = field.value.includes(emp.id);
                            const newValue = checked
                              ? field.value.filter((id) => id !== emp.id)
                              : [...field.value, emp.id];
                            field.onChange(newValue);
                          }}
                        />
                        {emp.empName}
                      </label>
                    ))}
                  </div>
                )}
              </div>
              {errors.employeeIds && (
                <p className="errorText">
                  {(errors.employeeIds as any).message}
                </p>
              )}
            </div>
          )}
        ></Controller>

        <button type="submit" className="addProjectBtn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ProjectForm;
