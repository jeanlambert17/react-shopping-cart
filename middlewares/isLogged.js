module.exports.isLoggedOut = (req, res, next) => {
    if (!req.isAuthenticated())
        next();
    else 
        res.send({
            status:304,
            response: 'There is already an active session',
        });        
}

module.exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated())
        next();
    else
        res.send({
            status: 304,
            response: 'You must login first',
        });
}
