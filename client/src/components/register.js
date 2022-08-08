import React, { useState } from "react";

export default function Register(props) {
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

    const alertInvalidForm = (id, field, minLength) => {
        // if (field.length < minLength) {
        //     document.getElementById(id).classList.add("invalid");
        //     document.getElementById(id + "-invalid").innerHTML = "Not long enough!";
        // }
        // else {
        //     document.getElementById(id).classList.remove("invalid");
        // }
    }

    // const validatePhone = () => {
    //     fetch(`https://ipqualityscore.com/api/json/phone/ItCWXbWTSdhsblexQ8m9Lt0jiUqY0K4j/${phoneNumber}`, {
    //         method: "GET"
    //     })
    //     .then((response) => { return response.json() })
    //     .then((data) => { console.log(data) })
    //     .catch((error) => { console.log(error) });
    // }

    // const validateEmail = () => {
    //     let i = 0;
    //     let at_index = -1;
    //     let dot_index = -1;

    //     while (i < email.length) {
    //         if (email[i] == "@") {
    //             at_index = i;
    //         }
    //         else if (email[i] == "." && at_index != -1) {
    //             if (dot_index != - 1) {
    //                 return false;
    //             }
    //             else {
    //                 dot_index = i;
    //             }
    //         }

    //         i += 1;
    //     }

    //     return (at_index != -1 && dot_index != -1 && dot_index != email.length);
    // }

    const validateCredentials = (e) => {
        e.preventDefault();

        if (submitEnabled) {
            setSubmitEnabled(false);

            fetch(`https://sunflower-washateria-test.herokuapp.com/check-username/${username}`, {
                method: "GET"
            })
            .then((response) => { return response.json() })
            .then((data) => { 
                // if username is not taken already
                if (data == null) {
                    registerUser();
                } 
                else {
                    alert("username taken! try again, or click forgot password");
                }
                
                setSubmitEnabled(true);
            })
            .catch((error) => { console.log(error) });
        }
    }

    const registerUser = () => {
        fetch(`https://sunflower-washateria-test.herokuapp.com/register-user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ firstName, lastName, email, phoneNumber, username, password, permissions: "user" })
        })
        .then((response) => { 
            alert("done registering! now redirecting you to login page.");
            props.setView("login");
        })
        .catch((error) => { console.log(error) });
    }

    return (
        <div>
            <form id="register" onSubmit={validateCredentials}>
                <div id="name-inputs" className="row">
                    <input 
                        id="first-name"
                        className="authentication-field-small"
                        placeholder="first name" 
                        onChange={(e) => setFirstName(e.target.value)}
                        onBlur={() => alertInvalidForm("first-name", firstName, 1)}
                        required
                    />         
                    <input 
                        id="last-name"
                        className="authentication-field-small"
                        placeholder="last name" 
                        onChange={(e) => setLastName(e.target.value)}
                        onBlur={() => alertInvalidForm("last-name", lastName, 1)}
                        required
                    />     
                </div>
                <div className="row">
                    <input 
                        id="email"
                        className="authentication-field"
                        type="email" 
                        placeholder="email" 
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => alertInvalidForm("email", email, 1)}
                        required
                    />           
                </div>
                <div className="row">
                    <input 
                        id="phone-number"
                        className="authentication-field"
                        type="tel"
                        pattern="[0-9]{10}"
                        placeholder="phone (numbers only)" 
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        onBlur={() => alertInvalidForm("phone-number", phoneNumber, 1)}
                        minLength={10}
                        maxLength={10}
                        required
                    />           
                </div>
                <div className="row">
                    <input 
                        id="username"
                        className="authentication-field"
                        type="text" 
                        placeholder="username" 
                        onChange={(e) => setUsername(e.target.value)}
                        onBlur={() => alertInvalidForm("username", username, 6)}
                        minLength={6}
                        required
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
                            onBlur={() => alertInvalidForm("password", password, 6)}
                            minLength={6}
                            required
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
                        value="Register Account"
                    />
                </div>
            </form>
        </div>
    );
}

// function FormInput() {
//     return (
//         <input
//             id={props.id}
//             className="authentication-field"
//             type={props.type}
//             placeholder={props.placeholder}
//             onChange={props.onChange}
//             onBlur={alertInvalidForm}
//         />
//     );
// }