import React from "react";
import './Footer.css'

const Footer = () => {

    const d = new Date();
    let year = d.getFullYear();

    return (
        <footer>
            Pranav Kumar Tripathi © {year}
        </footer>
    )
}

export default Footer