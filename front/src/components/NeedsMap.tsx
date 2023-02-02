import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import { ReactElement, useCallback, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AddressContext } from "../shared/context";
import { Need } from "../shared/interfaces/misc.interfaces";

export default function NeedsMap({ isLoaded, needs }: { isLoaded: boolean, needs: Need[] }): ReactElement {
  const latLng = useContext(AddressContext).address.lat_lng;

  const [infoWindow, setInfoWindow] = useState<boolean>(false)

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(latLng);
    map.fitBounds(bounds);
    map.setZoom(16);
  }, [latLng])

  const containerStyle = {
    width: '750px',
    height: '500px'
  };

  return isLoaded ? (
    <GoogleMap
      center={latLng}
      mapContainerStyle={containerStyle}
      onLoad={onLoad} >
      {/* Markers */}
      {needs.map((need): any => {
        return (
          <Marker
            key={`marker-${need.id}`}
            title={need.title}
            position={need.address.lat_lng}
            clickable={true} onClick={(_) => setInfoWindow(true)} >
            {infoWindow ?
              <InfoWindow position={need.address.lat_lng} onCloseClick={() => setInfoWindow(false)} >
                <div>
                  <h3>{need.title}</h3>
                  <p>{need.description}</p>
                  <p>Is one time ? {need.is_one_time ? "Yes" : "No"}</p>
                  <p>Located at: {need.address.address}</p>
                  <Link to={`/needs/${need.id}`}><button type="button" className="btn-prim mt-2">See this need</button></Link>
                </div>
              </InfoWindow>
              : null}
          </Marker>
        )
      })}
    </GoogleMap >
  ) : <></>
}