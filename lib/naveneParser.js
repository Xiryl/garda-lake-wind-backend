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
      const listTd = $('td');

      jsonData.temperature.current = $(listTd[38]).text();
      jsonData.temperature.min = $(listTd[39]).text();
      jsonData.temperature.min_hour = $(listTd[40]).text();
      jsonData.temperature.max = $(listTd[41]).text();
      jsonData.temperature.max_hour = $(listTd[42]).text();

      jsonData.humidity.current = $(listTd[45]).text();
      jsonData.humidity.min = $(listTd[46]).text();
      jsonData.humidity.min_hour = $(listTd[47]).text();
      jsonData.humidity.max = $(listTd[48]).text();
      jsonData.humidity.max_hour = $(listTd[49]).text();

      jsonData.dew_point.current = $(listTd[52]).text();
      jsonData.dew_point.min = $(listTd[53]).text();
      jsonData.dew_point.min_hour = $(listTd[54]).text();
      jsonData.dew_point.max = $(listTd[55]).text();
      jsonData.dew_point.max_hour = $(listTd[56]).text();

      jsonData.heat_index.current = $(listTd[59]).text();
      jsonData.heat_index.min = $(listTd[60]).text();
      jsonData.heat_index.min_hour = $(listTd[61]).text();
      jsonData.heat_index.max = $(listTd[62]).text();
      jsonData.heat_index.max_hour = $(listTd[63]).text();

      jsonData.pressure.current = $(listTd[66]).text();
      jsonData.pressure.min = $(listTd[67]).text();
      jsonData.pressure.min_hour = $(listTd[68]).text();
      jsonData.pressure.max = $(listTd[69]).text();
      jsonData.pressure.max_hour = $(listTd[70]).text();

      jsonData.wind_chill.current = $(listTd[73]).text();
      jsonData.wind_chill.min = $(listTd[74]).text();
      jsonData.wind_chill.min_hour = $(listTd[75]).text();
      jsonData.wind_chill.max = $(listTd[76]).text();
      jsonData.wind_chill.max_hour = $(listTd[77]).text();

      jsonData.ur_internal.current = $(listTd[87]).text();
      jsonData.ur_internal.min = $(listTd[88]).text();
      jsonData.ur_internal.min_hour = $(listTd[89]).text();
      jsonData.ur_internal.max = $(listTd[90]).text();
      jsonData.ur_internal.max_hour = $(listTd[91]).text();

      jsonData.wind.speed = $(listTd[105]).text();
      jsonData.wind.direction = $(listTd[112]).text();
      jsonData.wind.avg10minutes = $(listTd[106]).text();
      jsonData.wind.raff = $(listTd[108]).text();
      jsonData.wind.raff_hour = $(listTd[109]).text();

      jsonData.rain.intensity_day = $(listTd[129]).text();
      jsonData.rain.intensity_hour = $(listTd[128]).text();

      resolve(jsonData);
    } else { reject('Errore'); }
  });
});

const elaborate = async () => {
  const jsonData = await getDataFromUrl(urls.URL_DATA_NAVENE);
  console.log(jsonData);
  return jsonData;
};

module.exports = {
  elaborate,
};
