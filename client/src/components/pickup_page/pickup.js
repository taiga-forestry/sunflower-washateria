import Nav from "../navigation.js";
import Main from "./main.js";
import Footer from "../footer.js";

export default function PickupPage(props) {
    return (
        <div style={{position: "relative"}}>
            <Nav token={props.token} setToken={props.setToken} ids={["pickup-main"]}/>
            <Main token={props.token}/>
            <Footer/>
        </div>
    );
}