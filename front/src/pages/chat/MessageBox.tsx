import { ReactElement, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../shared/context";
import { getConversations } from "../../shared/helpers/chat.helper";
import { Conversation } from "../../shared/interfaces/misc.interfaces";

export default function MessageBox(): ReactElement {
  const user = useContext(UserContext).user;

  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    user.id !== 0 && getConversations(user.id, setConversations)
  }, [user, setConversations])

  return (
    <div>
      <ul>
        {conversations.map((conversation: Conversation) => (
          <li key={conversation.id}><h3><Link to={`../conversation/${conversation.id}`}>{conversation.need.title}</Link></h3></li>
        ))}
      </ul>
    </div>
  )
}