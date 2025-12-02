import React from "react";
import { getWeatherIcon, getWeatherText } from "./weather-code";
import { MapPin } from "lucide-react";

function WeatherCardContent({ weather, location }) {
  return (
    <div>
      <div className="grid gap-4">
        <div className="space-y-2">
          <div className="flex gap-2 items-center">
            <MapPin size={18} />
            <h4 className="leading-none font-medium">{location.city ?? "Unknown"}</h4>
          </div>
          {/* <p className="text-muted-foreground text-sm">xxx</p> */}

          {/* Current Weather Info */}
          <div className="flex gap-2">
            {/* left */}
            <div className="flex items-center justify-center px-8">
              <div>{getWeatherIcon(weather.current.weather_code, 82)}</div>
            </div>

            {/* right */}
            <div className="">
              <p className="text-white/50 text-sm text-nowrap">
                Weather <span className="text-white">{getWeatherText(weather.current.weather_code)}</span>
              </p>

              <p className="text-white/50 text-sm text-nowrap">
                Temperature{" "}
                <span className="text-white">
                  {weather.current.temperature_2m ?? "N/A"} {weather.current_units.temperature_2m ?? ""}
                </span>
              </p>

              <p className="text-white/50 text-sm">
                Feels like{" "}
                <span className="text-white">
                  {weather.current.apparent_temperature ?? "N/A"} {weather.current_units.apparent_temperature ?? ""}
                </span>
              </p>

              <p className="text-white/50 text-sm">
                Humidity{" "}
                <span className="text-white">
                  {weather.current.relative_humidity_2m ?? "N/A"}
                  {weather.current_units.relative_humidity_2m ?? ""}
                </span>
              </p>

              <p className="text-white/50 text-sm">
                Wind speed{" "}
                <span className="text-white">
                  {weather.current.wind_speed_10m ?? "N/A"} {weather.current_units.wind_speed_10m ?? ""}
                </span>
              </p>

              <p className="text-white/50 text-sm">
                Wind direction{" "}
                <span className="text-white">
                  {weather.current.wind_direction_10m ?? "N/A"}
                  {weather.current_units.wind_direction_10m ?? ""}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCardContent;
