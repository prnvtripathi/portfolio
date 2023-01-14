import './Layout.css'
import { Outlet, NavLink } from "react-router-dom";

const Layout = () => {

    const resumeLink = 'https://drive.google.com/file/d/1al5HUHBLi2Z5T_87vVc4V95CTQG6JPO3/view?usp=sharing'

    return (
        <>
            <nav>
                <div className='brand'>
                    prnvtripathi
                </div>
                <ul>
                    <li>
                        <NavLink to="/" className='nav-links' activeClassName='active'>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className='nav-links' activeClassName='active'>About</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" className='nav-links' activeClassName='active'>Contact Me</NavLink>
                    </li>
                    <li>
                        <a href={resumeLink} target='_blank' rel='noreferrer' className='nav-links'>Resume</a>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    )
};

export default Layout;