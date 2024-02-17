import { useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import QuillCursors from "quill-cursors";
import "quill/dist/quill.snow.css";
import apiService from "../services/api-service";
import { useParams } from "react-router-dom";

Quill.register("modules/cursors", QuillCursors);

export default function EditDocument() {
  const modules = {
    cursors: {
      hideDelayMs: 500,
      hideSpeedMs: 300,
      selectionChangeSource: null,
      transformOnTextChange: true,
    },
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ align: [] }],
      ["image", "blockquote", "code-block"],
      ["clean"],
    ],
  };

  const quillRef = useRef<any>(null);

  const [documentDetails, setDocumentDetails] = useState<DocumentItem>();
  const params = useParams();
  const documentId = parseInt(params.documentId ?? "");

  useEffect(() => {
    apiService
      .getDocument(documentId)
      .then((response) => setDocumentDetails(response.data));
  }, []);

  useEffect(() => {
    if (quillRef.current) return;
    const editor = quillRef.current?.getEditor?.();

    editor.setText("Loading...");
    quillRef.current = editor;
  }, []);

  return (
    <div className="max-w-[1000px] m-auto">
      <h1>{documentDetails?.name}</h1>
      <div className="flex">
        <h3>Connected:</h3>
        {/* <div className="clientsList">
            {clients.map((client, index) => (
              <Client
                key={index}
                username={client}
                isCurrentUser={client === username}
              />
            ))}
          </div> */}

        <button className="ml-auto">Leave</button>
      </div>
      <div>
        <div className="w-full max-w-[816px] h-screen">
          <ReactQuill
            ref={quillRef}
            theme="snow"
            modules={modules}
            placeholder="Start collaborating As a Team..."
            className="h-full"
          />
        </div>
      </div>
    </div>
  );
}
