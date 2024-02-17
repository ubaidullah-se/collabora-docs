type APIRequestOptions = {
  method?: string;
  headers?: Record<string, any>;
  body?: any;
  auth?: boolean;
};
class ApiService {
  baseUrl: string = import.meta.env.VITE_API_BASE_URL;

  private async fetch<T = any>(
    endpoint: string,
    { method = "GET", headers, body, auth }: APIRequestOptions = {}
  ): Promise<{ status: number; data: T; ok: boolean, message: any }> {
    const options: RequestInit = {
      method,
    };

    if (["POST", "PUT", "PATCH"].includes(method)) {
      headers = {
        ...headers,
        Accept: "application/json",
        "Content-Type": "application/json",
      };
    }

    if (auth) {
      const accessToken = localStorage.getItem("access-token");
      headers = {
        ...headers,
        Authorization: accessToken,
      };
    }

    if (headers) {
      options.headers = headers;
    }

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(this.baseUrl + endpoint, options);
    const { status, ok } = response;

    const { data, message } = await response.json();
    return { ok, status, data, message };
  }

  async login(data: LoginRequest) {
    const response = await this.fetch("/v1/user/login", {
      method: "POST",
      body: data,
    });
    return response;
  }

  async registerUser(data: RegisterUserRequest) {
    const response = await this.fetch("/v1/user/register", {
      method: "POST",
      body: data,
    });
    return response;
  }

  async getUserDetails() {
    const response = await this.fetch("/v1/user/me", {
      auth: true,
    });

    return response;
  }

  async getAllProjects() {
    const response = await this.fetch("/v1/project", {
      auth: true,
    });
    return response;
  }

  async getProject(id: number) {
    const response = await this.fetch(`/v1/project/${id}`, {
      auth: true,
    });
    return response;
  }

  async createProject(data: CreateProjectRequest) {
    const response = await this.fetch("/v1/project", {
      method: "POST",
      body: data,
      auth: true,
    });
    return response;
  }

  async getAllDocuments() {
    const response = await this.fetch("/v1/document", {
      auth: true,
    });
    return response;
  }

  async getDocument(id: number) {
    const response = await this.fetch(`/v1/document/${id}`, {
      auth: true,
    });
    return response;
  }

  async createDocument(data: CreateDocumentRequest) {
    const response = await this.fetch("/v1/document", {
      method: "POST",
      body: data,
      auth: true,
    });
    return response;
  }
}

const apiService = new ApiService();
export default apiService;
