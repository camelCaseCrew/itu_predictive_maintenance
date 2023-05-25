import Link from "next/link";
import { useRouter } from 'next/router';
import { useGlobal } from '@/context/global';

const OverviewButton = ( props: {Status: string, Id: string, Filter: string, HexColor: string, href: string, percentage: number} ) => {
    const { filterInt, changeFilter } = useGlobal();
    const router = useRouter();
    const handleClick = () => {

        if(props.Id == "Healthy-goto-btn-id") {
            changeFilter(1)
        } 
        else if (props.Id == "Risk-goto-btn-id") {
            changeFilter(2)
        }
        else if (props.Id == "Critical-goto-btn-id") {
            changeFilter(3)
        }

        router.push(props.href);
    }
    
    return (

        

        <div className=" w-[25%] sm:w-[18%] md:w-[13%] h-32 ">
            
            
            <button onClick={handleClick} id={props.Id + "square"}  className=" w-full h-32 lg:h-36 bg-component1 text-center rounded-[3px] shadow-2xl">
                <div style={{backgroundColor: props.HexColor}} className={`w-[40%] aspect-square max-w-[80px] outline outline-1 inline-block mt-2`}>
                    <span className=" w-full"> &#8205; </span>
                </div>
                <h1 className=" text-xl text-text">{props.Status}</h1>
                <h1 className=" text-xl text-text">{(Math.round(props.percentage * 10) /10).toFixed(1)}%</h1>
            </button>

            <button onClick={handleClick} id={props.Id + "button"} className=" w-full bg-component1 mt-3 rounded-[3px] shadow-2xl">
                <h1 className=" w-full h-8 text-xl text-text justify-center flex ">Go to</h1>
            </button>
            
            
        </div>
    )
}

export default OverviewButton;