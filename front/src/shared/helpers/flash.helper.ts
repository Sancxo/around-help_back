import { FlashMessage, Nil, setContext } from "../interfaces/misc.interfaces";

function getFlash(setFlashMessage: setContext<FlashMessage>, [code, message]: [symbol, string]) {
  console.log(message);
  setFlashMessage([code, message]);

  setTimeout(() => {
    clearFlash(setFlashMessage);
  }, 3000);
}

function clearFlash(setFlashMessage: setContext<FlashMessage>) {
  setFlashMessage([Nil, ""]);
}

export { clearFlash, getFlash };