import React from "react";
import './Home.css';
import { RoughNotation } from "react-rough-notation";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";

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
                    aspiring full-stack plus a right arm quick bowler🏏. 
                    I'm based in Delhi, India. 
                    I've been working with React, Bootstrap and Vanilla CSS since few months. 
                    I'm a sophomore pursuing Computer Science Engineering. 
                    I've some experience of using various programming languages, developing websites from the ground up. 
                    Professional strengths include creative problem-solving, written and verbal communication and project management.
                    If i'm not on my laptop hitting keys I might be watching/playing cricket or listening to music.🎵
                </p>
            </div>
            <Link to='/contact' className="button-link">
                <div className="flat-button">Let's Connect</div>
            </Link>

            <Footer />
        </div>
    )
}

export default Home;