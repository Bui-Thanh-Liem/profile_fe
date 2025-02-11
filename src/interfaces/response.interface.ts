export interface IResponse<T> {
  statusCode: number;
  message: string;
  responseStatusCode?: string;
  data: T;
}

export interface IResponseError {
  path: string;
  error: string;
  message: string;
  statusCode: number;
  timestamp: string;
  track?: string;
}

export interface IGetMulti<T> {
  total: number;
  data: Array<T>;
}
