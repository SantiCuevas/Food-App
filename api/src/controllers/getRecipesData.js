// Este controller trae todas las recetas de la API + DB
const axios = require('axios');
const { Recipe, Diet } = require('../db');
require('dotenv').config();
const { API_KEY } = process.env;

const getApiInfo = async () => {
    // const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
    const url = `https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`
    const apiUrl = await axios.get(url)
    const apiData = apiUrl.data.results.map(r => {
        return {
            id: r.id,
            name: r.title,
            img: r.image,
            dishType: r.dishTypes.map(e => e + ", "),
            dietType: r.diets.map(e => e + ", "),
            summary: r.summary,
            healthScore: r.healthScore,
            stepByStep: r.analyzedInstructions
        }
    });
    return apiData;
}

const getDbInfo = async () => {
    return await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ["name"],
            through: {
                attributes: [],
            },
        }
    })
}

const getAllRecipes = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    console.log(dbInfo)
    const response = [...apiInfo, ...dbInfo];
    return response; 
}

const getByName = async (name) => {
    const query = name.toLowerCase()
    const allRecipes = await getAllRecipes();
    const filteredRecipes = allRecipes.filter(el => el.name.toLowerCase().includes(query));
    return filteredRecipes;

}

module.exports = {
    getApiInfo,
    getDbInfo,
    getAllRecipes,
    getByName
}