/** Function description
 * @async
 * @param barcode - exactly what you expect
 * @param {Object} request_data - Contains boolean properties describing what data is wanted.
 *  ingrd_wanted      - boolean   describes whether the ingredient data is wanted
 *  allergens_wanted  - boolean   describes whether the list of allergens is wanted
 *  nutri_val_wanted  - boolean   describes whether the nutriscore grade is wanted
 *  images_wanted     - boolean   describes whether the image URL is wanted
 * 
 * @returns {Object} returns an object whose properties describe the results
 *  toReturn.fetchSuccess     - boolean   describes whether the data was successfully retrieved.
 *  THE FOLLOWING PROPERTIES ONLY EXIST WHEN THE FETCH ATTEMPT SUCCEDES
 *  toReturn.productName      - string    contains the name of the product
 *  THE FOLLOWING PROPERTIES ONLY EXIST WHEN REQUESTED
 *  toReturn.ingredient_data  - Object    This structure gives the different ingredients and some information about them, like estimate on their quantity (Schema here: https://openfoodfacts.github.io/openfoodfacts-server/api/ref-v2/#cmp--schemas-product-ingredients)
 *  toReturn.allergens        - string    comma separated list of allergens
 *  toReturn.nutriscore_grade - enum      Nutri-Score for the product as a letter. See https://world.openfoodfacts.org/nutriscore. Allowed: a┃b┃c┃d┃e
 *  toReturn.image_data       - string    URL for image
 * 
------------------------------------
Note: This function is asynchronus, and resolves using a Promise, so it must be used in a specific way.
Here is an example of how to make a function that prints the output of getProductData:

function printProductData(barcode, request_data){
  console.log(`Running printProductData`);

  getProductData(barcode, request_data)
    .then((product_data) => {
      let dataStringForm = JSON.stringify(product_data);
      console.log(`Product data: ${dataStringForm}`);
  });
}
printProductData(3017624010701, {ingrd_wanted: true, allergens_wanted: true, nutri_val_wanted: true, images_wanted: true});
------------------------------------

TO DO: Change parameters to barcode and an object containing some booleans telling us which data is wanted.
*/
export async function getProductData(barcode, request_data){
  // Construct URL
  let inputURL = `https://world.openfoodfacts.org/api/v2/product/${barcode}?fields=product_name`;
  if (request_data.ingrd_wanted == true){
    inputURL += "," + "ingredients";
  }
  if (request_data.allergens_wanted == true){
    inputURL += "," + "allergens";
  }
  if (request_data.nutri_val_wanted == true){
    inputURL += "," + "nutriscore_grade";
  }
  if (request_data.images_wanted == true){
    inputURL += "," + "image_url";
  }
  
  let toReturn = new Object();
  // Attempt to retrieve data
  try {
    const api_response = await fetch(inputURL, {method:"GET"});
    if(api_response.ok == false){
      throw new Error(`Bad response`);
    }
    const data_retrieved = await api_response.json();

    toReturn.fetchSuccess = true;
    toReturn.productName = data_retrieved.product.product_name;
    if (request_data.ingrd_wanted){
      toReturn.ingredient_data = data_retrieved.product.ingredients;
    }
    if (request_data.allergens_wanted){
      toReturn.allergens = data_retrieved.product.allergens;
    }
    if (request_data.nutri_val_wanted){
      toReturn.nutriscore_grade = data_retrieved.product.nutriscore_grade;
    }
    if (request_data.images_wanted){
      toReturn.image_data = data_retrieved.product.image_url;
    }
  }
  catch(error) {
    toReturn.fetchSuccess = false;
    console.log("Error has occured in the getProductData() function.");
    console.log(`Parameters: 
    barcode: ${barcode}
    Ingredients wanted: ${request_data.ingrd_wanted}
    Allergens wanted: ${request_data.allergens_wanted}
    Nutritional value wanted: ${request_data.nutri_val_wanted}
    Images wanted: ${request_data.images_wanted}`);
    console.log(`URL used: ${inputURL}`);
    console.log(error);
  }

  /*
  let dataStringForm = JSON.stringify(toReturn);
  console.log(`Product data:
  ${dataStringForm}`);
  */

  return toReturn;
}

