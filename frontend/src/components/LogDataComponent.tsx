// ReactComponentForMetric.tsx
import React from 'react';
import { useState, useEffect } from "react"
import ImageButton from './ImageButton';

interface MetricData {
  date: number,
  percentage: string,
  type: string,
  serial_number: string
}

interface LogDataComponentProps {
  metricData: MetricData;
}

const LogDataComponent: React.FC<LogDataComponentProps> = ({ metricData }) => {
    const [style, updateStyle] = useState("")

    const date = new Date (metricData.date * 1000)
    useEffect(() => {
        const percentage = parseFloat(metricData.percentage) * 100
        if (percentage > 50) {
            updateStyle("bg-critical bg-opacity-40")
        } else if (percentage < 10) {
            updateStyle("bg-ok bg-opacity-40")
        } else {
            updateStyle("bg-risk bg-opacity-40")
        }
    }, [])

    

  return (
    <div className="flex place-content-between m-2 p-2 items-center">
    <div className={style + " flex place-content-between items-center grow p-1 mr-16 pr-8 pl-8"}>
      <p className="text-white inline-block p-4 opacity-100 align-middle w-48 text-center">{ metricData.serial_number }</p>
      <p className="text-white inline-block p-4 opacity-100 align-middle w-48 text-center">{ date.toUTCString() }</p>
      <p className="text-white inline-block p-4 opacity-100 align-middle w-48 text-center">{ metricData.type }</p>
      <p className="text-white inline-block p-4 opacity-100 align-middle w-48 text-center">{ metricData.percentage }</p>
      
    </div>
    <ImageButton
        src="/img/flag.png"
        alt="Your Image Description"
        href="http://localhost:3001/test"
        className="cursor-pointer p-4 inline-block border-separate bg-component1"
      />

    </div>

  );
};

export default LogDataComponent;