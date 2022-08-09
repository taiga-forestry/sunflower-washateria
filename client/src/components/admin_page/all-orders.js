import Nav from "../navigation.js";
import Footer from "../footer.js";
import React, { useState, useEffect } from "react";
import convertTime from "../../utilities/convert-time.js";
import convertDate from "../../utilities/convert-date.js";
const XLSX = require("xlsx");

export default function AllOrders(props) {
    const [date, setDate] = useState();

    const findOrders = (e) => {
        e.preventDefault();
        setDate(e.target.value);

        fetch(`https://sunflower-washateria-test.herokuapp.com/find-orders-by-date/${e.target.value}`, {
            method: "GET"
        })
        .then((response) => { return response.json() })
        .then((data) => { 
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
        let rows = `
        <tr>
            <th> Date </th>
            <th> Time </th>
            <th> Address </th>
        </tr>`

        for (let order of orderHistory) {
            orders += `
            <div class="past-order">
                <p> Order ${count} — ${convertDate(order.date)} </p>
                <p> Time: ${convertTime(order.time)} </p>
                <p> Address: ${order.address} </p>
            </div>`;
            count += 1;

            rows += `
            <tr>
                <td> ${convertDate(order.date)} </td>
                <td> ${convertTime(order.time)} </td>
                <td> ${order.address} </td>
            </tr>
            `;
        }

        if (orderHistory.length == 0) {
            document.getElementById("orders-by-date").innerHTML = `<p> There were no orders on this date. </p>`;
        }
        else {
            document.getElementById("orders-by-date").innerHTML = orders;
        }

        document.getElementById("orders-table").innerHTML = rows;
    }

    const exportData = (e) => {
        e.preventDefault();

        // Acquire Data (reference to the HTML table)
        var table_elt = document.getElementById("orders-table");

        // Extract Data (create a workbook object from the table)
        var workbook = XLSX.utils.table_to_book(table_elt);

        console.log(workbook);

        // Process Data (add a new row)
        var ws = workbook.Sheets["Sheet1"];
        XLSX.utils.sheet_add_aoa(ws, [], {origin: 0});

        // Package and Release Data (`writeFile` tries to write and save an XLSB file)
        XLSX.writeFile(workbook, `Orders on ${date}.xlsb`);
    }

    if (props.token && props.token[5] == "admin") {
        return (
            <div style={{position: "relative", minHeight: "72vh"}}>
                <Nav token={props.token} setToken={props.setToken} ids={[]}/>
                <section id="all-orders">
                    <h2> View All Orders </h2>
                    <div id="all-orders-grid" className="grid">
                        <form onSubmit={exportData}>
                            <h3> Choose Date: </h3>
                            <input className="date-input" type="date" onChange={findOrders} style={{marginBottom: "10px", marginRight: "10px"}}/>
                            <input className="date-submit" type="submit" value="Export Data"/>
                        </form>
                        <div id="orders-by-date"></div>
                    </div>
                </section>
                <table id="orders-table" style={{display: "none"}}></table>
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