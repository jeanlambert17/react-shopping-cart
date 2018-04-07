module.exports.userQueries = {
    
    findEmail: 'SELECT email FROM app_user WHERE email = $1',
    findUsername: 'SELECT username FROM app_user WHERE username = $1',
    addUser: 'INSERT INTO app_user (username,password,firstname,lastname,email) VALUES ($1,$2,$3,$4,$5) RETURNING id_user',
    findUser: 'SELECT * FROM app_user WHERE username=$1',

}

module.exports.productsQueries = {

    findProduct: '',
    addProduct: '',
    deleteProduct: '',

}


