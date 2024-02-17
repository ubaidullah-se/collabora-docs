import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Folder } from "../components";
import { SweetAlertResult } from "sweetalert2";
import swalService from "../services/swal-service";
import apiService from "../services/api-service";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchAllProjects = async () => {
    const { data: projects } = await apiService.getAllProjects();
    setProjects(projects);
  };

  useEffect(() => {
    fetchAllProjects();
  }, []);

  const openCreateNewProjectModal = () => {
    swalService
      .fire({
        input: "text",
        title: "Create Project",
        inputLabel: "Project Name",
        customClass: {
          actions: "justify-end pr-8 w-full",
          input: "rounded border border-[#b6b6b6] !ring-0 !outline-none",
        },
        inputValidator: (value) => {
          if (!value) {
            return "Project name can't be empty";
          }
        },
      })
      .then(({ value }: SweetAlertResult<any>) => {
        apiService.createProject({ name: value }).then((response) => {
          if (response.ok) {
            toast.success("New project created.");
            fetchAllProjects();
          }
        });
      });
  };

  return (
    <div className="h-screen p-10 container m-auto max-w-[1000px]">
      <div className="flex justify-between p-6 pt-0">
        <h1 className="text-xl">Projects</h1>
        <span
          onClick={openCreateNewProjectModal}
          className="bg-black text-white px-4 py-1.5 rounded cursor-pointer"
        >
          + New
        </span>
      </div>

      <div className="flex flex-wrap gap-y-4">
        {projects.length > 0 ? (
          projects.map((item, index) => (
            <Link key={index} to={`/project/${item.id}`} className="w-1/4">
              <Folder name={item.name} />
            </Link>
          ))
        ) : (
          <div className="w-full min-h-[300px] flex items-center justify-center">
            No projects yet. Create a
            <span
              className="underline text-orange-400 pl-1.5 cursor-pointer"
              onClick={openCreateNewProjectModal}
            >
              new project
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
