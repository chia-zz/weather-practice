import useWeatherData from '../hooks/useWeatherData';
import LoadingSpinner from './common/LoadingSpinner';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const WeatherCard = () => {
  const weatherData = useWeatherData();
  const { data, loading, error, refresh: fetchAll } = weatherData;

  return (
    <>
      <div className='flex flex-col mx-auto'>
        <div className=' my-4'>
          <button
            type='button'
            onClick={fetchAll}
            disabled={loading}
            className='bg-purple-500 hover:bg-denim-600 text-white px-4 py-2 rounded cursor-pointer'
          >
            {' '}
            {loading ? (
              <div className='flex justify-center items-center'>
                <LoadingSpinner />
                <span className='ms-2'>處理中</span>
              </div>
            ) : (
              <>
                <span className='ms-2'>取得所有球場</span>
              </>
            )}
          </button>
        </div>
        {/* const mergedData = {
          // base
          id: realtimeData.id,
          teamKey: realtimeData.teamKey,
          teamName: realtimeData.teamName,
          location: realtimeData.location,
          updateTime: realtimeData.updateTime,
          logo: realtimeData.logo,
          icon: realtimeData.icon,
          // realtime
          temperature: realtimeData.temperature,
          weather: realtimeData.weather,
          highTemp: realtimeData.highTemp,
          lowTemp: realtimeData.lowTemp,
          // 36hr
          appTem: matchedAppTem?.ElementValue[0].ApparentTemperature,
          pop: matchedPop?.ElementValue[0].ProbabilityOfPrecipitation,
          weatherStatus: matchedWS?.ElementValue[0].Weather,
          weatherCode: matchedWS?.ElementValue[0].WeatherCode,
        }; */}

        {/* 即時天氣 */}
        <div className='flex flex-wrap justify-center gap-4'>
          {data.map((item) => (
            <div
              key={item.id}
              className='bg-white p-4 rounded-lg shadow-md border-2 border-gray-700'
            >
              <div className='flex justify-center max-h-10'>
                <img
                  src={item.icon}
                  className='object-contain opacity-20'
                  alt={`${item.teamName}+icon`}
                />
              </div>

              <h2 className='text-lg font-bold text-blue-500 mb-2'>
                {item.teamName}
              </h2>
              <p className='text-sm text-gray-500'>{item.location}</p>
              <p className='text-3xl font-bold text-blue-700'>
                {item.temperature}°C
              </p>

              <p className='text-gray-700'>體感溫度{item.appTem}°C</p>
              <div className='mt-2 text-sm text-gray-600'>
                <p>💧 降雨機率 {item.pop}%</p>
                <p>🔺 最高 {item.highTemp}°C</p>
                <p>🔻 最低 {item.lowTemp}°C</p>
                <p className='text-xs mt-2'>{item.updateTime}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default WeatherCard;
