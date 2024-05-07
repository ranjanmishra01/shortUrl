const express = require("express");
const router = express.Router(); 
// A router object is essentially a mini-application within your main Express application. It helps you organize routes (URL paths) and middleware (functions that handle requests before they reach route handlers) in a modular way.
const app = express();
/** If app nahi hota then: Not the intended usage: The express variable holds the entire Express.js module, not a specific application instance. It's designed for creating new instances using express(). Using it directly goes against the intended usage pattern.
Less organized: Without a dedicated application instance, your code might become less organized, with route definitions and middleware scattered throughout your codebase. */

const { handleGenerateNewShortURL, handleGetAnalytics } = require("../controllers/url");

router.post('/', handleGenerateNewShortURL);

router.get('/analytics/:shortId', handleGetAnalytics)


module.exports = router;
