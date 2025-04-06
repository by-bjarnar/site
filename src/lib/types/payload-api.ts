export interface PayloadPostApi<T> {
  doc: T;
  errors?: { message: string }[];
  message: string;
}
