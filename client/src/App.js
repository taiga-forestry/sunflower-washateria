import React from "react";
import { Route, Routes } from "react-router-dom";
import "./index.css";
import "./App.css";
import HomePage from "./components/home_page/home.js";
import PickupPage from "./components/pickup_page/pickup";
import OrderHistory from "./components/pickup_page/order-history";
import EditSettings from "./components/admin_page/edit-settings";
import EditProfile from "./components/edit-profile";
import AllOrders from "./components/admin_page/all-orders";
import useToken from "./components/useToken.js"

export default function App() {
    const { token, setToken } = useToken();

    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage token={token} setToken={setToken}/>}/>
                <Route path="/pickup" element={<PickupPage token={token} setToken={setToken}/>}/>
                {/* <Route path="/store" element={<StorePage/>}/> */}
                <Route path="/order-history" element={<OrderHistory token={token} setToken={setToken}/>}/>
                <Route path="edit-profile" element={<EditProfile token={token} setToken={setToken}/>}/>
                <Route path="/edit-settings" element={<EditSettings token={token} setToken={setToken}/>}/>
                <Route path="/all-orders" element={<AllOrders token={token} setToken={setToken}/>}/>
            </Routes>
        </div>
    );
}