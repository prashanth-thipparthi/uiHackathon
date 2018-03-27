let StatService = require("../service/stat-service-mongodb")
let service = new StatService();

module.exports = (req, resp) => {
    console.log(req.query.name);
    service.getAllByWidgetGroup((err, stats) => {
        let out = {};
        if (err)
        {
            out.success = false;
            out.message = err.message;
        }
        else
        {
            out.success = true;
            out.data = stats;
        }
        resp.json(out);
    });
}