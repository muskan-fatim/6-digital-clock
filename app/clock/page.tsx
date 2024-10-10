'use client'
import { useState, useEffect, useRef } from "react";

export default function Clock() {
  let [time, setTime] = useState("");
  let intervalRef = useRef<NodeJS.Timeout | null>(null);

  function clearExistingInterval() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }

  function hour24format() {
    clearExistingInterval();
    intervalRef.current = setInterval(() => {
      let date = new Date();
      let hour = date.getHours();
      let minute = date.getMinutes();
      let seconds = date.getSeconds();
      let ampm = hour >= 12 ? 'PM' : 'AM';
      let timeString = hour + ':' + String(minute).padStart(2, '0') + ':' + String(seconds).padStart(2, '0') + " " + ampm;
      setTime(timeString);
    }, 1000);
  }

  function hour12format() {
    clearExistingInterval();
    intervalRef.current = setInterval(() => {
      let date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      let ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      let timeString = hours + ':' + String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0') + " " + ampm;
      setTime(timeString);
    }, 1000);
  }

  // Set default to 24-hour format
  useEffect(() => {
    hour24format();
    return () => clearExistingInterval();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen text-center">
      <div className="bg-blue-950 shadow-black w-80 h-80 text-center rounded-full">
        <h1 className="text-center text-white text-2xl m-9">Digital Clock</h1>
        <h3 className="text-center text-white text-4xl p-0 m-3 font-mono min-w-[130px]">{time}</h3>
        <div>
          <button className="bg-slate-50 p-1 m-4 rounded hover:bg-slate-400" onClick={hour24format}>24 Hours format</button>
          <button className="bg-white p-1 m-4 rounded hover:bg-slate-400" onClick={hour12format}>12 Hours format</button>
        </div>
      </div>
    </div>
  );
}

