let ContactService = require("../service/contact-service-mongodb")
let service = new ContactService();

module.exports = (req, resp) => {
    let id = req.params["id"];
    service.getById(id, (err, contact) => {
        let out = {};
        if (err)
        {
            out.success = false;
            out.message = err.message;
        }
        else
        {
            out.success = true;
            out.data = contact;
        }
        resp.json(out);

    });
}