
const getValue = <TObj, TKey extends keyof TObj>(obj: TObj, key: TKey) => {
    return obj[key];
};

const result = getValue(        // if we pass 'c', typescript can infer that the return type should be 'boolean'
    {
        a: 1,
        b: 'hello',
        c: true
    },
    'c'
);
