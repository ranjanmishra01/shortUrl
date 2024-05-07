const express = require("express");
const app = express();
const path = require('path');
const PORT = 8000;
const URL = require('./models/url')
const cookieParser = require('cookie-parser');
const {restrictToLogedinUserOnly, checkAuth} = require('./middleware/auth');

const {connectToMongoDb} = require('./connection');


const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');

app.set("view engine", "ejs");
app.set('views', path.resolve("./views"));

app.use(express.urlencoded({extended:false}));
app.use(express.json())
app.use(cookieParser());



//when data coming from URL use .json and when coming from form use .urlencoded

app.use("/url", restrictToLogedinUserOnly, urlRoute); //this middle ware run when /url par request aaega
app.use('/', checkAuth, staticRoute);
app.use('/user', userRoute);


app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {$push: {
        visitHistory: {
            timeStamp: Date.now()
        },
    }})
    res.redirect(entry.redirectURL);
})



app.listen(PORT, ()=> {
    console.log("Server Started");
})

connectToMongoDb('mongodb://127.0.0.1:27017/url-shortner');
