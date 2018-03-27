let express = require("express");
let app = express();
let bodyPaser = require("body-parser");
app.use(bodyPaser.json())

let baseUrl = "/rest/contacts/";

app.use((req, resp, next)=>{
    resp.setHeader('Access-Control-Allow-Origin', '*');
    resp.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    resp.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

app.get(baseUrl, require("./controllers/get-all"));

app.get(baseUrl + ":id", require("./controllers/get-one"));

app.delete(baseUrl + ":id", require("./controllers/delete"));

app.post(baseUrl, require("./controllers/add-new"));

app.put(baseUrl + ":id", require("./controllers/update"));

app.listen(1234, () => {
    console.log("REST server started at 1234");
});

console.log("end of script");