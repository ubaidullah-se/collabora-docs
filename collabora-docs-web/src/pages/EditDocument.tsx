import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReduxStoreState } from "../redux/store";
import ReactQuill, { Quill } from "react-quill";
import QuillCursors from "quill-cursors";
import io, { Socket } from "socket.io-client";
import toast from "react-hot-toast";
import Delta from "quill-delta";
import "quill/dist/quill.snow.css";
import ClientAvatar from "../components/ClientAvatar";

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

  const navigate = useNavigate();
  const accessToken = useSelector(
    (state: ReduxStoreState) => state.accessToken.value
  );

  const user = useSelector((state: ReduxStoreState) => state.user.value);

  const [socket, setSocket] = useState<Socket | null>(null);
  const [, setDocumentState] = useState<Delta | null>(null); // New state to keep track of the document state
  const [clients, setClients] = useState<User[]>([]); // New state for connected clients array

  const quillRef = useRef<any>(null);

  const [documentDetails, setDocumentDetails] = useState<DocumentItem>();
  const params = useParams();
  const documentId = parseInt(params.documentId ?? "");

  useEffect(() => {
    if (quillRef.current) return;
    const editor = quillRef.current?.getEditor?.();

    editor.setText("Loading...");
    quillRef.current = editor;
  }, []);

  useEffect(() => {
    if (!quillRef.current) {
      console.error("Quill Editor is not initialized yet.");
      return;
    }

    const socketInstance = io(import.meta.env.VITE_SOCKET_URL, {
      path: "/socket.io",
      forceNew: true,
      reconnectionAttempts: 3,
      timeout: 2000,
    });
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      socketInstance.emit("join-room", {
        documentId,
        accessToken,
      });
    });

    // Event handlers for user join
    socketInstance.on("user-joined", (user: User) => {
      if (typeof socket === "undefined") return;
      setClients((prev) => [...prev, user]);

      const color = generateRandomColor();
      const cursors = quillRef.current.getEditor().getModule("cursors");
      const allCursors = cursors.cursors();
      if (!allCursors.some((cursor: any) => cursor.id === user.id)) {
        cursors.createCursor(
          user.id,
          `${user.firstName} ${user.lastName}`,
          color
        );
      }

      toast.success(`${user.firstName} ${user.lastName} is on the document.`, {
        position: "top-right",
      });
      socketInstance.emit("connected-users", clients); //Emit User Array
    });

    socketInstance.on("connected-users", handleConnectedUsers);

    socketInstance.on("initialize-document", (document: DocumentItem) => {
      try {
        setDocumentDetails(document);
        const documentContentState = JSON.parse(document.autoSaveContent || "{}");
        const delta = new Delta(documentContentState);

        if (
          typeof documentContentState === "object" &&
          documentContentState !== null
        ) {
          quillRef.current.getEditor().setContents(delta, "silent");
          setDocumentState(delta);
        } else {
          console.error(
            "Document state is neither a string nor a valid object:",
            documentContentState
          );
          quillRef.current.getEditor().setText("Failed to load document.");
        }
      } catch (err) {
        quillRef.current.getEditor().setText("Failed to load document.");
      }
      quillRef.current.getEditor().enable();
    });

    socketInstance.on("text-change", (data) => {
      if (data.userId !== user.id) {
        const delta = new Delta(data.delta);
        quillRef.current.getEditor().updateContents(delta, "silent");

        setDocumentState((prevState) => {
          if (prevState) {
            const newDocumentState = prevState.compose(delta);

            return newDocumentState;
          } else {
            console.error("Previous state is undefined.");
            return new Delta(); // Reset to an empty Delta if undefined
          }
        });
      }
    });

    socketInstance.on("user-left", (user: User) => {
      setClients((prev) => prev.filter((prevUser) => prevUser.id !== user.id));

      const cursors = quillRef.current.getEditor().getModule("cursors");
      cursors.removeCursor(user.id);

      toast.success(
        `${user.firstName} ${user.lastName} has left the document.`,
        {
          position: "top-right",
        }
      );
      socketInstance.emit("connected-users", clients);
    });

    return () => {
      socketInstance.off("user-joined");
      socketInstance.off("connected-users");
      socketInstance.off("initialize-document");
      socketInstance.off("text-change");
      socketInstance.off("user-left");
      socketInstance.disconnect();
      if (quillRef.current)
        //object exists
        quillRef.current.getEditor().off("text-change");
    };
  }, [documentId, accessToken]);

  //Function to handle all connected clients
  const handleConnectedUsers = (users: User[]) => {
    setClients(users);
  };

  // Function to handle leaving the room
  const leaveRoom = () => {
    if (!socket) return;
    socket.emit("leave-room", { documentId, accessToken });
    navigate(-1);
  };

  useEffect(() => {
    if (!socket || !quillRef.current) return;

    const handleTextChange = (
      delta: Delta,
      // oldDelta: Delta,
      source: string
    ) => {
      if (source !== "user") return;

      const range = quillRef.current.getEditor().getSelection();
      if (range) {
        if (range.length == 0) {
          // User is actively typing, update the cursor position
          socket.emit("cursor-move", {
            documentId,
            accessToken,
            cursorPos: range,
          });
        } else {
          // User made a selection
        }
      }

      socket.emit("text-change", { documentId, accessToken, delta: delta });
      saveCurrentDocumentState();
    };

    const handleSelectionChange = (range: any) => {
      if (!socket) return;
      socket.emit("cursor-selection", {
        documentId,
        accessToken,
        cursorPos: range,
      });
    };

    socket.on(
      "remote-cursor-selection",
      ({ userId, cursorPos }: { userId: number; cursorPos: any }) => {
        const color = generateRandomColor();
        const cursors = quillRef.current.getEditor().getModule("cursors");
        const allCursors = cursors.cursors();

        if (!allCursors.some((cursor: { id: any }) => cursor.id === userId)) {
          cursors.createCursor(
            userId,
            `${user.firstName} ${user.lastName}`,
            color
          );
        }

        cursors.moveCursor(userId, cursorPos); // <== cursor data from previous step
        cursors.toggleFlag(userId, true);
      }
    );

    socket.on(
      "remote-cursor-move",
      ({ userId, cursorPos }: { userId: number; cursorPos: any }) => {
        const cursors = quillRef.current.getEditor().getModule("cursors");
        cursors.moveCursor(userId, cursorPos); // <== cursor data from previous step
        cursors.toggleFlag(userId, true);
      }
    );

    quillRef.current.getEditor().on("text-change", handleTextChange);

    quillRef.current.getEditor().on("selection-change", (range: any) => {
      handleSelectionChange(range);
    });

    return () => {
      socket.off("remote-cursor-selection");
      socket.off("remote-cursor-move");

      if (quillRef.current) {
        quillRef.current.getEditor().off("text-change", handleTextChange);
        quillRef.current.getEditor().off("selection-change");
      }
    };
  }, [socket, documentId, accessToken]);

  // Function to save the current document state to the server
  const saveCurrentDocumentState = () => {
    if (!quillRef.current) return;
    if (quillRef.current) {
      const currentContents = quillRef.current.getEditor().getContents(); // Get the current state of the editor
      const serializedContent = JSON.stringify(currentContents); // Serialize the state
      socket?.emit("save-document", { documentId, content: serializedContent });
    }
  };

  function generateRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <div className="max-w-[1000px] m-auto">
      <div className="flex items-center justify-between my-2">
        <h1 className="text-xl">{documentDetails?.name}</h1>

        <div className="flex gap-x-2">
          {clients.map((client, index) => (
            <ClientAvatar
              key={index}
              fullName={`${client.firstName} ${client.lastName}`}
              isCurrentUser={client.id === user.id}
            />
          ))}
        </div>
      </div>
      <button
        className="px-2 py-1 bg-black text-white rounded"
        onClick={leaveRoom}
      >
        Leave
      </button>
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
