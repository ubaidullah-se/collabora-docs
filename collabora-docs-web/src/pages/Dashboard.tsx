import { Link } from "react-router-dom";
import { Folder } from "../components";

export default function Dashboard() {
  const projects: Project[] = [
    {
      id: 1,
      name: "Test",
      createdAt: new Date().toString(),
      userId: 0,
      updatedAt: new Date().toString(),
    },
    {
      id: 1,
      name: "Test",
      createdAt: new Date().toString(),
      userId: 0,
      updatedAt: new Date().toString(),
    },
    {
      id: 1,
      name: "Test",
      createdAt: new Date().toString(),
      userId: 0,
      updatedAt: new Date().toString(),
    },
    {
      id: 1,
      name: "Test",
      createdAt: new Date().toString(),
      userId: 0,
      updatedAt: new Date().toString(),
    },
    {
      id: 1,
      name: "Test",
      createdAt: new Date().toString(),
      userId: 0,
      updatedAt: new Date().toString(),
    },
    {
      id: 1,
      name: "Test",
      createdAt: new Date().toString(),
      userId: 0,
      updatedAt: new Date().toString(),
    },
    {
      id: 1,
      name: "Test",
      createdAt: new Date().toString(),
      userId: 0,
      updatedAt: new Date().toString(),
    },
  ];

  return (
    <div className="h-screen p-10 container m-auto max-w-[1000px]">
      <div className="flex justify-between p-6 pt-0">
        <h1 className="text-xl">Projects</h1>
        <span className="bg-black text-white px-4 py-1.5 rounded cursor-pointer">+ New</span>
      </div>

      <div className="flex flex-wrap gap-y-4">
        {projects.map((item) => (
          <Link to={`/project/${item.id}`} className="w-1/4">
            <Folder name={item.name} />
          </Link>
        ))}
      </div>
    </div>
  );
}
