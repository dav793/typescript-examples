
const getKeyWithHighestValue = < TObj extends Record<string, number> >(obj: TObj): {
    key: keyof TObj;
    value: number;
} => {
    const keys = Object.keys(obj) as Array<keyof TObj>;

    let highestKey: keyof TObj = keys[0];
    let highestValue = obj[highestKey];

    for (const key of keys) {
        if (obj[key] > highestValue) {
            highestKey = key;
            highestValue = obj[key];
        }
    }

    return {
        key: highestKey,
        value: highestValue
    };
};

const result = getKeyWithHighestValue({     // the object passed into getKeyWithHighestValue is contrained to have 'string' keys and 'number' values
    a: 1,
    b: 2,
    c: 3
});

const key = result.key;         // key is typed as any key of the object passed into getKeyWithHighestValue
const value = result.value;     // value is typed as a number