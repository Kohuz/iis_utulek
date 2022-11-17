const db = require('../models');

exports.create = (req, res) => {
    console.log('nothing');
};

exports.testRequest = (req, res) => {
    const user = db.User();
    const payloadObject = {
        test: "Test",
        testNum: 42,
    };
    console.log('user: calling GET');
    res.send(user);
}
