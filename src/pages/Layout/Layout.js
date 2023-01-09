import './Layout.css'
import { Outlet, NavLink } from "react-router-dom";

const Layout = () => {
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
                        <NavLink to="/blogs" className='nav-links' activeClassName='active'>Blogs</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" className='nav-links' activeClassName='active'>Contact</NavLink>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    )
};

export default Layout;