import './NavBar.css';
import logo from "../../assets/icons/logo.svg";
import theme from "../../assets/icons/theme.svg";
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { fetchWeather } from "../../store/slices/weatherSlice";
const NavBar = (props) => {
    
    const { toggleTheme } = props;

    const [controller, setController] = useState('');

    const dispath = useDispatch();

    const search = (e) => {
        if (e.key == 'Enter') {
            dispath(fetchWeather(controller));
            setController('');
        }
    }

    return (
        <nav className="nav">
            <div className="nav__content container">
                <a href="" className="nav__logo">
                    <img src={logo} alt="LOGO" />
                    <span>REACT-WEATHER</span>
                </a>
                <div className="nav__options">
                    <button className='nav__options-btn' onClick={() => toggleTheme()}>
                        <img src={theme} alt="theme" />
                    </button>
                    <input value={controller}
                        type="text" className="nav__options-input" placeholder='Выбрать город'
                        onChange={(e) => setController(e.target.value)}
                        onKeyDown={(e) => search(e)} />
                </div>
            </div>
        </nav>
    );
}

export default NavBar;