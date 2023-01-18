const axios = require('axios');
const { Router } = require('express');
const getDiets = require('../controllers/getDiets');

const dietsRouter = Router();

dietsRouter.get('/', async (req,res) => {
   try {
        const response = await getDiets();
        // console.log(response);
    res.status(200).send(response);
    } catch (err) {
    res.status(400).send(err.message);
    }

})

module.exports = dietsRouter;