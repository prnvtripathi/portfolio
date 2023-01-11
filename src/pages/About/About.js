import React from "react";
import { RoughNotation } from "react-rough-notation";
import './About.css'
import { FaBootstrap, FaCss3, FaGit, FaGithub, FaHtml5, FaJsSquare, FaLinux, FaNodeJs, FaNpm, FaReact, FaSass } from 'react-icons/fa'
import { DiJqueryLogo } from 'react-icons/di'
import { SiNotion, SiVisualstudiocode } from 'react-icons/si'
import mrs from '../../images/mrs.png'
import weather from '../../images/weather.png'
import pressart from '../../images/pressart.png'

const About = () => {
    return (
        <div className="container">
            <div className="heading">
                <RoughNotation show={true} type='underline' strokeWidth={5} animationDelay={600} color="#1db954">
                    <h1>About Me</h1>
                </RoughNotation>
            </div>
            <div className="about-zone">
                <div className="skills">
                    <RoughNotation show={true} type='circle' strokeWidth={5} animationDelay={600} padding={12} color="red">
                        <h2>Skills</h2>
                    </RoughNotation>
                    <h3>Web Development</h3>
                    <div className="skill-head">
                        <div className="skill-box"><FaHtml5 size={36} /></div>
                        <div className="skill-box"><FaCss3 size={36} /></div>
                        <div className="skill-box"><FaJsSquare size={36} /></div>
                        <div className="skill-box"><FaReact size={36} /></div>
                        <div className="skill-box"><FaNodeJs size={36} /></div>
                        <div className="skill-box"><DiJqueryLogo size={36} /></div>
                        <div className="skill-box"><FaSass size={36} /></div>
                        <div className="skill-box"><FaBootstrap size={36} /></div>
                    </div>

                    <h3>Tools</h3>
                    <div className="skill-head">
                        <div className="skill-box"><FaGit size={36} /></div>
                        <div className="skill-box"><FaGithub size={36} /></div>
                        <div className="skill-box"><FaNpm size={36} /></div>
                        <div className="skill-box"><SiVisualstudiocode size={36} /></div>
                        <div className="skill-box"><FaLinux size={36} /></div>
                    </div>
                    <h3>Others</h3>
                    <div className="skill-head">
                        <div className="skill-box"><SiNotion size={36} /></div>
                    </div>
                </div>
                <div className="projects">
                    <RoughNotation show={true} type='circle' strokeWidth={5} animationDelay={600} padding={12} color="red">
                        <h2>Projects</h2>
                    </RoughNotation>
                    <h3>Weather App</h3>
                    <div className="project-head">
                        <a href="https://weather-app-prnvtripathi.netlify.app/"><img className="pr-img" src={weather} alt="Weather-App" /></a>
                        <a href="https://github.com/prnvtripathi/weather-app" className="code-link">Code <FaGithub /></a>
                    </div>
                    <hr />
                    <h3>Movie Recommender System</h3>
                    <div className="project-head">
                        <a href="https://github.com/prnvtripathi/Movie-Recommender-Chatbot"><img className="pr-img" src={mrs} alt="Movie-Recommender-System" /></a>
                        <a href="https://github.com/prnvtripathi/Movie-Recommender-Chatbot" className="code-link">Code <FaGithub /></a>
                    </div>
                    <h3>PressArt - Mobile Photo Editor Landing Page</h3>
                    <div className="project-head">
                        <a href="https://prnvtripathi.github.io/pressart-landing-page"><img className="pr-img" src={pressart} alt="Pressart-Landing-Page" /></a>
                        <a href="https://github.com/prnvtripathi/pressart-landing-page" className="code-link">Code <FaGithub /></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;