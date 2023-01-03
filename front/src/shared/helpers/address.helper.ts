import axios, { AxiosResponse } from "axios";
import { NavigateFunction } from "react-router-dom";
import { Address, AddressValues, FlashMessage, setContext } from "../interfaces/misc.interfaces";
import User from "../interfaces/user.interfaces";
import { updateUser } from "./user.helper";

async function registerAddress(
  data: AddressValues,
  setUser: setContext<User>,
  setAddress: setContext<Address>,
  setFlashMessage: setContext<FlashMessage>,
  navigate: NavigateFunction
): Promise<any> {
  return await axios
    .post<AddressValues, AxiosResponse<any, any>>(`${process.env.REACT_APP_BACKEND_URL}/addresses`, data)
    .then((resp): void => {
      if (resp.status === 201) {
        setAddress(resp.data.address);

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