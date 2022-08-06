import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>
);

let lastScrollY = window.scrollY;

window.onscroll = (event) => {
    toggleNav();
}

const toggleNav = () => {
    if (window.scrollY > 75 && lastScrollY < window.scrollY) {
        document.getElementById("nav").classList.add("hidden");
    }
    else {
        document.getElementById("nav").classList.remove("hidden");
    }

    lastScrollY = window.scrollY;
}