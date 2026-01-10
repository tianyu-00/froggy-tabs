import { useState, useEffect } from "react";
import "./App.css";
import { getRandomBackground } from "./utils/getRandomBackground";
import { SearchIcon, QuoteIcon } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import Time from "./components/custom/time";
import SettingsPanel from "./components/custom/settings";
import BookmarksPanel from "./components/custom/bookmarks";
import { Toaster } from "@/components/ui/sonner";
import Weather from "./components/custom/weather";

// ill use this for now as temp data, will rework later
const tempBookmarkData = [];

const tempSettings = {
  // name
  name: "",
  displayGreeting: true,
  // clock
  clock: true,
  "24hourClock": true,
  // search
  search: true,
  searchEngine: "google",
  // bookmark
  bookmark: true,
  bookmarkData: tempBookmarkData || [],
  // weather
  weather: true,
  temperatureUnit: "celsius",
  windSpeedUnit: "kms",
};

const searchEngines = {
  google: (query) => `https://www.google.com/search?q=${encodeURIComponent(query)}`,
  bing: (query) => `https://www.bing.com/search?q=${encodeURIComponent(query)}`,
  duckduckgo: (query) => `https://duckduckgo.com/?q=${encodeURIComponent(query)}`,
  baidu: (query) => `https://www.baidu.com/s?wd=${encodeURIComponent(query)}`,
  yahoo: (query) => `https://search.yahoo.com/search?p=${encodeURIComponent(query)}`,
  yandex: (query) => `https://yandex.com/search/?text=${encodeURIComponent(query)}`,
  ecosia: (query) => `https://www.ecosia.org/search?q=${encodeURIComponent(query)}`,
};

function App() {
  const [background, setBackground] = useState(null);
  const [quote, setQuote] = useState("");
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("dashboardSettings");
    return saved ? JSON.parse(saved) : tempSettings;
  });

  const fetchQuote = async () => {
    try {
      const url = "https://api.quotable.io/random?maxLength=80";

      const res = await fetch(url);
      const data = await res.json();
      setQuote(data.content);
    } catch (err) {
      console.error(err);
      setQuote("Could not load quote.");
    }
  };

  useEffect(() => {
    setBackground(getRandomBackground());
    fetchQuote();
  }, []);

  useEffect(() => {
    localStorage.setItem("dashboardSettings", JSON.stringify(settings));
  }, [settings]);

  return (
    <div
      className="h-screen w-full bg-center bg-cover flex flex-col"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <Toaster position="top-center" />
      {/* Header */}
      <header className="p-2 min-h-20 flex">
        <div className="flex-1 " />
        <div className="flex-1 " />
        <div className="flex-1">
          <div className="flex justify-end items-center h-full p-4">
            {settings.weather && <Weather settingsObject={settings} />}
          </div>
        </div>
      </header>

      {/* My main content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {settings.clock && (
          <Time className="text-white drop-shadow-lg text-[clamp(3rem,10vw,8rem)]" use24h={settings["24hourClock"]} />
        )}

        {settings.displayGreeting && (
          <span className="text-white text-[clamp(2rem,7vw,4rem)] pb-4">Hello, {settings.name}</span>
        )}

        {settings.search && (
          <InputGroup className="bg-white/5 backdrop-blur-md rounded-full shadow-xl p-2 transition-all duration-300 hover:bg-white/20 focus-within:bg-white/25 w-full max-w-md border-0 h-14">
            <InputGroupInput
              name="search"
              placeholder="Search..."
              className="text-white placeholder-gray-300!"
              autoComplete="off"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const query = e.target.value.trim();
                  if (query) {
                    const engine = settings.searchEngine;
                    const url = searchEngines[engine](query);
                    window.location.href = url;
                  }
                }
              }}
            />
            <InputGroupAddon>
              <SearchIcon className="text-white" strokeWidth={3} />
            </InputGroupAddon>
          </InputGroup>
        )}

        {settings.bookmark && (
          <div>
            <BookmarksPanel className="mt-5" bookmarkData={settings.bookmarkData} />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="p-2 min-h-20 mt-auto flex items-center">
        <div className="flex-1 flex items-center justify-start h-full">
          <SettingsPanel settingsObject={settings} setSettingsObject={setSettings} searchEngines={searchEngines} />
        </div>

        <div className="flex-3 flex items-center justify-center space-x-2 h-full">
          <div>
            <QuoteIcon className="text-white/50" size={16} />
          </div>
          <p className="text-white italic">{quote}</p>
        </div>

        <div className="flex-1 flex items-center justify-end h-full"></div>
      </footer>
    </div>
  );
}

export default App;

/*
NOTES:

Quotes API: https://api.quotable.io/random?maxLength=100

Use zenquotes later on maybe: https://zenquotes.io/
and do as said: Use the quotes call to pull 50 random quotes and loop them locally within your app. After a couple hours, refresh the list in your app by calling ZenQuotes again.
https://zenquotes.io/api/quotes - Generate a JSON array of 50 random quotes on each request

Theres also onthisday: https://today.zenquotes.io/
ill decide again which one to use
*/
