import React, { useState } from "react";

export default function FAQ() {
    return (
        <div id="faq">
            <h2> FAQ </h2>
            <div className="column"> 
                <QA
                    id="what"
                    q="What can I do?"
                    a="Whatever you want! Whatever you want! Whatever you want! Whatever you want! Whatever you want! Whatever you want! Whatever you want!"
                />
                <QA
                    id="when"
                    q="When can I do?"
                    a="Whatever you want! Whatever you want! Whatever you want! Whatever you want! Whatever you want! Whatever you want! Whatever you want!"
                />
            </div>
        </div>
    );
}

function QA(props) {
    return (
        <div className="grid qa">
            <Plus id={props.id}/>
            <h5 className="question"> {props.q} </h5>
            <p id={props.id + "-answer"} className="answer hidden"> {props.a} </p>
        </div>
    )
}

function Plus(props) {
    const [visible, setVisible] = useState(false);

    const handleClick = (e) => {
        if (visible) {
            setVisible(false);
            document.getElementById(props.id + "-answer").classList.add("hidden");
        }
        else {
            setVisible(true);
            document.getElementById(props.id + "-answer").classList.remove("hidden");
        }
    }

    if (visible) {
        return ( 
            <div className="plus" onClick={handleClick}>
                <i className="fa-solid fa-minus"></i>
            </div>
        );
    }
    else {
        return ( 
            <div className="plus" onClick={handleClick}>
                <i className="fa-solid fa-plus"></i>
            </div>
        );
    }
}