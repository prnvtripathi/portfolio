import React from "react";
import { RoughNotation } from "react-rough-notation";
import './About.css'
import { FaBootstrap, FaCss3, FaGit, FaGithub, FaHtml5, FaJsSquare, FaLinux, FaNodeJs, FaNpm, FaReact, FaSass } from 'react-icons/fa'
import { DiJqueryLogo } from 'react-icons/di'
import { SiVisualstudiocode } from 'react-icons/si'

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
                    <div className="skill-head">Web Development</div>
                    <div className="skill-box"><FaHtml5 /></div>
                    <div className="skill-box"><FaCss3 /></div>
                    <div className="skill-box"><FaJsSquare /></div>
                    <div className="skill-box"><FaReact /></div>
                    <div className="skill-box"><FaNodeJs /></div>
                    <div className="skill-box"><DiJqueryLogo /></div>
                    <div className="skill-box"><FaSass /></div>
                    <div className="skill-box"><FaBootstrap /></div>

                    <div className="skill-head">Tools</div>
                    <div className="skill-box"><FaGit /></div>
                    <div className="skill-box"><FaGithub /></div>
                    <div className="skill-box"><FaNpm /></div>
                    <div className="skill-box"><SiVisualstudiocode /></div>
                    <div className="skill-box"><FaLinux /></div>
                </div>
            </div>
        </div>
    )
}

export default About;