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
                Full Stack
            </RoughNotation><br />Developer</h1>
            </div>
            <div className="about-text">
                <p>
                    I'm a DevOps enthusiast and an explosive right-hand batsman from the capital city of India, New Delhi.🫡
                    When I'm not smashing keys on my laptop 💻, you'll probably find me either immersed in a thrilling game of cricket 🏏 or grooving
                    to some awesome beats. 🎵
                </p>
                <p>
                    As a sophomore pursuing Computer Science Engineering, I've dived headfirst into the fascinating world of technology ⚙️.
                    Over the past few months, I've been rocking it with NextJS, React, NodeJs and MongoDB 😅, crafting stylish websites from scratch.
                    But hey, I'm not just about the front-end wizardry! ✨ I'm also eager to explore the backend and dive into the depths of databases
                    and server-side programming. 🤓
                </p>
                <p>
                    Creativity is my middle name! Armed with my trusty problem-solving skills, I fearlessly tackle any challenge that comes my way. 🛡️
                    Whether it's debugging code or finding innovative solutions, I've got it covered. And hey, communication is key! 🔑 I excel
                    in expressing my thoughts, both in writing and verbally. When it comes to project management, I'm like the conductor of a
                    symphony, keeping all the moving parts in perfect harmony. 🎶
                </p>
            </div>
            <Link to='/about' className="button-link">
                <div className="flat-button">Let's dig deeper</div>
            </Link>

            <Footer />
        </div>
    )
}

export default Home;