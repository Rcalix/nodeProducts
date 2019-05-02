module.exports = (app) => {
  const user = require('../controllers/user.controller.js');
  const checkAuth = require("../middleware/check-auth");
  const permission =  require ("../middleware/permission");

  app.post('/user/login', user.login);
  app.get('/users', checkAuth, permission("Admin", "user"), user.allUsers);
  app.post('/user/signup', user.signup);
  app.get('/user/:email', user.getUser);
  app.put('/user/:email', user.editUser);
  app.delete('/user/:email', user.deleteUser);

  //TODO missing routes
}