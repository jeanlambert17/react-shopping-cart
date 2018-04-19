module.exports.userQueries = {
    
    findEmail: 'SELECT email FROM app_user WHERE email = $1',
    findUsername: 'SELECT username FROM app_user WHERE username = $1',
    addUser: 'INSERT INTO app_user (username,password,name,lastname,email) VALUES ($1,$2,$3,$4,$5) RETURNING id_user',
    addCart: 'INSERT INTO cart (id_user) VALUES ($1)',
    findUser: 'SELECT * FROM app_user WHERE username=$1',

}

module.exports.productQueries = {

    findProduct: 'SELECT * FROM product WHERE name_product LIKE $1',
    addProduct: 'INSERT INTO product(id_user, brand_product, price_product, name_product, des_product, stock_product) VALUES($1,$2,$3,$4,$5,$6)',
    deleteProduct: 'DELETE FROM product WHERE id_user = $1 AND id_product = $2',

}