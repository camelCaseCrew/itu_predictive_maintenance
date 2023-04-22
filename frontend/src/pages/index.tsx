
export default function App() {
  return (
    <>
      <h3 className=" font-bold text-gray-700 text-center"> Home Page</h3>

      <div className="flex row justify-center gap-4 flex-wrap h-screen w-full">
        {/*This source is a link to the grafana dashboard with uid=en2yCsa4k in kiosk mode*/}
        <iframe id="test" className=" w-full h-full" loading="lazy" src={`http://localhost:3000/d/en2yCsa4k/overview-of-devices?orgId=1&refresh=60s&kiosk`}></iframe>  
      </div>
    </> 
  )
}