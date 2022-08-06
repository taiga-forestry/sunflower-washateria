import Gallery from "./gallery.js";

export default function About() {
    return (
        <div id="about">
            <h2> About Us </h2>
            <p id="autobiography">
                Welcome to Sunflower Washateria! We're a locally owned and managed family business who has served the Greater Houston area since 2010. 
                Our goal is to provide premium laundry services at competitive rates accessible to anyone who might need it, easing the burden of managing your laundry, which can be inconvenient, expensive, and simply frustrating to do at home. 
                Check out the variety of different services along with other amenities and features we offer below — we hope you enjoy your visit!
            </p>
            <div className="row">
                <Gallery/>
                <ul id="other-amenities">
                    <li> Convenient bill changing machines </li>
                    <li> Laundry detergent and fabric softener available for purchase </li>
                    <li> Large folding stations </li>
                    <li> Free Wi-Fi and TV </li>
                    <li> Vending machines for snacks, beverages, and other refreshments </li> 
                    <li> Massage chairs, a pool table, and other games </li>
                    <li> Specialized care available for laundry with extra grime and stains </li>
                    <li> Fully-attended with employees available for assistance </li>
                </ul>
            </div>
        </div>
    );
}