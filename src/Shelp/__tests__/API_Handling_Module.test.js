const b = require('../Helpers/API_Handling_Module');

test('Checks the get function returns correctly', async () => {
    /*  Test for nutella given a peanut allergy and gluten intolerance, 
        with the peanut allergies being repeated in the list of other unfriendly ingredients
    */
    let nutella_barcode = 3017624010701;
    let userDiets = [ {name: "peanut_allergy", banned_ingredients: ["peanut", "peanut butter", "peanut oil"]}, 
                    {name: "gluten_free", banned_ingredients: ["wheat", "cereal", "barley", "rye"]}];
    let other_banned_ings = ["peanut", "peanut butter", "peanut oil"];

    let userDietDataObject = {user_diets: userDiets, other_bd_igrdnts: other_banned_ings};

    expect((await evaluateProductGivenDietData(nutella_barcode, userDietDataObject)).success.toBe(true));

});