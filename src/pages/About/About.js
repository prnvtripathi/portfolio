import React from "react";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import './About.css'
import { FaBootstrap, FaCss3, FaGit, FaGithub, FaHtml5, FaJsSquare, FaLinux, FaNodeJs, FaNpm, FaReact, FaSass } from 'react-icons/fa'
import { DiJqueryLogo } from 'react-icons/di'
import { SiNotion, SiVisualstudiocode, SiNextdotjs } from 'react-icons/si'
import earthimpact from '../../images/earthimpact.png'
import weather from '../../images/weather.png'
import pressart from '../../images/pressart.png'
import keepit from '../../images/keepit.png'
import Footer from "../Footer/Footer";

const projectData = [
    {
        id: 1,
        title: 'Earth Impact',
        img: earthimpact,
        deploy: 'https://earth-impact.vercel.app',
        github: 'https://prnvtripathi/earthimpact'
    },
    {
        id: 2,
        title: "Weather App",
        img: weather,
        deploy: "https://weather-app-prnvtripathi.netlify.app/",
        github: "https://github.com/prnvtripathi/weather-app",
    },
    {
        id: 3,
        title: "Keep-It Notes",
        img: keepit,
        deploy: "http://keepit-326c81.spheron.app/",
        github: "https://github.com/prnvtripathi/KeepIt",
    },
    {
        id: 4,
        title: "Landing Page",
        img: pressart,
        deploy: "https://prnvtripathi.github.io/pressart-landing-page",
        github: "https://github.com/prnvtripathi/pressart-landing-page",
    }
]

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
                    <RoughNotation show={true} type='box' strokeWidth={5} animationDelay={600} padding={8} color="blue">
                        <h2>Skills</h2>
                    </RoughNotation>
                    <h3>Web Development</h3>
                    <div className="skill-head">
                        <div className="skill-box"><SiNextdotjs size={36} /></div>
                        <div className="skill-box"><FaReact size={36} /></div>
                        <div className="skill-box"><FaNodeJs size={36} /></div>
                        <div className="skill-box"><DiJqueryLogo size={36} /></div>
                        <div className="skill-box"><FaHtml5 size={36} /></div>
                        <div className="skill-box"><FaCss3 size={36} /></div>
                        <div className="skill-box"><FaJsSquare size={36} /></div>
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
                    <div className="projects-container">
                        {projectData.map((project) => {
                            const { id, title, img, deploy, github } = project;
                            return (
                                <div key={id} className="project-box">
                                    <h3>{title}</h3>
                                    <div className="project-head">
                                        <a href={deploy}><img className="pr-img" src={img} alt={title} /></a>
                                        <a href={github} className="code-link">Code <FaGithub /></a>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div>
                        <h3>And many others here: <a className="code-link" href="https://github.com/prnvtripathi"><FaGithub /> Pranav Tripathi</a></h3>
                    </div>
                </div>

                <div className="open-source">
                    <h2>
                        <RoughNotationGroup show={true}>
                            <RoughNotation type="highlight" color="#1db954">Green </RoughNotation>
                            <RoughNotation type="box" color="red" padding={2} strokeWidth={2}> Squares</RoughNotation>
                        </RoughNotationGroup>
                    </h2>
                    <p className="os-about-main">This section shows the contributions i did to some awesome open-source projects</p>
                    <div className="os-box">
                        <h3 className="os-head"><a href="https://github.com/Pradumnasaraf/open-source-with-pradumna"><FaGithub /> Open Source with Pradumna</a></h3>
                        <p className="os-about">
                            Open Source guide - Contains resources and materials to learn and get yourself started with Open Source, Git, and GitHub.
                        </p>
                    </div>
                    <div className="os-box">
                        <h3 className="os-head"><a href="https://github.com/devs-in-tech/DevsInTech"><FaGithub /> DevsInTech Website</a></h3>
                        <p className="os-about">
                            Website of DevsInTech - A community of developers and designers.
                        </p>
                    </div>
                    <h3>And many others here: <a href="https://github.com/prnvtripathi"><FaGithub /> Pranav Tripathi</a></h3>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default About;