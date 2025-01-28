import React from "react";

function Result({ result }) {
    return (
        <div>
            <h2>Prediction Result</h2>
            <p>{result}</p>
        </div>
    );
}

export default Result;