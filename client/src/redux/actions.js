import axios from 'axios';

export const getAllRecipes = () => {
    return async function(dispatch) {
        const response = await axios.get("http://localhost:3001/recipes");
        const recipes = response.data;
        return dispatch({
            type: "GET_ALL_RECIPES",
            payload: recipes
        })
    }
}

export const filterByDiet = (payload) => {
    return {
        type: "FILTER_BY_DIET",
        payload
    }
}

export const orderByHs = (payload) => {
    return{
        type: "ORDER_BY_HS",
        payload
    }
}

export const alfaOrder = (payload) => {
    return{
        type: "ORDER_BY_NAME",
        payload
    }
}

export const getByName = (name) => {
    return async function(dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/recipes?name=" + name);
            return dispatch({
                type: "GET_BY_NAME",
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const getDiets = () => {
    return async function (dispatch) {
        var info = await axios("http://localhost:3001/diets");
        return dispatch({
            type: "GET_DIETS",
            payload: info.data
        })
    }
}

export const postRecipe = (payload) => {
    return async function (dispatch) {
        const response = await axios.post("http://localhost:3001/recipes",payload);
        // console.log(response);
        return response;
    }
}

export const getDetail = (id) => {
    return async function (dispatch) {
        try {
            var response = await axios.get("http://localhost:3001/recipes/" + id);
            return dispatch({
                type: "GET_DETAIL",
                payload: response.data
            });            
        } catch (error) {
            console.log(error.message);
        }
    }
}