// PrometheusData.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LogDataComponent from './LogDataComponent'
import InfiniteScroll from 'react-infinite-scroll-component'
import { filter } from 'cypress/types/bluebird';

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
  serial_number: string,
  id: string
}

interface LogDataProps {
  types: string[]
  serialNumbers: string[]
  predictionSort: string
  dateSort: string
}

const PrometheusData: React.FC<LogDataProps> = ({ types, serialNumbers, predictionSort, dateSort}) => {
  const [data, setData] = useState<FlattenedData[]>([]); // Data from prometheus
  const [filteredData, setFilteredData] = useState<FlattenedData[]>([]); // Filtered data
  const [hasMore, setHasMore] = useState(true)
  const [displayedData, setDisplayedData] = useState<FlattenedData[]>([]) // Data which is acutally displayed
  const [itemsAmount, setItemsAmount] = useState(0)
  const [dataIsLoaded, setDataIsLoaded] = useState(false)


  function removeDuplicates(flattenedData: any[]) {
    const seenIds = new Set();
    const uniqueData: any[] = [];

    flattenedData.forEach((data: { id: any; }) => {
      const dataId = data.id;
      if (!seenIds.has(dataId)) {
        seenIds.add(dataId);
        uniqueData.push(data);
      }
    });

    return uniqueData;
  }


  async function fetchData() { // Fetch data from prometheus
    try {

      const startTimestamp = Math.floor((Date.now() / 1000) - 60 * 60);
      const endTimestamp = Math.floor(Date.now() / 1000);
      const stepDuration = 15;
      const query = `device_health`;

      const response = await axios.get('http://localhost:9090/api/v1/query_range', {
        params: {
          query: query,
          start: startTimestamp,
          end: endTimestamp,
          step: stepDuration,
        },
      });

      if (response.data.status === 'success') {

        // Yes i know this is ugly. It reformats data into being of type FlattenedData.
        const flattenedData: FlattenedData[] =
          response.data.data.result.map(
            (device: MetricData) => (device.values.map(
              (datapoint: DataPoint) => ({ date: datapoint[0], percentage: datapoint[1], type: device.metric["device_type"], serial_number: device.metric["serial_number"], id: device.metric["id"] }))))
            .flat(1) // This final method takes a list of lists: [['a', 'b'], ['c']] and flattens it: ['a', 'b', 'c']


        const uniqueData = removeDuplicates(flattenedData)
        setData(uniqueData)
        setFilteredData(uniqueData)
        setHasMore(true)
        loadMoreData()
        setDataIsLoaded(true)
      }
    } catch (error) {
      console.error('Error fetching data from Prometheus:', error);
    }
  }

  function applyFilters() {
    if (dataIsLoaded) {
      var filtered = data
      if (types.length !== 0) {
        filtered = data.filter((dataPoint) => { return types.includes(dataPoint.type) }) // Apply the types filter
      } else if (serialNumbers.length !== 0) {
        filtered = data.filter((dataPoint) => { return serialNumbers.includes(dataPoint.serial_number) }) // Apply the types filter
      }
      setFilteredData(filtered)
    }
  }

  function applyPredictionSort() {
    var sortedData = data
    if(predictionSort == "asc"){
      sortedData.sort((a,b) => Number(a.percentage) - Number(b.percentage)); // b - a for reverse sort
    } else if (predictionSort == "desc") {
      sortedData.sort((a,b) => Number(b.percentage) - Number(a.percentage)); // b - a for reverse sort
    }
    setData(sortedData)
  }

  function applyDateSort() {
    var sortedData = data
    if(dateSort == "asc"){
      sortedData.sort((a,b) => a.date - b.date); // b - a for reverse sort
    } else if (dateSort == "desc") {
      sortedData.sort((a,b) => b.date - a.date); // b - a for reverse sort
    }
    setData(sortedData)
  }

  function reloadDisplayedData() {
    setDisplayedData([])
    setItemsAmount(0)
    setHasMore(true)
  }

  // Called every time one scrolls to the bottom or 'displayedData' is updated
  // Data is taken from 'data' to 'displayedData', and thereafter is rendered
  function loadMoreData() {
    var newDisplayedData = displayedData
    const prevItemsAmount = itemsAmount
    const nextItemsAmount = Math.min(prevItemsAmount + 10, data.length)
    setItemsAmount(nextItemsAmount)

    for (let i = itemsAmount; i < itemsAmount + 10; i++) { // Try loading 10 new elements from filteredData into displayedData

      if (i >= filteredData.length) { // If there is no data left which isn't already displayed
        setHasMore(false)
        break
      } else {
        setHasMore(true)
      }

      newDisplayedData.push(filteredData[i]) // Push from filteredData to displayedData
    }
    setDisplayedData(newDisplayedData) // In theory this creates an infinite loop, but it works nonetheless......
  }

  useEffect(() => {
    applyPredictionSort()
  }, [predictionSort])

  useEffect(() => {
    applyDateSort()
  }, [dateSort])

  useEffect(() => { // This hook is only run once when the page is loaded
    fetchData()
  }, []);

  useEffect(() => {
    applyFilters() // When data-state changes, reapply filters
  }, [data])

  useEffect(() => { // When filters change, apply filters and reload all displayed data
    applyFilters()
    reloadDisplayedData()
  }, [types])

  useEffect(() => { // When displayed data changes, more data should be loaded
    loadMoreData()
  }, [displayedData])

  return (
    <div id="parent" className="overflow-auto h-full">
      <InfiniteScroll
        dataLength={displayedData.length}
        next={loadMoreData}
        hasMore={hasMore}
        scrollableTarget="parent"
        loader={<h4 className='text-text text-center'>Loading...</h4>}
        endMessage={
          <p className='text-text text-center'>
            <b>No more data</b>
          </p>
        }
      >
        {displayedData.map((metricData, index) => (
          <LogDataComponent key={index} metricData={metricData} />
        ))}
      </InfiniteScroll>


    </div>
  );
};

export default PrometheusData;
