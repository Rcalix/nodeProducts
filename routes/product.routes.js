module.exports = (app) => {
    const products = require('../controllers/product.controller.js');
    const checkAuth = require("../middleware/check-auth");
    const permission =  require ("../middleware/permission");

    // Create a new Product
    app.post('/products', checkAuth, permission("Admin"), products.create);

    // Retrieve all Products
    app.get('/products', checkAuth, permission("Admin", "user"), products.findAll);

    // Retrieve a single Product with productId
    app.get('/products/:productId', checkAuth, permission("Admin", "user"), products.findOne);

    // Update a Note with productId
    app.put('/products/:productId', checkAuth,  permission("Admin", "user"), products.update);

    // Delete a Note with productId
    app.delete('/products/:productId', checkAuth, permission("Admin"), products.delete);
}