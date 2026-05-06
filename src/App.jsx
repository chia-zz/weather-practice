import { useState, useEffect } from 'react';

// import LoadingSpinner from './components/common/LoadingSpinner';
import './App.css';
import WeatherCard from './components/WeatherCard';

function App() {
  return (
    <>
      <main className='flex '>
        <WeatherCard />
      </main>
    </>
  );
}

export default App;
