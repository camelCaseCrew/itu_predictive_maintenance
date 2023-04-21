// PrometheusData.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LogDataComponent from './LogDataComponent'

interface DataPoint {
  [0]: number;
  [1]: number;
}

interface MetricData {
  metric: { [key: string]: string };
  values: DataPoint[];
}

interface FlattenedData {
  date: number,
  percentage: string,
  type: string,
  serial_number: string
}

const PrometheusData: React.FC = () => {
  const [data, setData] = useState<FlattenedData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {

        const startTimestamp = Math.floor((Date.now() / 1000) - 60 * 60);
        const endTimestamp = Math.floor(Date.now() / 1000);
        const stepDuration = 15;
        //const query = `device_health{serial_number="MJ1311YNG3K3JA"}`;
        const query = `device_health{group="critical"}`;

        const response = await axios.get('http://localhost:9090/api/v1/query_range', {
          params: {
            query: query,
            start: startTimestamp,
            end: endTimestamp,
            step: stepDuration,
          },
        });

        if (response.data.status === 'success') {
          console.log(response.data.data.result)
          const flattenedData: FlattenedData[] = response.data.data.result.map((device: MetricData) => (device.values.map((datapoint: DataPoint) => ( { date: datapoint[0], percentage: datapoint[1], type: device.metric["device_type"], serial_number: device.metric["serial_number"] } )))).flat(1) // idk
          console.log(flattenedData)
          setData(flattenedData);
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
