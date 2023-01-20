import { GoogleMap } from "@react-google-maps/api";
import { ReactElement, useCallback, useContext, useState } from "react";
import { AddressContext } from "../shared/context";

export default function NeedsMap({ isLoaded }: { isLoaded: boolean }): ReactElement {
  const latLng = useContext(AddressContext).address.lat_lng;

  const [map, setMap] = useState<google.maps.Map>()

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(latLng);
    map.fitBounds(bounds);
    map.setZoom(16);

    setMap(map);
  }, [latLng])

  const onUnmount = useCallback(() => {
    setMap(undefined);
  }, [])

  const containerStyle = {
    width: '750px',
    height: '500px'
  };

  return isLoaded ? (
    <GoogleMap
      center={latLng}
      zoom={16}
      mapContainerStyle={containerStyle}
      onLoad={onLoad}
      onUnmount={onUnmount}>
      {/* Markers */}
      <></>
    </GoogleMap>
  ) : <></>
}