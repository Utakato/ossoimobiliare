const router = require("express").Router();
const controller = require("../controllers/crm-ctrl.js")


router.get("/", function(req, res){
    res.json({
        status: "APi Working",
        message: "Welcome to api"
    })
});

router.route("/properties")
    .get(controller.index);

router.route("/property/:property_id")
    .get(controller.view);


module.exports = router;