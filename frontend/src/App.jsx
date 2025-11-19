import { useState, useEffect } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import { getRandomBackground } from "./utils/getRandomBackground";

function App() {
  const [background, setBackground] = useState(null);

  useEffect(() => {
    setBackground(getRandomBackground());
  }, []);

  return (
    <div
      className="h-screen w-full bg-center bg-cover"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <Button>Test Button</Button>
    </div>
  );
}

export default App;
