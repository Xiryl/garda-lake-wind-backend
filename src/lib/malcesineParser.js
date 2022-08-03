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
  }).then(async (res) => {
    if (res.data) {
      const $ = cheerio.load(res.data);
      const listTd = $('span');

      jsonData.temperature.current = $(listTd[3]).text();
      jsonData.temperature.min = $(listTd[15]).text().split('°')[0];
      jsonData.temperature.min_hour = $(listTd[16]).text();
      jsonData.temperature.max = $(listTd[13]).text().split('°')[0];
      jsonData.temperature.max_hour = $(listTd[14]).text();

      jsonData.humidity.current = $(listTd[6]).text();
      jsonData.humidity.min = '';
      jsonData.humidity.min_hour = '';
      jsonData.humidity.max = '';
      jsonData.humidity.max_hour = '';

      jsonData.dew_point.current = $(listTd[18]).text().split('°')[0];
      jsonData.dew_point.min = '';
      jsonData.dew_point.min_hour = '';
      jsonData.dew_point.max = '';
      jsonData.dew_point.max_hour = '';

      jsonData.pressure.current = $(listTd[20]).text().split(' ')[0];
      jsonData.pressure.min = '';
      jsonData.pressure.min_hour = '';
      jsonData.pressure.max = '';
      jsonData.pressure.max_hour = '';

      jsonData.wind_chill.current = $(listTd[33]).text();
      jsonData.wind_chill.min = '';
      jsonData.wind_chill.min_hour = '';
      jsonData.wind_chill.max = '';
      jsonData.wind_chill.max_hour = '';

      jsonData.wind.speed = Number(Number($(listTd[21]).text()) * Number(1.852)).toFixed(1);
      jsonData.wind.avg10minutes = `${Number(Number($(listTd[23]).text().trim().split(' ')[1]) * Number(1.852)).toFixed(1)}`;
      jsonData.wind.raff = `${Number(Number($(listTd[29]).text().trim().split(' ')[0]) * Number(1.852)).toFixed(1)}`;
      jsonData.wind.raff_hour = $(listTd[31]).text();

      jsonData.wind.direction = $(listTd[22]).text().split(' ')[1];
      jsonData.rain.intensity_day = $(listTd[37]).text().split(' ')[0];

      resolve({ jsonData });
    } else { reject('Errore'); }
  });
});

const elaborate = async () => {
  const jsonData = await getDataFromUrl(urls.URL_DATA_MALCESINE);
  return jsonData;
};

module.exports = {
  elaborate,
};
