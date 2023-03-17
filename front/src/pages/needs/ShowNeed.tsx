import { ReactElement, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FlashMessageContext, UserContext } from "../../shared/context";
import { createChatRoomUser, getChatRoomFromNeedId } from "../../shared/helpers/chat.helper";
import { createNeedUser, defaultNeed, getNeed, updateNeed } from "../../shared/helpers/needs.helper";
import { Error, FlashMessage, Need, Ok, setContext } from "../../shared/interfaces/misc.interfaces";
import User from "../../shared/interfaces/user.interfaces";

export default function ShowNeed(): ReactElement {
  const urlParams = useParams();

  const user: User = useContext(UserContext).user;
  const setFlashMessage: setContext<FlashMessage> = useContext(FlashMessageContext).setFlashMessage;

  const [need, setNeed] = useState<Need>(defaultNeed);
  const [chatRoomId, setChatRoomId] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  // We can't directly check if user is in need.fulfillers list because user has an 'avatar' key set after we fetched it (cf. setAvatarToUser function in user.helper.ts) 
  // and the users in need.fulfillers don't have this key so we make a list of fulfillers id to compare with user.id
  const fullfilersIdList = need.fulfillers.map(fulfiller => fulfiller.id);
  const isUserFulfiller = fullfilersIdList.includes(user.id);

  const navigate = useNavigate();

  useEffect(() => {
    getNeed(urlParams.id!, setNeed, setIsLoaded, setError)
  }, [urlParams.id])

  async function addUserAndActiveConversation() {
    const isUserAddedToNeed: boolean = await createNeedUser(need.id, user.id);

    const chatRoomId: number = await getChatRoomFromNeedId(need.id);
    const isUserAddedToChatRoom: boolean = chatRoomId ? await createChatRoomUser(chatRoomId, user.id) : false;
    setChatRoomId(chatRoomId);

    if (isUserAddedToNeed && isUserAddedToChatRoom) {
      setFlashMessage([Ok, "You answered to this Need, now you can contact the creator."]);
      navigate(`/conversation/${chatRoomId}`);
    } else {
      setFlashMessage([Error, "An error occured ..."]);
    }
  }

  async function getChatRoomId(needId: number) {
    const chatRoomId: number = await getChatRoomFromNeedId(needId);
    setChatRoomId(chatRoomId);
  }

  async function markAsFulfilled() {
    need.is_fulfilled = !need.is_fulfilled;
    const isNeedUpdated = await updateNeed(need.id, need);

    if (isNeedUpdated && !need.is_fulfilled) {
      setFlashMessage([Ok, "You have marked your Need as not fulfilled !"])
    } else if (isNeedUpdated && need.is_fulfilled) {
      setFlashMessage([Ok, "You have marked your Need as fulfilled !"])
    } else {
      setFlashMessage([Error, "Something went wrong while changing the status of your Need ..."])
    }
  }

  isUserFulfiller && getChatRoomId(need.id);

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

      {need.creator_id === user.id ?
        <button type="button" className="btn-prim mt-2" onClick={markAsFulfilled}>{need.is_fulfilled ? "Mark as not fulfilled" : "Mark as fulfilled"}</button> :
        isUserFulfiller ?
          <div><p className="mb-0"><small>You already responded to this Need.</small></p><Link to={`/conversation/${chatRoomId}`}><button type="button" className="btn-prim">Contact the creator of the Need</button></Link></div> :
          <button type="button" className="btn-prim mt-2" onClick={addUserAndActiveConversation}>Answer this Need</button>
      }
    </div>
  )
}