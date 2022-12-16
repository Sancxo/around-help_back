import axios, { AxiosResponse } from "axios";
import { NavigateFunction } from "react-router-dom";
import { Address, FlashMessage, setContext } from "../interfaces/misc.interfaces";
import User from "../interfaces/user.interfaces";
import { updateUser } from "./user.helper";

async function registerAddress(
  data: Address,
  setUser: setContext<User>,
  setFlashMessage: setContext<FlashMessage>,
  navigate: NavigateFunction
): Promise<any> {
  return await axios
    .post<Address, AxiosResponse<any, any>>(`${process.env.REACT_APP_BACKEND_URL}/addresses`, data)
    .then((resp): void => {
      if (resp.status === 201) {
        updateUser({ address_id: resp.data.address.id }, setUser, setFlashMessage)
          .then(respUpdate => {
            navigate(`/user/${respUpdate.user.id}`)
          })
          .catch(err => {
            setFlashMessage(err.message);
            console.error(err)
          });
      } else {
        console.error(resp);
      }
    })
    .catch((err): void => {
      console.error(err);
    })
}

export { registerAddress }