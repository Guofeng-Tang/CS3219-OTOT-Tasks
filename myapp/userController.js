// Import user model
User = require('./userModel');

// Handle index actions
exports.index = function (req, res) {
    User.get(function (err, users) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        } else {
            res.json({
                status: "success",
                message: "Users retrieved successfully",
                data: users
            });
        }
    });
};

// Handle create user actions
exports.new = function (req, res) {
    var user = new User();
    user.email = req.body.email;
    user.screenName = req.body.screenName ? req.body.screenName : user.screenName;
    user.profilePicSrc = req.body.profilePicSrc ? req.body.profilePicSrc : user.profilePicSrc;
    user.age = req.body.age ? req.body.age : user.age;

    // persist the user
    user.save(function (err) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        } else {
            res.json({
                message: 'New user created!',
                data: user
            });
        }
    });
};

// Handle view user info
exports.view = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        } else {
            res.json({
                message: 'User details retrieved',
                data: user
            });
        }
    });
};

// Handle update user info
exports.update = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
        user.screenName = req.body.screenName ? req.body.screenName : user.screenName;
        user.profilePicSrc = req.body.profilePicSrc ? req.body.profilePicSrc : user.profilePicSrc;
        user.age = req.body.age ? req.body.age : user.age;

        // save the user 
        user.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'User details updated',
                data: user
            });
        });
    });
};

// Handle delete user
exports.delete = function (req, res) {
    User.remove({
        _id: req.params.user_id
    }, function (err, user) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        } else {
            res.json({
                status: "success",
                message: 'User deleted'
            });
        }
    });
};
