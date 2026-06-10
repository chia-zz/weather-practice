// import useWeatherData from '../hooks/useWeatherData';
import LoadingSpinner from './common/LoadingSpinner';
import dayjs from 'dayjs';
import { weatherTypes, weatherIcon } from '../data/weatherIconMap';

const getWeatherIcon = (num) => {
  const [matched] = Object.entries(weatherTypes).find(([type, codes]) =>
    codes.includes(num),
  ) || ['😖'];
  return weatherIcon[matched] ?? '😖';
};
const WeatherCard = ({ data, loading, error, refresh: fetchAll }) => {
  const nowTime = dayjs().format('HH:mm');

  return (
    <>
      <div className='flex flex-col mx-auto my-6'>
        {/* 刷新按鈕 */}
        <div className='my-4 mx-auto'>
          <button
            type='button'
            onClick={fetchAll}
            disabled={loading}
            className='bg-[#3F5E33] hover:bg-[#0B2418] text-[#fff5ec] px-4 py-2 rounded cursor-pointer text-center'
          >
            {' '}
            {loading ? (
              <div className='flex justify-center items-center'>
                <LoadingSpinner />
                <span className='ms-2'>處理中</span>
              </div>
            ) : (
              <>
                <span>刷新天氣</span>
              </>
            )}
          </button>
        </div>

        {/* 更新時間 */}
        <div className='mb-4 py-1 border-b border-b-[#163D2E] mx-auto w-full text-center bg-[#3F5E33] text-[#fff5ec]'>
          <p>最後更新時間:{nowTime}</p>
        </div>

        {/* 即時天氣 */}
        <div className='inline-grid min-w-[320px] md:grid-cols-2 gap-4 mb-4'>
          {data.map((item) => (
            <div
              key={item.id}
              className={`bg-white min-w-75 ${item.team.theme.text} ${item.team.theme.border} shadow-md rounded-lg  py-4 px-6 relative transition ease-in-out hover:-translate-y-1 hover:shadow-amber-50`}
            >
              <div className='absolute top-4 right-4 z-0'>
                <img
                  src={`${import.meta.env.BASE_URL}${item.team.assets.icon.replace(/^\//, '')}`}
                  className='object-contain opacity-20 max-h-10'
                  alt={`${item.team.name}+icon`}
                />{' '}
              </div>
              <div className='flex justify-between items-center'>
                <div className='text-gray-900'>
                  <div className='text-xs text-gray-500 flex items-center gap-2'>
                    <p className='text-base'>
                      {getWeatherIcon(item.weatherCode)}
                    </p>{' '}
                    |<p>{item.weatherStatus}</p> | <p>{item.team.dist}</p>
                  </div>
                  <p className='text-3xl font-bold'>{item.temperature}°C</p>
                  <span className='text-sm'>
                    {item.highTemp} °C / {item.lowTemp} °C
                  </span>
                  <div className='text-xs text-gray-500 flex items-center gap-2'>
                    <p className=''>降雨機率 {item.pop} %</p> |
                    <p className=''>體感溫度 {item.appTem} °C</p>
                  </div>
                </div>
                <div className={`${item.team.theme.text}`}>
                  <h2 className='text-3xl font-bold mb-2'>{item.team.name}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-auto opacity-70 py-1 border-b border-b-[#163D2E] mx-auto w-full text-center bg-[#3F5E33] text-[#fff5ec]'>
          <p className='text-sm'>練習用</p>
        </div>
      </div>
    </>
  );
};
export default WeatherCard;
