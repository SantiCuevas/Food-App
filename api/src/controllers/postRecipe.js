const { Recipe, Diet } = require('../db');

const postRecipe = async (body) => {
    // let {
    //     // id,
    //     title,
    //     img,
    //     dishType,
    //     dietType,
    //     summary,
    //     healthScore,
    //     stepByStep,
    //     createdInDb
    // } = body;

    // let recipe = await Recipe.create({
    //     title,
    //     img,
    //     dishType,
    //     summary,
    //     healthScore,
    //     stepByStep,
    //     createdInDb
    // });

    // let dietDb = Diet.findAll({
    //     where: {name: dietType}
    // });
    // recipe.addDiet(dietDb);

}

module.exports = postRecipe;