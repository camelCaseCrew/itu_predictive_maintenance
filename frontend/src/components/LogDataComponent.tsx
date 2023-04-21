// ReactComponentForMetric.tsx
import React from 'react';

interface DataPoint {
  timestamp: number;
  value: number;
}

interface MetricData {
  metric: { [key: string]: string };
  values: DataPoint[];
}

interface LogDataComponentProps {
  metricData: MetricData;
}

const LogDataComponent: React.FC<LogDataComponentProps> = ({ metricData }) => {

  return (
    <div>
      <h3>Metric:</h3>
      <pre>{JSON.stringify(metricData.metric, null, 2)}</pre>
      <h4>Values:</h4>
      <pre>{JSON.stringify(metricData.values, null, 2)} </pre>
    </div>
  );
};

export default LogDataComponent;