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
  }).then((resNested) => {
    if (resNested.data) {
      const chr = cheerio.load(resNested.data);
      const listCard = chr('div[id="box-dati"]');
      const listSpan = chr('span');

      jsonData.temperature.current = '';
      jsonData.temperature.min = chr(listSpan[4]).text().trim().replace(',', '.');
      jsonData.temperature.min_hour = chr(listSpan[6]).text().trim().replace(',', '.');
      jsonData.temperature.max = chr(listSpan[3]).text().trim().replace(',', '.');
      jsonData.temperature.max_hour = chr(listSpan[5]).text().trim().replace(',', '.');

      jsonData.humidity.current = '';
      jsonData.humidity.min = chr(listSpan[8]).text().trim().replace(',', '.');
      jsonData.humidity.min_hour = chr(listSpan[6]).text().trim().replace(',', '.');
      jsonData.humidity.max = chr(listSpan[7]).text().trim().replace(',', '.');
      jsonData.humidity.max_hour = chr(listSpan[9]).text().trim().replace(',', '.');

      jsonData.dew_point.current = '';
      jsonData.dew_point.min = chr(listSpan[12]).text().trim().replace(',', '.');
      jsonData.dew_point.min_hour = chr(listSpan[14]).text().trim().replace(',', '.');
      jsonData.dew_point.max = chr(listSpan[11]).text().trim().replace(',', '.');
      jsonData.dew_point.max_hour = chr(listSpan[13]).text().trim().replace(',', '.');

      jsonData.pressure.current = '';
      jsonData.pressure.min = chr(listSpan[16]).text().trim().replace(',', '.');
      jsonData.pressure.min_hour = chr(listSpan[18]).text().trim().replace(',', '.');
      jsonData.pressure.max = chr(listSpan[15]).text().trim().replace(',', '.');
      jsonData.pressure.max_hour = chr(listSpan[17]).text().trim().replace(',', '.');

      jsonData.wind_chill.current = chr(listSpan[24]).text().trim().replace(',', '.');
      jsonData.wind_chill.min = '';
      jsonData.wind_chill.min_hour = '';
      jsonData.wind_chill.max = '';
      jsonData.wind_chill.max_hour = '';

      jsonData.wind.speed = '';
      jsonData.wind.direction = '';
      jsonData.wind.avg10minutes = `${Number(Number(chr(listSpan[21]).text().trim().split('\n')[0]) * Number(1.852)).toFixed(1)}`;

      jsonData.wind.raff = `${Number(Number(chr(listSpan[20]).text().trim().split('\n')[0]) * Number(1.852)).toFixed(1)}`;
      jsonData.wind.raff_hour = chr(listSpan[22]).text().trim();

      jsonData.temperature.current = chr(listCard[0]).children('div').eq(1).text()
        .trim()
        .replace(',', '.');
      jsonData.humidity.current = chr(listCard[1]).children('div').eq(1).text()
        .trim()
        .replace(',', '.');
      jsonData.dew_point.current = chr(listCard[2]).children('div').eq(1).text()
        .trim()
        .replace(',', '.');
      jsonData.pressure.current = chr(listCard[3]).children('div').eq(1).text()
        .trim()
        .replace(',', '.');
      jsonData.wind.speed = `${Number(Number(chr(listCard[4]).children('div').eq(1).text()
        .split('-')[0].trim().split('\n')[0].replace(',', '.')) * Number(1.852)).toFixed(1)}`;

      jsonData.wind.direction = chr(listCard[4]).children('div').eq(1).text()
        .split('-')[1]
        .trim().replace(',', '.');

      jsonData.rain.intensity_day = chr(listCard[6]).children('div').eq(1).text()
        .trim()
        .replace(',', '.');

      resolve({ jsonData });
    } else { reject('Errore'); }
  });
});

const elaborate = async () => {
  const jsonData = await getDataFromUrl(urls.URL_DATA_CAMPIONE);
  return jsonData;
};

module.exports = {
  elaborate,
};
