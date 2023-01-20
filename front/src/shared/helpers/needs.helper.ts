import axios, { AxiosResponse } from "axios";
import { Need, NeedFormValues } from "../interfaces/misc.interfaces";

export const defaultNeed: Need = {
  id: 0,
  title: "",
  description: "",
  is_one_time: true,
  is_fulfilled: false
}

async function createNeed(need: NeedFormValues): Promise<any> {
  return await axios
    .post<NeedFormValues, AxiosResponse<any, any>>(`${process.env.REACT_APP_BACKEND_URL}/needs/`, { need })
    .then((resp): {} => { return resp; })
    .catch(err => console.error(err));
}

async function updateNeed(
  need_id: number,
  need: {},
) {
  return await axios
    .patch<NeedFormValues, AxiosResponse<any, any>>(`${process.env.REACT_APP_BACKEND_URL}/needs/${need_id}`, need)
    .then((resp): any => { return resp; })
    .catch(err => console.error(err))
}

export { createNeed, updateNeed };