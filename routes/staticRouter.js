const express = require("express");
const URL = require("../models/url");
const router = express.Router(); 
// A router object is essentially a mini-application within your main Express application. It helps you organize routes (URL paths) and middleware (functions that handle requests before they reach route handlers) in a modular way.


router.get('/', async (req, res) => {
    if(!req.user) return res.redirect('/login');
    const allurls = await URL.find({createdBy: req.user._id});
    return res.render('home', {
        urls: allurls,
    });
})

router.get('/signup', (req, res) => {
    return res.render("signup");
});

router.get('/login', (req, res) => {
    return res.render('login');
})

module.exports = router;