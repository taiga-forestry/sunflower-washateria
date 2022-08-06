import React, { useState } from "react";

export default function Contact() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [message, setMessage] = useState();

    const sendMessage = (e) => {
        e.preventDefault();

        // validate form input

        fetch(`http://localhost:8080/send-contact-message`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name, email, phone, message})
        })
        .then((response) => { 
            alert("message sent!");
        })
        .catch((error) => { console.log(error) });
    }

    return (
        <div id="contact">
            <h2> Contact Us </h2>
            <p> Still have any questions or concerns? Leave us a message, and we'll get back to you as soon as we can! </p>
            <form id="contact-form" className="grid" onSubmit={sendMessage}>
                <input 
                    id="contact-name" 
                    placeholder="name" 
                    onChange={(e) => {setName(e.target.value)}} 
                    required
                />
                <input 
                    id="contact-email" 
                    type="email"
                    placeholder="email" 
                    onChange={(e) => {setEmail(e.target.value)}} 
                    required
                />
                <input 
                    id="contact-phone" 
                    type="tel"
                    placeholder="phone number" 
                    onChange={(e) => {setPhone(e.target.value)}} 
                    minLength={10}
                    required
                />
                <textarea 
                    id="contact-message" 
                    placeholder="message or question" 
                    onChange={(e) => {setMessage(e.target.value)}} 
                    required
                />
                <input id="contact-submit" type="submit"/>
            </form>
        </div>
    );
}

