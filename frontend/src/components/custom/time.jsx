import { useState, useEffect } from "react";

function Time({ className = "", use24h = true }) {
  const [time, setTime] = useState("");
  const [ampm, setAmPm] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      let hh = now.getHours();
      const mm = String(now.getMinutes()).padStart(2, "0");
      const ss = String(now.getSeconds()).padStart(2, "0");

      const is12h = !use24h;
      const computedAmPm = is12h ? (hh >= 12 ? "PM" : "AM") : "";
      hh = is12h ? hh % 12 || 12 : hh;
      setAmPm(computedAmPm);

      hh = String(hh).padStart(2, "0");
      setTime(`${hh}:${mm}:${ss}`);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [use24h]);

  return (
    <div className={`relative ${className} flex justify-center`}>
      <span className="relative">
        {time}
        {ampm && <span className="absolute text-[clamp(1.5rem,5vw,2.25rem)] top-5">{ampm}</span>}
      </span>
    </div>
  );
}

export default Time;
