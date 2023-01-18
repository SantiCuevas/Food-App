export const initialState = {
    recipesLoaded: [],
    allRecipes: [],
    dietsLoaded: [],
    detail: []
  };


 export default function rootReducer(state = initialState, action) {
      switch(action.type) {
        case "GET_ALL_RECIPES":
            return {
                ...state,
                recipesLoaded: action.payload,
                allRecipes: action.payload
            };
        case "FILTER_BY_DIET":
            const recipes = state.allRecipes;
            const filteredRecipes = action.payload === 'all' ? recipes : recipes.filter(el => el.dietType.includes(action.payload));
            return {
                ...state,
                recipesLoaded: filteredRecipes
            }
        case "ORDER_BY_NAME":
                let order = action.payload === 'az' ? 
                state.recipesLoaded.sort(function(a,b) {
                    
                    if(a.name.toLowerCase() > b.name.toLowerCase()) {
                      
                        return 1
                    }
                    if( b.name.toLowerCase() > a.name.toLowerCase()){
                        return -1
                    }
                    return 0
                }) : 
                state.recipesLoaded.sort(function(a,b) {
                    if(a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1
                    }
                    if( b.name.toLowerCase() > a.name.toLowerCase()){
                        return 1
                    }
                    return 0
                })
                return{
                    ...state ,
                    recipesLoaded : order
    
            }
        case "ORDER_BY_HS": 
            let orderHs = action.payload === 'lowest' ? 
                state.recipesLoaded.sort(function(a,b) {
                    if(a.healthScore > b.healthScore) {
                        return 1
                    }
                    if( b.healthScore > a.healthScore){
                        return -1
                    }
                    return 0
                }) : 
                state.recipesLoaded.sort(function(a,b) {
                    if(a.healthScore > b.healthScore) {
                        return -1
                    }
                    if( b.healthScore > a.healthScore){
                        return 1
                    }
                    return 0
                }) 
                return { 
                    ...state ,
                    recipesLoaded : orderHs
            }
            case 'GET_BY_NAME':
                return {
                    ...state,
                    recipesLoaded: action.payload,      
                }
            case "POST_RECIPE":
                return {
                    ...state,
                }   
            case "GET_DIETS":    
                return {
                    ...state,
                    dietsLoaded: action.payload
                }
            case "GET_DETAIL":
                return {
                    ...state,
                    detail : action.payload
                }    
        default:
            return state;
          
      };
};