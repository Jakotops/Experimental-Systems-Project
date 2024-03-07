import { evaluateProductGivenDietData }  from "../Helpers/API_Handling_Module";

import { getProductData }  from "../Helpers/API_Handling_Module";


test('Checks the get function returns correctly', async () => {
    /*  Checks the data is returned properly for nutella
    */
    let nutella_barcode = 3017624010701;

    let data = await getProductData(nutella_barcode, {ingrd_wanted: true, allergens_wanted: true, nutri_val_wanted: true, images_wanted: true});
    
    console.log(`Data returned by get function: ${JSON.stringify(data)}`);

    let expected_result = {fetchSuccess : true, allergens : "en:nuts"};
    
    return expect(data).toMatchObject(expected_result);
});


test('Checks the evaluate function returns correctly', async () => {
    /*  Test for nutella given a peanut allergy and gluten intolerance, 
        with the peanut allergies being repeated in the list of other unfriendly ingredients
    */
    let nutella_barcode = 3017624010701;
    let userDiets = [ {name: "peanut_allergy", banned_ingredients: ["peanut", "peanut butter", "peanut oil"]}, 
                    {name: "gluten_free", banned_ingredients: ["wheat", "cereal", "barley", "rye"]}];
    let other_banned_ings = ["peanut", "peanut butter", "peanut oil"];

    let userDietDataObject = {user_diets: userDiets, other_bd_igrdnts: other_banned_ings};

    evaluateProductGivenDietData(nutella_barcode, userDietDataObject).then((product_data) => {
        console.log(`Data returned by evaluateProductGivenDietData: ${JSON.stringify(product_data)}`);

        let expected_result = {success : true, product_safety : true};
    
        return expect(product_data).toMatchObject(expected_result);
    });
});