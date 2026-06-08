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
  const nowTime = dayjs().format('HH:mm');

  return (
    <>
      <div className='flex flex-col mx-auto'>
        {/* 刷新按鈕 */}
        <div className='my-4 mx-auto'>
          <button
            type='button'
            onClick={fetchAll}
            disabled={loading}
            className='bg-purple-500 hover:bg-denim-700 text-white px-4 py-2 rounded cursor-pointer'
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

        {/* 即時天氣 */}
        <div className='inline-grid min-w-[320px] md:grid-cols-2 gap-4'>
          {data.map((item) => (
            <div
              key={item.id}
              className={`bg-white min-w-75 ${item.team.theme.text} ${item.team.theme.border} shadow-lg rounded-lg py-4 px-6 relative`}
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
                    <p className='text-sm'>{item.weatherIcon}</p> |{' '}
                    <p className=''>{item.team.dist}</p>
                  </div>
                  <p className='text-3xl font-bold'>{item.temperature}°C</p>
                  <span className='text-sm'>
                    {item.highTemp}°C /{item.lowTemp}°C
                  </span>
                  <div className='text-xs text-gray-500 flex items-center gap-2'>
                    <p className=''>降雨機率 {item.pop}%</p> |
                    <p className=''>體感溫度{item.appTem}°C</p>
                  </div>
                </div>
                <div className={`${item.team.theme.text}`}>
                  <h2 className='text-3xl font-bold mb-2'>{item.team.name}</h2>
                </div>
              </div>

              {/* 
              

              
              <div className='mt-2 text-sm text-gray-600'>
                

                <p className='text-xs mt-2'>{item.updateTime}</p>
                <p className='text-xs mt-2'>現在時間：{nowTime}</p>

                <p className='text-xs mt-2'>{item.weatherStatus}</p>
              </div> */}
            </div>
          ))}
        </div>

        {/* 更新時間 */}
        <div className='my-4 mx-auto w-full text-center bg-denim-300'>
          <p>最後更新時間:{nowTime}</p>
        </div>
      </div>
    </>
  );
};
export default WeatherCard;
