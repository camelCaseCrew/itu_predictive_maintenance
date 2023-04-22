import { update } from "cypress/types/lodash"
import { useState, useEffect } from "react"
import React from 'react'
<<<<<<< HEAD
import Select, { NonceProvider } from 'react-select'
=======
>>>>>>> 83bbf30f7a7f388b70cb21084c49b2aacde62838

import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown'

export default function test() {
  const [grafanaSrc, updateGrafanaSrc] = useState(`http://localhost:3000/d/enayayaya/overview-of-devices-copy?orgId=1&refresh=60s&kiosk`)
  
  const [models, updateModels] = useState([])
  const [riskGroups, updateRiskGroups] = useState([])
  const [serialNumbers, updateSerialNumbers] = useState([])

  const [selectedSerials, updateSelectedSerials] = useState([])
  const [selectedGroup, updateSelectedGroup] = useState('Healthy')
  const [selectedModel, updateSelectedModel] = useState('ST4000DM000')
  const [selectedTime, updateSelectedTime] = useState('Last 6 hours')

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

<<<<<<< HEAD
  const devices = [
    {value: "harddrive", label: "harddrive"},
    {value: "sensor", label: "sensor"},
  ]

  function getModels() {
    fetch(`http://localhost:9090/api/v1/label/model/values?match[]=device_health{group="${riskGroup}"}`)
    .then(response => response.json()).then(data => {updateModels(data["data"].map((model: string) => {console.log("Models fetched"); return {name: model, code: model} }))})
    // Set timeout ? 
  }
=======
>>>>>>> 83bbf30f7a7f388b70cb21084c49b2aacde62838

  useEffect(() => {
    getModels()
  }, [selectedGroup])

  useEffect(() => {
    getRiskGroups()
  }, [])

  useEffect(() => {
    getSerialNumbers()
  }, [selectedGroup, selectedModel])


  function updateFilter(model = selectedModel, group = selectedGroup, serials = selectedSerials, time = selectedTime) {
    const formattedValue = time.split(" ")[1] + time.split(" ")[2].split("")[0]
    const newTime = `from=now-${formattedValue}&to=now`

    const newSerials = serials.map(serial => `&var-serial_number=${serial["name"]}` )
    
    const updated = `http://localhost:3000/d/enayayaya/health-graphs?orgId=1&refresh=15s${newSerials}&var-risk_group=${group.toLowerCase()}&var-model=${model}&${newTime}&kiosk`
    updateGrafanaSrc(updated)
  }

  function getRiskGroups() {
    fetch("http://localhost:9090/api/v1/label/group/values")
    .then(response => response.json()).then(data => {updateRiskGroups(data["data"].map((group: string) => {return {name: (group.charAt(0).toUpperCase() + group.slice(1)), code: group} }))})
  }

  function getModels() {
    fetch(`http://localhost:9090/api/v1/label/model/values?match[]=device_health{group="${selectedGroup.toLowerCase()}"}`)
    .then(response => response.json()).then(data => {updateModels(data["data"].map((model: string) => {console.log("Models fetched"); return {name: model, code: model} }))})
  }

  function getSerialNumbers() {
    fetch(`http://localhost:9090/api/v1/label/serial_number/values?match[]=device_health{group="${selectedGroup.toLowerCase()}",model="${selectedModel}"}`)
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

  function deviceSelect(value: string) {
    const updated = `http://localhost:3000/d/enayayaya/health-graphs?orgId=1&refresh=15s&var-risk_group=${riskGroup}&var-serial_number=${serialNumber}&${time}&var-device_type=${value}&kiosk`
    updateGrafanaSrc(updated)
  }
  
  function modelSelect(value: string) {
    updateSelectedModel(value)
    updateFilter(value)
  }

  function serialSelect(value : []) {
    updateSelectedSerials(value)
    updateFilter(undefined, undefined, value)
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
            <Dropdown inputId="healthFilter" filter value={{name: selectedGroup, code: selectedGroup.toLowerCase()}} onChange={(e) => riskGroupSelect(e.value["name"])} options={riskGroups} optionLabel="name" placeholder="Select Risk Group" className="w-full md:w-20rem" />
            <label htmlFor="healthFilter">Select Risk Group</label>
          </span>
        </div>

        <div style={{minWidth: "15%"}} className="m-2">
          <span className="p-float-label">
            <Dropdown inputId="modelFilter" filter value={{name: selectedModel, code: selectedModel}} onChange={(e) => modelSelect(e.value["name"])} options={models} optionLabel="name" placeholder="Select Model" className="w-full md:w-20rem" />
            <label htmlFor="modelFilter">Select Model</label>
          </span>
        </div>

        <div style={{minWidth: "15%"}} className="m-2 rounded">
          <span className="p-float-label">
            <Dropdown inputId="timeFilter" filter value={{name: selectedTime, code: selectedTime}} onChange={(e) => timeSelect(e.value["name"])} options={times} optionLabel="name" placeholder="Select Time" className="w-full md:w-20rem" />
            <label htmlFor="timeFilter">Select Time</label>
          </span>
        </div>

        <div style={{minWidth: "15%"}} className="m-2 rounded">
          <span className="p-float-label">
            <MultiSelect inputId="serialFilter" value={selectedSerials} onChange={(e) => serialSelect(e.value)} virtualScrollerOptions={{ itemSize: 43 }} options={serialNumbers} optionLabel="name" filter placeholder="Select Serial Numbers" maxSelectedLabels={3} className="w-full md:w-20rem" /> 
            <label htmlFor="serialFilter">Select Serial Numbers</label>
          </span>
        </div>

        <div style={{minWidth: "15%"}} className="m-2">
          <Select name="deviceFilter" onChange={e => deviceSelect(e ? e.value : "")} placeholder="Select Device Type" className="basic-single" classNamePrefix="text-text outline-0 " options={devices} styles={{ menu: (base) => ({ ...base, backgroundColor: "#30343D" }),
                                                      valueContainer: (base) => ({ ...base, borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px'  }),
                                                      indicatorsContainer: (base) => ({ ...base, borderTopRightRadius: '5px', borderBottomRightRadius: '5px'  }),
                                                      dropdownIndicator: (base) => ({ ...base, borderTopRightRadius: '5px', borderBottomRightRadius: '5px'  }),
                                                      container: (base) => ({ ...base, borderRadius: '5px' }),
                                                      input: (base) => ({ ...base, color: '#DEDEDE' }),
                                                      singleValue: (base) => ({ ...base, color: '#DEDEDE' }),
                                                      placeholder: (base) => ({ ...base, backgroundColor: "#30343D" }),
                                                      control: (base) => ({ ...base, backgroundColor: '#30343D', borderRadius: '5px', border: 'none' }),}}/>
        </div>

      </div>

      <div className="h-screen w-[100%]">
        <iframe className="w-full h-full" loading="lazy" src={grafanaSrc} ></iframe>
      </div>
      
    </div>
  )
}