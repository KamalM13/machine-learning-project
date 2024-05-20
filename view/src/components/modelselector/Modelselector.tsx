import axios from "axios"
import { useState } from "react"
import Datatable from "./Datatable"
import { PredictionData, Result } from "../../types/data"

const Modelselector = () => {
    const [selectFile, setSelectFile] = useState()
    const [prediction, setPrediction] = useState<Result[]>([])
    const [image, setImage] = useState<string | ArrayBuffer | null>(null)
    const [error, setError] = useState("")

    const handleFileChange = (e: any) => {
        setSelectFile(e.target.files[0])

        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(e.target.files[0]);

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
        <div className="p-5">
            <div className="flex flex-col items-center gap-y-3">
                <div>
                    <form className="" onSubmit={handleSubmit}>
                        {error && <div className="text-red-500">{error}</div>}
                        <input type="file" onChange={(e) => handleFileChange(e)} />
                        <button type="submit" className="bg-blue-500 text-white p-2 px-4 rounded-lg">Predict</button>
                    </form>

                </div>
                <div className="flex gap-x-3 items-center">
                    <div>
                        {image && <img src={image as string} className="w-[500px] h-[300px]" />}
                    </div>
                    {prediction.length != 0 && <Datatable results={prediction} />}
                </div>
                <div>

                </div>
            </div>

        </div>
    )
}

export default Modelselector