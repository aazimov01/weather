import MainDailyItem from "./MainDailyItem";
import { useSelector } from "react-redux";

const MainDaily = (props) => {
    const { setCurrentIcon } = props;
    const data = useSelector(state => state.weatherReducer.weather);
    const daily = data.daily.filter((item, i) => i < 7);

    return (
        <section className="main__daily container">
            <div className="main__daily-header">
                <button className="main__daily-header-btn">
                    На неделю
                </button>
                <button className="main__daily-header-btn cancel">
                    Отменить
                </button>
            </div>
            <div className="main__daily-days">
                {
                    daily.map((item, index) => (
                        <MainDailyItem key={index} data={item} index={index} setCurrentIcon={setCurrentIcon} />
                    ))
                }

            </div>
        </section>
    );
}

export default MainDaily;