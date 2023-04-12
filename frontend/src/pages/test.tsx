import { useState } from "react"

export default function test() {

  const [emptyArray, setEmptyArray] = useState<undefined[]>([...Array(6)])

  console.log(emptyArray) 
    
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


      <div className=" w-screen h-screen">
        <iframe  id="devices" className=" w-full h-full" loading="lazy" src={`http://localhost:3000/d/enayayaya/overview-of-devices-copy?orgId=1&refresh=60s&kiosk`}></iframe>
      </div>

    </>
  )
}
