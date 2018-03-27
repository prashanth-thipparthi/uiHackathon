let ContactService = require("../service/contact-service-mongodb")
let service = new ContactService();

module.exports = (req, resp) => {
    let id = req.params["id"];
    service.delete(id, (err, data) => {
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