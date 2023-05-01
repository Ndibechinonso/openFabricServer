const User = require('../models/User');
const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
    res.sendStatus(200);
}

const logout = (req, res, next) => {
    console.log(req, "reg");
    res.clearCookie('token')
    res.send({ success: true });
}
const registerUser = (req, res, next) => {
    const { email, password, firstName, lastName } = req.body;
console.log(req.body);
    User.findOne({email: req.body.email})
    .then((user) =>{
        console.log(email);
        if (user){
            res.status(400).json({success: false, msg: 'User already exists'})
        }
        else{
            const newUser = new User({ firstName, lastName, email, password });
            newUser.save((err, user) => {
                if (err) {
                    console.log(err);
                    res.status(500).send({success: false, msg: "Error Creating Account, please try again."})
                } else {
                    res.status(200).send({ success: true, msg: 'Account Created Successfully' })
                }
            })
        }
    })
    .catch((err) => console.log(err, 'err'))
}


const authenticateUser = (req, res, next) => {
    const { email, password } = req.body;
    console.log(req.body);
    User.findOne({ email }, function (err, user) {
        if (err) {
            console.error(err);
            res.status(500)
                .json({
                    error: 'Internal error finding email please try again'
                });
        } else if (!user) {
            res.status(401)
                .json({
                    error: 'Incorrect email or password'
                });
        } else {
            // console.log(user, "user");
            user.isCorrectPassword(password, (err, same) => {
                if (err) {
                    console.log(err, "password");
                    res.status(500)
                        .json({
                            error: 'Internal error please try again'
                        });
                } else if (!same) {
                    res.status(401)
                        .json({
                            error: 'Incorrect email or password'
                        });
                } else {
                    // Issue token
                    const payload = { email };
                    console.log(payload, 'payload');
                    const token = jwt.sign(payload, process.env.SECRET, {
                        expiresIn: '1h'
                    });
                    // res.cookie('token', [token, payload], {secure: true, httpOnly: true,}).sendStatus(200);
console.log(token, "on login");
                    res.status(200).json({
                        token, user
                    })
                    // res.cookie('email', payload, { httpOnly: true }).sendStatus(200);
                }
            });
        }
    });
}


const fetchUser = async (req, res, next) => {
const email = req.cookies.token[1].email
console.log(email, 'email');
// User.findOne({email : email})
// .then(user => {
//     console.log(user, 'user')
// })
// .catch(err =>{
//     console.log(err, 'error');
// })

try {
    const user = await User.findOne({email})
    res.send(user.firstName);
} catch (error) {
    console.log(error)
}
}
module.exports = { checkToken, logout, registerUser, authenticateUser, fetchUser }
