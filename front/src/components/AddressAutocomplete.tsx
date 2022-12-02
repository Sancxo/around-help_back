import { ChangeEvent, ReactElement } from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";

export default function AddressAutocomplete(): ReactElement {
  const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({ callbackName: "initMap" });

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
  }

  const handleSelect = ({ description }: any, place_id: any) => () => {
    setValue(description, false);
    clearSuggestions();

    getGeocode({ address: description }).then(results => {
      console.log(results[0])
      const { lat, lng } = getLatLng(results[0]);
      console.info("📍 Coordinates: ", { lat, lng });
    })

  }

  const renderSuggestions = () => data.map(suggestion => {
    const { place_id, structured_formatting: { main_text, secondary_text } } = suggestion;
    return (
      <li key={place_id} onClick={handleSelect(suggestion, place_id)}>
        <strong>{main_text}</strong> <small>{secondary_text}</small>
      </li>
    )
  })

  return (
    <div>
      <label htmlFor="address-search-input">Address search engine:</label>
      <input type="text" id="address-search-input" value={value} onChange={handleInput} disabled={!ready} placeholder="Where are you living?" />
      {status === "OK" && <ul id="address-search-input-results" className="unstyled-list">{renderSuggestions()}</ul>}
    </div>
  )
}