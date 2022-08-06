import React, { useState } from "react";
import Login from "./login.js";
import Register from "./register.js";

export default function AuthenticationModal(props) {
    const [view, setView] = useState("login");
    let inputs;

    if (view == "login") {
        inputs = 
            <div className="column">
                <h3 style={{marginBottom: "0"}}> Sign in to Sunflower Washateria </h3>
                <div id="sign-up-benefits">
                    <p> Why sign up with us? </p><br/>
                    <p> You can access our pickup and delivery services, receive notifications for any discounts, and more! </p><br/>
                    <p> Forgot your username or password? Create another account with a new username, or leave us a message in the Contact Us section to get it resolved. </p>
                </div>
                <Login setToken={props.setToken} loggedIn={props.loggedIn}/>
                <p id="sign-up-now"> Don't have an account? <a onClick={(e) => { setView("register") }}> Sign up now! </a></p>
            </div>
    }
    else {
        inputs = 
            <div>
                <h3> Register for Sunflower Washateria </h3>
                <Register setView={setView}/>
                <p id="sign-in-now"> Already have an account? <a onClick={(e) => { setView("login") }}> Sign in now! </a></p>
            </div>
    }

    return (
        <div id="authentication-modal" className="hidden">
            <div id="authentication-modal-content" className="row">
                <i id="close-authentication-modal" onClick={props.onClick} className="material-symbols-outlined"> <a> close </a> </i>
                {inputs}
            </div>
        </div>
    );
}