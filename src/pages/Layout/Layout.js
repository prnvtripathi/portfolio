import React, { useState } from 'react';
import './Layout.css'
import { Outlet, NavLink } from "react-router-dom";
import { motion } from 'framer-motion';

const Layout = () => {

    const resumeLink = 'https://drive.google.com/file/d/1fCl0ptqn_eYAXiBc6KBluWfbfCiTdoPg/view?usp=drive_link'
    const blogLink = 'https://prnvtripathi.hashnode.dev/'

    const [expanded, setExpanded] = useState(false)

    return (
        <>
            <nav>
                <input id="toggle" type="checkbox" onClick={() => {
                    setExpanded(!expanded)
                }} />

                <label htmlFor="toggle" className="hamburger">
                    <div className="top-bun"></div>
                    <div className="meat"></div>
                    <div className="bottom-bun"></div>
                </label>
                <motion.div 
                className='brand'
                initial={{ opacity: 0, x: 1000 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                >
                    <a href='/'>prnvtripathi</a>
                </motion.div>
                <ul className={expanded ? "expanded" : ""}>
                    <motion.li
                        initial={{ opacity: 0, x: -1000 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <NavLink to="/" className='nav-links' activeClassName='active'>Home</NavLink>
                    </motion.li>
                    <motion.li
                        initial={{ opacity: 0, x: -1000 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <NavLink to="/about" className='nav-links' activeClassName='active'>About</NavLink>
                    </motion.li>
                    <motion.li
                        initial={{ opacity: 0, x: -1000 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <NavLink to="/contact" className='nav-links' activeClassName='active'>Contact Me</NavLink>
                    </motion.li>
                    <motion.li
                        initial={{ opacity: 0, x: -1000 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <a href={blogLink} className='nav-links'>Blogs</a>                    </motion.li>
                    <motion.li
                        initial={{ opacity: 0, x: -1000 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <a href={resumeLink} target='_blank' rel='noreferrer' className='nav-links'>Resume</a>
                    </motion.li>
                </ul>
            </nav>

            <Outlet />
        </>
    )
};

export default Layout;