import React from "react";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import './About.css'
import { FaBootstrap, FaCss3, FaGit, FaGithub, FaHtml5, FaJsSquare, FaLinux, FaNodeJs, FaNpm, FaReact, FaSass } from 'react-icons/fa'
import { DiJqueryLogo } from 'react-icons/di'
import { SiNotion, SiVisualstudiocode, SiNextdotjs } from 'react-icons/si'
import earthimpact from '../../images/earthimpact.png'
import weather from '../../images/weather.png'
import keepit from '../../images/keepit.png'
import gardenify from '../../images/gardenify.png'
import gardenifyadmin from '../../images/gardenifyadmin.png'
import campaigningsource from '../../images/campaigningsource.png'
import Footer from "../Footer/Footer";
import { motion } from "framer-motion";

const projectData = [
    {
        id: 1,
        title: 'Gardenify',
        img: gardenify,
        deploy: 'https://gardenify.vercel.app',
        github: 'https://github.com/prnvtripathi/gardenify'
    },
    {
        id: 2,
        title: 'Gardenify Admin',
        img: gardenifyadmin,
        deploy: 'https://gardenify-admin.vercel.app',
        github: 'https://github.com/prnvtripathi/gardenify-admin'
    },
    {
        id: 3,
        title: 'Campaigning Source',
        img: campaigningsource,
        deploy: 'https://campaigningsource.com',
        github: 'https://github.com/prnvtripathi'
    },
    {
        id: 4,
        title: 'Earth Impact',
        img: earthimpact,
        deploy: 'https://earth-impact.vercel.app',
        github: 'https://github.com/prnvtripathi/earthimpact'
    },
    {
        id: 5,
        title: "Weather App",
        img: weather,
        deploy: "https://weather-app-prnvtripathi.netlify.app/",
        github: "https://github.com/prnvtripathi/weather-app",
    },
    {
        id: 6,
        title: "Keep-It Notes",
        img: keepit,
        deploy: "http://keepit-326c81.spheron.app/",
        github: "https://github.com/prnvtripathi/KeepIt",
    },
]

const webData = [
    {
        id: 1,
        icon: <SiNextdotjs size={36} />,
    },
    {
        id: 2,
        icon: <FaReact size={36} />,
    },
    {
        id: 3,
        icon: <FaNodeJs size={36} />,
    },
    {
        id: 4,
        icon: <DiJqueryLogo size={36} />,
    },
    {
        id: 5,
        icon: <FaHtml5 size={36} />,
    },
    {
        id: 6,
        icon: <FaCss3 size={36} />,
    },
    {
        id: 7,
        icon: <FaJsSquare size={36} />,
    },
    {
        id: 8,
        icon: <FaSass size={36} />,
    },
    {
        id: 9,
        icon: <FaBootstrap size={36} />,
    },
]

const toolsData = [
    {
        id: 10,
        icon: <FaGit size={36} />,
    },
    {
        id: 11,
        icon: <FaGithub size={36} />
    },
    {
        id: 12,
        icon: <SiVisualstudiocode size={36} />,
    },
    {
        id: 13,
        icon: <FaLinux size={36} />,
    },
    {
        id: 14,
        icon: <FaNpm size={32} />
    }
]

const othersData = [
    {
        id: 15,
        icon: <SiNotion size={32} />,
    }
]

const osData = [
    {
        id: 1,
        title: "Open Source with Pradumna",
        link: "https://github.com/pradumnasaraf/open-source-with-pradumna/",
        desc: "Open Source guide - Contains resources and materials to learn and get yourself started with Open Source, Git, and GitHub."
    },
    {
        id: 2,
        title: "DevsInTech Website",
        link: "https://github.com/devs-in-tech/DevsInTech",
        desc: "Website of DevsInTech - A community of developers and designers.",
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
                        {webData.map((data) => {
                            const { id, icon } = data;
                            return (
                                <motion.div
                                    key={id}
                                    className="skill-box"
                                    whileHover={{ scale: 1.1 }}
                                    initial={{ y: 30 }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {icon}
                                </motion.div>
                            )
                        })}
                    </div>

                    <h3>Tools</h3>
                    <div className="skill-head">
                        {toolsData.map((data) => {
                            const { id, icon } = data;
                            return (
                                <motion.div
                                    key={id}
                                    className="skill-box"
                                    whileHover={{ scale: 1.1 }}
                                    initial={{ y: -30 }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {icon}
                                </motion.div>
                            )
                        })}
                    </div>
                    <h3>Others</h3>
                    <div className="skill-head">
                        {othersData.map((data) => {
                            const { id, icon } = data;
                            return (
                                <motion.div
                                    key={id}
                                    className="skill-box"
                                    whileHover={{ scale: 1.1 }}
                                    initial={{ y: 30 }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {icon}
                                </motion.div>
                            )
                        })}
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
                                        <a href={deploy}>
                                            <motion.img
                                                initial={{ x: 1000, scale: 0.9 }}
                                                animate={{ x: 0 }}
                                                whileHover={{ scale: 1.1 }}
                                                transition={{ duration: 0.2 }}
                                                className="pr-img"
                                                src={img}
                                                alt={title} />
                                        </a>
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
                    <div className="os-container">
                        {osData.map((data) => {
                            const { id, title, link, desc } = data;
                            return (
                                <motion.div
                                    key={id}
                                    className="os-box"
                                    initial={{ y: 30 }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <a href={link} className="os-head"><FaGithub /> {title}</a>
                                    <p className="os-about">{desc}</p>
                                </motion.div>
                            )
                        })}
                    </div>
                    <h3>And many others here: <a href="https://github.com/prnvtripathi"><FaGithub /> Pranav Tripathi</a></h3>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default About;