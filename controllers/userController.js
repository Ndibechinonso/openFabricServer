const User = require('../models/User');
const jwt = require('jsonwebtoken');

const logout = (req, res, next) => {
    res.clearCookie('token')
    res.send({ success: true });
}
const registerUser = (req, res, next) => {
    const { email, password, firstName, lastName } = req.body;
    User.findOne({email: req.body.email})
    .then((user) =>{
        if (user){
            res.status(400).json({success: false, message: 'User already exists'})
        }
        else{
            const newUser = new User({ firstName, lastName, email, password });
            newUser.save((err, user) => {
                if (err) {
                    console.log(err);
                    res.status(500).send({success: false, message: "Error Creating Account, please try again."})
                } else {
                    res.status(200).send({ success: true, message: 'Account Created Successfully' })
                }
            })
        }
    })
    .catch((err) => console.log(err, 'err'))
}


const authenticateUser = (req, res, next) => {
    const { email, password } = req.body;
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
                    const token = jwt.sign(payload, process.env.SECRET, {
                        expiresIn: '1h'
                    });
                   res.status(200).json({
                        token, user
                    })
                }
            });
        }
    });
}

module.exports = { logout, registerUser, authenticateUser }
