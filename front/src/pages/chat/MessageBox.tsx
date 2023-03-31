import { ReactElement, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../shared/context";
import { getConversations } from "../../shared/helpers/chat.helper";
import { Conversation } from "../../shared/interfaces/misc.interfaces";

export default function MessageBox(): ReactElement {
  const user = useContext(UserContext).user;

  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    user.id !== 0 && getConversations(user.id, setConversations);
  }, [user, setConversations])

  console.debug("Conversations ::::: ", conversations)

  function readDate(stringifiedDate: any) {
    const date = new Date(stringifiedDate);
    return `${date.getFullYear()} ${date.getMonth()} ${date.getDate()}`
  }

  return (
    <div>
      <ul className="unstyled">
        {conversations.map((conversation: Conversation) => (
          <li key={conversation.id} className="grid message-list">
            <h3><Link to={`../conversation/${conversation.id}`}>{conversation.need.title}</Link></h3>
            <p><small>Conversation joined on: {readDate(conversation.created_at)}</small></p>
          </li>
        ))}
      </ul>
    </div>
  )
}