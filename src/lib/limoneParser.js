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
      const listTd = $('td');

      jsonData.temperature.current = '';
      jsonData.temperature.min = $(listTd[30]).text();
      jsonData.temperature.min_hour = $(listTd[32]).text();
      jsonData.temperature.max = $(listTd[11]).text();
      jsonData.temperature.max_hour = $(listTd[13]).text();

      jsonData.humidity.current = '';
      jsonData.humidity.min = $(listTd[36]).text();
      jsonData.humidity.min_hour = $(listTd[38]).text();
      jsonData.humidity.max = $(listTd[17]).text();
      jsonData.humidity.max_hour = $(listTd[19]).text();

      jsonData.dew_point.current = '';
      jsonData.dew_point.min = $(listTd[42]).text();
      jsonData.dew_point.min_hour = $(listTd[44]).text();
      jsonData.dew_point.max = $(listTd[23]).text();
      jsonData.dew_point.max_hour = $(listTd[25]).text();

      jsonData.pressure.current = '';
      jsonData.pressure.min = $(listTd[80]).text();
      jsonData.pressure.min_hour = $(listTd[82]).text();
      jsonData.pressure.max = $(listTd[69]).text();
      jsonData.pressure.max_hour = $(listTd[71]).text();

      jsonData.wind_chill.current = $(listTd[60]).text();
      jsonData.wind_chill.min = $(listTd[62]).text();
      jsonData.wind_chill.min_hour = $(listTd[65]).text();
      jsonData.wind_chill.max = '';
      jsonData.wind_chill.max_hour = '';

      jsonData.wind.speed = '';
      jsonData.wind.direction = '';
      jsonData.wind.avg10minutes = `${Number(Number($(listTd[77]).text().trim().split(' ')[0]) * Number(1.852)).toFixed(1)}`;
      jsonData.wind.raff = `${Number(Number($(listTd[54]).text().trim().split(' ')[0]) * Number(1.852)).toFixed(1)}`;
      jsonData.wind.raff_hour = $(listTd[56]).text();

      await axios({
        method: 'GET',
        url: 'https://www.meteopassione.com/stazioni/limone',
      }).then((resNested) => {
        if (resNested.data) {
          const chr = cheerio.load(resNested.data);
          const listCard = chr('div[id="box-dati"]');

          jsonData.temperature.current = chr(listCard[0]).children('div').eq(1).text()
            .trim();
          jsonData.humidity.current = chr(listCard[1]).children('div').eq(1).text()
            .trim();
          jsonData.dew_point.current = chr(listCard[2]).children('div').eq(1).text()
            .trim();
          jsonData.pressure.current = chr(listCard[3]).children('div').eq(1).text()
            .trim();
          jsonData.wind.speed = `${Number(Number(chr(listCard[4]).children('div').eq(1).text()
            .split('-')[0].split('\n')[2]
            .trim()) * Number(1.852)).toFixed(1)}`;
          jsonData.wind.direction = chr(listCard[4]).children('div').eq(1).text()
            .split('-')[1]
            .trim();

          jsonData.rain.intensity_day = chr(listCard[5]).children('div').eq(1).text()
            .trim();
        }
      });
      resolve({ jsonData });
    } else { reject('Errore'); }
  });
});

const elaborate = async () => {
  const jsonData = await getDataFromUrl(urls.URL_DATA_LIMONE);
  return jsonData;
};

module.exports = {
  elaborate,
};
