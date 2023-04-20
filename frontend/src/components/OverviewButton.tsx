import Link from "next/link";


const OverviewButton = ( props: {Status: string, Id: string, HexColor: string, href: string, percentage: number} ) => {
    return (
        <div id={props.Id} className=" w-[25%] sm:w-[18%] md:w-[13%] h-32 ">
            <Link href={props.href}>
            
            <div className=" w-full h-32 lg:h-36 bg-component1 text-center rounded-[3px] shadow-2xl">
                <div style={{backgroundColor: props.HexColor}} className={`w-[40%] aspect-square outline inline-block mt-2`}>
                    <span className=" w-full"> &#8205; </span>
                </div>
                <h1 className=" text-xl text-text">{props.Status}</h1>
                <h1 className=" text-xl text-text">{(Math.round(props.percentage * 10) /10).toFixed(1)}%</h1>
            </div>

            <div className=" w-full bg-component1 mt-3 rounded-[3px] shadow-2xl">
                <h1 className=" w-full h-8 text-xl text-text justify-center flex ">Go to</h1>
            </div>
            
            </Link>
        </div>
    )
}

export default OverviewButton;