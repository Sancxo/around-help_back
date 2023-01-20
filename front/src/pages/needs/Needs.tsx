import axios from "axios";
import { ReactElement, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NeedMarker from "../../components/NeedMarker";
import NeedsMap from "../../components/NeedsMap";
import { UserContext } from "../../shared/context";

export default function Needs({ isLoaded }: { isLoaded: boolean }): ReactElement {
  const user = useContext(UserContext).user;

  const [needs, setNeeds] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/needs`)
      .then(resp => {
        setNeeds(resp.data)
      })
  }, [user]);

  return (
    <div>
      <h2 className="bold">Needs</h2>
      <div className="flex justify-center">
        <NeedsMap isLoaded={isLoaded} />
      </div>

      <Link to={'/new-need'}><button type="button" className="btn-prim mt-2">Share your own Need</button></Link>
      {needs.map(need => {
        return (
          <div>
            <p>{need}</p>
          </div>
        )
      })}
    </div>
  )
}