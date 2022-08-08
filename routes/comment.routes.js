const router = require("express").Router();
const mongoose = require("mongoose");

const { isAuthenticated } = require("../middleware/jwt.middleware");
const Comment = require('../models/Comment.model');

//READ list of comments (not sure we use this, but just in case)
router.get('/comments', (req, res, next) => {
    Comment.find()
        .populate("author", "username")
        .then(allComments => res.json(allComments))
        .catch(err => res.json(err));
});

// CREATE a comment
router.post("/new-comment", (req, res, next) => {
    const { title, description, author } = req.body;

    Comment.create({ title, description, author })
        .then(response => res.json(response))
        .catch(err => res.json(err))
});

//READ details of a comment (not sure we use this, but just in case)
router.get('/comment/:commentId', (req, res, next) => {
    const { commentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Comment.findById(commentId)
        .then(comment => res.json(comment))
        .catch(error => res.json(error));
});

//UPDATE a comment
router.put('/comment/:commentId', (req, res, next) => {
    const { commentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Comment.findByIdAndUpdate(commentId, req.body, { returnDocument: 'after' })
        .then((updatedComment) => res.json(updatedComment))
        .catch(error => res.json(error));
});

//DELETE a comment
router.delete('/comment/:commentId', (req, res, next) => {
    const { commentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Comment.findByIdAndRemove(commentId)
        .then(() => res.json({ message: `Comment with id ${commentId} was removed successfully.` }))
        .catch(error => res.status(500).json(error));
});


module.exports = router;