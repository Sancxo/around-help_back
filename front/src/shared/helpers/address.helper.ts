import axios, { AxiosResponse } from "axios";
import { NavigateFunction } from "react-router-dom";
import { Address, AddressValues, FlashMessage, setContext } from "../interfaces/misc.interfaces";
import User from "../interfaces/user.interfaces";
import { updateUser } from "./user.helper";

export const defaultAddress: Address = {
  id: 0,
  address: "",
  lat_lng: { lat: 0, lng: 0 }
}

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

async function getAddress(address_id: number, setAddress: setContext<Address>): Promise<any> {
  return await axios
    .get<AddressValues, AxiosResponse<any, any>>(`${process.env.REACT_APP_BACKEND_URL}/addresses/${address_id}`)
    .then((resp): void => {
      if (resp.status === 200) {
        setAddress(resp.data);
      } else {
        console.error(resp);
      }
    })
    .catch((err): void => {
      console.error(err);
    })
}

export { registerAddress, getAddress }