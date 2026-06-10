import { useState, useEffect } from 'react';
import { getRealtime, getForecast36h } from '../api/Api';
import dayjs from 'dayjs';
import { locations } from '../data/locationData';
// import { weatherIconMap } from '../data/weatherIconMap';

// 處理 -99
const handleInvalidValue = (value) => {
  if (value === '-99') return '資料異常';
  if (value === undefined || value === null) return '---';
  return value;
};

const useWeatherData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formatDateTime = (dateTime) => {
    const date = dayjs(dateTime);
    const weekdays = [
      '星期日',
      '星期一',
      '星期二',
      '星期三',
      '星期四',
      '星期五',
      '星期六',
    ];
    const weekday = weekdays[date.day()];

    return `${date.format('MM/DD')} ${weekday} ${date.format('HH:mm')}`;
  };
  // API 邏輯
  const getWeatherData = async (teamKey) => {
    try {
      const team = locations[teamKey];
      const [realtimeRes, forecastRes] = await Promise.all([
        getRealtime(team.realtimeBase, team.stationId),
        getForecast36h(team.forecastBase, team.forecastDist),
      ]);

      // Real time base
      const rtBase = realtimeRes.data.records.Station[0];
      const realtimeData = {
        id: rtBase.StationId,
        teamKey: teamKey,
        location: `${team.dist}`,
        updateTime: formatDateTime(rtBase.ObsTime.DateTime),
        rawTime: rtBase.ObsTime.DateTime,
        weather: rtBase.WeatherElement.Weather,
        temperature: rtBase.WeatherElement.AirTemperature,
        // 高溫低溫
        highTemp:
          rtBase.WeatherElement.DailyExtreme.DailyHigh.TemperatureInfo
            .AirTemperature,
        lowTemp:
          rtBase.WeatherElement.DailyExtreme.DailyLow.TemperatureInfo
            .AirTemperature,
        logo: team.logo,
        icon: team.icon,
      };

      // 36hr base
      const dataBase = forecastRes.data.records.Locations[0].Location[0];
      // 用 find 找氣象元素 再用 rawTime 找相對應的時間
      // 降雨機率
      const popElement = dataBase.WeatherElement.find(
        (el) => el.ElementName === '3小時降雨機率',
      );
      const matchedPop = popElement.Time.find((item) => {
        const dataTime = dayjs(realtimeData.rawTime);
        const start = dayjs(item.StartTime);
        const end = dayjs(item.EndTime);
        return dataTime >= start && dataTime < end;
      });
      // 體感溫度

      const appTemElement = dataBase.WeatherElement.find(
        (el) => el.ElementName === '體感溫度',
      );
      const matchedAppTem = appTemElement.Time.find((item) => {
        return item.DataTime === realtimeData.rawTime;
      });
      // 天氣現象
      const weatherStatusElement = dataBase.WeatherElement.find(
        (el) => el.ElementName === '天氣現象',
      );
      const matchedWS = weatherStatusElement.Time.find((item) => {
        const dataTime = dayjs(realtimeData.rawTime);
        const start = dayjs(item.StartTime);
        const end = dayjs(item.EndTime);
        return dataTime >= start && dataTime < end;
      });

      // 處理天氣 icon
      const weatherCode = handleInvalidValue(
        matchedWS?.ElementValue[0].WeatherCode,
      );

      const mergedData = {
        // base
        id: realtimeData.id,
        team,
        // realtime
        temperature: handleInvalidValue(realtimeData.temperature),
        weather: handleInvalidValue(realtimeData.weather),
        highTemp: handleInvalidValue(realtimeData.highTemp),
        lowTemp: handleInvalidValue(realtimeData.lowTemp),
        // 36hr
        appTem: handleInvalidValue(
          matchedAppTem?.ElementValue[0]?.ApparentTemperature,
        ),
        pop: handleInvalidValue(
          matchedPop?.ElementValue[0]?.ProbabilityOfPrecipitation,
        ),
        weatherStatus: handleInvalidValue(matchedWS?.ElementValue[0]?.Weather),
        weatherCode,
      };
      // const newData = Object.values(mergedData);
      // console.log('總整理', mergedData);
      return mergedData;
    } catch (error) {
      console.error('任一請求失敗:', error);
    }
  };
  const fetchAll = async () => {
    try {
      setLoading(true);
      setError(null);
      const allResults = await Promise.all(
        Object.keys(locations).map((teamKey) => getWeatherData(teamKey)),
      );
      setData(allResults);
    } catch (error) {
      console.error('請求失敗:', error);
      setLoading(false);
      setError(error?.message || '天氣載入失敗');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getData = async () => {
      await fetchAll();
    };
    getData();
  }, []);

  return { data, loading, error, refresh: fetchAll };
};

export default useWeatherData;
