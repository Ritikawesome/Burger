var express = require("express");

var router = express.Router();

var burgers = require("../models/burgers.js");

var methodOverride = require('method-override');

//Routes


router.get("/", function (req, res) {
    burgers.all(function (data) {
        var hbsObject = {
            burgers: data
        };
        res.render("index", hbsObject);
    })
})

router.post("/api/burgers", function (req, res) {
    burgers.create(["burger_name", "devoured"], [req.body.burger_name, false], function (result) {
        
        res.redirect("/");
        console.log("POST");
    });
});

router.put("/api/update/:id", function (req, res) {
    var condition = "id = " + req.params.id
    burgers.update({
        devoured: true
    }, condition, function (result) {
        res.redirect("/");
    })
})
//API 
router.get("/api", function (req, res) {
    burgers.all(function (data) {
        res.json(data);
    })
})


module.exports = router;