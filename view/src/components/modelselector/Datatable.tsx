import { PredictionData } from "../../types/data";




const Datatable = ({ results }:PredictionData ) => {
    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-800">
                <thead>
                    <tr className="bg-blue-800 text-white">
                        <th className="px-4 py-2">Model Name</th>
                        <th className="px-4 py-2">Prediction Result</th>
                        <th className="px-4 py-2">Confidence Percentage</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result:any, index:number) => (
                        <tr key={index} className={(index % 2 === 0) ? "bg-gray-200" : ""}>
                            <td className="border px-4 py-2">{result.model_name}</td>
                            <td className="border px-4 py-2">{result.prediction_result}</td>
                            <td className="border px-4 py-2">{result.confidence_percentage.toFixed(2)}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Datatable