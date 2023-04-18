//this is a very hacky solution that essentially detects when the window is no longer the focus
//ie. you have focused on the Grafana Embed, and changes the focus to the window. This is done
//to prevent exiting kiosk mode on the Grafana embed, however a better solution could be
//1. managing user permissions such that an anonymous viewer cannot get a full view
//or 2. disabling the hotkeys to exit kiosk mode (esc or f) on the Grafana embed
export default function App() {
  /*if (typeof window !== "undefined") {
    window.addEventListener("blur", function (e) {
      setTimeout(function () {
        window.focus();
      }, 0);
    });
  }*/

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