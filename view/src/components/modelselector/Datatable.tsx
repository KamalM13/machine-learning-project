import { PredictionData, Result } from "../../types/data";


function votingEnsemble(results: Result[]): string {
    const voteCount: Record<string, number> = {};

    results.forEach(result => {
        const prediction = result.prediction_result;
        if (voteCount[prediction]) {
            voteCount[prediction]++;
        } else {
            voteCount[prediction] = 1;
        }
    });

    let maxVotes = 0;
    let finalPrediction = '';

    for (const prediction in voteCount) {
        if (voteCount[prediction] > maxVotes) {
            maxVotes = voteCount[prediction];
            finalPrediction = prediction;
        }
    }

    return finalPrediction;
}

const Datatable = ({ results }: PredictionData) => {
    const finalPrediction = votingEnsemble(results);
    console.log(`Final Prediction: ${finalPrediction}`);

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
                    {results.map((result: any, index: number) => (
                        <tr key={index} className={(index % 2 === 0) ? "bg-gray-200" : ""}>
                            <td className="border px-4 py-2">{result.model_name}</td>
                            <td className="border px-4 py-2">{result.prediction_result}</td>
                            <td className="border px-4 py-2">{result.confidence_percentage.toFixed(2)}%</td>
                        </tr>
                    ))}

                </tbody>
            </table>
            <div>
                <h1 className="text-2xl font-bold text-center">Final Prediction: {finalPrediction}</h1>
            </div>
        </div>
    );
}

export default Datatable