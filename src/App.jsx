import { useState, useEffect } from 'react';
// import LoadingSpinner from './components/common/LoadingSpinner';
import './App.css';
import WeatherCard from './components/WeatherCard';
import dayjs from 'dayjs';

function App() {
  // 背景判斷
  const getTime = () => {
    const hour = dayjs().hour();
    return hour >= 5 && hour < 17;
  };

  const [isDay, setIsDay] = useState(getTime());
  const bgDay = '/images/bg-day.jpg';
  const bgNight = '/images/bg-night.jpg';

  useEffect(() => {
    const timer = setInterval(() => {
      setIsDay(getTime());
    }, 60 * 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <main className={`flex bg-[bg-url(${isDay ? bgDay : bgNight})]`}>
        <WeatherCard />
      </main>
    </>
  );
}

export default App;
