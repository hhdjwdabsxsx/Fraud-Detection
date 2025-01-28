import React, { useState } from "react";
import Result from "./Result";

function TransactionForm() {
    const [formData, setFormData] = useState({
        step: "",
        age: "",
        gender: "",
        zipcodeOri: "",
        merchant: "",
        zipMerchant: "",
        category: "",
        amount: ""
    });

    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:5000/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                setResult(data.fraud ? "Fraudulent" : "Not Fraudulent");
            } else {
                console.error(data.error);
                setResult("Error: " + data.error);
            }
        } catch (error) {
            console.error(error);
            setResult("Error connecting to the server.");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Step:
                    <input
                        type="number"
                        name="step"
                        value={formData.step}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Age:
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Gender:
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </select>
                </label>
                <label>
                    Zipcode:
                    <input
                        type="text"
                        name="zipcodeOri"
                        value={formData.zipcodeOri}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Merchant:
                    <input
                        type="text"
                        name="merchant"
                        value={formData.merchant}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Merchant Zip:
                    <input
                        type="text"
                        name="zipMerchant"
                        value={formData.zipMerchant}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Category:
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Amount:
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Predict</button>
            </form>

            {result && <Result result={result} />}
        </div>
    );
}

export default TransactionForm;
