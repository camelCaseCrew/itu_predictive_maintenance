import { useEffect, useState } from "react"

export default function test() {

  const [emptyArray, setEmptyArray] = useState<undefined[]>([...Array(6)])

  console.log(emptyArray)


  return (
    <>
      <h3 className=" font-bold text-gray-700 text-center" > Health Graphs</h3>

      <div className="flex row justify-center gap-4 flex-wrap">
        {emptyArray.map((_, index) => {
          return (
            <div className=" w-[23%] h-72">
            <iframe className=" w-full h-full" key={index} loading="lazy" src={`http://localhost:3000/d-solo/en2yCsa4k/overview-of-devices?orgId=1&var-risk_group=healthy&var-serial_number=All&panelId=${index+12}&refresh=60s`}></iframe>
            </div>
          )
        })}
        
      </div>
    </>
  )
}
