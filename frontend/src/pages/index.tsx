import Head from 'next/head'
import { useState, useEffect } from "react"
import OverviewButton from '@/components/OverviewButton'
import ClickableIframe from '@/components/ClickableIframe'
import { useGlobal } from '@/context/global'

export default function Home() {
  const [healthyPercentage, updateHealthyPercentage] = useState(0.0)
  const [riskPercentage, updateRiskPercentage] = useState(0.0)
  const [criticalPercentage, updateCriticalPercentage] = useState(0.0)
  const {filterInt, changeFilter} = useGlobal();

  function getHealthyPercentage() {
    //Finds percentage of healthy devices, ( gets amount of healthy devices divided by amount of all devices times 100 )
    fetch('http://localhost:9090/api/v1/query?query=count(device_health{group="healthy"})/count(device_health)*100')
      .then(response => response.json())
      .then(jsonresponse => { 
          try {updateHealthyPercentage(jsonresponse.data.result[0].value[1])}
          catch {}
      })
  }

  function getRiskPercentage() {
      fetch('http://localhost:9090/api/v1/query?query=count(device_health{group="risk"})/count(device_health)*100')
      .then(response => response.json())
      .then(jsonresponse => { 
          try {updateRiskPercentage(jsonresponse.data.result[0].value[1])}
          catch {}
      })
  }

  function getCriticalPercentage() {
    fetch('http://localhost:9090/api/v1/query?query=count(device_health{group="critical"})/count(device_health)*100')
      .then(response => response.json())
      .then(jsonresponse => { 
          try {updateCriticalPercentage(jsonresponse.data.result[0].value[1])}
          catch {}
      })
     }

  const getAllPercentages = () => {
    getHealthyPercentage()
    getRiskPercentage()
    getCriticalPercentage()
  }

  useEffect(() => { // Code inside this function is only called once per load
    getAllPercentages()
    const interval = setInterval(() => { // 20 second interval for fetching percentage data
      getAllPercentages()
    }, 20000)

    return () => {
       clearInterval(interval)
    };
  }, [])

  return (
    <>
      <Head>
        <title>PredictIT - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className='mt-8 mb-4 flex flex-row justify-center'>
        
        <ClickableIframe
          Id='Critical-goto-graph-id'
          src="http://localhost:3000/d-solo/en2yCsa4k/overview-of-devices?orgId=1&panelId=2&refresh=15s"
          redirectUrl="/health_graphs"
        />

        <ClickableIframe
          src="http://localhost:3000/d-solo/en2yCsa4k/overview-of-devices?orgId=1&panelId=3&refresh=15s"
          Id='Risk-goto-graph-id'
          redirectUrl="/health_graphs"
        />

        <ClickableIframe
          src="http://localhost:3000/d-solo/en2yCsa4k/overview-of-devices?orgId=1&panelId=4&refresh=15s"
          Id='Healthy-goto-graph-id'
          redirectUrl="/health_graphs"
        />

      </div>
      <div className='flex flex-row gap-2 sm:gap-14 lg:gap-20 2xl:gap-28 justify-center mt-3'>
        <OverviewButton Status='Critical' Id='Critical-goto-btn-id' Filter='critical' HexColor='#971020' href='/health_graphs' percentage={criticalPercentage} />
        <OverviewButton Status='At risk' Id='Risk-goto-btn-id' Filter='risk' HexColor='#BB5E1B' href='/health_graphs' percentage={riskPercentage} />
        <OverviewButton Status='Healthy' Id='Healthy-goto-btn-id' Filter='healthy' HexColor='#3A7924' href='/health_graphs' percentage={healthyPercentage} />
        
      </div>
    </>
  )
}
