
// Whenever we try to index an object using a value with type other than 'string' we can get these errors:
//  "Element implicitly has an 'any' type because expression of type 'string' can't be used to index type ..."
//  "No index signature with a parameter of type 'string' was found on type ..."
  
// To fix this, cast the key value with 'as keyof typeof myObj'

// Example
const myObj = {
    a: 'hello',
    b: 'world'
};

Object.keys(myObj)
    .forEach(key => {
        myObj[key]                          // this errors
    });

Object.keys(myObj)
    .forEach(key => {
        myObj[key as keyof typeof myObj]    // this works
    });