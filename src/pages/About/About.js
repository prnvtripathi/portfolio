import React from "react";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import './About.css'
import { FaBootstrap, FaCss3, FaGit, FaGithub, FaHtml5, FaJsSquare, FaLinux, FaNodeJs, FaNpm, FaReact, FaSass } from 'react-icons/fa'
import { DiJqueryLogo } from 'react-icons/di'
import { SiHashnode, SiNotion, SiVisualstudiocode, SiNextdotjs } from 'react-icons/si'
import earthimpact from '../../images/earthimpact.png'
import weather from '../../images/weather.png'
import pressart from '../../images/pressart.png'
import keepit from '../../images/keepit.png'
import Footer from "../Footer/Footer";

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
                    <h3>Earth Impact</h3>
                    <div className="project-head">
                        <a href="https://earth-impact.vercel.app"><img className="pr-img" src={earthimpact} alt="Movie-Recommender-System" /></a>
                        <a href="https://github.com/prnvtripathi/earthimpact" className="code-link">Code <FaGithub /></a>
                    </div>
                    <hr />
                    <h3>Weather App</h3>
                    <div className="project-head">
                        <a href="https://weather-app-prnvtripathi.netlify.app/"><img className="pr-img" src={weather} alt="Weather-App" /></a>
                        <a href="https://github.com/prnvtripathi/weather-app" className="code-link">Code <FaGithub /></a>
                    </div>
                    <hr />
                    <h3>KeepIt Notes App</h3>
                    <div className="project-head">
                        <a href="http://keepit-326c81.spheron.app/"><img className="pr-img" src={keepit} alt="Pressart-Landing-Page" /></a>
                        <a href="https://github.com/prnvtripathi/KeepIt" className="code-link">Code <FaGithub /></a>
                    </div>
                    <hr />
                    <h3>PressArt - Mobile Photo Editor Landing Page</h3>
                    <div className="project-head">
                        <a href="https://prnvtripathi.github.io/pressart-landing-page"><img className="pr-img" src={pressart} alt="Pressart-Landing-Page" /></a>
                        <a href="https://github.com/prnvtripathi/pressart-landing-page" className="code-link">Code <FaGithub /></a>
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
                <div className="blogs">
                    <h2>
                        <RoughNotation show={true} type="circle" color="blue" strokeWidth={4}>Blogs</RoughNotation>
                    </h2>
                    <p className="blog-about-main">You can read blogs written by me</p>
                    <div className="blog-box">
                        <h3 className="blog-head"><a href="https://prnvtripathi.hashnode.dev/my-first-hacktoberfest"><SiHashnode /> My First Hacktoberfest Experience</a></h3>
                    </div>
                    <div className="blog-box">
                        <h3 className="blog-head"><a href="https://prnvtripathi.hashnode.dev/golang"><SiHashnode /> Why Golang is my favourite language</a></h3>
                    </div>
                    <div className="blog-box">
                        <h3 className="blog-head"><a href="https://prnvtripathi.hashnode.dev/git"><SiHashnode /> Git- Your first step in tech 🙂</a></h3>
                    </div>
                    <div className="blog-box">
                        <h3 className="blog-head"><a href="https://prnvtripathi.hashnode.dev/front-end-development-roadmap-in-2023"><SiHashnode /> Front-end Development Roadmap in 2023</a></h3>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default About;