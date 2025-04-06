import React, { useState } from "react";
import axios from "axios";
import "./PredictionForm.css"; // Import CSS file

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    year_of_manufacture: "",
    kms_driven: "",
    fuel_type_petrol: 0,
    fuel_type_diesel: 0,
    fuel_type_cng: 0,
    fuel_type_hybrid: 0,
    fuel_type_lpg: 0,
    fuel_type_electric: 0,
    city_bangalore: 0,
    city_mumbai: 0,
    city_delhi: 0,
    city_chennai: 0,
    city_pune: 0,
    city_kolkata: 0,
    city_hyderabad: 0,
    city_gurgaon: 0,
    city_noida: 0,
    city_faridabad: 0,
    car_age: "",
  });
  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentYear = new Date().getFullYear();
    const updatedFormData = {
      ...formData,
      car_age: currentYear - formData.year_of_manufacture,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        updatedFormData
      );
      setPrediction(response.data.predicted_price);
    } catch (error) {
      console.error("Error making prediction:", error);
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Car Price Prediction</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="year_of_manufacture"
            placeholder="Year of Manufacture"
            value={formData.year_of_manufacture}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="kms_driven"
            placeholder="Kilometers Driven"
            value={formData.kms_driven}
            onChange={handleChange}
            required
          />
          {/* Fuel Type Selection */}
          <select
            name="fuel_type"
            onChange={(e) => {
              let fuel = {
                fuel_type_petrol: 0,
                fuel_type_diesel: 0,
                fuel_type_cng: 0,
                fuel_type_hybrid: 0,
                fuel_type_lpg: 0,
                fuel_type_electric: 0,
              };
              fuel[`fuel_type_${e.target.value}`] = 1;
              setFormData({ ...formData, ...fuel });
            }}
          >
            <option value="">Select Fuel Type</option>
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
            <option value="cng">CNG</option>
            <option value="hybrid">Hybrid</option>
            <option value="lpg">LPG</option>
            <option value="electric">Electric</option>
          </select>

          {/* City Selection */}
          <select
            name="city"
            onChange={(e) => {
              let cities = {
                city_bangalore: 0,
                city_mumbai: 0,
                city_delhi: 0,
                city_chennai: 0,
                city_pune: 0,
                city_kolkata: 0,
                city_hyderabad: 0,
                city_gurgaon: 0,
                city_noida: 0,
                city_faridabad: 0,
              };
              cities[`city_${e.target.value}`] = 1;
              setFormData({ ...formData, ...cities });
            }}
          >
            <option value="">Select City</option>
            <option value="bangalore">Bangalore</option>
            <option value="mumbai">Mumbai</option>
            <option value="delhi">Delhi</option>
            <option value="chennai">Chennai</option>
            <option value="pune">Pune</option>
            <option value="kolkata">Kolkata</option>
            <option value="hyderabad">Hyderabad</option>
            <option value="gurgaon">Gurgaon</option>
            <option value="noida">Noida</option>
            <option value="faridabad">Faridabad</option>
          </select>

          <button type="submit">Predict Price</button>
        </form>
        {prediction !== null && (
          <div className="prediction-box">
            <h3>Predicted Price: ₹{prediction}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionForm;
