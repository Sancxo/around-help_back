const Ok = Symbol('ok');
const Error = Symbol('error');
const Nil = Symbol('nil');

export { Ok, Error, Nil }

export type FlashMessage = [symbol, string];

export type setContext<T> = (arg: T) => void;
