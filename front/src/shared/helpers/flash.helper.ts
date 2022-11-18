import { Nil, SetFlashMessage } from "../interfaces/misc.interfaces";

function getFlash(setFlashMessage: SetFlashMessage, [code, message]: [symbol, string]) {
  setFlashMessage([code, message])
}

function clearFlash(setFlashMessage: SetFlashMessage) {
  setFlashMessage([Nil, ""]);
}

export { clearFlash, getFlash };