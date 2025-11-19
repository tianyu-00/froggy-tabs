import { useState, useEffect } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import { getRandomBackground } from "./utils/getRandomBackground";
import { CheckIcon, CreditCardIcon, InfoIcon, MailIcon, SearchIcon, StarIcon, QuoteIcon } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import Time from "./components/custom/time";

function App() {
  const [username, setUsername] = useState("Tian");
  const [background, setBackground] = useState(null);
  const [quote, setQuote] = useState("");

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

  return (
    <div
      className="h-screen w-full bg-center bg-cover flex flex-col"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      {/* Header */}
      <header className="p-2 min-h-20"></header>

      {/* My main content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <Time className="text-white drop-shadow-lg font-bold text-9xl" />
        <span className="text-white font-semibold text-5xl mb-24">Hello, {username}</span>

        <InputGroup className="bg-white/5 backdrop-blur-md rounded-full shadow-xl p-2 transition-all duration-300 hover:bg-white/20 focus-within:bg-white/25 w-full max-w-md border-0 h-14">
          <InputGroupInput
            name="search"
            placeholder="Search..."
            className="text-white placeholder-gray-300!"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const query = e.target.value.trim();
                if (query) {
                  // window.open(https://www.google.com/search?q=${encodeURIComponent(query)}, "_blank");
                  window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
                }
              }
            }}
          />
          <InputGroupAddon>
            <SearchIcon className="text-white" strokeWidth={3} />
          </InputGroupAddon>
        </InputGroup>
      </div>

      {/* Footer */}
      <footer className="p-2 min-h-20 mt-auto flex items-center">
        <div className="flex-1 flex items-center justify-start h-full"></div>

        <div className="flex-3 flex items-center justify-center space-x-2 h-full">
          <QuoteIcon className="text-white/50" />
          <p className="text-white text-lg italic">{quote}</p>
        </div>

        <div className="flex-1 flex items-center justify-end h-full"></div>
      </footer>
    </div>
  );
}

export default App;

/*
NOTES:
Header - Mid - Foot

Quotes API: https://api.quotable.io/random?maxLength=100

*/
