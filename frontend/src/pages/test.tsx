import { useEffect, useState } from "react"

export default function test() {

  const [emptyArray, setEmptyArray] = useState<undefined[]>([...Array(3)])

  console.log(emptyArray)


  return (
    <>
      <h3 className=" font-bold text-gray-700 text-center" > Health Graphs</h3>

      <div>
        {emptyArray.map((_, index) => {
          return (
            <iframe key={index} loading="eager" src={`http://localhost:3000/d-solo/en2yCsa4k/overview-of-devices?orgId=1&var-risk_group=healthy&var-serial_number=All&panelId=${index+12}&refresh=15s`} width="450" height="200"></iframe>
          )
        })
        }
        
      </div>
    </>
  )
}
