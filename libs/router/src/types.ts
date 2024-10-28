export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface Router {
  [key: string]: {
    basePath: string;
    routes: {
      [key: string]: {
        path: string;
        method: HttpMethod;
      };
    };
  };
}
