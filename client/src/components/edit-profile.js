import Nav from "./navigation.js";
import Footer from "./footer.js";
import React, { useState } from "react";

export default function EditProfile(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordState, setPasswordState] = useState("password");
    const [submitEnabled, setSubmitEnabled] = useState(true);

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

    const updateProfile = (e) => {
        e.preventDefault();
        
        if (submitEnabled) {
            submitEnabled(false);

            fetch(`https://sunflower-washateria-test.herokuapp.com/update-profile`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    phoneNumber,
                    username,
                    password,
                    oldUsername: props.token[4]
                })
            })
            .then((response) => { 
                props.setToken({token: [firstName, lastName, email, phoneNumber, username, "user"]});
                alert("profile successfully updated!");
                setSubmitEnabled(true);
            })
            .catch((error) => { console.log(error) });
        }
    }

    if (props.token) {
        return (
            <div style={{position: "relative", minHeight: "72vh"}}>
                <Nav token={props.token} setToken={props.setToken} ids={[]}/>
                <section id="edit-profile">
                    <h2> Edit Profile </h2>
                    <div className="column">
                        <form id="edit-profile-grid" className="grid" onSubmit={updateProfile}>
                            <input placeholder="first name" onChange={(e) => { setFirstName(e.target.value) }} required/>
                            <input placeholder="last name" onChange={(e) => { setLastName(e.target.value) }} required/>
                            <input placeholder="email" type="email" onChange={(e) => { setEmail(e.target.value) }} required/>
                            <input placeholder="phone (numbers only)" type="tel" pattern="[0-9]{10}" minLength={10} maxLength={10} onChange={(e) => { setPhoneNumber(e.target.value) }}/>
                            <input placeholder="username" onChange={(e) => { setUsername(e.target.value) }} minLength={6}/>
                            <input id="password" placeholder="password" onChange={(e) => { setPassword(e.target.value) }} minLength={6}/>
                            <a id="view-password-page" onClick={togglePasswordState}>
                                <i className="fa-solid fa-eye"/>
                            </a>
                            <input id="edit-profile-submit" type="submit" value="Save Changes"></input>
                        </form>
                    </div>
                </section>
                <Footer/>
            </div>
        );
    }
    else {
        <h3> You must be logged in to view this page! Return to the home page <a href="/">here</a> </h3>
    }
}