"use client";
import { useEffect, useState } from "react";

export function Clock() {
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        setTime(new Date()); // só seta após montar no client
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    if (!time) return <span className="ml-4 font-mono text-sm text-gray-600 select-none">--:--</span>;

    const formattedTime = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    return <span className="ml-4 font-mono text-sm text-gray-600 select-none">{formattedTime}</span>;
}
