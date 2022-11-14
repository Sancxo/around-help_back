import { ReactElement, useContext } from "react";
import { FlashMessageContext } from "../shared/context";
import { Error, FlashMessage, Nil, Ok } from "../shared/interfaces/misc.interfaces";

export default function Flash(): ReactElement {
  const { flashMessage, setFlashMessage } = useContext(FlashMessageContext);
  const [code, message]: FlashMessage = flashMessage;

  function closeFlash() {
    setFlashMessage([Nil, ""]);
  }

  if (code === Ok) {
    return (
      <div className="success flex justify-end">
        <p>{message}</p>
        <button type="button" className="menu-icon" onClick={closeFlash}>
          {/* Cross icon */}
          <sup><svg className="w-1h h-1h" fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg></sup>
        </button>
      </div>
    )
  } else if (code === Error) {
    return (
      <div className="error flex justify-end">
        <p>{message}</p>
        <button type="button" className="menu-icon" onClick={closeFlash}>
          {/* Cross icon */}
          <sup><svg className="w-1h h-1h" fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg></sup>
        </button>
      </div>
    )
  } else {
    return <></>
  }
}