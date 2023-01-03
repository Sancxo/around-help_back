import React, { ChangeEvent, ReactElement, useState } from "react";
import { NavigateFunction } from "react-router-dom";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { registerAddress } from "../shared/helpers/address.helper";
import { clearFlash } from "../shared/helpers/flash.helper";
import { Address, AddressValues, FlashMessage, setContext } from "../shared/interfaces/misc.interfaces";
import User from "../shared/interfaces/user.interfaces";

export default function AddressRegistration({ setFlashMessage, setUser, setAddress, navigate }: {
  setFlashMessage: setContext<FlashMessage>,
  setUser: setContext<User>,
  setAddress: setContext<Address>,
  navigate: NavigateFunction
}): ReactElement {
  const [addressValues, setAddressValues] = useState<AddressValues>({
    address: "",
    lat_lng: { lat: 0, lng: 0 }
  });

  const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({ callbackName: "initMap" });

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
  }

  const handleSelect = ({ description }: any) => () => {
    setValue(description, false);
    clearSuggestions();

    getGeocode({ address: description }).then(results => {
      const latLng = getLatLng(results[0]);

      setAddressValues({ address: results[0].formatted_address, lat_lng: latLng });
    })
  }

  const renderSuggestions = () => data.map(suggestion => {
    const { place_id, structured_formatting: { main_text, secondary_text } } = suggestion;
    return (
      <li key={place_id} onClick={handleSelect(suggestion)}>
        <strong>{main_text}</strong> <small>{secondary_text}</small>
      </li>
    )
  })

  async function handleSubmit() {
    clearFlash(setFlashMessage);

    await registerAddress(addressValues, setUser, setAddress, setFlashMessage, navigate);
  }

  return (
    <form name="address-registration-form" id="address-registration" className="container">
      <fieldset>
        <legend>Your address:</legend>

        <label htmlFor="address-search-input">Address search engine <small>(mandatory)</small>:</label>
        <input type="text" id="address-search-input" value={value} onChange={handleInput} disabled={!ready} placeholder="Where are you living?" required />
        {status === "OK" && <ul id="address-search-input-results" className="unstyled-list">{renderSuggestions()}</ul>}
      </fieldset>

      <input type="button" className="btn-prim" value="Submit" onClick={handleSubmit} />
    </form>
  )
}