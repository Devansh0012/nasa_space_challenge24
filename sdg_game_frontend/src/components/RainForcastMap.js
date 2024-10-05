import React, { useEffect } from 'react';
// import '../assets/RainForcast Map/css/main.css';

const RainForcastMap = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/js/map-1.js'; // Path to the map JavaScript file
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="rain-forcast-container">
      <h1 className="text-center text-2xl">Rain Forecast Map</h1>
      <div id="map" className="rain-forcast-map"></div>
    </div>
  );
};

export default RainForcastMap;
