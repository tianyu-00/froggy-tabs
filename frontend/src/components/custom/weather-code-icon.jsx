import { CloudOff, CloudSun, Cloudy, CloudSnow, CloudRain, CloudLightning, CloudFog, CloudDrizzle } from "lucide-react";

export const getWeatherIcon = (code, size = 24) => {
  switch (code) {
    // clear / mainly clear
    case 0:
    case 1:
      return <CloudSun size={size} />;

    // partly / overcast
    case 2:
    case 3:
      return <Cloudy size={size} />;

    // fog
    case 45:
    case 48:
      return <CloudFog size={size} />;

    // drizzle
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return <CloudDrizzle size={size} />;

    // rain / freezing rain
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
      return <CloudRain size={size} />;

    // snow / snow showers
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return <CloudSnow size={size} />;

    // showers
    case 80:
    case 81:
    case 82:
      return <CloudRain size={size} />;

    // thunder
    case 95:
    case 96:
    case 99:
      return <CloudLightning size={size} />;

    // fallback to cloud off
    default:
      return <CloudOff size={size} />;
  }
};

// https://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM
// https://gist.github.com/stellasphere/9490c195ed2b53c707087c8c2db4ec0c
// based on the gist, this should be all of the codes, but will update if there is any missing when found
