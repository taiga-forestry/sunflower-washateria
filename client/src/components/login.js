import React, { useState } from "react";
import sjcl from "sjcl";

export default function Login(props) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [passwordState, setPasswordState] = useState("password");

    const togglePasswordState = (e) => {
        if (passwordState == "password") {
            document.getElementById("password").type = "text";
            setPasswordState("text");
        }
        else {
            document.getElementById("password").type = "password";
            setPasswordState("password");
        }
    }

    const validateCredentials = (e) => {
        e.preventDefault();

        fetch(`http://localhost:8080/check-username/${username}`, {
            method: "GET"
        })
        .then((response) => { return response.json() })
        .then(async (data) => { 
            if (data == null) {
                alert("no matching username found");            
            } 
            else {
                let hashedPassword = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(password));

                if (hashedPassword == data.password) {
                    props.setToken({token: [data.firstName, data.lastName, data.email, data.phoneNumber, data.username, data.permissions]})
                    alert("login successful! now redirecting to home page");
                    props.loggedIn();
                }
                else {
                    alert("password is incorrect try again");      
                }
            }
        })
        .catch((error) => { console.log(error) });
    }

    return (
        <form id="login" onSubmit={validateCredentials}>
            <div className="row">
                <input
                    id="username"
                    className="authentication-field"
                    type="text" 
                    placeholder="username" 
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="row">
                <div style={{position: "relative"}}>
                    <input
                        id="password"
                        className="authentication-field"
                        type="password" 
                        placeholder="password" 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <a id="view-password-modal" onClick={togglePasswordState}>
                        <i className="fa-solid fa-eye"/>
                    </a>
                </div>
            </div>
            <div className="row">
                <input
                    className="authentication-submit"
                    type="submit"
                    value="Sign In"
                />
            </div>
        </form>
    );
}