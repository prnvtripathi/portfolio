import './NoPage.css'
import Footer from '../Footer/Footer'

const NoPage = () => {
    return (
        <div class="notfound">
            <div class="notfound-404">
                <h1>4<span></span>4</h1>
            </div>
            <h2>Oops! Page Not Be Found</h2>
            <p>Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable</p>
            <a href="/">Back to homepage</a>

            <Footer />
        </div>
    );
};

export default NoPage;