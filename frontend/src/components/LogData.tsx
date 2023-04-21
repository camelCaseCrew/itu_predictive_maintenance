// PrometheusData.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LogDataComponent from './LogDataComponent'

interface DataPoint {
  timestamp: number;
  value: number;
}

interface MetricData {
  metric: { [key: string]: string };
  values: DataPoint[];
}

const PrometheusData: React.FC = () => {
  const [data, setData] = useState<MetricData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {

        const startTimestamp = Math.floor((Date.now() / 1000) - 60 * 60);
        const endTimestamp = Math.floor(Date.now() / 1000);
        const stepDuration = 15;
        const query = `device_health{serial_number="MJ1311YNG3K3JA"}`;

        const response = await axios.get('http://localhost:9090/api/v1/query_range', {
          params: {
            query: query,
            start: startTimestamp,
            end: endTimestamp,
            step: stepDuration,
          },
        });

        if (response.data.status === 'success') {
          setData(response.data.data.result);
        }
      } catch (error) {
        console.error('Error fetching data from Prometheus:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {data.map((metricData, index) => (
        <LogDataComponent key={index} metricData={metricData} />
      ))}
    </div>
  );
};

export default PrometheusData;
