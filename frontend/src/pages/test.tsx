import { update } from "cypress/types/lodash"
import { useState, useEffect } from "react"
import React from 'react'
import Select, { NonceProvider } from 'react-select'

import { MultiSelect } from 'primereact/multiselect';

export default function test() {
  const [grafanaSrc, updateGrafanaSrc] = useState(`http://localhost:3000/d/enayayaya/overview-of-devices-copy?orgId=1&refresh=60s&kiosk`)
  const [riskGroup, updateRiskGroup] = useState('healthy')
  const [serialNumber, updateSerialNumber] = useState('All')
  const [time, updateTime] = useState('from=now-6h&to=now')
  const [models, updateModels] = useState([])
  const [selectedModels, updateSelectedModels] = useState([])

  const times = [
    {value: "Last 5 minutes", label: "Last 5 minutes"},
    {value: "Last 15 minutes", label: "Last 15 minutes"},
    {value: "Last 30 minutes", label: "Last 30 minutes"},
    {value: "Last 1 hour", label: "Last 1 hour"},
    {value: "Last 3 hours", label: "Last 3 hours"},
    {value: "Last 6 hours", label: "Last 6 hours"},
    {value: "Last 12 hours", label: "Last 12 hours"},
    {value: "Last 24 hours", label: "Last 24 hours"},
    {value: "Last 3 days", label: "Last 3 days"},
    {value: "Last 7 days", label: "Last 7 days"},
    {value: "Last 30 days", label: "Last 30 days"},
    {value: "Last 180 days", label: "Last 180 days"},
    {value: "Last 1 year", label: "Last 1 year"},
    {value: "Last 3 years", label: "Last 3 years"},
  ]

  const devices = [
    {value: "harddrive", label: "harddrive"},
    {value: "sensor", label: "sensor"},
  ]

  function getModels() {
    fetch(`http://localhost:9090/api/v1/label/model/values?match[]=device_health{group="${riskGroup}"}`)
    .then(response => response.json()).then(data => {updateModels(data["data"].map((model: string) => {console.log("Models fetched"); return {name: model, code: model} }))})
    // Set timeout ? 
  }

  useEffect(() => {
    getModels()
  }, [riskGroup])

  function riskGroupSelect(value: string) {
    updateRiskGroup(value)
    const updated = `http://localhost:3000/d/enayayaya/health-graphs?orgId=1&refresh=15s&var-risk_group=${value}&var-serial_number=${serialNumber}&${time}&kiosk`
    updateGrafanaSrc(updated)
  }
  
  function serialSearchKeyDown(key: string) {
    if (key === 'Enter') {
      if (serialNumber === '') {
        updateSerialNumber('All')
      }
      const updated = `http://localhost:3000/d/enayayaya/health-graphs?orgId=1&refresh=15s&var-risk_group=${riskGroup}&var-serial_number=${serialNumber}&${time}&kiosk`
      console.log(updated)
      updateGrafanaSrc(updated)
    }
  }

  function timeSelect(value: string) {
    const formattedValue = value.split(" ")[1] + value.split(" ")[2].split("")[0]
    const newTime = `from=now-${formattedValue}&to=now`
    updateTime(newTime)
    const updated = `http://localhost:3000/d/enayayaya/health-graphs?orgId=1&refresh=15s&var-risk_group=${riskGroup}&var-serial_number=${serialNumber}&${newTime}&kiosk`
    updateGrafanaSrc(updated)
  }

  function deviceSelect(value: string) {
    const updated = `http://localhost:3000/d/enayayaya/health-graphs?orgId=1&refresh=15s&var-risk_group=${riskGroup}&var-serial_number=${serialNumber}&${time}&var-device_type=${value}&kiosk`
    updateGrafanaSrc(updated)
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
      <div className="flex justify-start place-items-center mx-4">
        <select className="bg-component2 text-text rounded m-2 py-2 px-2" name="healthFilter" onChange={e => riskGroupSelect(e.target.value)}>
          <option value="healthy">Healthy</option>
          <option value="risk">At Risk</option>
          <option value="critical">Critical</option>
        </select>

        <input name="serialNumberFilter" className="bg-component2 text-text rounded m-2 py-2 px-2" type="text" placeholder="Search serial number" onChange={e => updateSerialNumber(e.target.value)} onKeyDown={e => serialSearchKeyDown(e.key)}></input>

        <div style={{minWidth: "15%"}} className="m-2">
          <MultiSelect value={selectedModels} onChange={(e) => updateSelectedModels(e.value)} options={models} optionLabel="name" filter 
              placeholder="Select Models" maxSelectedLabels={3} className="w-full md:w-20rem" />
        </div>

        <div style={{minWidth: "15%"}} className="m-2 rounded">
          <Select name="timeFilter" onChange={e => timeSelect(e ? e.value : "")} placeholder="Select time" className="basic-single" classNamePrefix="text-text outline-0 " options={times} styles={{ menu: (base) => ({ ...base, backgroundColor: "#30343D" }),
                                                      valueContainer: (base) => ({ ...base, borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px'  }),
                                                      indicatorsContainer: (base) => ({ ...base, borderTopRightRadius: '5px', borderBottomRightRadius: '5px'  }),
                                                      dropdownIndicator: (base) => ({ ...base, borderTopRightRadius: '5px', borderBottomRightRadius: '5px'  }),
                                                      container: (base) => ({ ...base, borderRadius: '5px' }),
                                                      input: (base) => ({ ...base, color: '#DEDEDE' }),
                                                      singleValue: (base) => ({ ...base, color: '#DEDEDE' }),
                                                      placeholder: (base) => ({ ...base, backgroundColor: "#30343D" }),
                                                      control: (base) => ({ ...base, backgroundColor: '#30343D', borderRadius: '5px', border: 'none' }),}}/>
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