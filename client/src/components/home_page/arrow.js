import left_arrow from "../../assets/left-arrow.png";
import right_arrow from "../../assets/right-arrow.png";

export default function Arrow(props) {
    let image;

    if (props.direction == "left") {
        image = left_arrow;
    }
    else {
        image = right_arrow;
    }

    return (
        <div id={props.direction + "-arrow"} className="row" onClick={props.onClick}>
            <img src={image}/>
        </div>
    );
}