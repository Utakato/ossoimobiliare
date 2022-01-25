const PropertyModel = require("../models/crm-model.js");



const apartment_types =  {
  6 : "Apartament",
  1 : "Garsonieră",
  2 : "Penthouse",
  5 : "Duplex",
  7 : "Triplex"
}

const house_types = {
  1 : "Individuală",
  6 : "Vilă",
  2 : "Calcan",
  3 : "Duplex",
  5 : "Triplex",
  4 : "Casă înșiruită"
}

const land_type = {
  1 : "Construcții",
  2 : "Agricol",
  3 : "Pădure"
}


// Handle index actions
exports.index = function (req, res) {
  if (req.query) {
    console.log(req.query)
    PropertyModel.find(req.query, function(err, properties){
      if (err)
          return res.send(err);
      return res.json({
          message: 'Property details loading..',
          data: properties
      });
    })
  } 
//   else{
//   PropertyModel.find(function (err, properties) {
//       if (err) {
//           res.json({
//               status: "error",
//               message: err,
//           });
//       }
//       res.json({
//           status: "success",
//           message: "properties retrieved successfully",
//           data: properties
//       });
//   });
// }
};

// Handle view contact info
exports.view = function (req, res) {
  PropertyModel.find({id :req.params.property_id}, function (err, property) {
      if (err)
          res.send(err);
      let property_type;
      if (property[0].property_type = 1){
        property_type = apartment_types[property[0]["apartment_type"]]
      }else if (property[0].property_type = 3){
        property_type = house_types[property[0]["house_type"]]
      }else if(property[0].property_type = 4){
        property_type = property[0]["office_type"]
      }else if(property[0].property_type = 5){
        property_type = property[0]["office_type"]
      }else if(property[0].property_type = 6){
        property_type = property[0]["land_type"]
      }else if(property[0].property_type = 7){
        property_type = property[0]["office_type"]
      }

      const response= {
        agent: property[0].agent,
        title: property[0].title,
        description:  property[0].description,
        prop_type : property[0].property_type,
        type: property_type, 
        building_floors: property[0].building_floors,
        floor: property[0].floor,
        tracking: property[0].tracking_code,
      }

      res.json({
          message: 'Property details loading..',
          data: response
      });
  });
};
