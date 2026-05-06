import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_BASE_URL;
const apiKey = import.meta.env.VITE_API_BASE_KEY;

export { apiUrl, apiKey };

// realtime
export const getRealtime = (base, stationId) => {
  return axios.get(
    `${apiUrl}/${base}?Authorization=${apiKey}&StationId=${stationId}`,
  );
};
// 36小時
export const getForecast36h = (base, locationName) => {
  return axios.get(
    `${apiUrl}/${base}?Authorization=${apiKey}&LocationName=${locationName}`,
  );
};

// export const getAllCity36h = (base) => {
//   return axios.get(`${apiUrl}/${base}?Authorization=${apiKey}`);
// };
