import axios, { AxiosResponse } from "axios";
import { NavigateFunction } from "react-router-dom";
import { Address, FlashMessage, setContext } from "../interfaces/misc.interfaces";
import User from "../interfaces/user.interfaces";
import { updateUser } from "./user.helper";

async function registerAddress(
  data: Address,
  user: User,
  setUser: setContext<User>,
  setToken: setContext<string>,
  setFlashMessage: setContext<FlashMessage>,
  navigate: NavigateFunction
): Promise<any> {
  return await axios
    .post<Address, AxiosResponse<any, any>>(`${process.env.REACT_APP_BACKEND_URL}/addresses`, data)
    .then((resp): void => {
      if (resp.status === 201) {
        console.log(resp.data);
        user.address_id = resp.data.address.id;

        // adds user_id to permt and remove_created_at and inserted_at
        console.log(user);
        updateUser({ user: user }, setUser, setToken, setFlashMessage, navigate);
      } else {
        console.error(resp);
      }
    })
    .catch((err): void => {
      // getFlash(setFlashMe)
    })
}

export { registerAddress }