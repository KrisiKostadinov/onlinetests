const { mongoose, model, Schema, Model } = require('mongoose');
const { String } = Schema.Types;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        email: true,
        unique: true,
    },

    passwordHash: {
        type: {
            String,
            required: true,
        }
    }
});

const User = new model('User', UserSchema);

module.exports = User;