import Nav from "../navigation.js";
import Footer from "../footer.js";
import React, { useState, useEffect } from "react";
import convertTime from "../../utilities/convert-time.js";

export default function OrderHistory(props) {
    useEffect(() => {
        if (props.token) {
            fetch(`https://sunflower-washateria-test.herokuapp.com/check-username/${props.token[4]}`, {
                method: "GET"
            })
            .then((response) => { return response.json() })
            .then((data) => { 
                displayOrders(data.orderHistory);
            })
            .catch((error) => { console.log(error) })
        }
    })

    const displayOrders = (orderHistory) => {
        console.log(orderHistory);
        let orders = ``;

        for (let order of orderHistory) {
            orders = `
            <div class="past-order"> 
                <p> Date: ${order.date}</p>
                <p> Time: ${convertTime(order.time)}</p>
                <p> Address: ${order.address}</p>
            </div>` + orders;
        }

        orders = "<div>" + "<h2> Your Order History </h2>" + orders + "</div>";

        if (orderHistory.length == 0) {
            document.getElementById("past-orders").innerHTML = `
                <div>
                    <h2> Your Order History </h2>
                    <p> You have no orders! Place one now <a href="/pickup"> here. </a> </p>
                </div>`;
        }
        else {
            document.getElementById("past-orders").innerHTML = orders;
        }
    }

    if (props.token) {
        return (
            <div style={{position: "relative", minHeight: "72vh"}}>
                <Nav token={props.token} setToken={props.setToken} ids={[]}/>
                <section id="past-orders" className="row">
                </section>
                <Footer/>
            </div>
        );
    }
    else {
        return (
            <h3> You must be logged in to view this page! Return to the home page <a href="/">here</a> </h3>
        );
    }
}