import React, { useState } from "react";
import Arrow from "./arrow.js";
import photo_0 from "../../assets/photo-0.jpeg";
import photo_1 from "../../assets/photo-1.jpeg";

export default function Gallery() {
    const [photo, setPhoto] = useState(0);
    const photos = [photo_0, photo_1]
    
    const leftClick = (e) => {
        if (photo > 0) {
            setPhoto(photo - 1);
        }
    }
    const rightClick = (e) => {
        if (photo < photos.length - 1) {
            setPhoto(photo + 1);
        }
    }

    return (
        <figure id="gallery" className="grid">
            <Arrow direction="left" onClick={leftClick}/>
            <img id="photo" src={photos[photo]}/>
            <Arrow direction="right" onClick={rightClick}/>
        </figure>
    );
}