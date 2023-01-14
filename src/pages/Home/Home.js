import React from "react";
import './Home.css';
import { RoughNotation } from "react-rough-notation";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="container">
            <div className="name">hi, i'm <RoughNotation
                show={true}
                type='underline'
                animationDelay={600}
                color="red" padding={2}
                strokeWidth={3}>
                pranav tripathi
            </RoughNotation><span className="wave"> 👋🏼</span>
            </div>
            <div className="sub-heading"><h1>A <br /><RoughNotation
                show={true}
                type="box"
                animationDelay={800}
                color='#1db954'
                padding={5}
                strokeWidth={4}>
                Front End
            </RoughNotation><br />Developer</h1>
            </div>
            <div className="about-text">
                <p>
                    I am a Front End developer based in Delhi, India. I'm used to with ReactJS & Bootstrap.
                    I'm a sophomore pursuing Computer Science Engineering. I've also got experience of
                    using various programming languages, developing websites from the ground up. Professional
                    strengths include creative problem-solving, written and verbal communication and time management.
                </p>
            </div>
            <Link to='/contact' className="button-link">
                <div className="flat-button">Let's Connect</div>
            </Link>
        </div>
    )
}

export default Home;