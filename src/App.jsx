// import { useState, useEffect } from 'react';
import { PageLoading } from './components/common/LoadingSpinner';
import './App.css';
import useWeatherData from './hooks/useWeatherData';
import WeatherCard from './components/WeatherCard';
import dayjs from 'dayjs';

function App() {
  const { data, loading, error, refresh } = useWeatherData();

  const isDay = dayjs().hour() >= 5 && dayjs().hour() < 17;
  const isPageLoading = loading && data.length === 0; // 第一次載入

  if (isPageLoading) {
    return (
      <>
        <div
          className={`fixed inset-0 bg-gray-50/40 bg-blend-overlay flex justify-center items-center z-50 
       ${isPageLoading ? 'opacity-100' : 'animate-fade pointer-events-none'}`}
        >
          <PageLoading />
        </div>
      </>
    );
  }

  return (
    <>
      {/*   <div
       className={`fixed inset-0 bg-blue-100 flex justify-center items-center z-50 
       ${loading ? 'opacity-100' : 'animate-fade pointer-events-none'}`}
     >
       <PageLoading />
     </div> */}
      <main
        className={`flex h-full md:h-screen bg-cover bg-center bg-white/40 bg-blend-overlay ${isDay ? 'bg-[url(/images/bg-day.jpg)]' : 'bg-[url(/images/bg-night.jpg)]'}`}
      >
        <WeatherCard
          loading={loading}
          data={data}
          error={error}
          refresh={refresh}
        />
      </main>
    </>
  );
}

export default App;
