const router = require("express").Router();
const controller = require("../controllers/site-ctrl.js")


router.get("/", controller.index)

router.post("/", controller.indexPost)

router.route("/contact")
    .get(controller.contact)

// app.get("/about", (req, res) => {
//   res.render("about");
// });

router.route("/search_list/")
    .get(controller.search)
    .post(controller.searchPost)


router.route("/property/:property_id")
    .get(controller.property_details)

module.exports = router;