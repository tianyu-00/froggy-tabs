export function buildWeatherLink({ latitude, longitude }, options = {}) {
  const params = new URLSearchParams({
    latitude,
    longitude,
  });

  // hourly parameters
  if (options.hourly && Array.isArray(options.hourly)) {
    params.set("hourly", options.hourly.join(","));
  }

  // current parameters
  if (options.current && Array.isArray(options.current)) {
    params.set("current", options.current.join(","));
  }

  // temperature unit
  if (options.temperature_unit) {
    params.set("temperature_unit", options.temperature_unit);
  }

  // wind speed unit
  if (options.wind_speed_unit) {
    params.set("wind_speed_unit", options.wind_speed_unit);
  }

  return `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
}

// const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weather_code&current=temperature_2m,weather_code,relative_humidity_2m,apparent_temperature,is_day,wind_speed_10m,wind_direction_10m,wind_gusts_10m,snowfall,showers,rain,precipitation,cloud_cover,pressure_msl,surface_pressure`;

// Base
// https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}

// Hourly
// &hourly=temperature_2m,weather_code

// Current
// &current=temperature_2m,weather_code,relative_humidity_2m,apparent_temperature,is_day,wind_speed_10m,wind_direction_10m,wind_gusts_10m,snowfall,showers,rain,precipitation,cloud_cover,pressure_msl,surface_pressure

// Temperature Unit (Defaults to Celsius)
// &temperature_unit=fahrenheit

// Wind Speed Unit (Defaults to km/h)
// &wind_speed_unit=ms
// &wind_speed_unit=mph
// &wind_speed_unit=kn
