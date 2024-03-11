import { evaluateProductGivenDietData, getProductData }  from "../Helpers/API_Handling_Module";

test('Checks the get function returns correctly where all properties are requested', async () => {
    /*  Checks the data is returned properly for nutella where all properties are requested */
    let nutella_barcode = 3017624010701;

    let data = await getProductData(nutella_barcode, {ingrd_wanted: true, allergens_wanted: true, nutri_val_wanted: true, images_wanted: true});
    
    console.log(`Data returned by get function: ${JSON.stringify(data)}`);

    let expected_result = {fetchSuccess : true, productName : "Nutella", allergens : "en:nuts",  nutriscore_grade: "e", image_data: "https://images.openfoodfacts.org/images/products/301/762/401/0701/front_en.54.400.jpg" };
    
    return expect(data).toMatchObject(expected_result);
});

test('Checks the get function returns correctly where no properties are requested', async () => {
    /*  Checks the data is returned properly for nutella where no properties are requested */
    let nutella_barcode = 3017624010701;

    let data = await getProductData(nutella_barcode, {ingrd_wanted: false, allergens_wanted: false, nutri_val_wanted: false, images_wanted: false});
    
    // console.log(`Data returned by get function: ${JSON.stringify(data)}`);

    let expected_result = {fetchSuccess : true, productName : "Nutella"};
    
    return expect(data).toMatchObject(expected_result);
});

test('Checks the get function returns correctly when given an overlength barcode and no properties are requested', async () => {
    /*  Checks the data is returned properly for an overlength barcode where no properties are requested */
    let nutella_barcode = 30176240107011234234;

    let data = await getProductData(nutella_barcode, {ingrd_wanted: false, allergens_wanted: false, nutri_val_wanted: false, images_wanted: false});
    
    // console.log(`Data returned by get function: ${JSON.stringify(data)}`);

    let expected_result = {fetchSuccess : false};
    
    return expect(data).toMatchObject(expected_result);
});



test('Checks the evaluate function returns correctly given an input of product nutella, with a peanut allergy and gluten intolerance, with peanut allergies listed in the other_banned_ings field', async () => {
    /*  Test for nutella given a peanut allergy and gluten intolerance, 
        with the peanut allergies being repeated in the list of other unfriendly ingredients
    */
    let nutella_barcode = 3017624010701;
    let userDiets = [ {name: "peanut_allergy", banned_ingredients: ["peanut", "peanuts", "peanut butter", "peanut oil"]}, 
                    {name: "gluten_free", banned_ingredients: ["wheat", "cereal", "barley", "rye"]}];
    let other_banned_ings = ["peanut", "peanuts", "peanut butter", "peanut oil"];

    let userDietDataObject = {user_diets: userDiets, other_bd_igrdnts: other_banned_ings};

    let product_data = await evaluateProductGivenDietData(nutella_barcode, userDietDataObject);
    let expected_result = {success : true, product_safety : true};
    
    return expect(product_data).toMatchObject(expected_result);
});

test('Checks the evaluate function returns correctly given an input of product Sun-Pat Smooth Peanut Butter 570g, with a peanut allergy and gluten intolerance, with peanut allergies listed in the other_banned_ings field', async () => {
    /*  Test for  Sun-Pat Smooth Peanut Butter 570g given a peanut allergy and gluten intolerance, 
        with the peanut allergies being repeated in the list of other unfriendly ingredients
    */
    let product_barcode = 5060391626864;
    let userDiets = [ {name: "peanut_allergy", banned_ingredients: ["peanut", "peanuts", "peanut butter", "peanut oil"]}, 
                    {name: "gluten_free", banned_ingredients: ["wheat", "cereal", "barley", "rye"]}];
    let other_banned_ings = ["peanut", "peanuts", "peanut butter", "peanut oil"];

    let userDietDataObject = {user_diets: userDiets, other_bd_igrdnts: other_banned_ings};

    let product_data = await evaluateProductGivenDietData(product_barcode, userDietDataObject);
    let expected_result = {success : true, product_safety : false};
    
    return expect(product_data).toMatchObject(expected_result);
});

test('Checks the evaluate function returns correctly given a bad barcode input', async () => {
    /*  Test for what happens when given a barcode that is too long
    */
    let product_barcode = 301762401070189297788;
    let userDiets = [ {name: "peanut_allergy", banned_ingredients: ["peanut", "peanuts", "peanut butter", "peanut oil"]}, 
                    {name: "gluten_free", banned_ingredients: ["wheat", "cereal", "barley", "rye"]}];
    let other_banned_ings = ["peanut", "peanuts", "peanut butter", "peanut oil"];

    let userDietDataObject = {user_diets: userDiets, other_bd_igrdnts: other_banned_ings};

    let product_data = await evaluateProductGivenDietData(product_barcode, userDietDataObject);
    let expected_result = {success : false};
    
    return expect(product_data).toMatchObject(expected_result);
});

test('Checks that the evaluate function returns an object with false saftety and true no ingridient data when given a barcode with no ingridient data', async () => {

    let product_barcode = 196633965912; // This barcode has no ingridient data (Spring Water)
    let userDiets = [ {name: "peanut_allergy", banned_ingredients: ["peanut", "peanuts", "peanut butter", "peanut oil"]}, 
                    {name: "gluten_free", banned_ingredients: ["wheat", "cereal", "barley", "rye"]}];
    let other_banned_ings = ["peanut", "peanuts", "peanut butter", "peanut oil"];

    let userDietDataObject = {user_diets: userDiets, other_bd_igrdnts: other_banned_ings};

    let product_data = await evaluateProductGivenDietData(product_barcode, userDietDataObject);
    let expected_result = {success : true, product_safety : false, no_ingrdts_fnd : true};
    
    return expect(product_data).toMatchObject(expected_result);
});