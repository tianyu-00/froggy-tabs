import React from "react";
import { getWeatherIcon, getWeatherText } from "./weather-code";
import { MapPin, ExternalLink, RefreshCcw } from "lucide-react";
import WeatherTempChart from "./weather-chart";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

function WeatherCardContent({ weather, location, weatherURL, onRefresh }) {
  return (
    <div>
      <div className="grid gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <MapPin size={18} />
              <h4 className="leading-none font-medium">{location.city ?? "Unknown"}</h4>
            </div>

            <Button
              size="icon"
              className="text-white bg-transparent hover:bg-white/5 hover:backdrop-blur-2xl cursor-pointer"
              onClick={onRefresh}
            >
              <RefreshCcw size={18} />
            </Button>
          </div>
          {/* <p className="text-muted-foreground text-sm">xxx</p> */}

          <Separator className="bg-white/20 my-2" />

          {/* Current Weather Info */}
          <div className="flex gap-2">
            {/* left */}
            <div className="flex-col items-center justify-center px-8">
              <div className="">{getWeatherIcon(weather.current.weather_code, 82)}</div>
              <div className="flex justify-center">{getWeatherText(weather.current.weather_code)}</div>
            </div>

            {/* right */}
            <div className="">
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

        <WeatherTempChart data={weather} />

        <Separator className="bg-white/20 my-2" />

        <div className="flex justify-center">
          <a
            className="text-xs text-white/50 flex align-middle justify-center gap-1 p-1 hover:text-white"
            href={weatherURL}
            target="_blank"
          >
            Weather API <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default WeatherCardContent;
