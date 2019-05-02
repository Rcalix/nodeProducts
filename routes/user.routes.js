module.exports = (app) => {
  const user = require('../controllers/user.controller.js');
  // const products = require('../controllers/product.controller.js');


  // Create a new Product
  app.post('/user/login', user.login);
  app.post('/user/signup', user.signup);
  app.get('/user/:email', user.getUser);
  app.put('/user/:email', user.editUser);
  app.delete('/user/:email', user.deleteUser);

  // Retrieve all Products
  // app.get('/products', products.findAll);

  // Retrieve a single Product with productId
  // app.get('/products/:productId', products.findOne);

  // Update a Note with productId
  // app.put('/products/:productId', products.update);

  // Delete a Note with productId
  // app.delete('/products/:productId', products.delete);
}