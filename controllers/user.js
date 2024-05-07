const {v4: uuidv4} = require('uuid');
const User = require("../models/user");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
    const {name, email, password} = req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect("/");
}

async function handleUserLogin(req, res) {
    const {name, password} = req.body;
    const user = await User.findOne({ name, password});
    if(!user){
        return res.render("login", {
            error: "Invalid username or password",
        });
    }
    const token = setUser(user);
    res.cookie('uid', token);
    return res.redirect("/");
}



module.exports = {
    handleUserSignup,
    handleUserLogin,
}