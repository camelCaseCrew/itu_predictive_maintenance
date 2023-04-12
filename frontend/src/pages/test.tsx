import { useState } from "react"

export default function test() {
  const [grafanaSrc, updateGrafanaSrc] = useState(`http://localhost:3000/d/enayayaya/overview-of-devices-copy?orgId=1&refresh=60s&kiosk`)

  function handleClick() {
    console.log('You clicked me!');
    updateGrafanaSrc(`http://localhost:3000/d/enayayaya/health-graphs?orgId=1&refresh=5s&var-risk_group=risk&var-serial_number=All&kiosk`)
  }

  function riskGroupSelect(value: string) {
    console.log(value)
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


      <button className="bg-component1 text-text w-full h-28 flex justify-start place-items-center gap-x-4" type="button" onClick={handleClick}>Click me</button>

      <select name="Health" onChange={e => riskGroupSelect(e.target.value)}>
        <option value="healthy">Healthy</option>
        <option value="risk">Risk</option>
        <option value="critical">Critical</option>
      </select>

      <div className=" w-screen h-screen">
      <iframe className="w-full h-full" loading="lazy" src={grafanaSrc} ></iframe>
      </div>

    </>
  )
}