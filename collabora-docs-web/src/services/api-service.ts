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
  ): Promise<{ status: number; data: T; ok: boolean }> {
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
      const tokens = JSON.parse(localStorage.getItem("tokens") ?? "null");
      headers = {
        ...headers,
        Authorization: `Bearer ${tokens?.accessToken}`,
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

    const data = await response.json();
    return { ok, status, data };
  }

  async login(data: LoginRequest) {
    const response = await this.fetch("/v1/auth/login", {
      method: "POST",
      body: data,
    });
    return response;
  }

  async registerUser(data: RegisterUserRequest) {
    const response = await this.fetch("/v1/auth/register", {
      method: "POST",
      body: data,
    });
    return response;
  }

  async getUserDetails() {
    const response = await this.fetch("/v1/user", {
      auth: true,
    });
    return response;
  }
}

const apiService = new ApiService();
export default apiService;
