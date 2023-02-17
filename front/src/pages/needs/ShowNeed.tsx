import { ReactElement, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { TokenContext } from "../../shared/context";
import { defaultNeed, getNeed } from "../../shared/helpers/needs.helper";
import { Need } from "../../shared/interfaces/misc.interfaces";

export default function ShowNeed(): ReactElement {
  const urlParams = useParams();

  const token: string = useContext(TokenContext).token;

  const [need, setNeed] = useState<Need>(defaultNeed);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    token && getNeed(urlParams.id!, token, setNeed, setIsLoaded, setError)
  }, [urlParams.id, token])

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

      {/* Adds a bouton to respond to the need ! */}
    </div>
  )
}