import cloudy from "../../assets/icons/pcloudy.svg";
import fog from "../../assets/icons/fog.svg";
import sunny from "../../assets/icons/sunny.svg";
import snow from "../../assets/icons/snow.svg";
import rain from "../../assets/icons/rain.svg";
import storm from "../../assets/icons/storm.svg";
import { useEffect } from "react";

const MainDailyItem = (props) => {

    const { data, index, setCurrentIcon } = props;

    const capitalize = (str) => {
        return str[0].toUpperCase() + str.substring(1);
    }

    const dateDormat = (type) => {
        const date = new Date(data.dt * 1000);
        const result =
            type == 'day' ? date.toLocaleDateString('ru-RU', { day: "2-digit" }) :
                type == 'weekday' ? date.toLocaleDateString('ru-RU', { weekday: "short" }) :
                    type == 'month' ? date.toLocaleDateString('ru-RU', { month: "short" }) : 'Error';

        return capitalize(result);
    }

    let icon = '';

    if (data.weather[0].id >= 200 && data.weather[0].id <= 232) {
        icon = storm;
    } else if (data.weather[0].id >= 300 && data.weather[0].id <= 321) {
        icon = rain;
    } else if (data.weather[0].id >= 500 && data.weather[0].id <= 531) {
        icon = rain;
    } else if (data.weather[0].id >= 600 && data.weather[0].id <= 622) {
        icon = snow;
    } else if (data.weather[0].id >= 701 && data.weather[0].id <= 781) {
        icon = fog;
    } else if (data.weather[0].id >= 801 && data.weather[0].id <= 804) {
        icon = cloudy;
    } else if (data.weather[0].id == 800) {
        icon = sunny;
    }

    useEffect(() => {
        if (index == 0) {
            setCurrentIcon(icon);
        }
    }, [icon]);

    return (
        <div className="main__daily-item">
            <h3 className="main__daily-item-day">
                {index == 0 ? 'Сегодня' : index == 1 ? "Завтра" : dateDormat('weekday')}
            </h3>
            <p className="main__daily-item-date">
                {dateDormat('day')}  {dateDormat('month')}
            </p>
            <img src={icon} alt="" width={28} />
            <p className="main__daily-item-dayTemp">
                {Math.round(data.temp.day)}°
            </p>
            <p className="main__daily-item-nightTemp">
                {Math.round(data.temp.night)}°
            </p>
            <p className="main__daily-item-status">
                {capitalize(data.weather[0].description)}
            </p>
        </div>
    );
}

export default MainDailyItem;