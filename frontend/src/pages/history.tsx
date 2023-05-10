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
    const [predictionSort, updatePredictionSort] = useState<{name: string; code: string;}>()

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
                
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                
                
            </Head>

            <div className="bg-component1 m-4 p-4 flex place-content-between items-center pr-48 pl-16 overflow-x-auto">

                <MultiSelect value={selectedSerialNumbers} onChange={(e) => updateSelectedSerialNumbers(e.value)} options={serialNumbers} virtualScrollerOptions={{ itemSize: 43 }} optionLabel="name" filter 
                placeholder="Serial number" maxSelectedLabels={3} className="w-48 h-16 md:gap-x-4 transition duration-300 shadow-2xl mr-2" />
                
                <select className="bg-component2 text-text rounded w-48 h-16 md:gap-x-4 transition duration-300 shadow-2xl mr-2" name="dateFilter">
                    <option value="" disabled selected>Date</option>
                    
                    <option value="desc">Newest to oldest</option>
                    <option value="asc">Oldest to newest</option>
                </select>

                <MultiSelect id='typeMultiSelect' value={selectedDeviceTypes} onChange={(e) => updateSelectedDeviceTypes(e.value)} options={deviceTypes} optionLabel="name" filter 
                placeholder="Type" maxSelectedLabels={3} className="w-48 h-16 md:gap-x-4 transition duration-300 shadow-2xl mr-2" />

                <div style={{ minWidth: "15%" }} className="pt-6 pb-2 m-2">
                    <span className="p-float-label">
                        <Dropdown inputId="PredictionSort" filter value={predictionSort} onChange={(e) => updatePredictionSort(e.value)} options={sortsP} optionLabel="name" className="w-full md:w-20rem" />
                        <label htmlFor="PredictionSort">Prediction Sort</label>
                    </span>
                </div>
                
            </div>

            <div className="bg-component ml-4 mr-4 mt-2 p-4 h-4/6 overflow-x-auto">
                <LogData predictionSort={predictionSort?.code || ""} types={ selectedDeviceTypes.map(( deviceType ) => {return deviceType.code })} serialNumbers={ selectedSerialNumbers.map(( num ) => {return num.code })}/>
            </div>

        </>
    )
}
