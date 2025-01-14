// ReactComponentForMetric.tsx
import React from 'react';
import { useState, useEffect } from "react"
import FeedbackButton from './FeedbackButton';

interface MetricData {
  date: number,
  percentage: string,
  type: string,
  serial_number: string,
  id : string
}

interface LogDataComponentProps {
  metricData: MetricData;
}

const LogDataComponent: React.FC<LogDataComponentProps> = ({ metricData }) => {
    const [style, updateStyle] = useState("")

    const date = new Date (metricData.date * 1000)
    useEffect(() => {
        const percentage = parseFloat(metricData.percentage) * 100

        // Set b-color based on failure prediction
        if (percentage > 50) {
            updateStyle("bg-critical bg-opacity-100")
        } else if (percentage < 10) {
            updateStyle("bg-ok bg-opacity-100")
        } else {
            updateStyle("bg-risk bg-opacity-100")
        }
    }, [])

    

  return (
    <li className="flex place-content-between m-2 p-2 items-center" data-testid="container">
    <div className={style + " flex place-content-between items-center grow p-1 mr-16 pr-8 pl-8"} data-testid="inner-container">
    <p className="text-white inline-block p-4 opacity-100 align-middle w-48 text-center" data-testid="serial-number">{ metricData.serial_number }</p>
    <p className="text-white inline-block p-4 opacity-100 align-middle w-48 text-center" data-testid="date">{ date.toUTCString() }</p>
    <p className="text-white inline-block p-4 opacity-100 align-middle w-48 text-center" data-testid="type">{ metricData.type.charAt(0).toLocaleUpperCase() + metricData.type.slice(1) }</p>
    <p className="text-white inline-block p-4 opacity-100 align-middle w-48 text-center" data-testid="percentage">{ (parseFloat(metricData.percentage) * 100).toFixed(5) + '%' }</p>
    </div>
  <div className={ "flex place-content-between items-center "} data-testid="img-container">
  <FeedbackButton
    src="/img/flag.png"
    className="inline-block cursor-pointer items-center p-4 w-20 h-20 "
    testid="feedback-button"
    id={metricData.id}
  />
  </div>
 
</li>

  );
};

export default LogDataComponent;