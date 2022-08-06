import Nav from "../navigation.js";
import Hero from "./hero.js";
import Main from "./main.js";
import Footer from "../footer.js";

export default function HomePage(props) {
    return (
        <div style={{position: "relative"}}>
            <Nav token={props.token} setToken={props.setToken} ids={["hero", "main"]}/>
            <Hero token={props.token}/>
            <Main/>
            <Footer/>
        </div>
    );
}