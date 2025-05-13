const prefixApi = process.env.PREFIX_API || '/api/v1';
const Auth = require('../routes/authRoutes');
const User = require('../routes/userRoutes');
const UserRole = require('../routes/userRoleRoutes');

module.exports = function(app) {
  app.use(prefixApi, Auth);
  app.use(prefixApi, User);
  app.use(prefixApi, UserRole);
}