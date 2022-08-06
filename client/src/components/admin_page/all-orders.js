import Nav from "../navigation.js";
import Footer from "../footer.js";
import React, { useState, useEffect } from "react";
import convertTime from "../../utilities/convert-time.js";

export default function AllOrders(props) {
    const findOrders = (e) => {
        e.preventDefault();

        fetch(`http://localhost:8080/find-orders-by-date/${e.target.value}`, {
            method: "GET"
        })
        .then((response) => { return response.json() })
        .then((data) => { 
            console.log(data);
            displayOrders(data);
        })
        .catch((error) => { console.log(error) })
    }
    
    const displayOrders = (orderHistory) => {
        let orders = ``;
        orderHistory.sort((a, b) => {
            if (a.time > b.time) {
                return 1;
            }
            else if (a.time < b.time) {
                return -1;
            }
            else {
                return 0;
            }
        });

        let count = 1;
        for (let order of orderHistory) {
            orders += `
            <div class="past-order">
                <p> Order ${count} — ${order.date} </p>
                <p> Time: ${convertTime(order.time)}</p>
                <p> Address: ${order.address}</p>
            </div>`;
            count += 1;
        }

        if (orderHistory.length == 0) {
            document.getElementById("orders-by-date").innerHTML = `<p> There were no orders on this date. </p>`;
        }
        else {
            document.getElementById("orders-by-date").innerHTML = orders;
        }
    }

    if (props.token && props.token[5] == "admin") {
        return (
            <div style={{position: "relative", minHeight: "72vh"}}>
                <Nav token={props.token} setToken={props.setToken} ids={[]}/>
                <section id="all-orders">
                    <h2> View All Orders </h2>
                    <div id="all-orders-grid" className="grid">
                        <form>
                            <h3> Choose Date: </h3>
                            <input className="date-input" type="date" onChange={findOrders}></input>
                        </form>
                        <div id="orders-by-date"></div>
                    </div>
                </section>
                <Footer/>
            </div>
        );
    }
    else {
        return (
            <h3> You do not have the permissions to view this page! Return to the home page <a href="/"> here </a> </h3>
        );
    }
}