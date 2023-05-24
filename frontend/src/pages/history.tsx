import Navbar from '@/components/Navbar'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import LogData from '@/components/LogData'
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import { useState, useEffect } from "react"


interface MultiSelectType {
    name: string,
    code: string
}


export default function History() {
    const [selectedDeviceTypes, updateSelectedDeviceTypes] = useState<MultiSelectType[]>([])
    const [deviceTypes, updateDeviceTypes] = useState([])
    const [selectedSerialNumbers, updateSelectedSerialNumbers] = useState<MultiSelectType[]>([])
    const [serialNumbers, updateSerialNumbers] = useState([])
    const sortsP = [
        { name: "Highest to lowest", code: "desc" },
        { name: "Lowest to highest", code: "asc" },
    ]
    const sortsD = [
        { name: "Newest to oldest", code: "desc" },
        { name: "Oldest to newest", code: "asc" },
    ]
    const [predictionSort, updatePredictionSort] = useState<{name: string; code: string;}>()
    const [dateSort, updateDateSort] = useState<{name: string; code: string;}>()

    function getDeviceTypes() { // Get device types from prometheus
        fetch(`http://localhost:9090/api/v1/label/device_type/values`)
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                const mappedData = data.data.map((type: string) => ({name: type, code: type})) // Map types from string to {name: string, code: string}
                updateDeviceTypes(mappedData)

            }
        })
    }

    function getSerialNumbers() {
        fetch(`http://localhost:9090/api/v1/label/serial_number/values`)
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                const mappedData = data.data.map((serial: string) => ({name: serial, code: serial})) // Map serial numbers from string to {name: string, code: string}
                updateSerialNumbers(mappedData)
            }
        })
    }

    useEffect(() => {
        getDeviceTypes()
        getSerialNumbers()
        console.log(serialNumbers)
    }, [])

    return (
        <>
            <Head>
                <title>PredictIT - History</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="bg-component1 m-4 p-4 flex place-content-between items-center pr-48 pl-16 overflow-x-auto">

                <div style={{ minWidth: "200px" }} className="w-48 py-1 m-2">
                    <span className="p-float-label">
                        <MultiSelect id="typeMultiSelect" value={selectedSerialNumbers} onChange={(e) => updateSelectedSerialNumbers(e.value)} options={serialNumbers} optionLabel="name" filter maxSelectedLabels={3} virtualScrollerOptions={{ itemSize: 43 }} className="w-full md:w-20rem" />
                        <label htmlFor="PredictionSort">Serial number</label>
                    </span>
                </div>
                
                <div style={{ minWidth: "200px" }} className="w-48 py-1 m-2">
                    <span className="p-float-label">
                        <Dropdown inputId="DateSort" value={dateSort} onChange={(e) => updateDateSort(e.value)} options={sortsD} optionLabel="name" className="w-full md:w-20rem" />
                        <label htmlFor="DateSort">Date Sort</label>
                    </span>
                </div>

                <div style={{ minWidth: "200px" }} className="w-48 py-1 m-2">
                    <span className="p-float-label">
                        <MultiSelect id="typeMultiSelect" value={selectedDeviceTypes} onChange={(e) => updateSelectedDeviceTypes(e.value)} options={deviceTypes} optionLabel="name" filter className="w-full md:w-20rem" />
                        <label htmlFor="PredictionSort">Device Type</label>
                    </span>
                </div>

                <div style={{ minWidth: "200px" }} className="w-48 py-1 m-2">
                    <span className="p-float-label">
                        <Dropdown inputId="PredictionSort" value={predictionSort} onChange={(e) => updatePredictionSort(e.value)} options={sortsP} optionLabel="name" className="w-full md:w-20rem" />
                        <label htmlFor="PredictionSort">Prediction Sort</label>
                    </span>
                </div>
                
            </div>

            <div className="bg-component ml-4 mr-4 mt-2 p-4 h-4/6 overflow-x-auto">
                <LogData dateSort={dateSort?.code || ""} predictionSort={predictionSort?.code || ""} types={ selectedDeviceTypes.map(( deviceType ) => {return deviceType.code })} serialNumbers={ selectedSerialNumbers.map(( num ) => {return num.code })}/>
            </div>

        </>
    )
}
