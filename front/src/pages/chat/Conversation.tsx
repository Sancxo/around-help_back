import { ChangeEvent, ReactElement, useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FlashMessageContext, UserContext } from "../../shared/context";
import { getChatMessages, sendChatMessage } from "../../shared/helpers/chat.helper";
import { ChatMessage, Error, Ok } from "../../shared/interfaces/misc.interfaces";
import User from "../../shared/interfaces/user.interfaces";

export default function Conversation(): ReactElement {
  // check if current user belongs to this conversation

  const user: User = useContext(UserContext).user;
  const setFlashMessage = useContext(FlashMessageContext).setFlashMessage;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageToSend, setMessageToSend] = useState("");
  const urlParams = useParams()

  const messagesContainer = document.getElementById("messages");

  useEffect(() => {
    const ws = new WebSocket(`${process.env.REACT_APP_SOCKET_URL}`);

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          command: "subscribe",
          identifier: JSON.stringify({
            id: user.id,
            room_id: urlParams.id,
            channel: "RoomChannel"
          })
        })
      );
      setFlashMessage([Ok, "You're connected to the chat room!"])
      console.info(`Websocket connected for chat_room with id ${urlParams.id}.`);
    }

    ws.onerror = () => {
      setFlashMessage([Error, "The connection with the chat room was lost; please wait or try reloading."]);
      console.error(`Websocket lost connection for chat_room with id ${urlParams.id}.`);
    }

    ws.onmessage = e => {
      const data = JSON.parse(e.data);
      if (data.type === "ping") return;
      if (data.type === "welcome") return;
      if (data.type === "confirm_subscription") return;
      console.debug("Message received !!!!!!!!")
      setMessages(messages => [...messages, data.message]);
    }

    ws.onclose = _ => {
      setFlashMessage([Ok, "You were successfully disconnected from the chat room."]);
      console.info(`Websocket disconnected for chat_room with id ${urlParams.id}.`);
    }

    return () => ws.close(1000)
  }, [user.id, urlParams.id, setFlashMessage])

  const resetScroll = useCallback(() => {
    if (messagesContainer) messagesContainer!.scrollTop = messagesContainer!.scrollHeight;
  }, [messagesContainer]);

  useEffect(() => {
    getChatMessages(urlParams.id!, setMessages);
  }, [urlParams.id]);

  useEffect(() => {
    resetScroll();
  }, [messages, resetScroll])

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    setMessageToSend(e.target.value);
  }

  async function handleSubmit() {
    sendChatMessage(messageToSend, user.id, urlParams.id!);
    setMessageToSend("");
  }

  return (
    <div>
      <div id="messages">
        {messages.map(message => (
          <div key={message.id} className="chat-message">
            <p>{message.body}</p>
          </div>
        ))}
      </div>
      <div className="messageForm">
        <form>
          <input className="messageInput" type="text" name="message" value={messageToSend} onChange={handleInput} />
          <input className="messageButton btn-prim" type="button" value="Send" onClick={handleSubmit} />
        </form>
      </div>
    </div>
  )
}