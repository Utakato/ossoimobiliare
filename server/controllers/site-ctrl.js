const PropertyModel = require("../models/crm-model.js");
const fs = require("fs")
const imgs = require("./../DB/images_to_file.js")
const path = require("path")
/* --------------------------------------------------
	## Global variables
---------------------------------------------------- */

const baseURL = "https://ossoimobiliare.herokuapp.com"


/* --------------------------------------------------
	## Exports
---------------------------------------------------- */


exports.index = async (req, res) => {
    res.render("index", {
    areaList : await getAreas(),
  });
}

exports.contact =(req, res) => {
    res.render("contact")
}

exports.searchPost = async (req,res) => {  
  const searchParamsObj =await createParamsObj(req)
  searchUrl = getSearchUrl(searchParamsObj)
  res.redirect(searchUrl)
}

exports.indexPost = async (req,res) => {
  const searchParamsObj =await createParamsObj(req)
  searchUrl = getSearchUrl(searchParamsObj)
  res.redirect(searchUrl)
}

exports.search = async (req, res, next) => {
  let page = req.query.page || 1
  const perPage = 20;
  let areas = await getAreas()
  let searchUrl = getSearchUrl(req.query)
  let sortBy = computeSortBy(req.query.sortBy)
  let filters = getFilters(req) 
  PropertyModel
    .find(filters)
    .sort(sortBy)
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec(function(err, properties){
      PropertyModel.countDocuments(filters).exec(function(err, count){
        if (err) return next(err)
        res.render("search_list",{
          propList: properties,
          current: page,
          pages: Math.ceil(count / perPage),
          areaList : areas,
          propcount : count,
          pageUrl:searchUrl,
        })
      })
    })
}

exports.property_details = (req, res) => {
  list = getImageList(req)
  PropertyModel.findOne({ id: req.params.property_id }, function (err, foundProperty) {
    if (!err) {
      let tags = getTags(foundProperty)
      let rsPrice = getRentSellPrice(foundProperty)
      const test = getDescription(foundProperty)
      res.render("property_dev", {
        CRMtracking : foundProperty.tracking_code,
        propertyPrice : (rsPrice + " €"),
        propertyTitle : foundProperty.title,
        propertyBedrooms : foundProperty.bedrooms,
        propertyBathrooms : foundProperty.bathrooms,
        propertySurface: foundProperty.surface_useable,
        propertyDescription : test,
        agentName : (foundProperty.agent.first_name + " " + foundProperty.agent.last_name),
        agentPosition : foundProperty.agent.position, 
        agentPhoto : foundProperty.agent.avatar,
        agentPhone : foundProperty.agent.phone,
        tags: tags, 
        propertyId : foundProperty.id,
        imgtest : foundProperty.resized_images[0],
        propType : foundProperty.property_type,
        coordsLng : foundProperty.lng, 
        coordsLat :  foundProperty.lat, 
        imageList : list,
      });
  } else {
      console.log(err);
  }
});
}


/* --------------------------------------------------
	## Functions
---------------------------------------------------- */


function removeEmptyFilters(reqQuery) {
  let noUndefinedObj = {}
  for (const prop in reqQuery) {
    if (reqQuery[prop] != "" && reqQuery[prop] != 'undefined' && prop != 'page' && prop != "sortBy"){
      noUndefinedObj[prop] = reqQuery[prop]
    }
  }
  return noUndefinedObj
}


function getTransactionTypeFilter(req) {
  let transType = req.query.transactionType
  if (transType == 1) {
    return {"for_sale" : true }
  } else if (transType == 2) {
    return {"for_rent" : true }
  }
}


function getPropTypeFilter(req) {
  if (req.query.propType != null) {
    return {'property_type': {$in : req.query.propType.split(",")}}
  } else {
    return {'property_type': req.query.propType}
  }
}


