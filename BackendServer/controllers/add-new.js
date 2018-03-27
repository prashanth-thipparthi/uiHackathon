let StatService = require("../service/stat-service-mongodb")
let service = new StatService();

module.exports = (req, resp) => {
    let stat = req.body;
    console.log("body is :", stat);
    service.addNew(stat, (err, data) => {
        let out = {};
        if (err)
        {
            out.success = false;
            out.message = err.message;
        }
        else
        {
            out.success = true;
            out.data = data;
        }
        resp.json(out);

    });
}