// Anything could be sent with the payload, not just Car[]
export interface Response<T> {
  payload: T;
  total: number;
}
