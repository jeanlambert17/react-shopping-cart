const db = require('./../helpers/db');
const userQueries = require('./../helpers/queries').userQueries;

module.exports.isNew = (req, res, next) => {
    verifyData(req.body).then((data) => {
        if(data) 
            res.send(data);
        else 
            next();             
    }).catch((error) => {
        console.log(error)
        res.send({
            status: 500,
            response: 'Try again'
        })
    })
}

async function verifyData(params) {
    return db.task('signup-task', async t => {
        const email = await t.oneOrNone(userQueries.findEmail, [params.email]);
        if (!email) {
            const username = await t.oneOrNone(userQueries.findUsername, [params.username]);
            if (username) {       
                return {
                    status: 409,
                    response: 'username already registered'
                }
            }
        } else {
            return {
                status: 409,
                response: 'email already registered'
            }
        }
        return false
    }).catch((error) => {
        throw error
    });
}