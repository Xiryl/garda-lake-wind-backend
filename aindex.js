const dataMalcesine = require('./src/lib/torriParser');

const populateAllDataset = async () => {
//   const jsonNavene = await dataNavene.elaborate();
//   console.log(jsonNavene);
//   const jsonLimone = await dataLimone.elaborate();
//   console.log(jsonLimone);
//   const jsonCvt = await dataCvt.elaborate();
//   console.log(jsonCvt);
//   const jsonRdg = await dataRdg.elaborate();
//   console.log(jsonRdg);
//   const jsonCampione = await dataCampione.elaborate();
//   console.log(jsonCampione);
//   const jsonTorri = await dataTorri.elaborate();
//   console.log(jsonTorri);

  const jsonTorri = await dataMalcesine.elaborate();
  console.log(jsonTorri);
};

populateAllDataset();
