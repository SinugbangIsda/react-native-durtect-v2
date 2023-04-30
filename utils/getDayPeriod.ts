import React, { useState, useEffect } from "react";

const getDayPeriod = ( data: number ) => {
  const [ hour , setHour ] = useState<number>(data);

  useEffect(() => {
    const interval = setInterval(() => {
      setHour(data);
    }, 600000);
    return () => clearInterval(interval);
  }, []);

  return (hour < 12) ? "Good morning" : (hour < 18) ? "Good afternoon": "Good evening"

}

export default getDayPeriod;
