// Function description
async function getProductData(barcode, ingrd_wanted, allergens_wanted, nutri_val_wanted, images_wanted){
  // Construct URL
  let inputURL = `https://world.openfoodfacts.net/api/v2/product/${barcode}?fields=product_name`;
  if (ingrd_wanted){
    inputURL += "," + "ingredients";
  }
  if (allergens_wanted){
    inputURL += "," + "allergens";
  }
  if (nutri_val_wanted){
    inputURL += "," + "nutriscore_grade";
  }
  if (images_wanted){
    // TO DO
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
    if (ingrd_wanted){
      toReturn.ingredient_data = data_retrieved.product.ingredients;
    }
    if (allergens_wanted){
      toReturn.allergens = data_retrieved.product.allergens;
    }
    if (nutri_val_wanted){
      toReturn.nutriscore_grade = data_retrieved.product.nutriscore_grade;
    }
    if (images_wanted){
      // TO DO
    }
  }
  catch(error) {
    toReturn.fetchSuccess = false;
    console.log("Error has occured in the getProductData() function.");
    console.log(`Parameters: 
    barcode: ${barcode}
    Ingredients wanted: ${ingrd_wanted}
    Allergens wanted: ${allergens_wanted}
    Nutritional value wanted: ${nutri_val_wanted}
    Images wanted: ${images_wanted}`);
    console.log(`URL used: ${inputURL}`);
    console.log(error);
  }

  
  let dataStringForm = JSON.stringify(toReturn);
  console.log(`Product data:
  ${dataStringForm}`);
  

  return toReturn;
}

async function printProductData(barcode, ingrd_wanted, allergens_wanted, nutri_val_wanted, images_wanted){
  console.log(`Run printProductData`);

  product_data = await getProductData(barcode, ingrd_wanted, allergens_wanted, nutri_val_wanted, images_wanted);
  let dataStringForm = JSON.stringify(product_data);

  console.log(`Product data:
  ${dataStringForm}`);
}

let nutella_barcode=3017624010701

getProductData(nutella_barcode, true, true, true, true)