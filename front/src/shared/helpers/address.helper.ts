import axios, { AxiosResponse } from "axios";
import { NavigateFunction } from "react-router-dom";
import { Address, FlashMessage, setContext } from "../interfaces/misc.interfaces";
import User from "../interfaces/user.interfaces";
import { updateUser } from "./user.helper";

async function registerAddress(
  data: Address,
  setUser: setContext<User>,
  setToken: setContext<string>,
  setFlashMessage: setContext<FlashMessage>,
  navigate: NavigateFunction
): Promise<any> {
  return await axios
    .post<Address, AxiosResponse<any, any>>(`${process.env.REACT_APP_BACKEND_URL}/addresses`, data)
    .then((resp): void => {
      if (resp.status === 201) {
        // Refactor ???
        updateUser({ address_id: resp.data.address.id }, setUser, setToken, setFlashMessage, navigate)
          .then(respUpdate => {
            console.log(respUpdate.user.id)
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