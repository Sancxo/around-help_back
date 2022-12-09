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
        // Warning app is logging user out after the address update

        // Started GET "/user" for 127.0.0.1 at 2022-12-09 17:38:34 +0100
        // Processing by Users::SessionsController#new as HTML
        // Started GET "/users/sign_in" for 127.0.0.1 at 2022-12-09 17:38:34 +0100
        // Completed 401 Unauthorized in 1ms (Views: 0.1ms | ActiveRecord: 0.0ms | Allocations: 359)

        const user_update = { address_id: resp.data.address.id };

        updateUser(user_update, setUser, setToken, setFlashMessage, navigate);
      } else {
        console.error(resp);
      }
    })
    .catch((err): void => {
      console.error(err);
    })
}

export { registerAddress }