const prefixApi = process.env.PREFIX_API || '/api/v1';
const User = require('../routes/authRoutes');

module.exports = function(app) {
  app.use(prefixApi, User);
}