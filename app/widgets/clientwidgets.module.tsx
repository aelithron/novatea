"use client";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Roboto_Mono } from "next/font/google";
import { useCallback, useEffect, useState } from "react";

const robotoMono = Roboto_Mono({ weight: "400" });
export function TimeWidget() {
  const [date, setDate] = useState<Date | null>(null);
  const tick = useCallback(() => setDate(new Date()), []);
  useEffect(() => {
    const timer = setInterval(() => tick(), 1000);
    return () => clearInterval(timer);
  });
  const displayTime = (date ? new Intl.DateTimeFormat("en", { timeZone: "America/Denver", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: "short" }).format(date) : "00:00:00 AM").match(/^(\d+):(\d+):(\d+) ([AP]M) (M[SD]T)$/i) || ["", "00", "00", "00", "AM", ""]
  return (
    <div className="flex flex-col items-center p-2 bg-slate-700 rounded-xl mt-2">
      <h2 className="text-lg font-semibold"><FontAwesomeIcon icon={faClock} /> current time</h2>
      <div className={`flex items-center gap-2 text-xl ${robotoMono.className}`}>
        <p className="bg-slate-600 p-1 rounded-sm">{displayTime[1]}</p>
        <p className="bg-slate-600 p-1 rounded-sm">{displayTime[2]}</p>
        <p className="bg-slate-600 p-1 rounded-sm">{displayTime[3]}</p>
        <p>{displayTime[4]}</p>
        {displayTime[5] != "" && <p className="text-sm">({displayTime[5].toLocaleLowerCase()})</p>}
      </div>
      
    </div>
  );
}