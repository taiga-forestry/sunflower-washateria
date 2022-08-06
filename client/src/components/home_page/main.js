import About from "./about.js";
import Services from "./services.js";
import FAQ from "./faq.js";
import Contact from "./contact.js";

export default function Main() {
    return (
        <main id="main" className="column">
            <section id="about-container" className="row"><About/></section>
            <section id="services-container" className="row"><Services/></section>
            <section id="faq-container" className="row"><FAQ/></section>
            <section id="contact-container" className="row"><Contact/></section>
        </main>
    );
}