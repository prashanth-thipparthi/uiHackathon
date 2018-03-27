let express = require("express");
let app = express();
let bodyPaser = require("body-parser");
app.use(bodyPaser.json())

let baseUrl = "/rest/stats/";

app.use((req, resp, next)=>{
    resp.setHeader('Access-Control-Allow-Origin', '*');
    resp.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    resp.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

//app.get(baseUrl, require("./controllers/get-all"));

app.get(baseUrl, require("./controllers/get-all-by-widget-group"));

app.get(baseUrl + ":widget", require("./controllers/get-widget-stats"));

app.post(baseUrl, require("./controllers/add-new"));

app.listen(1235, () => {
    console.log("REST server started at 1235");
});

console.log("end of script");