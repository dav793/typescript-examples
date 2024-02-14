
const createSet = <T = string>() => {       // here T is assigned a default type 'string'
    return new Set<T>();
};

const numberSet = createSet<number>();      // we can specify the type of the set...
const stringSet = createSet<string>();
const defaultSet = createSet();             // ...or we can use the default type