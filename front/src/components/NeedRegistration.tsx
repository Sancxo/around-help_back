import { ChangeEvent, Dispatch, ReactElement, SetStateAction, useContext, useState } from "react";
import { FlashMessageContext, UserContext } from "../shared/context";
import { clearFlash, getFlash } from "../shared/helpers/flash.helper";
import { createNeed } from "../shared/helpers/needs.helper";
import { Error, FlashMessage, Need, NeedFormValues, Ok, setContext } from "../shared/interfaces/misc.interfaces";
import User from "../shared/interfaces/user.interfaces";

export default function NeedRegistration({ setIsNeedCreated, setnewlyCreatedNeed }: {
  setIsNeedCreated: Dispatch<SetStateAction<boolean>>,
  setnewlyCreatedNeed: Dispatch<SetStateAction<Need>>
}): ReactElement {
  const user: User = useContext(UserContext).user;
  const [need, setNeed]: [NeedFormValues, Dispatch<SetStateAction<NeedFormValues>>] = useState({
    creator_id: user.id,
    title: "",
    description: "",
    is_one_time: true
  });

  const setFlashMessage: setContext<FlashMessage> = useContext(FlashMessageContext).setFlashMessage;

  async function handleSubmit() {
    clearFlash(setFlashMessage);

    const resp = await createNeed(need);
    if (resp.status === 201) {
      getFlash(setFlashMessage, [Ok, resp.data.message]);
      setnewlyCreatedNeed(resp.data.need)
      setIsNeedCreated(true);
    } else {
      console.error(resp)
      getFlash(setFlashMessage, [Error, resp.data.message]);
    }
  }

  function handleInputs(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const name = e.target.name;
    const value = e.target.value;

    setNeed(needFormValues => ({ ...needFormValues, [name]: value }));
  }

  return (
    <form name="need-registration-form" id="need-registration" className="container">
      <h2 className="bold">Create your Need</h2>

      <label htmlFor="need-title-input">Title <small>(mandatory)</small>:</label>
      <input type="text" name="title" id="need-title-input" onChange={handleInputs} required />
      <br />

      <label htmlFor="description-input">Description <small>(mandatory)</small>:</label>
      <textarea name="description" id="description-input" cols={30} rows={10} onChange={handleInputs} required ></textarea>
      <br />

      <input type="checkbox" name="is_one_time" id="need-frequency-input" onChange={handleInputs} checked required />
      <label htmlFor="need-frequency-input">Is it a single time need? <small>(mandatory)</small>:</label>
      <br />

      <input type="button" className="btn-prim" value="Submit" onClick={handleSubmit} />
    </form>
  )
}