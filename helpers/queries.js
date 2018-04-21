module.exports.user = {
    
    findEmail: 'SELECT email FROM app_user WHERE email = $1',
    findUsername: 'SELECT username FROM app_user WHERE username = $1',
    addUser: 'INSERT INTO app_user (username,password,name,lastname,email) VALUES ($1,$2,$3,$4,$5) RETURNING id_user',
    addCart: 'INSERT INTO cart (id_user) VALUES ($1)',
    findUser: 'SELECT users.id_user AS userId, cart.id_cart AS cartId, users.name, users.lastname, users.username, users.password, users.email, users.icon_user AS icon FROM app_user AS users INNER JOIN cart ON cart.id_user = users.id_user WHERE username = $1',

}

module.exports.product = {

    findProduct: 'SELECT id_product AS productid, id_user AS userid, brand_product AS brand, price_product AS price, name_product AS name, des_product AS description, stock_product AS stock, img_product AS img FROM product WHERE name_product LIKE $1',
    findProducts: 'SELECT id_product AS productid, id_user AS userid, brand_product AS brand, price_product AS price, name_product AS name, des_product AS description, stock_product AS stock, img_product AS img FROM product',
    addProduct: 'INSERT INTO product(id_user, brand_product, price_product, name_product, des_product, stock_product) VALUES($1,$2,$3,$4,$5,$6)',
    deleteProduct: 'DELETE FROM product WHERE id_user = $1 AND id_product = $2',

}

module.exports.cart = {

    addItem: 'INSERT INTO cart_product (id_cart, id_product, quantity_product) VALUES($1,$2,$3)',
    deleteItem: 'DELETE FROM cart_product WHERE id_cart = $1 AND id_product = $2',
    getItems: 'SELECT cart.id_cart_product AS id, cart.id_product AS idproduct, prod.brand_product AS brand, prod.price_product AS price, prod.name_product AS name, cart.quantity_product AS quantity FROM cart_product AS cart INNER JOIN product AS prod ON prod.id_product = cart.id_product WHERE id_cart = $1',

}