const router = require("express").Router();
const mongoose = require("mongoose");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const User = require('../models/User.model');


//GET list of users
router.get('/users', (req, res, next) => {
    User.find()
        .then(allUsers => {
            res.json(allUsers)
        })
        .catch(err => res.json(err));
});


//GET details of user
router.get('/users/:userId', (req, res, next) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    User.findById(userId)
        .populate("favorites")
        .populate({
            path: 'comments',
            populate: {
                path: 'author'
            }
        })
        .then(user => res.json(user))
        .catch(error => res.json(error));
});


//UPDATE user details
router.put('/users/:userId', isAuthenticated, (req, res, next) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    User.findByIdAndUpdate(userId, req.body, { returnDocument: 'after' })
        .then((updatedUser) => res.json(updatedUser))
        .catch(error => res.json(error));
});


// Adds a favorite
router.put('/users/:userId/favorites', isAuthenticated, (req, res, next) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    User.findByIdAndUpdate(userId, { $addToSet: req.body }, { returnDocument: 'after' })
        .then((updatedUser) => res.json(updatedUser))
        .catch(error => res.json(error));
});


//Add a comment
router.put('/users/:userId/comments', isAuthenticated, (req, res, next) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    User.findByIdAndUpdate(userId, { $push: req.body }, { returnDocument: 'after' })
        .then((updatedUser) => res.json(updatedUser))
        .catch(error => res.json(error));
});


//DELETE a user
router.delete('/users/:userId', isAuthenticated, (req, res, next) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    User.findByIdAndRemove(userId)
        .then(() => res.json({ message: `User with id ${userId} was removed successfully.` }))
        .catch(error => res.status(500).json(error));
});

module.exports = router;