import { FlashMessage, Nil, setContext } from "../interfaces/misc.interfaces";

function getFlash(setFlashMessage: setContext<FlashMessage>, [code, message]: [symbol, string]) {
  setFlashMessage([code, message]);

  setTimeout(() => {
    clearFlash(setFlashMessage);
  }, 1500);
}

function clearFlash(setFlashMessage: setContext<FlashMessage>) {
  setFlashMessage([Nil, ""]);
}

function readDate(date: Date | string) {
  date = typeof date === "string" ? new Date(date) : date;
  return `${date.getFullYear()} ${date.getMonth()} ${date.getDate()}`
}

function readDateTime(datetime: Date | string) {
  datetime = typeof datetime === "string" ? new Date(datetime) : datetime;
  return `${datetime.getFullYear()} ${datetime.getMonth()} ${datetime.getDate()}, at: ${datetime.getHours()}:${datetime.getMinutes()}:${datetime.getSeconds()}`
}

export { clearFlash, getFlash, readDate, readDateTime }