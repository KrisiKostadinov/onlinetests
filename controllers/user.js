const User = require('../models/User');
const bcrypt = require('bcrypt');

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
            res.send('Hello!');
        }
    }
}