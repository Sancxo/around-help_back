import axios, { AxiosResponse } from "axios";

async function createChatRoom(needId: number): Promise<any> {
  axios
    .post<number, AxiosResponse>(`${process.env.REACT_APP_BACKEND_URL}/chat_rooms`, { need_id: needId }, { withCredentials: true })
    .then(resp => { return resp; })
    .catch(err => console.error(err))
}

async function createChatRoomUser(chatRoomId: number, userId: number) {
  return await axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/chat_room_users`, { chat_room_id: chatRoomId, user_id: userId }, { withCredentials: true })
    .then(_ => { return true })
    .catch(err => {
      console.error(err);
      return false
    })
}

async function getChatRoomFromNeedId(needId: number): Promise<number> {
  return await axios
    .get<{ need_id: number }, AxiosResponse>(`${process.env.REACT_APP_BACKEND_URL}/chat_room/${needId}`, { withCredentials: true })
    .then(resp => {
      return resp.data.id
    })
    .catch(err => console.error(err))
}

export { createChatRoom, createChatRoomUser, getChatRoomFromNeedId }