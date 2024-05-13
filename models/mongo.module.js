const mongoose = require('mongoose');

mongoose.set("debug", true);

module.exports = async tenant => {
  return mongoose.createConnection(`mongodb+srv://limsLive:aaBWYuQsa92ycD6S@cluster0.rxbiy14.mongodb.net/${tenant}?retryWrites=true&w=majority`);
};

// export class TenantModuleForMongo {
//   createNewConnectionMongo(tenant) {
//     return createNewConnectionMongo(tenant);
//   }
// }
