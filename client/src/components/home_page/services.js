import machine from "../../assets/laundry-machine.png";
import basket from "../../assets/laundry-basket.png";
import truck from "../../assets/laundry-truck.png";
import items from "../../assets/laundry-items.png";

export default function Services() {
    return (
      <div id="services">
        <h2> Our Services </h2>
        <div className="row">
            <Service 
                title="Pickup and Delivery"
                image={truck}
                description="Wash and Fold, but better! Schedule a time for us to pickup your laundry, and we'll have it washed, dried, and delivered the next day!"
                link="/pickup"
            />
            <Service
                title="Wash and Fold"
                image={basket}
                description="Don’t have the time or energy to finish laundry this week? Not a problem! Just drop it off with us at Sunflower Washateria."
                link="/#faq"
            />
            <Service
                title="Laundromat Machines"
                image={machine}
                description="Prefer to do it yourself? Use our coin-operated, professional-grade washers and dryers for whatever you might need."
                link="/#faq"
            />
            <Service
                title="Browse, Shop, Relax"
                image={items}
                description="From a Lost and Found to our own miniature shop to other various amenities, there's something for everyone to enjoy!"
                link="/store"
            />
        </div>
      </div>
    );
}
  
function Service(props) {
    let last;

    if (props.title == "Browse, Shop, Relax") {
        last = <a className="row service-button"> Coming Soon... </a>
    }
    else {
        last = <a href={props.link} className="row service-button"> Learn More </a>
    }
    
    return (
        <div className="service-card grid">
            <h3 className="service-title"> {props.title} </h3>
            <img className="service-image" src={props.image}/>
            <p className="service-description"> {props.description} </p>
            {last}
        </div>
    );
}