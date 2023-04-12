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
    <>
      <h3 className=" font-bold text-gray-700 text-center" > Health Graphs</h3>

      <select name="Health" onChange={e => riskGroupSelect(e.target.value)}>
        <option value="healthy">Healthy</option>
        <option value="risk">Risk</option>
        <option value="critical">Critical</option>
      </select>

      <input type="text" placeholder="All" onChange={e => serialNumber = e.target.value} onKeyDown={e => serialSearchKeyDown(e.key)}></input>

      <div className=" w-screen h-screen">
      <iframe className="w-full h-full" loading="lazy" src={grafanaSrc} ></iframe>
      </div>

    </>
  )
}