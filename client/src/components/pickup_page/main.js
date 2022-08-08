import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function Main(props) {
    const [zipcodes, setZipcodes] = useState([]);

    useEffect(() => {
        console.log("TRIGGERED");
        fetch(`https://sunflower-washateria-test.herokuapp.com/get-zipcodes`, {
            method: "GET"
        })
        .then((response) => { return response.json() })
        .then((data) => { 
            let zips = [];

            for (let zipcode of data) {
                zips.push(zipcode.zipcode);
            }
            setZipcodes(zips);
        })
        .catch((error) => { console.log(error) })
    })

    return (
        <main id="pickup-main">
            <section id="pickup-container" className="row">
                <Order token={props.token} zipcodes={zipcodes} setZipcode={setZipcodes}/>
            </section>
        </main>
    );
}

function Order(props) {
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [street, setStreet] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [zipcode, setZipcode] = useState();
    const [submitEnabled, setSubmitEnabled] = useState(true);
    const navigate = useNavigate();

    const placeOrder = (e) => {
        e.preventDefault();

        if (!props.token) {
            alert("you must be logged in to place an order");
        }
        else if (!props.zipcodes.includes(zipcode)) {
            console.log(props.zipcodes);
            console.log(zipcode);
            alert("sorry, we currently do not serve your location -- check back another date!");
        }
        else if (submitEnabled) {
            setSubmitEnabled(false);
            let address = street.concat(", ", city, ", ", state, ", ", zipcode);

            fetch(`https://sunflower-washateria-test.herokuapp.com/place-order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstName: props.token[0],
                    lastName: props.token[1],
                    email: props.token[2],
                    phoneNumber: props.token[3],
                    username: props.token[4],
                    date: date,
                    time: time,
                    address: address
                })
            })
            .then((response) => {
                updateUserHistory();
                alert(`order placed successfully! you can view your orders by clicking "view orders" in profile`);
                setSubmitEnabled(true);
                navigate("/");
            })
            .catch((error) => { console.log(error) });
        }
    }

    const updateUserHistory = () => {
        fetch(`https://sunflower-washateria-test.herokuapp.com/check-username/${props.token[4]}`, {
            method: "GET"
        })
        .then((response) => { return response.json() })
        .then((data) => { 
            let oldHistory = data.orderHistory;
            let address = street.concat(", ", city, ", ", state, ", ", zipcode);

            fetch(`https://sunflower-washateria-test.herokuapp.com/update-history`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    date: date,
                    time: time,
                    address: address,
                    username: props.token[4],
                    oldHistory: oldHistory
                })
            })
            .catch((error) => { console.log(error) })
        })
        .catch((error) => { console.log(error) })
    }

    const displayZipcodes = () => {
        let zips = [];

        for (let zipcode of props.zipcodes) {
            zips.push(zipcode + ", ");
        }

        return zips;
    }
    
    return (
        <div id="order">
            <h2> Pickup and Delivery Laundry </h2>
            <h4> $1/pound </h4>
            <form id="order-form" onSubmit={placeOrder} className="column">
                <p> Don’t have the time or energy to finish laundry this week? Not a problem — Sunflower Washateria now offers pickup and delivery laundry services! Place an order in 4 simple steps: </p>
                <p> 1. Register an account with us and get logged in! Click the Login/Register button in the top right corner of your screen to get started. </p>
                <p> 2. Check the calendar below for available times, and select a time and address for us to come and pick up your laundry! </p>
                <p> NOTE: We currently only provide laundry pickup and delivery services to the zipcodes listed below. If your current zipcode isn't listed, please check back at another date! </p>
                <p> {displayZipcodes()} </p>
                <div id="date-inputs" className="grid">
                    <input type="date" className="date-input" onChange={(e) => setDate(e.target.value)} required/>
                    <input type="time" className="date-input" onChange={(e) => setTime(e.target.value)} required/>
                    <input type="text" className="date-input" placeholder="street address" onChange={(e) => setStreet(e.target.value)} required/>
                    <input type="text" className="date-input" placeholder="city" onChange={(e) => setCity(e.target.value)} required/>
                    <input type="text" className="date-input" placeholder="state" onChange={(e) => setState(e.target.value)} required/>
                    <input type="text" className="date-input" placeholder="zipcode" onChange={(e) => setZipcode(e.target.value)} required/>
                </div>
                <p> 3. On that date and time, leave out your laundry for our employee to come and pick it up. We'll weigh your clothes at the door, then you can pay us with Zelle or PayPal. </p>
                <p> 4. Sit back and relax! After a day, your clothes will be returned to you washed, dried, and folded to perfection. You'll receive a text/email when its done! </p>
                <div id="date-submits" className="row">
                    <input type="submit" className="date-submit" value="Place Order!" required/>
                </div>
                {/* notes: location preferences, laundry washing preferences, down payment, policies */}
            </form>
        </div>
    );
}