const fs = require("fs")
const PropertyModel = require("../models/crm-model")
const axios = require("axios")
const webp=require('webp-converter');

const downloadFile = async (fileUrl, downloadFolder) => { 
  var count = 0
  var maxTries = 3
  while(true) {
    try {
        const response = await axios({
          method: 'GET',
          url: fileUrl,
          responseType: 'stream',
        });
        const w = response.data.pipe(fs.createWriteStream(downloadFolder));
        w.on('finish', () => {
          console.log('Successfully downloaded: ', downloadFolder);
          
        });
        break
      } catch (err) {
        if (count++ == maxTries) {
          console.log(count)
          throw new Error(err)};
      }
    } 
}; 


  
const saveImages = async () => {
  allProperties = PropertyModel.find(function(err, foundProperties) {
    foundProperties.forEach(property => {
      let id = property.id
      let dirpath = "./../client/properties_images/" + id; 
      fs.mkdirSync(dirpath, {recursive: true}, (err) => {
        if (err) throw err;
      })
      for (let i = 0 ;i < property.resized_images.length; i++ )  {
        // if you change path name, you need to change line 163@search_list.ejs
        let path = dirpath + "/" + id + "_resized_img_" + i + ".webp"
        let url = property.resized_images[i]
        downloadFile(url, path)
      }

    }) 
  })
  console.log("Finished downloading images!")
}




// Not production code.................

const jpgToWebp = async (file) => {
  const fileWebp = file.replace(".jpg",".webp")
  const result = webp.cwebp(file, fileWebp ,logging="-v");
  result.then((response) => {
  console.log("this is response!!!!!!!!!!",response);
        fs.rm(file,(err) => {
          console.log("CALLING CALLBACK----------------")
          if (err) {
            console.log(" ?????????????????????????????",err)
          }
        })
});
}
// dir = "./../client/properties_images"
const convertImages = async (dir) => {
  console.log("convertImages has been called")
  fs.readdirSync(dir, (folders =>{
    console.log("first readdir")
    folders.forEach(folder => { // folders == [1234, 564334]
      const path = dir + "/" + folder
      console.log("last error", path)
      fs.readdirSync(path, (files=>{
        files.forEach(file =>{
          jpgToWebp(file)
        })
      }))
    })
  }))
}
// const defImgPath = "./../client/properties_images/" + req.params.property_id
//       console.log(defImgPath)
//       const list = fs.readdirSync(defImgPath, (err, files) => {
//         let imageList = []
//         if (err) {console.log(err)}
//         files.forEach(file => {
//           imageList.push(file)
//         })

//         return imageList
        
//       })
// const file = "./../client/properties_images/1090777/1090777_resized_img_1.jpg"
//   imgs.webp(file)

module.exports.webp = jpgToWebp;
module.exports.conv = convertImages;

// end of not prod code.........

// remake exports as only 1 function that calls all of these
module.exports.saveImages = saveImages;