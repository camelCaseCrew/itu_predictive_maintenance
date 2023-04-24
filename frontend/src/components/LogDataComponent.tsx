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


    useEffect(() => {
        const percentage = parseFloat(metricData.percentage) * 100
        if (percentage > 50) {
            updateStyle("bg-critical opacity-50")
        } else if (percentage < 10) {
            updateStyle("bg-ok opacity-50")
        } else {
            updateStyle("bg-risk opacity-50")
        }
    }, [])

    

  return (
    <div className={style + " flex place-content-evenly"}>
      <p className="text-white inline-block p-4 opacity-100">{ metricData.serial_number }</p>
      <p className="text-white inline-block p-4 opacity-100">{ metricData.date }</p>
      <p className="text-white inline-block p-4 opacity-100">{ metricData.type }</p>
      <p className="text-white inline-block p-4 opacity-100">{ metricData.percentage }</p>
      <ImageButton
        src="/img/flag.png"
        alt="Your Image Description"
        href="http://localhost:3001/test"
        className="inline-block p-4 cursor-pointer"
      />
    </div>
  );
};

export default LogDataComponent;