import { update } from "cypress/types/lodash"
import { useState, useEffect } from "react"
import React from 'react'
import Select from 'react-select'


export default function test() {
  const [grafanaSrc, updateGrafanaSrc] = useState(`http://localhost:3000/d/enayayaya/overview-of-devices-copy?orgId=1&refresh=60s&kiosk`)
  const [riskGroup, updateRiskGroup] = useState('healthy')
  const [serialNumber, updateSerialNumber] = useState('All')
  const [time, updateTime] = useState('from=now-6h&to=now')
  const [models, updateModels] = useState([])

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
  ]

  function getModels() {
    fetch('http://localhost:9090/api/v1/label/model/values?match[]=device_health%7Bgroup=%22healthy%22%7D')
    .then(response => response.json()).then(data => {updateModels(data["data"].map((model: string) => {console.log("Models fetched"); return {label: model, value: model} }))})
    // Set timeout ? 
  }

  useEffect(() => {
    getModels()
    }, [])

  function riskGroupSelect(value: string) {
    updateRiskGroup(value)
    const updated = `http://localhost:3000/d/enayayaya/health-graphs?orgId=1&refresh=5s&var-risk_group=`+value+`&var-serial_number=`+serialNumber+`&`+time+`&kiosk`
    updateGrafanaSrc(updated)
  }
  
  function serialSearchKeyDown(key: string) {
    if (key === 'Enter') {
      if (serialNumber === '') {
        updateSerialNumber('All')
      }
      const updated = `http://localhost:3000/d/enayayaya/health-graphs?orgId=1&refresh=5s&var-risk_group=`+riskGroup+`&var-serial_number=`+serialNumber+`&`+time+`&kiosk`
      console.log(updated)
      updateGrafanaSrc(updated)
    }
  }

  function timeSelect(value: string) {
    const formattedValue = value.split(" ")[1] + value.split(" ")[2].split("")[0]
    const newTime = `from=now-${formattedValue}&to=now`
    updateTime(newTime)
    const updated = `http://localhost:3000/d/enayayaya/health-graphs?orgId=1&refresh=5s&var-risk_group=`+riskGroup+`&var-serial_number=`+serialNumber+`&`+newTime+`&kiosk`
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
    
    <div className="m-0 bg-component1">
      <div className="flex justify-start place-items-center mx-4">
        <select className="bg-component2 text-text rounded m-2 py-2 px-2" name="Health" onChange={e => riskGroupSelect(e.target.value)}>
          <option value="healthy">Healthy</option>
          <option value="risk">At Risk</option>
          <option value="critical">Critical</option>
        </select>

        <input className="bg-component2 text-text rounded m-2 py-2 px-2" type="text" placeholder="Search serial number" onChange={e => updateSerialNumber(e.target.value)} onKeyDown={e => serialSearchKeyDown(e.key)}></input>

        <div className="m-2 rounded">
          <Select placeholder="Select model" classNamePrefix="text-text outline-0 " options={models} isMulti styles={{ menu: (base) => ({ ...base, backgroundColor: "#30343D" }),
                                                      valueContainer: (base) => ({ ...base, borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px'  }),
                                                      indicatorsContainer: (base) => ({ ...base, borderTopRightRadius: '5px', borderBottomRightRadius: '5px'  }),
                                                      dropdownIndicator: (base) => ({ ...base, borderTopRightRadius: '5px', borderBottomRightRadius: '5px'  }),
                                                      container: (base) => ({ ...base, borderRadius: '5px' }),
                                                      multiValueLabel: (base) => ({ ...base, color: '#DEDEDE' }),
                                                      placeholder: (base) => ({ ...base, backgroundColor: "#30343D" }),
                                                      singleValue: (base) => ({ ...base, color: '#DEDEDE' }),
                                                      input: (base) => ({ ...base, color: '#DEDEDE' }),
                                                      multiValue: (base) => ({ ...base, backgroundColor: '#30343D' }),
                                                      control: (base) => ({ ...base, backgroundColor: '#30343D', borderRadius: '5px', border: 'none' }),}}/>
        </div>

        <div className="m-2 rounded">
          <Select onChange={e => timeSelect(e ? e.value : "")} placeholder="Select time" className="basic-single" classNamePrefix="text-text outline-0 " options={times} styles={{ menu: (base) => ({ ...base, backgroundColor: "#30343D" }),
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

      <div className=" w-screen h-screen">
          <iframe className="w-full h-full" loading="lazy" src={grafanaSrc} ></iframe>
      </div>
      
    </div>
  )
}