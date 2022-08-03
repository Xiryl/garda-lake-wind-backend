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
      const $ = cheerio.load(res.data);
      const allP = $('p');
      jsonData.temperature.current = $(allP[1]).text().split(':')[1];
      jsonData.temperature.min = $(allP[5]).text().split(':')[1];
      jsonData.temperature.min_hour = '';
      jsonData.temperature.max = $(allP[6]).text().split(':')[1];
      jsonData.temperature.max_hour = '';

      jsonData.humidity.current = $(allP[2]).text().split(':')[1];
      jsonData.humidity.min = '';
      jsonData.humidity.min_hour = '';
      jsonData.humidity.max = '';
      jsonData.humidity.max_hour = '';

      jsonData.dew_point.current = $(allP[3]).text().split(':')[1];
      jsonData.dew_point.min = '';
      jsonData.dew_point.min_hour = '';
      jsonData.dew_point.max = '';
      jsonData.dew_point.max_hour = '';

      jsonData.heat_index.current = '';
      jsonData.heat_index.min = '';
      jsonData.heat_index.min_hour = '';
      jsonData.heat_index.max = '';
      jsonData.heat_index.max_hour = '';

      jsonData.pressure.current = $(allP[4]).text().split(':')[1];
      jsonData.pressure.min = '';
      jsonData.pressure.min_hour = '';
      jsonData.pressure.max = '';
      jsonData.pressure.max_hour = '';

      jsonData.wind_chill.current = $(allP[12]).text().split(':')[1];
      jsonData.wind_chill.min = '';
      jsonData.wind_chill.min_hour = '';
      jsonData.wind_chill.max = '';
      jsonData.wind_chill.max_hour = '';

      jsonData.ur_internal.current = '';
      jsonData.ur_internal.min = '';
      jsonData.ur_internal.min_hour = '';
      jsonData.ur_internal.max = '';
      jsonData.ur_internal.max_hour = '';

      jsonData.wind.speed = `${Number(Number($(allP[8]).text().split(':')[1].split(' ')[0]) * Number(1.9438)).toFixed(1)}`;
      jsonData.wind.direction = $(allP[10]).text().split('from')[1];
      jsonData.wind.avg10minutes = `${Number(Number($(allP[10]).text().split(':')[1].split(' ')[1]) * Number(1.9438)).toFixed(1)}`;
      jsonData.wind.raff = `${Number(Number($(allP[11]).text().split(':')[1].split(' ')[0]) * Number(1.9438)).toFixed(1)}`;
      jsonData.wind.raff_hour = $(allP[13]).text().split(':')[1];

      jsonData.rain.intensity_day = '';
      jsonData.rain.intensity_hour = '';

      resolve(jsonData);
    } else { reject('Errore'); }
  });
});

const elaborate = async () => {
  const jsonData = await getDataFromUrl(urls.URL_DATA_CVT);
  return jsonData;
};

module.exports = {
  elaborate,
};
