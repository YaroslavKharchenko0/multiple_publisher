export interface HttpResponse<T> {
  data: T;
  path: string;
  timestamp: string;
}
