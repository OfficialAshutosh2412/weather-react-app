import React, { useState, useEffect } from "react";

function LocationDisplay() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocationData = async () => {
      try {
        const position = await navigator.geolocation.getCurrentPosition();
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      } catch (error) {
        setError(error.message);
      }
    };

    getLocationData();
  }, []);

  return (
    <div>
      {location ? (
        <p>
          Your location: Latitude: {location.latitude}, Longitude:{" "}
          {location.longitude}
        </p>
      ) : error ? (
        <p>Error getting location: {error}</p>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
}

export default LocationDisplay;
