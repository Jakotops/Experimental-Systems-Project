// Note: This is to test an asynchronous function - normal functions do not need async/await or return Promises
// Import the function to test
import { idToObject }  from "../Helpers/Id_To_Object_Mapper";

// Use the mockup function instead of the firebase API 
// Located in __mocks__/FirestoreFunctions.js
jest.mock('../Firebase/FirestoreFunctions');

test('Function returns an array' , async () => {
  const userId = 'ziOe4fE5hMSI21P33lgZkLDiwhh2';
  expect(Array.isArray(await idToObject(userId))).toBe(true);
});

test ('The array returned should contain two values', async () => {
  const userId = 'ziOe4fE5hMSI21P33lgZkLDiwhh2';
  expect(await idToObject(userId)).toHaveLength(2);
});

test('The first element in the returned array is of type array', async () => {
  const userId = 'ziOe4fE5hMSI21P33lgZkLDiwhh2';
  const [UserDiets, _] = await idToObject(userId);
  expect(Array.isArray(UserDiets)).toBe(true);
})

test ('the first array in the returned array is a list of objects', async () => {
  const userId = 'ziOe4fE5hMSI21P33lgZkLDiwhh2';
  const [UserDiets, _] = await idToObject(userId);
  expect(UserDiets.every(item => typeof item === 'object')).toBe(true);
})

test('The second element in the returned array is of type array', async () => {
  const userId = 'ziOe4fE5hMSI21P33lgZkLDiwhh2'; 
  const [_, UserIngredients] = await idToObject(userId);
  expect(Array.isArray(UserIngredients)).toBe(true);
})

test ('the second array in the returned array is a list of strings', async () => {
  const userId = 'ziOe4fE5hMSI21P33lgZkLDiwhh2';
  const [_, UserIngredients] = await idToObject(userId);
  expect(UserIngredients.every(item => typeof item === 'string')).toBe(true);
})

test('The UserDiets array should contain the diets objects that the user has selected to avoid', async () => {
  const userId = 'ziOe4fE5hMSI21P33lgZkLDiwhh2';
  const [UserDiets, UserIngredients] = await idToObject(userId);
  expect(UserDiets).toEqual([
  {
      "name": "peanut_allergy", "banned ingredients": ["peanut", "peanut butter", "peanut oil"]   
  },
  {
      "name": "vegan",          "banned_ingredients": ["pork", "gelatin", "chicken", "beef", "pork", "meat", "meat extract", "eggs", "cheese"]
  },
  {
      "name": "dairy_free",     "banned_ingredients": ["cheese"]
  }
    ]);
});

test('The UserIngredients array should contain the ingredients that the user has selected to avoid', async () => {
    const userId = 'ziOe4fE5hMSI21P33lgZkLDiwhh2';
    const [UserDiets, UserIngredients] = await idToObject(userId);
    expect(UserIngredients).toEqual(["peanut", "peanut butter", "meat extract", "eggs"])
  });

test ('Both the UserDiets and UserIngredients array contain the correct values', async () => {

  const userId = 'ziOe4fE5hMSI21P33lgZkLDiwhh2';
  const [UserDiets, UserIngredients] = await idToObject(userId);
  expect(UserDiets).toEqual([
    {
      "name": "peanut_allergy", "banned ingredients": ["peanut", "peanut butter", "peanut oil"]   
    },
    {
      "name": "vegan",          "banned_ingredients": ["pork", "gelatin", "chicken", "beef", "pork", "meat", "meat extract", "eggs", "cheese"]
    },
    {
      "name": "dairy_free",     "banned_ingredients": ["cheese"]
    }
  ]);
  expect(UserIngredients).toEqual(["peanut", "peanut butter", "meat extract", "eggs"]);
});

test('returns an error message if the user id is invalid', async () => {
  const userId = 'notAValidId';
  await expect(idToObject(userId)).rejects.toMatch("Error getting document");
});