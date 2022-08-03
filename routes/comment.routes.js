const router = require("express").Router();
const mongoose = require("mongoose");
const {isAuthenticated} = require("../middleware/jwt.middleware");
const Comment = require('../models/Comment.model');

// Create comment
router.post("/new-comment", (req, res, next) => {
const {} = req.body;

Comment.create({})
.then(response => res.json(response))
.catch(err => res.json(err))
});

