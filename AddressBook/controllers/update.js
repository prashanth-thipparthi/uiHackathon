let ContactService = require('../service/contact-service-mongodb');
let service = new ContactService();

module.exports = (req, resp) => {
let id = req.params['id'];
req.body._id = id;
service.update(req.body, (err, status)=>{
let out = {};
if (err) {
out.success = false;
out.message = err.message;
}
else {
out.success = true;
out.id = status;
}
resp.json(out);
});
}; 
