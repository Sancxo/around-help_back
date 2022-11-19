import { FlashMessage, Nil, setContext } from "../interfaces/misc.interfaces";

function getFlash(setFlashMessage: setContext<FlashMessage>, [code, message]: [symbol, string]) {
  setFlashMessage([code, message])
}

function clearFlash(setFlashMessage: setContext<FlashMessage>) {
  setFlashMessage([Nil, ""]);
}

export { clearFlash, getFlash };