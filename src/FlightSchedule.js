import React, { useState, useEffect } from 'react';
import './FlightSchedule.css'; // Importējiet CSS failu

function FlightSchedule() {
    const [loadingFlights, setLoadingFlights] = useState(true);
    const [flights, setFlights] = useState([]);
    const [showBox, setShowBox] = useState(false); // Pievienojiet stāvokli, lai kontrolētu, vai parādīt lodziņu
    const [seats, setSeats] = useState([]); // Pievienojiet stāvokli sēdvietām

    useEffect(() => {
        async function getFlights() {
            try {
                const response = await fetch('https://tu.proti.lv/flights/');
                const data = await response.json();
                setFlights(data);
                setLoadingFlights(false);
            } catch (error) {
                console.error('There was an error!', error);
            }
        }
        getFlights();
    }, []);

    // Izveidojiet funkciju, kas parāda vai paslēpj lodziņu
    function toggleBox() {
        setShowBox(!showBox);
    }

    // Izveidojiet funkciju, kas iegūst sēdvietas no API
    useEffect(() => {
        async function getSeats() {
            try {
                const response = await fetch('https://tu.proti.lv/flights/'); // Aizstājiet ar savu API saiti
                const data = await response.json();
                setSeats(data);
            } catch (error) {
                console.error('There was an error!', error);
            }
        }
        if (showBox) { // Ielādējiet sēdvietas tikai tad, ja lodziņš ir atvērts
            getSeats();
        }
    }, [showBox]); // Atkārtojiet, kad showBox mainās

    return (
        <>
            {loadingFlights ? 
                <p>Loading...</p> 
                : 
                <div className="flight-schedule">
                    <img src="santa-airlines-logo.png" alt="Goblin" className="goblin-image"/>
                    <h2>Flight Schedule</h2>    
    <table>
        <tbody>
            {flights.map(flight => (
                <div className="lidojums" onClick={toggleBox}> {/* Pievienojiet klikšķināšanas notikumu */}
                <tr key={flight.flightNumber} className="orangeBorder">
                <img src="plane-arrival.png" alt="arrival" className="arrival"/>
                <img src="plane-departure.png" alt="departure" className="plane-departure"/>
                    <td className="flightNumber">{flight.flightNumber}</td>
                    <td className="origin">{flight.origin}</td>
                    <td className="destination">{flight.destination}</td>
                    <td className="departureDateTime">{flight.departureDateTime}</td>
                    <td className="arrivalDateTime">{flight.arrivalDateTime}</td>
                    <td className="flightDuration">{flight.flightDuration}</td>
    
                </tr>
                </div>
            ))}
        </tbody>
    </table>


        {showBox && 
        <div className="centeredBox">
            <div class="centrs">
                <h2>Seat reservation</h2>
                {seats.map((seat, index) => (
    <div key={index} style={{ color: seat.isReserved ? 'red' : 'green' }}>
        {seat.seatLetter}{seat.seatNumber}
    </div>
))};





            </div>
        </div>}

    </div>
            }
        </>
    );
}

export default FlightSchedule;
