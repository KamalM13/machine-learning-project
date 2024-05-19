import axios from "axios"
import { useState } from "react"
import Datatable from "./Datatable"
import { PredictionData, Result } from "../../types/data"

const Modelselector = () => {
    const options = ["InceptionRes", "MobileNet", "ResNet50", "Xception"]
    const [selectFile, setSelectFile] = useState("")
    const [prediction, setPrediction] = useState<Result[]>([])
    const [error, setError] = useState("")

    const handleFileChange = (e: any) => {
        setSelectFile(e.target.files[0])
        console.log(e.target.files[0])
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (!selectFile) {
            setError("Please select a file")
            return
        }
        try {
            const formData = new FormData();
            formData.append('file', selectFile);

            const response = await axios.post('http://localhost:5000/predict', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data.results)
            setPrediction(response.data.results)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="p-5 space-y-5">
            <div className="text-3xl text-white font-bold">Model Selector</div>
            <form className="" onSubmit={handleSubmit}>
                {error && <div className="text-red-500">{error}</div>}
                <input type="file" onChange={(e) => handleFileChange(e)} />
                {/* <select className="border-2 border-gray-500 rounded-lg p-1 px-4 m-2">
                    {options.map((option, index) => {
                        return <option key={index} value={option}>{option}</option>
                    })}
                </select> */}
                <button type="submit" className="bg-blue-500 text-white p-2 px-4 rounded-lg">Predict</button>
            </form>
            {prediction.length != 0 && <Datatable results={prediction} />}
        </div>
    )
}

export default Modelselector