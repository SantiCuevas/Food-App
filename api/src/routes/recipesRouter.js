const axios = require('axios');
const { parse } = require('dotenv');
const { Router } = require('express');
const { getAllRecipes, getByName, getApiInfo, getDbInfo } = require('../controllers/getRecipesData');
const postRecipe = require('../controllers/postRecipe');
require('dotenv').config();
const { API_KEY } = process.env;
const { Recipe, Diet } = require('../db');


const recipesRouter = Router();

recipesRouter.get('/', async (req,res) => {
    try {
        const { name } = req.query;
        const allRecipes = await getAllRecipes();
        if(!name) {
            try { 
                res.send(allRecipes);
            } catch (error) {
                res.send(error)
            }
        } else {
            const recipe = await getByName(name);
            recipe.length ?
            res.status(200).send(recipe) :
            res.status(404).send("No se ha encontrado la receta");
        }
    } catch (error) {
        res.send(error)
    }
    

});

recipesRouter.get('/:id', async (req,res) => {
    const { id } = req.params;
    if(id.includes("-")) {    //buscamos en la DB
        
        try {
            let dbId = await Recipe.findByPk(id, { include: Diet });  
            res.status(200).json([dbId])
        } catch (err) {
            res.json({ message: err });
        }

    } else {                  //buscamos en la API
        
        try {
            let getAll = await getApiInfo();
            const apiRecipe = getAll.filter(el => el.id === parseInt(id));
            apiRecipe.length ? 
            res.status(200).send(apiRecipe) :
            res.status(404).send("Not Found, Sorry");
        } catch (err) {
            res.json({ message: err });
        }
    }
});

recipesRouter.post('/', async (req,res) => {
    const {
        title,
        img,
        dishType,
        dietType,
        summary,
        healthScore,
        stepByStep,
        createdInDb
    } = req.body;

    if (!title || !summary) res.status(400).send('Por favor, inserte nombre y resumen de la receta');

    try {
    
        let recipe = await Recipe.create({
            title,
            img,
            dishType,
            summary,
            healthScore,
            stepByStep,
            createdInDb
        });
    
        let dietDb = await Diet.findAll({
            where: {name: dietType}
        });
        // console.log(dietDb)
        recipe.addDiet(dietDb);

        res.status(200).send('Receta creada con éxito');
    } catch(err) {
        res.status(400).send(err.message);
    }
});

module.exports = recipesRouter;
