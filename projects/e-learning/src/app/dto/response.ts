export class Response<T> {
  status?: string;
  ok?: boolean;
  data: T;
  message?: string;
}