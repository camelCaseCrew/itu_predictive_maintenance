
export default function App() {
  return (
    <>
      <h3 className=" font-bold text-gray-700 text-center"> Home Page</h3>

      <div className="flex row justify-center gap-4 flex-wrap h-screen w-full">
        <iframe src="http://localhost:3000/d-solo/en2yCsa4k/overview-of-devices?orgId=1&panelId=2" width="450" height="200"></iframe>

        <iframe src="http://localhost:3000/d-solo/en2yCsa4k/overview-of-devices?orgId=1&panelId=3" width="450" height="200"></iframe>

        <iframe src="http://localhost:3000/d-solo/en2yCsa4k/overview-of-devices?orgId=1&panelId=4" width="450" height="200"></iframe>
      </div>
    </> 
  )
}