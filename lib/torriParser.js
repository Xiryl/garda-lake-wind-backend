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
      const $ = cheerio.load(res.data);
      const listTd = $('td');

      jsonData.temperature.current = $(listTd[9]).text();
      jsonData.temperature.min = $(listTd[12]).text();
      jsonData.temperature.min_hour = $(listTd[13]).text();
      jsonData.temperature.max = $(listTd[10]).text();
      jsonData.temperature.max_hour = $(listTd[11]).text();

      jsonData.humidity.current = $(listTd[16]).text();
      jsonData.humidity.min = $(listTd[19]).text();
      jsonData.humidity.min_hour = $(listTd[20]).text();
      jsonData.humidity.max = $(listTd[17]).text();
      jsonData.humidity.max_hour = $(listTd[18]).text();

      jsonData.heat_index.current = $(listTd[30]).text();
      jsonData.heat_index.min = $(listTd[33]).text();
      jsonData.heat_index.min_hour = $(listTd[34]).text();
      jsonData.heat_index.max = $(listTd[31]).text();
      jsonData.heat_index.max_hour = $(listTd[32]).text();

      jsonData.dew_point.current = $(listTd[44]).text();
      jsonData.dew_point.min = $(listTd[47]).text();
      jsonData.dew_point.min_hour = $(listTd[48]).text();
      jsonData.dew_point.max = $(listTd[45]).text();
      jsonData.dew_point.max_hour = $(listTd[46]).text();

      jsonData.pressure.current = $(listTd[51]).text();
      jsonData.pressure.min = $(listTd[54]).text();
      jsonData.pressure.min_hour = $(listTd[55]).text();
      jsonData.pressure.max = $(listTd[52]).text();
      jsonData.pressure.max_hour = $(listTd[53]).text();

      jsonData.wind_chill.current = $(listTd[37]).text();
      jsonData.wind_chill.min = $(listTd[40]).text();
      jsonData.wind_chill.min_hour = $(listTd[41]).text();
      jsonData.wind_chill.max = $(listTd[38]).text();
      jsonData.wind_chill.max_hour = $(listTd[39]).text();

      jsonData.ur_internal.current = '';
      jsonData.ur_internal.min = '';
      jsonData.ur_internal.min_hour = '';
      jsonData.ur_internal.max = '';
      jsonData.ur_internal.max_hour = '';

      jsonData.wind.speed = $(listTd[58]).text();
      jsonData.wind.direction = $(listTd[65]).text();
      jsonData.wind.avg10minutes = '';
      jsonData.wind.raff = $(listTd[59]).text();
      jsonData.wind.raff_hour = $(listTd[60]).text();

      jsonData.rain.intensity_day = $(listTd[73]).text();
      jsonData.rain.intensity_hour = '';

      resolve(jsonData);
    } else { reject('Errore'); }
  });
});

const elaborate = async () => {
  const jsonData = await getDataFromUrl(urls.URL_DATA_TORRI);
  return jsonData;
};

module.exports = {
  elaborate,
};
