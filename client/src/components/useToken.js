import { useState } from "react";

const useToken = () => {
    const getToken = () => {
        const userToken = JSON.parse(localStorage.getItem("token"));

        return userToken?.token;
    }

    const storeToken = (userToken) => {
        if (userToken != null) {
            localStorage.setItem("token", JSON.stringify(userToken));
            setToken(userToken.token);
        }
        else {
            localStorage.removeItem("token");
            setToken();
        }
    }

    const [token, setToken] = useState(getToken());

    return { token, setToken: storeToken };
}

export default useToken;