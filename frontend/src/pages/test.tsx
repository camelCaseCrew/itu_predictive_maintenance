import { useState } from "react"
import React from 'react'
import Select from 'react-select'

export default function test() {
  const [grafanaSrc, updateGrafanaSrc] = useState(`http://localhost:3000/d/enayayaya/overview-of-devices-copy?orgId=1&refresh=60s&kiosk`)
  const [riskGroup, updateRiskGroup] = useState('healthy')
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  
  var serialNumber = 'All'

  function riskGroupSelect(value: string) {
    updateRiskGroup(value)
    const updated = `http://localhost:3000/d/enayayaya/health-graphs?orgId=1&refresh=5s&var-risk_group=`+value+`&var-serial_number=All&kiosk`
    updateGrafanaSrc(updated)
  }
  
  function serialSearchKeyDown(key: string) {
    if (key === 'Enter') {
      if (serialNumber === '') {
        serialNumber = 'All'
      }
      const updated = `http://localhost:3000/d/enayayaya/health-graphs?orgId=1&refresh=5s&var-risk_group=`+riskGroup+`&var-serial_number=`+serialNumber+`&kiosk`
      console.log(updated)
      updateGrafanaSrc(updated)
    }
  }
    
  if(typeof window !== "undefined" && window.document){
    window.addEventListener("blur", function (e) {
      setTimeout(function () {
        window.focus();
      }, 0);
    });
  }

  return (
    
    <div className="m-0">
        <select className="bg-component2 text-text rounded m-4 py-2 px-2" name="Health" onChange={e => riskGroupSelect(e.target.value)}>
          <option value="healthy">Healthy</option>
          <option value="risk">At Risk</option>
          <option value="critical">Critical</option>
        </select>

        <input className="bg-component2 text-text rounded py-2 px-2" type="text" placeholder="All" onChange={e => serialNumber = e.target.value} onKeyDown={e => serialSearchKeyDown(e.key)}></input>

        <div className="w-60">
        <Select classNamePrefix="bg-component2 text-text outline-0 " options={options} isMulti styles={{ menu: (base) => ({ ...base, backgroundColor: "#FF0000" }),
                                                    valueContainer: (base) => ({ ...base, borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px'  }),
                                                    indicatorsContainer: (base) => ({ ...base, borderTopRightRadius: '5px', borderBottomRightRadius: '5px'  }),
                                                    dropdownIndicator: (base) => ({ ...base, borderTopRightRadius: '5px', borderBottomRightRadius: '5px'  }),
                                                    container: (base) => ({ ...base, borderRadius: '5px' }),
                                                    multiValueLabel: (base) => ({ ...base, color: '#DEDEDE' }), 
                                                    multiValue: (base) => ({ ...base, backgroundColor: '#30343D' }),
                                                    control: (base) => ({ ...base, backgroundColor: '#30343D', borderRadius: '5px', border: 'none' }),}}/>
        
        </div>
        


        <div className=" w-screen h-screen">
        <iframe className="w-full h-full" loading="lazy" src={grafanaSrc} ></iframe>
        </div>
    </div>
  )
}