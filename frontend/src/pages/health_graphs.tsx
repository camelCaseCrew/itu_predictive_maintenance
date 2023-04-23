//this is a very hacky solution that essentially detects when the window is no longer the focus
//ie. you have focused on the Grafana Embed, and changes the focus to the window. This is done
//to prevent exiting kiosk mode on the Grafana embed, however a better solution could be
//1. managing user permissions such that an anonymous viewer cannot get a full view
//or 2. disabling the hotkeys to exit kiosk mode (esc or f) on the Grafana embed

import { useState, useEffect } from "react"
import React from 'react'

import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown'

export default function App() {
  const [grafanaSrc, updateGrafanaSrc] = useState(`http://localhost:3000/d/enayayaya/overview-of-devices-copy?orgId=1&refresh=60s&kiosk`)
  
  const [models, updateModels] = useState([])
  const [riskGroups, updateRiskGroups] = useState([])
  const [serialNumbers, updateSerialNumbers] = useState([])

  const [selectedSerials, updateSelectedSerials] = useState([])
  const [selectedGroup, updateSelectedGroup] = useState('Healthy')
  const [selectedModel, updateSelectedModel] = useState('ST4000DM000')
  const [selectedTime, updateSelectedTime] = useState('Last 6 hours')
  const [selectedDevice, updateSelectedDevice] = useState('Harddrive')

  const times = [
    {name: "Last 5 minutes", code: "Last 5 minutes"},
    {name: "Last 15 minutes", code: "Last 15 minutes"},
    {name: "Last 30 minutes", code: "Last 30 minutes"},
    {name: "Last 1 hour", code: "Last 1 hour"},
    {name: "Last 3 hours", code: "Last 3 hours"},
    {name: "Last 6 hours", code: "Last 6 hours"},
    {name: "Last 12 hours", code: "Last 12 hours"},
    {name: "Last 24 hours", code: "Last 24 hours"},
    {name: "Last 3 days", code: "Last 3 days"},
    {name: "Last 7 days", code: "Last 7 days"},
    {name: "Last 30 days", code: "Last 30 days"},
    {name: "Last 180 days", code: "Last 180 days"},
    {name: "Last 1 year", code: "Last 1 year"},
    {name: "Last 3 years", code: "Last 3 years"},
  ]

  const devices = [
    {name: "Harddrive", code: "Harddrive"},
    {name: "Sensor", code: "Sensor"},
  ]

  // only get risk groups on first render
  useEffect(() => {
    getRiskGroups()
  }, [])

  // update models and serial numbers on every render
  useEffect(() => {
    getModels()
  }, [selectedGroup, selectedDevice])

  useEffect(() => {
    getSerialNumbers()
  }, [selectedGroup, selectedModel, selectedDevice])

  // main function for changing the iframe src depending on the filter chosen
  function updateFilter(model = selectedModel, group = selectedGroup, serials = selectedSerials, time = selectedTime, device = selectedDevice) {
    const formattedValue = time.split(" ")[1] + time.split(" ")[2].split("")[0]
    const newTime = `from=now-${formattedValue}&to=now`

    const newSerials = serials.map(serial => `&var-serial_number=${serial["name"]}` )
    
    const updated = `http://localhost:3000/d/enayayaya/health-graphs?orgId=1&refresh=15s${newSerials}&var-risk_group=${group.toLowerCase()}&var-model=${model}&${newTime}&var-device_type=${device.toLowerCase()}&kiosk`
    updateGrafanaSrc(updated)
  }

  // queries for prometheus to get right filter labels
  function getRiskGroups() {
    fetch("http://localhost:9090/api/v1/label/group/values")
    .then(response => response.json()).then(data => {updateRiskGroups(data["data"].map((group: string) => {return {name: (group.charAt(0).toUpperCase() + group.slice(1)), code: group} }))})
  }

  function getModels() {
    fetch(`http://localhost:9090/api/v1/label/model/values?match[]=device_health{device_type="${selectedDevice.toLowerCase()}",group="${selectedGroup.toLowerCase()}"}`)
    .then(response => response.json()).then(data => {updateModels(data["data"].map((model: string) => {console.log("Models fetched"); return {name: model, code: model} }))})
  }

  function getSerialNumbers() {
    fetch(`http://localhost:9090/api/v1/label/serial_number/values?match[]=device_health{device_type="${selectedDevice.toLowerCase()}",group="${selectedGroup.toLowerCase()}",model="${selectedModel}"}`)
    .then(response => response.json()).then(data => {updateSerialNumbers(data["data"].map((serial: string) => {return {name: serial, code: serial} }))})
  }

  function riskGroupSelect(value: string) {
    updateSelectedGroup(value)
    updateFilter(undefined, value)
  }

  function timeSelect(value: string) {
    updateSelectedTime(value)
    updateFilter(undefined, undefined, undefined, value)
  }
  
  function modelSelect(value: string) {
    updateSelectedModel(value)
    updateFilter(value)
  }

  function serialSelect(value : []) {
    updateSelectedSerials(value)
    updateFilter(undefined, undefined, value)
  }

  function deviceSelect(device: string) {
    updateSelectedDevice(device)
    updateFilter(undefined, undefined, undefined, undefined, device)
  }

  if(typeof window !== "undefined" && window.document){
    window.addEventListener("blur", function (e) {
      setTimeout(function () {
        window.focus();
      }, 0);
    });
  }

  return (
    
    <div className="m-4 bg-component1">
      <div className="flex justify-start place-items-center mx-4 pt-6 pb-2">

        <div style={{minWidth: "8%"}} className="m-2">
          <span className="p-float-label">
            <Dropdown inputId="healthFilter" filter value={{name: selectedGroup, code: selectedGroup.toLowerCase()}} onChange={(e) => riskGroupSelect(e.value["name"])} options={riskGroups} optionLabel="name" className="w-full md:w-20rem" />
            <label htmlFor="healthFilter">Select Risk Group</label>
          </span>
        </div>

        <div style={{minWidth: "15%"}} className="m-2">
          <span className="p-float-label">
            <Dropdown inputId="modelFilter" filter value={{name: selectedModel, code: selectedModel}} onChange={(e) => modelSelect(e.value["name"])} options={models} optionLabel="name" className="w-full md:w-20rem" />
            <label htmlFor="modelFilter">Select Model</label>
          </span>
        </div>

        <div style={{minWidth: "15%"}} className="m-2 rounded">
          <span className="p-float-label">
            <Dropdown inputId="timeFilter" filter value={{name: selectedTime, code: selectedTime}} onChange={(e) => timeSelect(e.value["name"])} options={times} optionLabel="name" className="w-full md:w-20rem" />
            <label htmlFor="timeFilter">Select Time</label>
          </span>
        </div>

        <div style={{minWidth: "15%"}} className="m-2 rounded">
          <span className="p-float-label">
            <Dropdown inputId="deviceFilter" filter value={{name: selectedDevice, code: selectedDevice}} onChange={(e) => deviceSelect(e.value["name"])} options={devices} optionLabel="name" className="w-full md:w-20rem" />
            <label htmlFor="deviceFilter">Select Device Type</label>
          </span>
        </div>

        <div style={{minWidth: "20%"}} className="m-2 rounded">
          <span className="p-float-label">
            <MultiSelect inputId="serialFilter" value={selectedSerials} onChange={(e) => serialSelect(e.value)} virtualScrollerOptions={{ itemSize: 43 }} options={serialNumbers} optionLabel="name" filter maxSelectedLabels={3} className="w-full md:w-20rem" /> 
            <label htmlFor="serialFilter">Select Serial Numbers</label>
          </span>
        </div>
      </div>

      <div className="h-screen w-[100%]">
        {/*This source is a link to the grafana dashboard with uid=enayayaya in kiosk mode*/}
        <iframe id="devices" className="w-full h-full" loading="lazy" src={grafanaSrc}></iframe>
      </div>

    </div>
  )
}
