import { SweetAlertResult } from "sweetalert2";
import { Document } from "../components";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import swalService from "../services/swal-service";
import apiService from "../services/api-service";

export default function Project() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const params = useParams();
  const projectId = parseInt(params.projectId ?? "");

  useEffect(() => {
    apiService.getAllDocuments().then((response) => {
      setDocuments(
        response.data.filter(
          (item: DocumentItem) => item.projectId == projectId
        )
      );
    });
  }, []);

  const openCreateNewDocumentModal = () => {
    swalService
      .fire({
        input: "text",
        title: "Create Document",
        inputLabel: "Project Name",
        customClass: {
          actions: "justify-end pr-8 w-full",
          input: "rounded border !border-[#b6b6b6] !ring-0 !outline-none",
        },
        inputValidator: (value) => {
          if (!value) {
            return "Project name can't be empty";
          }
        },
      })
      .then(({ value }: SweetAlertResult<any>) => {
        apiService.createDocument({
          name: value,
          autoSaveContent: "",
          projectId,
        });
      });
  };

  return (
    <div className="h-screen p-10 container m-auto max-w-[1000px]">
      <div className="flex justify-between p-6 pt-0">
        <h1 className="text-xl">Documents</h1>
        <span
          onClick={openCreateNewDocumentModal}
          className="bg-black text-white px-4 py-1.5 rounded cursor-pointer"
        >
          + New
        </span>
      </div>

      <div className="flex flex-wrap gap-y-4">
        {documents.map((item, index) => (
          <Link key={index} to={`/document/${item.id}`} className="w-1/4">
            <Document key={index} name={item.name} />
          </Link>
        ))}
      </div>
    </div>
  );
}
