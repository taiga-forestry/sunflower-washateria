import React, { useState } from "react";
import AuthenticationModal from "./authentication-modal";
import ProfileModal from "./profile-modal";
import { useNavigate } from "react-router";

export default function Nav(props) {
    const [authenticationModal, setAuthenticationModal] = useState(false);
    const [profileModal, setProfileModal] = useState(false);    
    const navigate = useNavigate();
    let navEnd;
    let navModalEnd;

    const toggleAuthenticationModal = () => {
        if (authenticationModal) {
            closeAuthenticationModal();
        }
        else {
            openAuthenticationModal();
        }
    }

    const openAuthenticationModal = () => {
        document.getElementById("authentication-modal").classList.remove("hidden");

        for (let obj of document.querySelectorAll(".nav-item")) {
            obj.classList.remove("hover-underline-animation");
        }

        for (let id of props.ids) {
            document.getElementById(id).classList.add("translucent");
        }

        setAuthenticationModal(true);
    }

    const closeAuthenticationModal = () => {
        document.getElementById("authentication-modal").classList.add("hidden");

        for (let obj of document.querySelectorAll(".nav-item")) {
            obj.classList.add("hover-underline-animation");
        }

        document.getElementById("nav-end").classList.remove("hover-underline-animation");
        document.getElementById("nav-dropdown").classList.remove("hover-underline-animation");

        for (let id of props.ids) {
            document.getElementById(id).classList.remove("translucent");
        }

        setAuthenticationModal(false);
    }

    const toggleProfileModal = () => {
        if (profileModal) {
            closeProfileModal();
        }
        else {
            openProfileModal();
        }
    }

    const openProfileModal = () => {
        document.getElementById("profile-modal").classList.remove("hidden");
        setProfileModal(true);
    }

    const closeProfileModal = () => {
        document.getElementById("profile-modal").classList.add("hidden");
        setProfileModal(false);
    }

    const logOut = () => {
        props.setToken(null);
        document.getElementById("profile-modal").classList.add("hidden");
        setProfileModal(false);
        alert("you have been logged out!");
        navigate("/");
    }

    const openNavModal = () => {
        document.getElementById("nav-modal").classList.add("reveal");

        if (props.token) {
            closeProfileModal();
        }
        else {
            closeAuthenticationModal();
        }

        for (let id of props.ids) {
            document.getElementById(id).classList.add("blur");
        }
    }

    const closeNavModal = () => {
        document.getElementById("nav-modal").classList.remove("reveal");

        for (let id of props.ids) {
            document.getElementById(id).classList.remove("blur");
        }
    }

    window.matchMedia("(min-width: 768.5px)").addListener(() => {
        closeNavModal();
    });

    if (props.token) {
        navEnd = <a id="nav-end" className="nav-item" onClick={toggleProfileModal}> View Profile </a>;
        navModalEnd = <a href="" className="nav-modal-item" id="nav-modal-end" onClick={(e) => { e.preventDefault(); openProfileModal(); closeNavModal() }}> View Profile </a>
    }
    else {
        navEnd = <a id="nav-end" className="nav-item" onClick={toggleAuthenticationModal}> Login/Register </a>;
        navModalEnd = <a href="" className="nav-modal-item" id="nav-modal-end" onClick={(e) => { e.preventDefault(); openAuthenticationModal(); closeNavModal() }}> Login/Register </a>
    }

    return (
        <div>
            <nav id="nav" className="row">
                <a href="/#hero" className="nav-item hover-underline-animation left"> Sunflower Washateria </a>
                <a href="/#about" className="nav-item hover-underline-animation "> About </a>
                <a href="/#services" className="nav-item hover-underline-animation "> Services </a>
                <a href="/#faq" className="nav-item hover-underline-animation "> FAQ </a>
                <a href="/#contact" className="nav-item hover-underline-animation "> Contact </a>
                {navEnd}
                <i id="nav-dropdown" className="nav-item material-symbols-outlined"> 
                    <a onClick={openNavModal}> menu </a> 
                </i>
                <ProfileModal onClick={toggleProfileModal} token={props.token} setToken={props.setToken} logOut={logOut}/>
            </nav>
            <AuthenticationModal onClick={toggleAuthenticationModal} setToken={props.setToken} loggedIn={closeAuthenticationModal}/>
            
            <nav id="nav-modal" className="column">
                <i id="close-nav-modal" onClick={closeNavModal} className="material-symbols-outlined"> <a> close </a> </i>
                <a href="/#about" className="nav-modal-item" onClick={closeNavModal}> About </a>
                <a href="/#services" className="nav-modal-item" onClick={closeNavModal}> Services </a>
                <a href="/#faq" className="nav-modal-item" onClick={closeNavModal}> FAQ </a>
                <a href="/#contact" className="nav-modal-item" onClick={closeNavModal}> Contact </a>
                {navModalEnd}
            </nav>
        </div>
    );
}