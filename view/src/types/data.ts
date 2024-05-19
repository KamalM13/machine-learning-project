export type Result = {
    confidence_percentage: number;
    model_name: string;
    prediction_result: string;
};

export type PredictionData = {
    results: Result[];
};