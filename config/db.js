const mongoose = require('mongoose');

const uri = process.env.URI;

module.exports = mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(() => {
    console.log('MongoDB connected...');
});