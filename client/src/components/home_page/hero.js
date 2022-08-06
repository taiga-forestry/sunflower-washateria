export default function Hero(props) {
    let greeting;

    if (props.token) {
        greeting = `Hi, ${props.token[0]}! Welcome to Sunflower Washateria.`
    }
    else {
        greeting = "Hi there! Welcome to Sunflower Washateria."
    }

    return (
        <header id="hero" className="grid">
            <div id="greeting">
                <h1> {greeting} </h1>
            </div>
            <div id="info">
                <div className="row">
                    <i className="fa-solid fa-location-dot"/>
                    <h4> 14404 Bellaire Blvd, Houston, TX 7708 </h4>
                </div>
                <div className="row">
                    <i className="fa-solid fa-phone"/>
                    <h4> (281) 561-7688 </h4>
                </div>
                <div className="row">
                    <i className="fa-solid fa-clock"/>
                    <div>
                        <h4> Mon-Fri | 7:30AM—10:30PM </h4>
                        <h4> Sat-Sun | 7:00AM—10:30PM </h4>
                    </div>
                </div>
            </div>
        </header>
    );
}