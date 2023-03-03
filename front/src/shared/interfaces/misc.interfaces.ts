import User from "./user.interfaces";

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

export interface NeedFormValues {
  [index: string]: string | number | boolean | undefined | Address | User | Array<User> | Date,
  creator_id: number,
  title: string,
  description: string,
  is_one_time: true,
  address_id?: number
}
export interface Need extends NeedFormValues {
  id: number,
  is_fulfilled: boolean,
  address: { id: number, address: string, lat_lng: { lat: number, lng: number } },
  creator: User,
  fulfillers: User[],
  created_at: Date,
  updated_at: Date
}