const axios = require('axios');
const cheerio = require('cheerio');
const urls = require('../utils/urlUtils.json');

const getDataFromUrl = (url) => new Promise(async (resolve, reject) => {
  const jsonData = {
    temperature: {},
    humidity: {},
    dew_point: {},
    heat_index: {},
    pressure: {},
    wind_chill: {},
    ur_internal: {},
    wind: {},
    rain: {},
  };
  await axios({
    method: 'GET',
    url,
  }).then((res) => {
    if (res.data) {
      const { data } = res;

      jsonData.temperature.current = `${data.temp} °C`;
      jsonData.temperature.max = `${data.tempTH} °C`;
      jsonData.temperature.max_hour = data.TtempTH;
      jsonData.temperature.min = `${data.tempTL} °C`;
      jsonData.temperature.min_hour = data.TtempTL;

      jsonData.humidity.current = `${data.hum} %`;
      jsonData.humidity.min = `${data.humTL} %`;
      jsonData.humidity.min_hour = data.ThumTH;
      jsonData.humidity.max = `${data.humTH} %`;
      jsonData.humidity.max_hour = data.ThumTH;

      jsonData.dew_point.current = `${data.dew} °C`;
      jsonData.dew_point.min = '';
      jsonData.dew_point.min_hour = '';
      jsonData.dew_point.max = '';
      jsonData.dew_point.max_hour = '';

      jsonData.heat_index.current = `${data.heatindex} °C`;
      jsonData.heat_index.max = `${data.heatindexTH} °C`;
      jsonData.heat_index.max_hour = data.TheatindexTH;
      jsonData.heat_index.min = `${data.heatindexYH} °C`;
      jsonData.heat_index.min_hour = data.TheatindexYH;

      jsonData.pressure.current = `${data.press} hPa`;
      jsonData.pressure.min = '';
      jsonData.pressure.min_hour = '';
      jsonData.pressure.max = '';
      jsonData.pressure.max_hour = '';

      jsonData.wind_chill.current = `${data.wchill} °C`;
      jsonData.wind_chill.min = `${data.wchillTL} °C`;
      jsonData.wind_chill.min_hour = data.TwchillTL;
      jsonData.wind_chill.max = '';
      jsonData.wind_chill.max_hour = '';

      jsonData.ur_internal.current = '';
      jsonData.ur_internal.min = '';
      jsonData.ur_internal.min_hour = '';
      jsonData.ur_internal.max = '';
      jsonData.ur_internal.max_hour = '';

      jsonData.wind.speed = `${Number(Number(data.wspeed) / Number(1.852)).toFixed(1)}`;
      jsonData.wind.direction = data.wdir;
      jsonData.wind.avg10minutes = '';
      jsonData.wind.raff = `${Number(Number(data.wgust) / Number(1.852)).toFixed(1)}`;
      jsonData.wind.raff_hour = '';

      jsonData.rain.intensity_day = `${data.rfall} mm`;
      jsonData.rain.intensity_hour = `${data.r24hour} mm`;

      resolve(jsonData);
    } else { reject('Errore'); }
  });
});

const elaborate = async () => {
  const jsonData = await getDataFromUrl(urls.URL_DATA_RDG_VARONE);
  return jsonData;
};

module.exports = {
  elaborate,
};
