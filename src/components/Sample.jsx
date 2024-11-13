import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [flightNumber, setFlightNumber] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [arrivalAirport, setArrivalAirport] = useState('');
    const [predictedDelay, setPredictedDelay] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Placeholder for prediction logic
        const delay = 30; // Replace with actual prediction logic
        setPredictedDelay(delay);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="card-title text-center">Flight Delay Prediction</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="flightNumber">Flight Number</label>
                                    <input
                                        type="text"
                                        id="flightNumber"
                                        className="form-control"
                                        value={flightNumber}
                                        onChange={(e) => setFlightNumber(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="departureDate">Departure Date</label>
                                    <input
                                        type="date"
                                        id="departureDate"
                                        className="form-control"
                                        value={departureDate}
                                        onChange={(e) => setDepartureDate(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="arrivalAirport">Arrival Airport</label>
                                    <input
                                        type="text"
                                        id="arrivalAirport"
                                        className="form-control"
                                        value={arrivalAirport}
                                        onChange={(e) => setArrivalAirport(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Predict Delay</button>
                            </form>
                            {predictedDelay !== null && (
                                <div className="alert alert-info mt-3">
                                    Predicted Delay: {predictedDelay} minutes
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
