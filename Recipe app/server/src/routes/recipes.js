import {RecipeModel} from '../models/Recipes.js';
import {UserModel} from '../models/Users.js';
import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", async (req,res)=>{
    try {
        const response = await RecipeModel.find({});
        console.log(response);
        res.json(response);
    } catch (err) {
        res.json(err);
    }
})

// router.post("/", async (req,res)=>{
//      console.log(req.body);
//      const recipe = new RecipeModel(req.body);
//      console.log(recipe);
//     try {
//         const response = await recipe.save();
//         console.log(response);
//         res.json(response);
//     } catch (err) {
//         res.json(err);
//     } 
// });
router.post("/", async (req, res) => {
    console.log(req.body);
    // const recipe = new RecipeModel(req.body);
    const recipe = new RecipeModel({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        image: req.body.image,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        imageUrl: req.body.imageUrl,
        cookingTime: req.body.cookingTime,
        userOwner: req.body.userOwner,
      });
    console.log(recipe);
    try {
        const response = await recipe.save();
        console.log(response);
        res.status(201).json(response); // Use 201 for "Created" status
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: "An error occurred while saving the recipe." });
    }
});


router.put("/", async (req,res)=>{
    
    try {
        const recipe = await RecipeModel.findById(req.body.recipeID )
        const user = await UserModel.findById(req.body.userID )

        user.savedRecipes.push(recipe);
        await user.save();

        res.json({savedRecipes: user.savedRecipes});
    } catch (err) {
        res.json(err);
    } 
});

router.get("/savedRecipes/ids/:userID", async (req,res)=>{
    try {
        const user = await UserModel.findById(req.params.userID )
        res.json({savedRecipes: user?.savedRecipes});
    } catch (err) {
        res.json(err);
    }
});
router.get("/savedRecipes/:userID", async (req,res)=>{
    try {
        const user = await UserModel.findById(req.params.userID);
        const savedRecipes = await RecipeModel.find({
            _id: { $in: user.savedRecipes },
        });
    console.log(savedRecipes);
    res.json({ savedRecipes });
    } catch (err) {
        res.json(err);
    }
});

export { router as recipesRouter };