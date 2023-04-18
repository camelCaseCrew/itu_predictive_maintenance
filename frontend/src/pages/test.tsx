import { useState } from "react"

export default function test() {
  const [grafanaSrc, updateGrafanaSrc] = useState(`http://localhost:3000/d/enayayaya/overview-of-devices-copy?orgId=1&refresh=60s&kiosk`)
  const [riskGroup, updateRiskGroup] = useState('healthy')

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
    <div className="bg-component1 m-0">
        <select className="bg-component2 text-text rounded m-4 py-2 px-2" name="Health" onChange={e => riskGroupSelect(e.target.value)}>
          <option value="healthy">Healthy</option>
          <option value="risk">At Risk</option>
          <option value="critical">Critical</option>
        </select>

        <input className="bg-component2 text-text rounded py-2 px-2" type="text" placeholder="All" onChange={e => serialNumber = e.target.value} onKeyDown={e => serialSearchKeyDown(e.key)}></input>

        <div className=" w-screen h-screen">
        <iframe className="w-full h-full" loading="lazy" src={grafanaSrc} ></iframe>
        </div>
    </div>
  )
}