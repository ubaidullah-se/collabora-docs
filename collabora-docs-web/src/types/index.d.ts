type RegisterUserRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type LoginRequest = {
  email: string;
  password: string;
};

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

type Route = {
  path: string;
  element:
    | React.LazyExoticComponent<() => React.ReactElement>
    | (() => React.ReactElement);
};

type Project = {
  id: number;
  name: string;
  userId: number; //Owner User Id
  createdAt: string;
  updatedAt: string;
};

type DocumentItem = {
  id: number;
  name: string;
  projectId: number;
  project?: Project;
  createdAt: string;
  updatedAt: string;
};

type CreateProjectRequest = {
  name: string;
};

type CreateDocumentRequest = {
  name: string;
  autoSaveContent: string;
  projectId: number;
};
