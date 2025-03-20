import sun from "../../assets/icons/sun.svg";
import decor from "../../assets/icons/decor.svg";
import temp from "../../assets/icons/temp.svg";
import pressure from "../../assets/icons/pressure.svg";
import precipitation from "../../assets/icons/precipitation.svg";
import wind from "../../assets/icons/wind.svg";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
const MainCurrent = (props) => {
    
    const {currentIcon} = props;

    const data = useSelector(state => state.weatherReducer.weather);
    

    let [time, setTime] = useState('');
    let timeout;
    useEffect(() => {
        getTime();

        return () => clearTimeout(timeout)

    }, [data],);

    const getTime = () => {
        const date = new Date();
        const hours = date.getUTCHours() + (data.timeZoneOffset / 3600);
        const mins = date.getUTCMinutes();

        setTime(`${hours}:${mins}`);
        timeout = setTimeout(() => {
            getTime();
        }, 1000);
    }

    const windDeg = data.current.wind_deg;

    const windDirection = windDeg == 0 || windDeg == 360 ? 'Северный' :
        windDeg > 0 && windDeg < 90 ? 'Северо-восточный' :
            windDeg == 90 ? 'Восточный' : windDeg > 90 && windDeg < 180 ? 'Юго-восточный' :
                windDeg == 180 ? 'Восточный' : windDeg > 180 && windDeg < 270 ? 'Юго-западный' :
                    windDeg == 270 ? 'Западный' :
                        windDeg > 270 && windDeg < 360 ? 'Северо-западный' : 'Ошибка';


    return (
        <section className="main__current container">
            <div className="main__current-item">
                <img className="main__current-item-icon" src={currentIcon} alt="icon" width={80} height={80} />
                <h2 className="main__current-item-temp">
                    {Math.round(data.current.temp)}°
                </h2>
                <p className="main__current-item-date">
                    Сегодня
                </p>
                <span className="main__current-item-info">
                    Время: {time}
                </span>
                <span className="main__current-item-info">
                    Город: {data.cityName}
                </span>
            </div>
            <div className="main__current-item info">
                <img src={decor} alt="decor" className="main__current-item-decor" />
                <div className="main__current-item-data">
                    <div className="main__current-item-data-icon">
                        <img src={temp} alt="temp" className="data__icon-img" />
                    </div>
                    <h3 className="main__current-item-data-title">
                        Температура
                    </h3>
                    <p className="main__current-item-data-value">
                        {Math.round(data.current.temp)}° - ощущается как {Math.round(data.current.feels_like)}°
                    </p>
                </div>
                <div className="main__current-item-data">
                    <div className="main__current-item-data-icon">
                        <img src={pressure} alt="pressure" className="data__icon-img" />
                    </div>
                    <h3 className="main__current-item-data-title">
                        Давление
                    </h3>
                    <p className="main__current-item-data-value">
                        {data.current.pressure} мм ртутного столба - нормальное
                    </p>
                </div>
                <div className="main__current-item-data">
                    <div className="main__current-item-data-icon">
                        <img src={precipitation} alt="precipitation" className="data__icon-img"/>
                    </div>
                    <h3 className="main__current-item-data-title">
                        Осадки
                    </h3>
                    <p className="main__current-item-data-value">
                        {data.current.humidity}%
                    </p>
                </div>
                <div className="main__current-item-data">
                    <div className="main__current-item-data-icon">
                        <img src={wind} alt="wind" className="data__icon-img"/>
                    </div>
                    <h3 className="main__current-item-data-title">
                        Ветер
                    </h3>
                    <p className="main__current-item-data-value">
                        {Math.round(data.current.wind_speed)}м/с {windDirection}
                    </p>
                </div>
            </div>
        </section>
    );
}

export default MainCurrent;