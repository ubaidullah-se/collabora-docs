import { Document } from "../components";

export default function Project() {
  const documents: DocumentItem[] = [
    {
      name: "Test",
      createdAt: new Date().toString(),
      id: 0,
      updatedAt: new Date().toString(),
    },
    {
      name: "Test",
      createdAt: new Date().toString(),
      id: 0,
      updatedAt: new Date().toString(),
    },
    {
      name: "Test",
      createdAt: new Date().toString(),
      id: 0,
      updatedAt: new Date().toString(),
    },
    {
      name: "Test",
      createdAt: new Date().toString(),
      id: 0,
      updatedAt: new Date().toString(),
    },
    {
      name: "Test",
      createdAt: new Date().toString(),
      id: 0,
      updatedAt: new Date().toString(),
    },
    {
      name: "Test",
      createdAt: new Date().toString(),
      id: 0,
      updatedAt: new Date().toString(),
    },
  ];

  return (
    <div className="h-screen p-10 container m-auto max-w-[1000px]">
      <div className="flex justify-between p-6 pt-0">
        <h1 className="text-xl">Documents</h1>
        <span className="bg-black text-white px-4 py-1.5 rounded cursor-pointer">
          + New
        </span>
      </div>

      <div className="flex flex-wrap gap-y-4">
        {documents.map((item) => (
          <Document name={item.name} className="w-1/4" />
        ))}
      </div>
    </div>
  );
}