function getAreasFilter(req) {
  if (req.query.areas != null) {
    return {'zone': { $in : req.query.areas.split(",")}}
  } else {
    return {'zone': req.query.areas}
  }
}


function getFilters(req) {
  let filters = {}
  let filtersList = []
  let validFilters = removeEmptyFilters(req.query)
  let allFilters = {
    minSurface : {'surface_useable': { $gte: req.query.minSurface }},
    maxSurface : {'surface_useable': { $lte: req.query.maxSurface }},
    minPrice : {'price_sale': { $gte: req.query.minPrice }},
    maxPrice : {'price_sale': { $lte: req.query.maxPrice }},
    minRooms : {'rooms': { $gte: req.query.minRooms }},
    maxRooms : {'rooms': { $lte: req.query.maxRooms }},
    propType : getPropTypeFilter(req),
    areas : getAreasFilter(req),
    transactionType : getTransactionTypeFilter(req)
  }
  for (const filter in validFilters) {filtersList.push(allFilters[filter])}
  if (filtersList.length > 1){
    filters = {$and : filtersList}
  }
  return filters
}


function removeDuplicates (duplicateArray) {
  let noDuplicates = Array.from(new Set(duplicateArray))
  return noDuplicates
}


async function getAreas() {
  const query = await PropertyModel.find({}, "zone -_id")
  const allNeighbourhoods = query.map(object => {return object["zone"]})

  let noDuplNB = removeDuplicates(allNeighbourhoods)
  noDuplNB.splice(noDuplNB.indexOf(null), 1, "Altele")

  return noDuplNB.sort()  
}


function getTags(mongoQueryResult) {
  let tags = [].concat.apply([], Object.values(mongoQueryResult.tags.toObject()));
  tags.pop() // gets rid of _id
  return tags
}


function getImageList(req) {
  const defImgPath = path.join(__dirname, "./../../client/properties_images/", req.params.property_id)
  const list = fs.readdirSync(defImgPath, (err, files) => {
    if (err) {console.log(err)}
    return files.map(file => {return file})
  })
  return list
}


function getRentSellPrice (mongoQueryResult) {
  if (mongoQueryResult.price_sale != null) {
    return mongoQueryResult.price_sale
  }else if (mongoQueryResult.price_rent != null){
    return mongoQueryResult.price_rent
  }
}


function computeSortBy (querySortBy) {
  const sortOptions = {
      1 : { "price_sale" : 1 },
      2 : { "price_sale" : -1 },
      3 : { surface_useable : 1 },
      4 : { surface_useable : -1 },
      5 : { date_added : -1 }
  }
  return sortOptions[querySortBy]
}


function getSearchUrl(paramsObj) {
  let baseSearchUrl = new URL(baseURL + "/search_list/");
  baseSearchUrl.search = new URLSearchParams(paramsObj)
  return baseSearchUrl
}


async function createParamsObj(req) {
  let page = req.params.page || 1  
  let areas = req.body["area-cbx"];
  if (!areas){
    areas = await getAreas();
  }
  const searchParamsObj = {
    page: page,
    "minRooms" : req.body["minRooms"],
    "maxRooms" : req.body["maxRooms"],
    "propType" : req.body["propType"],
    "areas" : areas,
    "transactionType" : req.body["transactionType"], 
    "minSurface" : req.body["minSurface"],
    "maxSurface" : req.body["maxSurface"],
    "minPrice" : req.body["minPrice"],
    "maxPrice" : req.body["maxPrice"]
    
  }
  return searchParamsObj
}


function getDescription(mongoQueryResult) {
  let description = mongoQueryResult.description
  let newDescription = description.slice(0,400) + "<span class='show-on-mobile'><span id='dots' >...</span></span><span id='fullText'>" + description.slice(400) + "</span><div class='d-flex justify-content-end'><span class='show-on-mobile'><a onclick='showFullText()' id='fullTextBtn'>Citește toată descrierea <i class='fa fa-angle-down'></i></a></span></div>"
  return newDescription
}