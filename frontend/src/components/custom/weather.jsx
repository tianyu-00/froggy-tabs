import React, { useEffect, useState } from "react";
import { getWeatherIcon } from "@/components/custom/weather-code-icon";

function Weather() {
  const [locationStats, setLocationStats] = useState({});
  const [weather, setWeather] = useState(null);

  const loadWeather = async (latitude, longitude) => {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current=temperature_2m,apparent_temperature,weather_code`;
      const res = await fetch(url);
      const data = await res.json();
      setWeather(data);
      console.log(data);
      return data;
    } catch (error) {
      console.error(error.message);
      return null;
    }
  };

  // Geolocation - ill use this first (never mind ill use this second)
  // Nominatim - transfer positions(lat,lon) to actual city names
  const geolocationAttempt = () =>
    new Promise((resolve, reject) =>
      navigator.geolocation
        ? navigator.geolocation.getCurrentPosition(
            (pos) => resolve({ latitude: pos.coords.latitude, longitude: pos.coords.longitude, city: "" }),
            reject
          )
        : reject(new Error("Geolocation not supported"))
    );

  // ipapi.co - ill use this as fallback but maybe something else would be better later on? this already has city name
  const ipapiAttempt = async () => {
    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      console.log(data);
      return {
        latitude: data.latitude,
        longitude: data.longitude,
        city: data.city,
      };
    } catch (error) {
      console.error(error.message);
      throw new Error("");
    }
  };

  const reverseGeocode = async (lat, lon) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
      const data = await res.json();
      return data.address.city || data.address.town || data.address.village || "";
    } catch (error) {
      console.error(error.message);
      return "Unknown";
    }
  };

  useEffect(() => {
    const getLocationAndWeather = async () => {
      let location = null;

      // cached location // 15 mins - should be good enough
      const cachedLocation = JSON.parse(localStorage.getItem("locationStats"));
      if (cachedLocation && Date.now() - cachedLocation.timestamp < 15 * 60 * 1000) {
        location = cachedLocation.data;
        console.log("Using cached location data");
      } else {
        try {
          location = await ipapiAttempt();
        } catch {
          location = await geolocationAttempt();
          location.city = await reverseGeocode(location.latitude, location.longitude);
        }
        if (location) {
          console.log("Using updated location data");
          localStorage.setItem("locationStats", JSON.stringify({ timestamp: Date.now(), data: location }));
        }
      }

      if (!location) return;

      setLocationStats(location);

      // cached weather
      const cachedWeather = JSON.parse(localStorage.getItem("weather"));
      if (cachedWeather && Date.now() - cachedWeather.timestamp < 5 * 60 * 1000) {
        setWeather(cachedWeather.data);
        console.log("Using cached weather data");
      } else {
        const weatherData = await loadWeather(location.latitude, location.longitude);
        if (weatherData) {
          console.log("Using updated weather data");
          localStorage.setItem("weather", JSON.stringify({ timestamp: Date.now(), data: weatherData }));
        }
      }

      console.log(cachedWeather);
    };

    getLocationAndWeather();
  }, []);

  return (
    <div>
      {weather && locationStats && (
        <div className="flex flex-col items-center">
          <div className="flex gap-2 text-2xl justify-center items-center">
            {getWeatherIcon(weather.current.weather_code)}
            <span>
              {weather.current.temperature_2m ?? "N/A"}
              {weather.current_units.temperature_2m ?? ""}
            </span>
          </div>
          <span>{locationStats.city ?? "Unknown"}</span>
        </div>
      )}
    </div>
  );
}

export default Weather;

// https://open-meteo.com/en/docs
// https://open-meteo.com/en/docs#api_response
// https://api.open-meteo.com/v1/forecast?latitude=<value>&longitude=<value>&hourly=temperature_2m
// https://api.open-meteo.com/v1/forecast?latitude=<value>&longitude=<value>&hourly=temperature_2m&current=temperature_2m

// https://nominatim.org/release-docs/develop/api/Overview/
// https://nominatim.openstreetmap.org/reverse?lat=<value>&lon=<value>&<params>

// https://ipapi.co/api/?javascript#introduction
