import axios from "axios";
import { ReactElement, useEffect, useState } from "react";

export default function Needs(): ReactElement {
  const [needs, setNeeds] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/needs`)
      .then(resp => {
        setNeeds(resp.data)
      })
  }, []);

  return (
    <div>
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