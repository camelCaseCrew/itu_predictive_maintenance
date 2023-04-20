import Head from 'next/head'
import { useState, useEffect } from "react"
import { Inter } from 'next/font/google'
import OverviewButton from '@/components/OverviewButton'

export default function Home() {
  const [healthyPercentage, updateHealthyPercentage] = useState(0.0)
  const [riskPercentage, updateRiskPercentage] = useState(0.0)
  const [criticalPercentage, updateCriticalPercentage] = useState(0.0)

  function getHealthyPercentage() {
    //Finds percentage of healthy devices, ( gets amount of healthy devices divided by amount of all devices times 100 )
    fetch('http://localhost:9090/api/v1/query?query=count(device_health{group="healthy"})/count(device_health)*100')
      .then(response => response.json()).then(jsonresponse => {updateHealthyPercentage(jsonresponse.data.result[0].value[1])})
  }

  function getRiskPercentage() {
    fetch('http://localhost:9090/api/v1/query?query=count(device_health{group="risk"})/count(device_health)*100')
      .then(response => response.json()).then(jsonresponse => {updateRiskPercentage(jsonresponse.data.result[0].value[1])})
  }

  function getCriticalPercentage() {
    fetch('http://localhost:9090/api/v1/query?query=count(device_health{group="critical"})/count(device_health)*100')
      .then(response => response.json()).then(jsonresponse => {updateCriticalPercentage(jsonresponse.data.result[0].value[1])})
  }


  useEffect(() => {
    getHealthyPercentage()
    getRiskPercentage()
    getCriticalPercentage()
  }, [])


  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=' w-[90%] md:w-[60%]  mx-auto h-[50%]'>
        <iframe className=' w-full h-full' src="http://localhost:3000/d-solo/en2yCsa4k/overview-of-devices?orgId=1&panelId=2&kiosk"></iframe>
      </div>
      <div className='flex flex-row gap-2 sm:gap-14 lg:gap-20 justify-center mt-3'>
        <OverviewButton Status='Critical' Id='Critical-goto-btn-id' Filter='critical' HexColor='#C4162A' href='/health_graphs' percentage={criticalPercentage} />
        <OverviewButton Status='At risk' Id='Risk-goto-btn-id' Filter='risk' HexColor='#FADE2A' href='/health_graphs' percentage={riskPercentage} />
        <OverviewButton Status='Healthy' Id='Healthy-goto-btn-id' Filter='healthy' HexColor='#37872D' href='/health_graphs' percentage={healthyPercentage} />
        
      </div>
    </>
  )
}
