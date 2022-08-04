const router = require("express").Router();
const mongoose = require('mongoose');

const { isAuthenticated } = require("../middleware/jwt.middleware")
const Meal = require('../models/Meal.model');



//READ list of meals
router.get('/meals', (req, res, next) => {
    Meal.find()
        .then(allMeals => {
            res.json(allMeals)
        })
        .catch(err => res.json(err));
});



//CREATE new meal
router.post('/meals', isAuthenticated, (req, res, next) => {
    const { title, description, diet, cuisine, date, cookId } = req.body;

    Meal.create({ title, description, diet, cuisine, date, cook: cookId })
        .then(response => res.json(response))
        .catch(err => res.json(err));
});



//READ meal details
router.get('/meals/:mealId', (req, res, next) => {
    const { mealId } = req.params;

    //validate mealId
    if (!mongoose.Types.ObjectId.isValid(mealId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    //retrieve specified meal from database
    Meal.findById(mealId)
        .then(meal => res.json(meal))
        .catch(error => res.json(error));
});



//UPDATE meal details
router.put('/meals/:mealId', isAuthenticated, (req, res, next) => {
    const { mealId } = req.params;

    //validate mealId
    if (!mongoose.Types.ObjectId.isValid(mealId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    //retrieve specified meal from database and update
    Meal.findByIdAndUpdate(mealId, req.body, { returnDocument: 'after' })
        .then((updatedMeal) => res.json(updatedMeal))
        .catch(error => res.json(error));
});



//DELETE a meal
router.delete('/meals/:mealId', isAuthenticated, (req, res, next) => {
    const { mealId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(mealId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Meal.findByIdAndRemove(mealId)
        .then(() => res.json({ message: `Meal with id ${mealId} was removed successfully.` }))
        .catch(error => res.status(500).json(error));
});



module.exports = router;
