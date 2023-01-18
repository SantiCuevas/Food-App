const axios = require('axios');
const { Recipe, Diet } = require('../db');
require('dotenv').config();
const { API_KEY } = process.env;

const getDiets = async () => {
    let diets = [{name: 'gluten free'},{name: 'ketogenic'},{name: 'vegetarian'},{name: 'lacto-vegetarian'},
	{name: 'ovo-vegetarian'},{name: 'vegan'},{name: 'pescetarian'},{name: 'paleo'},{name: 'primal'},
	{name: 'low fodmap'},{name: 'whole 30'}];
    diets.forEach(e => {
        Diet.findOrCreate({
            where: { name: e.name }
        })
    })

     const allDiets = await Diet.findAll();
    //  console.log(allDiets)
     return allDiets;
}


module.exports = getDiets;