/** Evaluates whether a product (given its barcode) conflicts with a given set of dietary restrictions
 * @param barcode - exactly what you expect
 * @param {Object} diet_data - Contains 2 list properties describing the dietary restrictions
 *  user_diets        - Object list   A list of the diets the user on, where each diet is an object
 *      Example:  Say the user has peanut allergy and gluten intolerance
 *      [{"name": "peanut_allergy", "banned ingredients": ["peanut", "peanut butter", "peanut oil"]}, {"name": "gluten_free", "banned ingredients": ["wheat", "cereal", "barley", "rye"]}]
 *  other_bd_igrdnts  - string list   A list of the other ingredients the user doesn't accept.
 *      ["peanut", "peanut butter", "peanut oil"]
 * 
 * @returns {Object} returns an object whose properties describe the results
 *  toReturn.success          - boolean       describes whether the function succeeded
 *  THE FOLLOWING PROPERTIES ONLY EXIST WHEN THE FETCH ATTEMPT SUCCEDES
 *  toReturn.product_safety   - boolean       describes whether the product is safe. trus by default.
 *  toReturn.bad_ingrdts_fnd  - string list   A list of the ingredients found in the product that conflict with the user's dietary preferences
 *  toReturn.diets_cntrdctd   - string list   A list of diets that conflict with the ingredients found in the product
 *  toReturn.image_URL        - string        contains the URL to an image of the product
 *  toReturn.product_name     - string        product name
 */
export async function evaluateProductGivenDietData(barcode, diet_data){
  /*
  console.log(`Running evaluateProductGivenDietData`);
  console.log(`Input Barcode: ${barcode}`);
  console.log(`Diet data: ${JSON.stringify(diet_data)}`);
  */


  // Initialise toReturn
  let toReturn = {success: false, product_safety: true, bad_ingrdts_fnd: [], diets_cntrdctd: [], image_URL: "", product_name: ""}

  let product_data = await getProductData(barcode, {ingrd_wanted: true, allergens_wanted: false, nutri_val_wanted: false, images_wanted: true});

  // Check fetch success
  if (product_data.fetchSuccess){
    //console.log(`Data retrieved: ${JSON.stringify(product_data)}`);

    
    // Extract data
    let unbreached_diets = diet_data.user_diets.slice(0);
    let new_unbreached_diets = unbreached_diets.slice(0);

    // Check each ingredient
    let ingredient_list = [];
    for (let curr_ing_num = 0; curr_ing_num < product_data.ingredient_data.length; curr_ing_num++){
      let current_ingredient = product_data.ingredient_data[curr_ing_num].text;

      //console.log(`Checking ingredient: ${JSON.stringify(current_ingredient)}`);

      // Compare with each of unbreached diets
      for (let curr_diet_num = 0; curr_diet_num < unbreached_diets.length; curr_diet_num++){
        let current_diet_object = unbreached_diets[curr_diet_num];

        //console.log(`Checking diet: ${JSON.stringify(current_diet_object)}`);

        let current_banned_ings = current_diet_object.banned_ingredients
        // If the ingredient is in the list of banned ingredients for this diet
        if (current_banned_ings.includes(current_ingredient)){
          toReturn.product_safety = false;
          diets_cntrdctd.push(current_diet.name);
          new_unbreached_diets.splice(curr_diet_num, 1);
        }
      }
      unbreached_diets = new_unbreached_diets.slice(0);

      // Compare with the list of other banned ingredients
      if (diet_data.other_bd_igrdnts.includes(current_ingredient)){
        toReturn.product_safety = false;
        toReturn.bad_ingrdts_fnd.push(current_ingredient);
      }
    }

    // Get the product name and image URL to help the user check they got the right product.
    toReturn.product_name = product_data.productName;
    toReturn.image_URL = product_data.image_data;

    toReturn.success = true;
  }


  //console.log(`Data to return: ${JSON.stringify(toReturn)}`);
  // Return data
  return toReturn;
}