// Mocked Firestore functions to replace the actual Firebase API calls
// Refrence: https://jestjs.io/docs/manual-mocks
export const readDocumentField = jest.fn((collection, documentId, field) => {
    if (documentId === 'ziOe4fE5hMSI21P33lgZkLDiwhh2' && field === 'diets' && collection === 'users') {
      return Promise.resolve(["1", "4", "6"]); // Mocked diet ids
    } else if (documentId === 'ziOe4fE5hMSI21P33lgZkLDiwhh2' && field === 'ingredients' && collection === 'users') {
      return Promise.resolve(["1", "2", "14", "15"]); // Mocked ingredient ids
    } else {
      return Promise.reject("Error getting document");
    }
  })