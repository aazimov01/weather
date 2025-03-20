import Loader from "./components/Loader/Loader";
import Main from "./components/Main/Main";
import NavBar from "./components/NavBar/NavBar";
import { fetchWeather } from "./store/slices/weatherSlice";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
function App() {
  //
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    document.documentElement.setAttribute('data-theme', theme);
    setTheme(theme == 'light' ? 'dark' : 'light');
  }
  
  
  const dispath = useDispatch();
  const data = useSelector(state => state.weatherReducer.weather);
  useEffect(() => {
    dispath(fetchWeather('tashkent'));
  }, []);
  return (
    <>
      {
        data ? (
          <>   <header className="header">
            <NavBar toggleTheme={toggleTheme}/>
          </header>
            <Main /></>
        ) : (<Loader />)
      }
    </>
  )
}

export default App;
