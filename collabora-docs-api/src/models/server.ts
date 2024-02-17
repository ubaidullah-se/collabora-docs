export enum ServerStatusCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  SUCCESS = 200,
  CREATED = 201,
}


export interface ServerResponse {
    status: ServerStatusCode    
}

export interface ResponseData<T> {
    data: T | null,
    status: ServerStatusCode
}