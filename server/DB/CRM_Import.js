const PropertyModel = require("../models/crm-model.js");
const axios = require("axios");
const IMG = require("./images_to_file.js")

API_KEY = process.env.API_KEY

const baseUrl =
  `https://ossoimobiliare.crmrebs.com/api/public/property/?api_key=${API_KEY}&limit=20`;



const getProperties = async (offset = 0) => {
  const query = `${baseUrl}&offset=${offset}`;
  const response = await axios.get(query);
  const data = response.data;
  const properties = data.objects;
  // console.log(data.meta); -- Debug
  if (data.meta.next !== null) {
    return properties.concat(await getProperties(offset + 20));
  } else {
    return properties;
  }
};

const deleteAllProperties = async () => {
  try {
    await PropertyModel.deleteMany();
    console.log('All Data successfully deleted');
  } catch (err) {
    console.log(err);
  }
}

const crmToMongo = async () => {

  return PropertyModel.insertMany(await getProperties());
};

//Create deleteAllImages()



const crmReset = async() => {
  // await deleteAllImages();
  await deleteAllProperties();
  await crmToMongo();
  await IMG.saveImages();
}


exports.reset = crmReset;


// exports.deleteAllProperties = deleteAllProperties;
// exports.crmToMongo = crmToMongo;

