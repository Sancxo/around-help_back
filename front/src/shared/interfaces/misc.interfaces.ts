const Ok = Symbol('ok');
const Error = Symbol('error');
const Nil = Symbol('nil');

export { Ok, Error, Nil }

export type FlashMessage = [symbol, string];

export type setContext<T> = (arg: T) => void;

export interface Address {
  id: number,
  number: string,
  street: string,
  city: string,
  state: string,
  postal_code: string,
  country: string,
  long_lat: number[]
}