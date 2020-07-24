import React, { useState, useEffect, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import './AutoCompleteInput.css';

let autoComplete;

const loadScript = (url, callback) => {
    let script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState) {
        script.onreadystatechange = function() {
            if (script.readyState === "loaded" || script.readyState === "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {
        script.onload = () => callback();
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
};

function handleScriptLoad(updateQuery, autoCompleteRef, onChange) {
    autoComplete = new window.google.maps.places.Autocomplete(
        autoCompleteRef.current,
        { types: [], componentRestrictions: { country: "us" } }
    );
    autoComplete.setFields(["address_components", "photos", "formatted_address","geometry", "name", "opening_hours", "formatted_phone_number","place_id"]);
    autoComplete.addListener("place_changed", () =>
        handlePlaceSelect(updateQuery, onChange)
    );
}

async function handlePlaceSelect(updateQuery, onChange) {
    const placeObject = autoComplete.getPlace();
    const name = placeObject.name;
    console.log(autoComplete);
    // updateQuery(query);
    updateQuery(name);
    console.log(placeObject);
    onChange(placeObject);
}

const AutoCompleteInput = (props) => {
    const [query, setQuery] = useState("");
    const autoCompleteRef = useRef(null);
    //todo: move key to env
    const GOOGLE_API_KEY = "AIzaSyCOvmLGpbzVEgMywSh3g4g6mbaynTbdIiU";

    useEffect(() => {
        loadScript(
            `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`,
            () => handleScriptLoad(setQuery, autoCompleteRef, props.onChange)
        );
    }, []);

    return (
        <div className="search-location-input">
            {/*<TextField*/}
            <input
                ref={autoCompleteRef}
                onChange={event => setQuery(event.target.value)}
                value={query}
                variant="outlined"
                label="Search Provider"
            />
        </div>
    );
}

export default AutoCompleteInput;