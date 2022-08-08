import Nav from "../navigation.js";
import Footer from "../footer.js";
import React, { useState, useEffect } from "react";

export default function EditSettings(props) {
    const [zipcode, setZipcode] = useState();
    const [allZipcodes, setAllZipcodes] = useState();
    const [updated, setUpdated] = useState(false);
    const [submitEnabled, setSubmitEnabled] = useState(true);

    useEffect(() => {
        if (!updated) {
            console.log("triggered rerender");

            fetch(`https://sunflower-washateria-test.herokuapp.com/get-zipcodes`, {
                method: "GET"
            })
            .then((response) => { return response.json() })
            .then((data) => { 
                displayZipcodes(data);
            })
            .catch((error) => { console.log(error) })
        }
    })

    const displayZipcodes = (data) => {
        let zipcodes = [];

        for (let zipcode of data) {
            zipcodes.push(
                <div key={zipcode.zipcode} className="zipcode row">
                    <p id={zipcode.zipcode}> {zipcode.zipcode} </p>
                    <button className="right" onClick={() => deleteZipcode(zipcode.zipcode)}> Remove </button>
                </div>);
        }

        setAllZipcodes(zipcodes);
        setUpdated(true);
    }

    const addZipcode = (e) => {
        e.preventDefault(); 
        
        if (submitEnabled) {
            setSubmitEnabled(false);

            fetch(`https://sunflower-washateria-test.herokuapp.com/get-zipcodes`, {
                method: "GET"
            })
            .then((response) => { return response.json() })
            .then((data) => { 
                let contains = false;
    
                for (let zip of data) {
                    contains = contains || zip.zipcode == zipcode;
                }
    
                if (!contains) {
                    fetch(`https://sunflower-washateria-test.herokuapp.com/add-zipcode`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({zipcode})
                    })
                    .then((response) => { setUpdated(false) })
                    .catch((error) => { console.log(error) }) 
                }
                else {
                    alert("zipcode is already in the database!");
                }

                setSubmitEnabled(true);
            })
            .catch((error) => { console.log(error) })
        }
    }

    const deleteZipcode = (zipcode) => {
        fetch(`https://sunflower-washateria-test.herokuapp.com/delete-zipcode`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({zipcode})
        })
        .then((response) => { setUpdated(false) } )
        .catch((error) => { console.log(error) })
    }

    if (props.token && props.token[5] == "admin") {
        return (
            <div style={{position: "relative", minHeight: "72vh"}}>
                <Nav token={props.token} setToken={props.setToken} ids={[]}/>
                <section id="edit-zipcodes">
                    <h2> Edit Zipcodes </h2>
                    <div className="row">
                        <div>
                            <h3> Zipcodes: </h3>
                            <div id="zipcodes">
                                {allZipcodes}
                            </div>
                        </div>
                        <div>
                            <h3> Add a Zipcode: </h3>
                            <form onSubmit={addZipcode}>
                                <input className="zipcode-input" placeholder="zipcode" onChange={(e) => {setZipcode(e.target.value)}} required/>
                                <input id="zipcode-submit" type="submit" value="Submit"/>
                            </form>
                        </div>
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