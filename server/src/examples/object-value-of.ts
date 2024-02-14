
// You can create a type that works like 'keyof' but accepts only the values of an object, instead of the keys.

type MyObject = {[key: string]: number};            // given an object with keys of type string and values of type number...
type ValueOfMyObject = MyObject[keyof MyObject];    // type ValueOfMyObject is number

type ValueOf<T> = T[keyof T];   // this is a generic version

// for example...
const stuff = {
    one: 1,
    two: 'two',
    three: [3],
    four: {value: 4}
};
let valueOfStuff: ValueOf<typeof stuff>;    // type of valueOfStuff is number | string | number[] | {[key: 'value']: number}
