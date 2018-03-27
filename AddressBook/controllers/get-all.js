let ContactService = require("../service/contact-service-mongodb")
let service = new ContactService();

module.exports = (req, resp) => {
    console.log(req.query.name);
    if (req.query.name)
    {
        service.getAllByName(req.query.name, (err, contacts) => {
            let out = {};
            if (err)
            {
                out.success = false;
                out.message = err.message;
            }
            else
            {
                out.success = true;
                out.data = contacts;
            }
            resp.json(out);
    
        });
    }
    else{
        service.getAll((err, contacts) => {
            let out = {};
            if (err)
            {
                out.success = false;
                out.message = err.message;
            }
            else
            {
                out.success = true;
                out.data = contacts;
            }
            resp.json(out);
    
        });
    }
    
}