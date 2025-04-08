import React, { useState } from "react";
import axios from "axios";
import "./PredictionForm.css"; // Import CSS file

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    year_of_manufacture: "",
    kms_driven: "",
    fuel_type_Diesel: 0,
    fuel_type_Electric: 0,
    fuel_type_Hybrid: 0,
    fuel_type_LPG: 0,
    fuel_type_Petrol: 0,
    city_Ambattur: 0,
    city_Bangalore: 0,
    city_Chennai: 0,
    city_Delhi: 0,
    city_Faridabad: 0,
    city_Gurgaon: 0,
    city_Hyderabad: 0,
    city_Kolkata: 0,
    city_Mumbai: 0,
    city_Noida: 0,
    city_Pallikarnai: 0,
    city_Poonamallee: 0,
    city_Pune: 0,
    city_Thane: 0,
    city_Thiruvallur: 0,
    car_age: "",
  });
  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      year_of_manufacture: Number(formData.year_of_manufacture),
      kms_driven: Number(formData.kms_driven),
      car_age: new Date().getFullYear() - Number(formData.year_of_manufacture),
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        updatedFormData
      );
      setPrediction(response.data.predicted_price);
      console.log("Payload being sent:", updatedFormData);
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
                fuel_type_Petrol: 0,
                fuel_type_Diesel: 0,
                fuel_type_CNG: 0,
                fuel_type_Hybrid: 0,
                fuel_type_LPG: 0,
                fuel_type_Electric: 0,
              };
              fuel[`fuel_type_${e.target.value}`] = 1;
              setFormData({ ...formData, ...fuel });
            }}
          >
            <option value="">Select Fuel Type</option>

            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="CNG">CNG</option>
            <option value="Hybrid">Hybrid</option>
            <option value="LPG">LPG</option>
            <option value="Electric">Electric</option>
          </select>

          {/* City Selection */}
          <select
            name="city"
            onChange={(e) => {
              let cities = {
                city_Ambattur: 0,
                city_Chennai: 0,
                city_Bangalore: 0,
                city_Faridabad: 0,
                city_Gurgaon: 0,
                city_Hyderabad: 0,
                city_Kolkata: 0,
                city_Mumbai: 0,
                city_Noida: 0,
                city_Pallikarnai: 0,
                city_Poonamallee: 0,
                city_Pune: 0,
                city_Thane: 0,
                city_Thiruvallur: 0,
                city_Delhi: 0,
              };
              cities[`city_${e.target.value}`] = 1;
              setFormData({ ...formData, ...cities });
            }}
          >
            <option value="">Select City</option>
            <option value="Ambattur">Ambattur</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Chennai">Chennai</option>
            <option value="Delhi">Delhi</option>
            <option value="Faridabad">Faridabad</option>
            <option value="Gurgaon">Gurgaon</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Noida">Noida</option>
            <option value="Pallikarnai">Pallikarnai</option>
            <option value="Poonamallee">Poonamallee</option>
            <option value="Pune">Pune</option>
            <option value="Thane">Thane</option>
            <option value="Thiruvallur">Thiruvallur</option>
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
