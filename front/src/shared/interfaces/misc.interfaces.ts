const Ok = Symbol('ok');
const Error = Symbol('error');
const Nil = Symbol('nil');

export { Ok, Error, Nil }

export type FlashMessage = [symbol, string];

export type setContext<T> = (arg: T) => void;

export interface AddressValues {
  address: string,
  lat_lng: { lat: number, lng: number }
}
export interface Address extends AddressValues {
  id: number
}
