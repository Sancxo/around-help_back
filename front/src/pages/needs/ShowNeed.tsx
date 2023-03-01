import { ReactElement, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FlashMessageContext, TokenContext, UserContext } from "../../shared/context";
import { createChatRoomUser, getChatRoomFromNeedId } from "../../shared/helpers/chat.helper";
import { createNeedUser, defaultNeed, getNeed } from "../../shared/helpers/needs.helper";
import { Error, FlashMessage, Need, Ok, setContext } from "../../shared/interfaces/misc.interfaces";
import User from "../../shared/interfaces/user.interfaces";

export default function ShowNeed(): ReactElement {
  const urlParams = useParams();

  const token: string = useContext(TokenContext).token;
  const user: User = useContext(UserContext).user;
  const setFlashMessage: setContext<FlashMessage> = useContext(FlashMessageContext).setFlashMessage;

  const [need, setNeed] = useState<Need>(defaultNeed);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    token && getNeed(urlParams.id!, token, setNeed, setIsLoaded, setError)
  }, [urlParams.id, token])

  async function addUserAndActiveConversation() {
    const isUserAddedToNeed: boolean = await createNeedUser(need.id, user.id);

    const chatRoomId: number = await getChatRoomFromNeedId(need.id);
    const isUserAddedToChatRoom: boolean = chatRoomId ? await createChatRoomUser(chatRoomId, user.id) : false;

    if (isUserAddedToNeed && isUserAddedToChatRoom) {
      setFlashMessage([Ok, "You answered to this Need, now you can contact the creator."]);
      navigate(`/conversation/${chatRoomId}`);
    } else {
      setFlashMessage([Error, "An error occured ..."]);
    }
  }

  function markAsFulfilled() {

  }

  // We can't directly check if user is in need.fulfillers list because user has an 'avatar' key set after we fetched it (cf. setAvatarToUser function in user.helper.ts) 
  // and the users in need.fulfillers don't have this key so we make a list of fulfillers id to compare with user.id
  const fullfilersIdList = need.fulfillers.map(fulfiller => fulfiller.id);

  if (!isLoaded) return <div><p>Please, wait ...</p></div>

  if (error || need === defaultNeed) {
    return (
      <div>
        <p>Oops ... This need doesn't seem to exists !</p>
      </div>
    )
  }

  return (
    <div>
      <h2>{need.title}</h2>
      <p>{need.description}</p>
      <p>Is one time ? {need.is_one_time ? "Yes" : "No"}</p>
      <p>Created by: <Link to={`/user/${need.creator_id}`}>{need.creator.first_name} {need.creator.last_name}</Link></p>
      <p>Located at: {need.address.address}</p>
      <p>Created : {need.created_at.toString()}. Updated: {need.updated_at.toString()}</p>

      {need.creator_id !== user.id ?
        !fullfilersIdList.includes(user.id) && <button type="button" className="btn-prim mt-2" onClick={addUserAndActiveConversation}>Answer this Need</button> :
        <button type="button" className="btn-prim mt-2" onClick={markAsFulfilled}>Mark as fulfilled</button>
      }
    </div>
  )
}