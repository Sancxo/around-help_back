import axios, { AxiosResponse } from "axios";

async function createChatRoom(needId: number): Promise<any> {
  axios
    .post<number, AxiosResponse>(`${process.env.REACT_APP_BACKEND_URL}/chat_rooms`, { need_id: needId })
    .then(resp => { return resp; })
    .catch(err => console.error(err))
}
async function getChatRoomFromNeedId(needId: number) {
  return await axios
    .get<{ need_id: number }, AxiosResponse>(`${process.env.REACT_APP_BACKEND_URL}/chat_room/${needId}`)
    .then(resp => {
      return resp.data.id
    })
    .catch(err => console.error(err))
}

export { createChatRoom, getChatRoomFromNeedId }