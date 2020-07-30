const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    post: {
        async register(req, res) {
            const { email, password, confirmPassword } = req.body;

            if(confirmPassword !== password) {
                return res.send({ error: 'The passwords do not match.' });
            }

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            try {
                const userDb = await User.create({
                    email,
                    passwordHash: hash
                });

                res.send(userDb);
            } catch (error) {
                if(error.code === 11000) {
                    return res.send({ error: 'This email already exists!' });
                }

                return res.send(error);
            }
        },
        
        async login(req, res) {
            const { email, password } = req.body;

            const user = await User.find({ email });

            if(!user) {
                return res.send({ error: 'The email or password is wrong!' });
            }

            jwt.sign({
                user: user.email,
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
            }, 'secret', (err, token) => {
                if(err) {
                    return res.send(err);
                }

                res.status(200).send({ token });
            });
        }
    }
}