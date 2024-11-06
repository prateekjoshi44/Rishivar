import {
  Autocomplete,
  GoogleMap,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import Api from "../../constants/Api";
import { useEffect, useState } from "react";

function Map({ coordinates, setCoordinates, setAddress }) {
  let autoComplete = null;

  const [position, setPosition] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (coordinates.length > 0) {
      setPosition({
        lat: parseFloat(coordinates.split(",")[0]),
        lng: parseFloat(coordinates.split(",")[1]),
      });
    }
  }, [coordinates]);

  const onDragEnd = (event) =>
    setCoordinates(event.latLng.lat() + "," + event.latLng.lng());

  const onLoad = (autocomplete) => {
    autoComplete = autocomplete;
  };

  const onPlaceChanged = () => {
    if (autoComplete !== null) {
      const place = autoComplete.getPlace();
      setAddress(place.formatted_address);
      setCoordinates(
        place.geometry.location.lat() + "," + place.geometry.location.lng()
      );
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={Api.GOOGLE_MAPS_API_KEY}
      libraries={["places"]}
    >
      <>
        <Autocomplete
          onLoad={onLoad}
          onPlaceChanged={onPlaceChanged}
          className={position ? "d-none" : ""}
          // fields={["geometry"]}
        >
          <div>
            <input
              className="form-control rounded-pill"
              id="Search_your_place"
              placeholder="Search your place"
              required
            />
            <div className="invalid-feedback">
              Please search your place and mark on map.
            </div>
          </div>
        </Autocomplete>

        {position && (
          <>
            <div className="card p-3" style={{ height: 300 }}>
              <GoogleMap
                mapContainerClassName="h-100 w-100"
                center={position}
                zoom={15}
                options={{
                  mapTypeControl: false,
                }}
                onLoad={() => setLoaded(true)}
              >
                {loaded && (
                  <Marker
                    position={position}
                    draggable={true}
                    onDragEnd={onDragEnd}
                  />
                )}
              </GoogleMap>
            </div>
            <p className="text-center">
              * Place the marker at accurate position
            </p>
          </>
        )}
      </>
    </LoadScript>
  );
}

export default Map;
// export default memo(Map)
