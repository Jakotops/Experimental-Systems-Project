import { readDocumentField }  from "../Firebase/FirestoreFunctions";	
import dietJson from "../Diets.json";	
import ingredientJson from "../Ingredients.json";	

//This asynchronous function takes a user's id and returns a tuple containing the user's selected diets and ingredients	
//@param UserId (String): the id of the user	
//@return (Tuple): A promise containing the array of user's selected diets and the array of user's selected ingredients	
export const idToObject = async (UserId) => {	
    // Create empty arrays to store the user's selected diets and ingredients	
    let UserDiets = [];	
    let UserIngredients = [];	

    // Retrieve the user's selected diets and ingredients Ids from Firestore	
    let UserDietIds = await readDocumentField("users", UserId, "diets");	
    let UserIngredientIds = await readDocumentField("users", UserId, "ingredients");	
    //console.log("Diet ids:" + UserDietIds);	
    //console.log("Ingredient ids: "+ UserIngredientIds);	

    // Retrieve the full list of diets and ingredients from the json files	
    const dietList = dietJson;	
    const ingredientList = ingredientJson;	
    //console.log("Diet list: " + dietList);	
    //console.log("Ingredient list: " + ingredientList);	

    // Map the user's selected diets and ingredients Ids to the full list of diets and ingredients and store them in the arrays	
    for (let i = 0; i < UserDietIds.length; i++) {	
        UserDiets.push(dietList["diets"][UserDietIds[i]]);	
    }	
    for (let i = 0; i < UserIngredientIds.length; i++) {	
        UserIngredients.push(ingredientList["ingredients"][UserIngredientIds[i]]["name"]);	
    }	
    //console.log("User diets: " + UserDiets);	
    //console.log("User ingredients: " + UserIngredients);	

    return [UserDiets, UserIngredients];	
}